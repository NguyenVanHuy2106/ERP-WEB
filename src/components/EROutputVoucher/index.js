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

import "./css/index.css";

import { getOutputVoucherAPI } from "../../controller/EROutputVoucher";
import PaginationShop from "../shops/paginationShopList";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function EROutputVoucher({ route, navigate }) {
  const classes = useStyles();
  const [tFValue, setTFValue] = useState("");
  const [outputVoucherList, setOutputVoucherList] = useState([]);

  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();

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

  const getOutputVoucherList = async () => {
    setLoading(false);
    const fromDate = valueFromDate.format("YYYY-MM-DD");
    const toDate = valueToDate.format("YYYY-MM-DD");
    //console.log(tFValue, fromDate, toDate);
    const result = await getOutputVoucherAPI(tFValue, fromDate, toDate);
    if (result.status === 200) {
      setLoading(true);
      setOutputVoucherList(result.data.data.outputVouchers);
      //console.log(result.data.data.outputVouchers);
    }
  };

  useEffect(() => {
    setTime();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = outputVoucherList.slice(
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
        <div className="webContainer1 border">Tra cứu phiếu xuất</div>
        <div
          className="d-flex mt-3 align-items-center justify-content-start"
          style={{ background: "#ffffff", height: "80px", paddingLeft: "30px" }}
        >
          <div className="d-flex mt-3 justify-content-start  search align-items-center">
            <div className="searchMargin">
              <TextField
                id="outlined-basic"
                label="Mã phiếu xuất"
                variant="outlined"
                type="number"
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
              <Button
                variant="contained"
                onClick={() => getOutputVoucherList()}
              >
                <AiOutlineSearch size={20} />
                Tra cứu
              </Button>
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
                    className="col-2"
                  >
                    Mã phiếu xuất
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-1"
                  >
                    Kho
                  </th>

                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-4"
                  >
                    Khách hàng
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Ngày xuất
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Tổng tiền
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
                      <Link to={`/outputVoucher/${item.outputVoucherId}`}>
                        {item.outputVoucherId}
                      </Link>
                    </th>
                    <td>
                      <div>{item.outputStoreId}</div>
                    </td>

                    <td>
                      <div>
                        {item.customerName + " - " + item.customerPhone}
                      </div>
                      <div>{item.customerFullAddress}</div>
                    </td>
                    <td>{new Date(item.outputDate).toLocaleDateString()}</td>
                    <td>
                      <div className="d-flex">
                        <div>Trước thuế: </div>
                        <div style={{ paddingLeft: 10, color: "#ff0000" }}>
                          {item.totalAmountBeforeVAT.toLocaleString()}
                        </div>
                      </div>
                      <div className="d-flex">
                        <div>Tiền thuế: </div>
                        <div style={{ paddingLeft: 10, color: "#ff0000" }}>
                          {item.totalVAT.toLocaleString()}
                        </div>
                      </div>
                      <div className="d-flex">
                        <div>Sau thuế: </div>
                        <div style={{ paddingLeft: 10, color: "#ff0000" }}>
                          {item.totalAmountAfterVAT.toLocaleString()}
                        </div>
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
              totalPosts={outputVoucherList.length}
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
export default EROutputVoucher;
