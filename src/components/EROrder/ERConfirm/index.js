import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { RingLoader } from "react-spinners";
import "./css/index.css";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { AiFillCheckCircle } from "react-icons/ai";

import { getOrderListAPI, updateOrderAPI } from "../../../controller/EROrder";
import PaginationShop from "../../shops/paginationShopList";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function ERConfirm({ route, navigate }) {
  const classes = useStyles();
  let [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  let userId = localStorage.getItem("userId");
  const [selectedItems, setSelectedItems] = useState([]);
  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    }
  };

  const setTime = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  const handleConfirm = async () => {
    const result = await updateOrderAPI(
      userId,
      selectedItems,
      1,
      null,
      null,
      null,
      null,
      ""
    );
    if (result.status === 200) {
      getOrderList();
    }
    //console.log(selectedItems);
  };
  const getOrderList = async () => {
    setLoading(false);
    const condition = {};
    condition.saleOrderId = null;
    condition.isReviewed = 0;
    condition.isOutput = 0;
    condition.isDelivery = 0;
    condition.isIncome = 0;
    condition.isDeleted = 0;
    condition.saleOrderTypeId = null;
    condition.customerId = null;
    condition.customerPhone = null;
    //console.log(condition);
    const result = await getOrderListAPI(userId, condition);
    if (result.status === 200) {
      setLoading(true);
      setOrderList(result.data.data.saleOrder);
      //console.log(result.data.data.saleOrder);
    }
  };

  useEffect(() => {
    setTime();
    getOrderList();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = orderList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <div className="mt-2">
        <div className="d-flex containerBtn align-items-center justify-content-end">
          <div className="d-flex containerBtn align-items-center justify-content-end">
            <div className="plus" style={{ marginRight: 50 }}>
              <Button variant="contained" onClick={handleConfirm}>
                <div
                  style={{
                    display: "flex",
                    paddingBottom: "3px",
                    paddingTop: "3px",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <AiFillCheckCircle size={18} />
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Xác nhận
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          <div className="d-flex">
            <table className="table mt-3">
              <thead>
                <tr style={{ background: "#848482" }}>
                  <th>
                    <label>
                      <input type="checkbox" />
                    </label>
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col-1"
                  >
                    Đơn hàng
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col-3"
                  >
                    Thông tin khách hàng
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col-2"
                  >
                    Thanh toán
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col-2"
                  >
                    Trạng thái
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col-2"
                  >
                    Công nợ
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.saleOrderId)}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.saleOrderId)
                          }
                        />
                      </label>
                    </td>
                    <th
                      className="mainGroupText"
                      //onClick={() => handleEditClick(item)}
                      scope="item"
                    >
                      <Link
                        to={`/orders/${item.saleOrderId}`}
                        state={{
                          data: item,
                          isConfirm: true,
                          isWaiGetProduct: false,
                        }}
                      >
                        {item.saleOrderId}
                      </Link>
                    </th>
                    <td>
                      <div>
                        {"Anh/Chị: " +
                          item.customerName +
                          " - " +
                          item.customerPhone}
                      </div>
                      <div>{"Địa chỉ: " + item.customerFullAddress}</div>
                      <div>
                        {"Ngày mua: " +
                          new Date(item.createdDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <div>{item.paymentOrderTypeName}</div>
                      <div>{"Ghi chú: " + item.note}</div>
                    </td>
                    <td>
                      <div
                        style={{
                          textAlign: "center",
                          backgroundColor: "#888888",
                          color: "#ffffff",
                          width: 130,
                        }}
                      >
                        Chờ xác nhận
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          color: "#AB274F",
                        }}
                      >
                        {"Đã trả: " + item.totalPaid.toLocaleString() + "đ"}
                      </div>
                      <div
                        style={{
                          color: "#ff0000",
                        }}
                      >
                        {"Nợ: " +
                          (item.debt - item.totalPaid).toLocaleString() +
                          "đ"}
                      </div>
                      <div
                        style={{
                          color: "#0066FF",
                        }}
                      >
                        {"Phải trả: " + item.debt.toLocaleString() + "đ"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            <PaginationShop
              postsPerPage={postsPerPage}
              totalPosts={orderList.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
      <div>
        {loading ? (
          loading
        ) : (
          <Backdrop className={classes.backdrop} open>
            <RingLoader color="#36d7b7" />
          </Backdrop>
        )}
      </div>
    </div>
  );
}
export default ERConfirm;
