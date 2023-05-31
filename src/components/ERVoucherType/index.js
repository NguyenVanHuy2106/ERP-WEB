import React, { useState, useEffect } from "react";

import dayjs from "dayjs";
import { RingLoader } from "react-spinners";
import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { AiOutlineSearch } from "react-icons/ai";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./css/index.css";

import {
  getAllVoucherType,
  getAllVoucherTypeDetail,
} from "../../controller/ERVoucherType";
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
function ERVoucherType({ route, navigate }) {
  const classes = useStyles();
  const [tFSaleOrderValue, setTFSaleOrderValue] = useState("");
  const [tFVoucherIdValue, setTFVoucherIdValue] = useState("");

  const [voucherTypeList, setVoucherTypeList] = useState([]);

  const [cashList, setCashList] = useState(0);
  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const handleOpenModalEdit = () => setOpenModalEdit(true);
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

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

  const getVoucherDetail = async (userId, data) => {
    //console.log(userId, data);
    const result = await getAllVoucherTypeDetail(userId, data);
    if (result.status === 200) {
      setCashList(result.data.data.paymentVoucherDetails);
      //console.log(result.data.data.paymentVoucherDetails);
    }
  };
  const getVoucherTypeList = async () => {
    setLoading(false);
    const fromDate = valueFromDate.format("YYYY-MM-DD");
    const toDate = valueToDate.format("YYYY-MM-DD");
    const dataCondition = {};
    dataCondition.saleOrderId = tFSaleOrderValue;
    dataCondition.paymentVoucherId = tFVoucherIdValue;
    dataCondition.createFrom = fromDate;
    dataCondition.createTo = toDate;
    const result = await getAllVoucherType(userId, dataCondition);
    if (result.status === 200) {
      setLoading(true);
      setVoucherTypeList(result.data.data);
      //console.log(result.data.data);
    }
  };

  useEffect(() => {
    setTime();
    getVoucherTypeList();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = voucherTypeList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleEditClick = (item) => {
    getVoucherDetail(userId, item);
    handleOpenModalEdit();
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
        <div className="webContainer1 border">Tra cứu phiếu thu/chi</div>
        <div
          className="d-flex mt-3 align-items-center justify-content-start"
          style={{ background: "#ffffff", height: "80px", paddingLeft: 30 }}
        >
          <div className="d-flex mt-3 justify-content-start  search align-items-center">
            <div className="searchMargin">
              <TextField
                id="outlined-basic"
                label="Mã đơn hàng"
                variant="outlined"
                type="number"
                onChange={(newValue) =>
                  setTFSaleOrderValue(newValue.target.value)
                }
              />
            </div>
            <div className="searchMargin">
              <TextField
                id="outlined-basic"
                label="Mã phiếu thu/chi"
                variant="outlined"
                type="number"
                onChange={(newValue) =>
                  setTFVoucherIdValue(newValue.target.value)
                }
              />
            </div>
            <div className="m-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Từ ngày"
                  value={valueFromDate}
                  onChange={(newValue) => {
                    setValueFromDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Đến ngày"
                  value={valueToDate}
                  onChange={(newValue) => {
                    setValueToDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="searchMargin">
              <Button variant="contained" onClick={() => getVoucherTypeList()}>
                <AiOutlineSearch size={20} />
                Tra cứu
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
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-1"
                  >
                    Mã phiếu
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col"
                  >
                    Đơn hàng
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Loại phiếu
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Khách hàng
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Tổng tiền
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Ngày tạo
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((item, index) => (
                  <tr key={index}>
                    <th
                      scope="item"
                      className="brandEdit"
                      onClick={() => {
                        handleEditClick(item);
                      }}
                    >
                      {item.paymentVoucherId}
                    </th>
                    <td>{item.voucherConcern}</td>
                    <td>{item.voucherTypeId + " - " + item.voucherTypeName}</td>
                    <td>
                      <div>
                        <div>
                          {item.customerName + " - " + item.customerPhone}
                        </div>
                        <div>{item.customerFullAddress}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div>
                          {"Trước thuế: " +
                            item.totalAmountBeforeVAT.toLocaleString()}
                        </div>
                        <div>{"Thuế: " + item.totalVAT.toLocaleString()}</div>
                        <div>
                          {"Sau thuế: " +
                            item.totalAmountAfterVAT.toLocaleString()}
                        </div>
                      </div>
                    </td>
                    <td>{new Date(item.createdDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            <PaginationShop
              postsPerPage={postsPerPage}
              totalPosts={voucherTypeList.length}
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
            <div className="border-bottom fw-bold">Chi tiết phiếu</div>

            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: 20 }}
            >
              {cashList && (
                <table className="table mt-2 ">
                  <thead>
                    <tr style={{ background: "#848482" }}>
                      <th
                        style={{ color: "#ffffff", fontWeight: "bold" }}
                        scope="col"
                        className="col-4"
                      >
                        Số tiền
                      </th>
                      <th
                        style={{ color: "#ffffff", fontWeight: "bold" }}
                        scope="col"
                        className="col"
                      >
                        Ngày thao tác
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {cashList.map((item, index) => (
                      <tr key={index}>
                        <td>{item.cash.toLocaleString()}</td>
                        <td>
                          {new Date(item.createdDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
export default ERVoucherType;
