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
import ExportExcel from "../ExportExcel";

import "./css/index.css";
import { useParams } from "react-router-dom";
import { getOutputVoucherAPI } from "../../controller/EROutputVoucher";
import { getInventoryHis } from "../../controller/MDInventory";
import PaginationShop from "../shops/paginationShopList";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function MDInventoryHis({ route, navigate }) {
  const classes = useStyles();
  let modelId = useParams();
  //   console.log(modelId);
  const [tFValue, setTFValue] = useState(modelId.modelId || "");
  const [inventoryHisList, setInventoryHisList] = useState([]);

  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();
  let userId = localStorage.getItem("userId");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

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
  const data = [
    { column1: "Data 1", column2: "Data 2", column3: "Data 3" },
    { column1: "Data 4", column2: "Data 5", column3: "Data 6" },
    { column1: "Data 7", column2: "Data 8", column3: "Data 9" },
  ];
  var dataExport = [];
  inventoryHisList.forEach((item) => {
    //console.log(item);
    dataExport.push({
      "Mã phiếu": item.inputVoucherId,
      "Mã model": item.modelId,
      "Tên model": item.modelName,
      "Mã sản phẩm": item.modelName,
      "Giá nhập": item.inputPrice,
      "Số lượng nhập": item.quantity,
      "Kho nhập": item.inputStoreId,
      "Người nhập": item.inputUser,
      "Ngày nhập": new Date(item.inputDate).toLocaleDateString(),
    });
  });
  const getInventoryHisList = async () => {
    setLoading(false);
    const fromDate = valueFromDate.format("YYYY-MM-DD");
    const toDate = valueToDate.format("YYYY-MM-DD");
    //console.log(tFValue, fromDate, toDate);
    const result = await getInventoryHis(userId, tFValue, fromDate, toDate);
    if (result.status === 200) {
      setLoading(true);
      setInventoryHisList(result.data.data);
      //console.log(result.data.data);
    }
  };

  useEffect(() => {
    setTime();
    getInventoryHisList();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = inventoryHisList.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className="webContainer1 border">Lịch sử nhập</div>
        <div
          className="d-flex mt-3 align-items-center justify-content-start"
          style={{ background: "#ffffff", height: "80px", paddingLeft: "30px" }}
        >
          <div className="d-flex mt-3 justify-content-start  search align-items-center">
            <div className="searchMargin">
              <TextField
                id="outlined-basic"
                label="Mã model"
                variant="outlined"
                type="number"
                value={tFValue}
                onChange={(newValue) => setTFValue(newValue.target.value)}
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
              <Button variant="contained" onClick={() => getInventoryHisList()}>
                <AiOutlineSearch size={20} />
                Tra cứu
              </Button>
            </div>
            <div>
              <ExportExcel data={dataExport} />
            </div>
          </div>
        </div>

        <div style={{ background: "#ffffff" }}>
          <div
            className="d-flex"
            style={{ marginLeft: "50px", marginRight: "50px", paddingTop: 12 }}
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
                    className="col-1"
                  >
                    Mã model
                  </th>

                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-3"
                  >
                    Tên model
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Mã sản phẩm
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Giá nhập
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Số lượng nhập
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Kho nhập
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Người nhập
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Ngày nhập
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((item, index) => (
                  <tr key={index}>
                    <th
                      scope="item"
                      // className="brandEdit"
                      // onClick={() => handleEditClick(item)}
                    >
                      {item.inputVoucherId}
                    </th>
                    <td>
                      <div>{item.modelId}</div>
                    </td>

                    <td>{item.modelName}</td>
                    <td>{item.productId}</td>
                    <td>
                      {item.inputPrice ? item.inputPrice.toLocaleString() : ""}
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.inputStoreId}</td>
                    <td>{item.inputUser}</td>
                    <td>
                      {item.inputDate
                        ? new Date(item.inputDate).toLocaleDateString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            <PaginationShop
              postsPerPage={postsPerPage}
              totalPosts={inventoryHisList.length}
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
export default MDInventoryHis;
