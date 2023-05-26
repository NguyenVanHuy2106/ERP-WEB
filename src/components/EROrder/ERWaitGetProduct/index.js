import React, { useState, useEffect, useStyle, useMemo } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { RingLoader, CircleLoader } from "react-spinners";
import { TextField } from "@mui/material";
import "./css/index.css";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { FiEdit, FiTrash } from "react-icons/fi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import Switch from "react-switch";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { storage } from "../../../server/FirebaseConfig";
import {
  addNewMainGroup,
  getAllMainGroup,
  updateMainGroup,
  deleteMainGroup,
} from "../../../controller/MDMainGroupController";

import { getOrderListAPI } from "../../../controller/EROrder";
import PaginationShop from "../../shops/paginationShopList";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
function ERWaitGetProduct({ route, navigate }) {
  const classes = useStyles();
  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();
  const [orderList, setOrderList] = useState([]);
  const [mainGroupData, setMainGroupData] = useState([]);
  //const [valueCatData, setValueCatData] = useState([]);
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

  var firstDateInMonth =
    1 + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const [valueFromDate, setValueFromDate] = React.useState(
    dayjs(firstDateInMonth)
  );
  const [valueToDate, setValueToDate] = React.useState(toDateDayjs);

  const setTime = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };
  const HandleClick = async () => {
    setLoading(false);
    const fromDate = valueFromDate.format("YYYY-MM-DD");
    const toDate = valueToDate.format("YYYY-MM-DD");
    //console.log(tFValue, fromDate, toDate);
    const result = await getAllMainGroup();
    if (result.status === 200) {
      //console.log(result.data.ResultObject);
      setMainGroupData(result.data.data.maingroups);
      setLoading(true);
    }
  };
  const CheckActive = (isActive) => {
    if (isActive === 1) {
      return <AiOutlineCheck />;
    }
  };
  const handleDeleteMainGroup = async (item) => {
    //console.log(item.MODELID);
    setLoading(false);
    const result = await deleteMainGroup(userId, selectedItems);
    if (result.status === 200) {
      setLoading(true);
      HandleClick();
    }
  };
  const getOrderList = async () => {
    const condition = {};
    condition.saleOrderId = null;
    condition.isReviewed = 1;
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
      setOrderList(result.data.data.saleOrder);
      //console.log(result.data.data.saleOrder);
    }
  };

  useEffect(() => {
    setTime();
    HandleClick();
    getOrderList();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = orderList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [url, setUrl] = useState("");
  const [urlEdit, setUrlEdit] = useState("");

  const handleEditClick = (item) => {};

  return (
    <div>
      <div className="mt-2">
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
                    <th className="mainGroupText" scope="item">
                      <Link
                        to={`/orders/${item.saleOrderId}`}
                        state={{
                          data: item,
                          isConfirm: false,
                          isWaiGetProduct: true,
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
                          backgroundColor: "#FF00CC",
                          color: "#ffffff",
                          width: 130,
                        }}
                      >
                        Chờ xử lý
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
export default ERWaitGetProduct;
