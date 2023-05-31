import React, { useState, useEffect } from "react";

import { RingLoader } from "react-spinners";

import { makeStyles } from "@material-ui/core/styles";

import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";

import { BiBlock } from "react-icons/bi";
import { getAllCustomer } from "../../controller/ERCustomerController";
import PaginationShop from "../shops/paginationShopList";
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
function ERCustomer({ route, navigate }) {
  const classes = useStyles();
  const [isActived, setIsActived] = useState(false);
  let [loading, setLoading] = useState(false);

  const [customerData, setCustomerData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [customerObject, setCustomerObject] = useState({});
  const [customerObjectDetail, setCustomerObjectDetail] = useState({});
  //console.log(customerObject);
  const handleOpenModalEdit = () => setOpenModalEdit(true);
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

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
  const HandleClick = async () => {
    setLoading(false);

    const result = await getAllCustomer();
    if (result.status === 200) {
      setCustomerData(result.data.data.customers);
      setLoading(true);
    }
  };

  useEffect(() => {
    setTime();
    HandleClick();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = customerData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (item) => {
    setCustomerObject(item);
    setCustomerObjectDetail(item.md_customer_info);
    handleOpenModalEdit(item);
  };

  return (
    <div
      style={{
        background: "#E5E4E2",
        height: "900px",
      }}
    >
      <div
        style={{ marginLeft: "20px", marginRight: "20px", paddingTop: "20px" }}
      >
        <div className="webContainer1 border">Danh sách khách hàng</div>
        <div
          className="d-flex mt-3 align-items-center justify-content-end"
          style={{ background: "#ffffff", height: "80px" }}
        >
          <div className="d-flex containerBtn align-items-center justify-content-end">
            <div className="plus" style={{ marginRight: "50px" }}>
              <Button variant="contained" onClick={() => {}}>
                <div
                  style={{
                    display: "flex",
                    paddingBottom: "3px",
                    paddingTop: "3px",
                    paddingLeft: 15,
                    paddingRight: 15,
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <BiBlock size={18} />
                  <div
                    style={{
                      fontWeight: "bold",
                      paddingLeft: "8px",
                    }}
                  >
                    Chặn
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div style={{ background: "#ffffff" }}>
          <div
            className="d-flex"
            style={{ marginLeft: "50px", marginRight: "50px" }}
          >
            <table className="table mt-2 ">
              <thead>
                <tr style={{ background: "#848482" }}>
                  <th>
                    <label>
                      <input type="checkbox" />
                    </label>
                  </th>

                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-2"
                  >
                    Tên
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-2"
                  >
                    Tài khoản
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-2"
                  >
                    Giới tính
                  </th>

                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-2"
                  >
                    Số điện thoại
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-2"
                  >
                    Email
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-2"
                  >
                    Ngày sinh
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.customerId)}
                        onChange={(event) =>
                          handleCheckboxChange(event, item.customerId)
                        }
                      />
                      {item.name}
                    </td>
                    <td
                      className="brandEdit d-flex align-items-center"
                      onClick={() => handleEditClick(item)}
                    >
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: "#cccccc",
                          borderRadius: 50,
                        }}
                      >
                        <div style={{ fontWeight: "bold" }}>
                          {item.md_customer_info.firstname.charAt(0)}
                        </div>
                        <div style={{ fontWeight: "bold" }}>
                          {item.md_customer_info.lastname.charAt(0)}
                        </div>
                        {/* <img
                          src={
                            item.md_customer_info.avatar
                              ? item.md_customer_info.avatar
                              : "https://icon-library.com/images/image-icon-png/image-icon-png-6.jpg"
                          }
                          alt="Selected file"
                          width={40}
                          height={40}
                          style={{ borderRadius: 100 }}
                        /> */}
                      </div>
                      <div style={{ marginLeft: 8 }}>
                        {item.md_customer_info.firstname +
                          " " +
                          item.md_customer_info.lastname}
                      </div>
                    </td>
                    <td>{item.username}</td>

                    <td>{item.md_customer_info.gender === 1 ? "Nam" : "Nữ"}</td>
                    <td>{item.md_customer_info.phoneNumber}</td>
                    <td>{item.md_customer_info.email}</td>
                    <td>
                      {new Date(
                        item.md_customer_info.birthday
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            <PaginationShop
              postsPerPage={postsPerPage}
              totalPosts={customerData.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
      <div>
        <Modal
          open={openModalEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="border-bottom fw-bold">Thông tin khách hàng</div>
            <div style={{ marginLeft: 30 }}>
              <div className="d-flex" style={{ marginTop: 10 }}>
                <div className="col-3">Mã khách hàng: </div>
                <div>{customerObject.customerId}</div>
              </div>
              <div className="d-flex" style={{ marginTop: 10 }}>
                <div className="col-3">Tên khách hàng: </div>
                <div>
                  {customerObjectDetail.firstname +
                    " " +
                    customerObjectDetail.lastname}
                </div>
              </div>
              <div className="d-flex" style={{ marginTop: 10 }}>
                <div className="col-3">Số điện thoại: </div>
                <div>{customerObjectDetail.phoneNumber}</div>
              </div>
              <div className="d-flex" style={{ marginTop: 10 }}>
                <div className="col-3">Email: </div>
                <div>{customerObjectDetail.email}</div>
              </div>
              <div className="d-flex" style={{ marginTop: 10 }}>
                <div className="col-3">Giới tính: </div>
                <div>{customerObjectDetail.gender === 1 ? "Nam" : "Nữ"}</div>
              </div>
              <div className="d-flex" style={{ marginTop: 10 }}>
                <div className="col-3">Ngày sinh: </div>
                <div>
                  {new Date(customerObjectDetail.birthday).toLocaleDateString()}
                </div>
              </div>
              <div className="d-flex" style={{ marginTop: 10 }}>
                <div className="col-3">Địa chỉ: </div>
                <div>
                  {customerObjectDetail.address +
                    ", " +
                    customerObjectDetail.wardName +
                    ", " +
                    customerObjectDetail.districtName +
                    ", " +
                    customerObjectDetail.provinceName}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 10 }}>
              Kích hoạt{" "}
              <Checkbox
                checked={isActived}
                //onChange={handleEditcheck}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>

            <div
              className="d-flex justify-content-center"
              style={{ marginTop: 20 }}
            >
              <div style={{ marginRight: 20 }}>
                <Button variant="outlined" onClick={handleCloseModalEdit}>
                  Quay lại
                </Button>
              </div>
              {/* <div style={{ marginLeft: 20 }}>
                <Button variant="contained" onClick={handleAgrreEdit}>
                  Đồng ý
                </Button>
              </div> */}
            </div>
          </Box>
        </Modal>
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
export default ERCustomer;
