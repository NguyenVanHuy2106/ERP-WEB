import React, { useState, useEffect, useStyle, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { RingLoader, CircleLoader } from "react-spinners";
import { TextField } from "@mui/material";
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
import "./css/index.css";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { storage } from "../../server/FirebaseConfig";
import {
  getAllBrand,
  addNewBrand,
  updateBrand,
  deleteBrand,
} from "../../controller/MDBrandController";
import { updateOrderAPI } from "../../controller/EROrder";
import {
  getOrderDetailAPI,
  exportProductAPI,
  incomeAPI,
} from "../../controller/EROrderDetail";

import PaginationShop from "../shops/paginationShopList";
import { da } from "date-fns/locale";
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
function EROrderDetail({ route }) {
  const classes = useStyles();
  const navigate = useNavigate();
  let saleOrderId = useParams();
  const data = useLocation();
  const saleOrder = data.state.data;
  const isConfirm = data.state.isConfirm;
  const isWaiGetProduct = data.state.isWaiGetProduct;
  const isIncome = data.state.isIncome || false;
  const isDelivery = data.state.isDelivery || false;
  //console.log(isIncome);
  const [openModal, setOpenModal] = React.useState(false);
  const [deleteNote, setDeleteNote] = useState("");
  const [cash, setCash] = useState(0);
  //console.log(isConfirm, isWaiGetProduct);
  //console.log(saleOrder);

  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();
  const [brandData, setBrandData] = useState([]);
  const [orderDetail, setOrderDetail] = useState({});
  const [orderDetailList, setOrderDetailList] = useState([]);
  //console.log(orderDetailList);
  //const [valueCatData, setValueCatData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [error, setError] = React.useState("");
  const [isError, setIsError] = useState(false);
  let userId = localStorage.getItem("userId");
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
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleAgrre = async () => {
    let saleOrderIdList = [];
    saleOrderIdList.push(saleOrderId.saleOrderId);
    const result = await updateOrderAPI(
      userId,
      saleOrderIdList,
      null,
      null,
      null,
      null,
      1,
      deleteNote
    );
    if (result.status === 200) {
      navigate("/orders", { replace: true });
    }
  };
  const getSaleOrderDetail = async (saleOrder) => {
    setLoading(false);
    const result = await getOrderDetailAPI(saleOrder);
    if (result.status === 200) {
      setLoading(true);
      setOrderDetail(result.data.data.saleOrder);
      setOrderDetailList(result.data.data.saleOrder.saleOrderDetails);
    }
  };
  const HandleClickApproval = async () => {
    let saleOrderIdList = [];
    saleOrderIdList.push(saleOrderId.saleOrderId);
    const result = await updateOrderAPI(
      userId,
      saleOrderIdList,
      1,
      null,
      null,
      null,
      null,
      ""
    );
    if (result.status === 200) {
      navigate("/orders", { replace: true });
    }
  };

  const handleOutputProduct = async () => {
    saleOrder.isOutput = 1;
    //console.log(saleOrder);
    setLoading(false);
    saleOrder.saleOrderDetails = orderDetailList;
    const result = await exportProductAPI(userId, saleOrder);
    if (result.status === 200) {
      setLoading(true);
      navigate("/orders", { replace: true });
    }
    // // console.log(saleOrder);
  };
  const handleIncome = async () => {
    saleOrder.isIncome = 1;
    saleOrder.cash = parseInt(cash);
    saleOrder.saleOrderDetails = orderDetailList;
    //console.log(saleOrder);
    setLoading(false);
    const result = await incomeAPI(userId, saleOrder);
    if (result.status === 200) {
      setLoading(true);
      navigate("/orders", { replace: true });
    }
    // // console.log(saleOrder);
  };
  const handleDelivery = async () => {
    let saleOrderIdList = [];
    saleOrderIdList.push(saleOrderId.saleOrderId);
    const result = await updateOrderAPI(
      userId,
      saleOrderIdList,
      null,
      1,
      null,
      null,
      null,
      ""
    );
    if (result.status === 200) {
      navigate("/orders", { replace: true });
    }
  };

  useEffect(() => {
    setTime();

    getSaleOrderDetail(saleOrder);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = brandData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleQuantityChange = (saleOrderDetailId, IMEI) => {
    // Tìm vị trí của phần tử trong quantityList dựa trên productId và modelId
    const productIndex = orderDetailList.findIndex(
      (product) => product.saleOrderDetailId === saleOrderDetailId
    );
    const newQuantityList = [...orderDetailList];
    newQuantityList[productIndex].IMEI = IMEI.target.value;
    setOrderDetailList(newQuantityList);
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
        <div className="webContainer1 border">Chi tiết đơn hàng</div>
        <div
          className="d-flex mt-3"
          style={{
            background: "#ffffff",
            paddingLeft: 12,
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <div
            className="col-4"
            style={{
              paddingRight: 20,
            }}
          >
            <div>{"Mã đơn hàng: " + saleOrder.saleOrderId}</div>
            <div>
              {saleOrder.saleOrderTypeId === 1
                ? "Loại yêu cầu xuất: " +
                  saleOrder.saleOrderTypeId +
                  " - Xuất bán hàng Online"
                : ""}
            </div>
            <div>
              {saleOrder.paymentOrderTypeId === 1
                ? "Thanh toán: " +
                  saleOrder.paymentOrderTypeId +
                  " - Thanh toán COD"
                : ""}
            </div>
            <div>
              {"Ngày tạo: " +
                new Date(saleOrder.createdDate).toLocaleDateString()}
            </div>
          </div>
          <div className="col-5">
            <div style={{ fontWeight: "bold" }}>Khách hàng</div>
            <div>
              {saleOrder.customerGender === 1
                ? "Anh: " +
                  saleOrder.customerName +
                  " - " +
                  saleOrder.customerPhone
                : "Chị: " +
                  saleOrder.customerName +
                  " - " +
                  saleOrder.customerPhone}
            </div>
            <div>
              {saleOrder.customerAddress + ", " + saleOrder.customerFullAddress}
            </div>
            <div style={{ fontWeight: "bold" }}>Liên hệ</div>
            <div>
              {saleOrder.contactGender === 1
                ? "Anh: " +
                  saleOrder.contactName +
                  " - " +
                  saleOrder.contactPhone
                : "Chị: " +
                  saleOrder.contactName +
                  " - " +
                  saleOrder.contactPhone}
            </div>
            <div>
              {saleOrder.contactAddress + ", " + saleOrder.contactFullAddress}
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <div className="col-4">Hàng hoá: </div>
              <div
                style={{
                  color: "#CE2029",
                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                }}
              >
                {saleOrder.totalMoney.toLocaleString()}
              </div>
            </div>
            <div className="d-flex">
              <div className="col-4">Giao hàng: </div>
              <div
                style={{
                  color: "#FF91A4",

                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                }}
              >
                {saleOrder.shippingCost.toLocaleString()}
              </div>
            </div>
            <div className="d-flex">
              <div className="col-4">Tổng tiền: </div>
              <div
                style={{
                  color: "#3B3C36",
                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                }}
              >
                {saleOrder.debt.toLocaleString()}
              </div>
            </div>
            <div className="d-flex">
              <div className="col-4">Phải trả: </div>
              <div
                style={{
                  color: "#ff0000",

                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                }}
              >
                {saleOrder.debt.toLocaleString()}
              </div>
            </div>
            <div className="d-flex">
              <div className="col-4">Đã trả: </div>
              <div
                style={{
                  color: "#000000",

                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                }}
              >
                {saleOrder.totalPaid.toLocaleString()}
              </div>
            </div>
            <div className="d-flex">
              <div className="col-4">Còn nợ: </div>
              <div
                style={{
                  color: "#0000FF",
                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                }}
              >
                {(saleOrder.debt - saleOrder.totalPaid).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            {orderDetailList.map((item, index) => (
              <div
                key={index}
                className="border d-flex"
                style={{ backgroundColor: "#ffffff", marginTop: 4 }}
              >
                <div
                  className="col-4 d-flex"
                  style={{
                    margin: 12,
                  }}
                >
                  <div
                    className="d-flex align-items-center"
                    style={{
                      marginRight: 12,
                    }}
                  >
                    <img
                      src={item.modelImagePath}
                      className="img-fluid"
                      alt="file"
                      width={130}
                      height={130}
                      style={{ padding: 5 }}
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <div style={{ fontWeight: "bold" }}>
                      {item.modelId + " - " + item.modelName}
                    </div>
                    <div>{item.productId}</div>
                    <div>{"Phân loại:" + item.productName}</div>
                    <div>{"x" + item.quantity}</div>
                    <div
                      style={{
                        color: "#ff0000",
                        fontSize: 16,
                      }}
                    >
                      {"đ" + item.salePriceVAT.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="col-4 d-flex flex-column justify-content-center">
                  <div>
                    {"Hình thức xuất: " +
                      item.outputTypeId +
                      " - " +
                      item.outputTypeName}
                  </div>
                  <div>
                    {"Trạng thái tồn: " +
                      item.inventoryStatusId +
                      " - " +
                      item.inventoryStatusName}
                  </div>
                  <div
                    className="d-flex flex-wrap"
                    style={{
                      width: 200,
                    }}
                  >
                    {"Ghi chú: " + item.note}
                  </div>
                </div>
                {isWaiGetProduct && item.isRequestIMEI === 1 && (
                  <div className="d-flex flex-column justify-content-center">
                    <input
                      type="text"
                      style={{ width: "100%" }}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="IMEI"
                      onChange={(value) =>
                        handleQuantityChange(item.saleOrderDetailId, value)
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          {isConfirm && saleOrder.isReviewed === 0 && (
            <div
              className="d-flex justify-content-end"
              style={{
                backgroundColor: "#ffffff",
                marginTop: 4,
                paddingTop: 12,
                paddingBottom: 12,
                paddingRight: 20,
              }}
            >
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginRight: 12 }}
                onClick={() => HandleClickApproval()}
              >
                Xác nhận
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleOpenModal()}
              >
                Huỷ đơn
              </button>
            </div>
          )}
          {isWaiGetProduct && (
            <div
              className="d-flex justify-content-end"
              style={{
                backgroundColor: "#ffffff",
                marginTop: 4,
                paddingTop: 12,
                paddingBottom: 12,
                paddingRight: 20,
              }}
            >
              <button
                type="button"
                style={{ marginRight: 12 }}
                className="btn btn-primary"
                onClick={() => handleOutputProduct()}
              >
                Xuất hàng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleOpenModal()}
              >
                Huỷ đơn
              </button>
            </div>
          )}
          {isIncome && (
            <div
              className="d-flex justify-content-end"
              style={{
                backgroundColor: "#ffffff",
                paddingTop: 16,
                marginBottom: 16,
              }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Số tiền thu"
                variant="outlined"
                type="number"
                style={{}}
                value={cash}
                onChange={(value) => setCash(value.target.value)}
              />
              <div
                style={{
                  marginTop: 4,
                  paddingTop: 12,
                  paddingBottom: 12,
                  paddingRight: 20,
                  paddingLeft: 20,
                }}
              >
                <button
                  type="button"
                  style={{ marginRight: 12 }}
                  className="btn btn-primary"
                  onClick={() => handleIncome()}
                >
                  Thu tiền
                </button>
              </div>
            </div>
          )}
          {isDelivery && (
            <div
              className="d-flex justify-content-end"
              style={{
                backgroundColor: "#ffffff",
                marginTop: 4,
                paddingTop: 12,
                paddingBottom: 12,
                paddingRight: 20,
              }}
            >
              <button
                type="button"
                style={{ marginRight: 12 }}
                className="btn btn-primary"
                onClick={() => handleDelivery()}
              >
                Hoàn tất giao
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <Modal
          open={openModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              className="border-bottom fw-bold"
              style={{ paddingBottom: "16px" }}
            >
              Xác nhận huỷ đơn
            </div>

            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: 24 }}
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Lý do huỷ"
                multiline
                required
                rows={6}
                style={{ width: "90%", marginTop: 10 }}
                value={deleteNote}
                onChange={(value) => setDeleteNote(value.target.value)}
              />
            </div>

            <div
              className="d-flex justify-content-center"
              style={{ marginTop: 20 }}
            >
              <div style={{ marginRight: 20 }}>
                <Button variant="outlined" onClick={handleCloseModal}>
                  Quay lại
                </Button>
              </div>
              <div style={{ marginLeft: 20 }}>
                <Button variant="contained" onClick={handleAgrre}>
                  Đồng ý
                </Button>
              </div>
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
export default EROrderDetail;
