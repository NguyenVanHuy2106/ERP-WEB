import React, { useState, useEffect, useStyle, useMemo } from "react";
import { Link } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { BiMoney } from "react-icons/bi";
import { GiWideArrowDunk } from "react-icons/gi";
import { FaMotorcycle } from "react-icons/fa";
import "./css/index.css";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { RingLoader } from "react-spinners";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import {
  countOrder,
  getReportSaleOrderInMonthAPI,
  getReportRevenueAPI,
} from "../../controller/ERHome";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Cell,
  Pie,
} from "recharts";
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
function ERHome({ route, navigate }) {
  const classes = useStyles();
  let userId = localStorage.getItem("userId");
  let [loading, setLoading] = useState(false);
  const [resCount, setResCount] = useState({});
  const [reportSaleOrderList, setReportSaleOrderList] = useState([]);
  const [reportRevenue, setReportRevenue] = useState([]);
  //console.log(reportRevenue);
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [reportColumn, setReportColumn] = useState([]);
  const handleDateChange = (date) => {
    reportRevenues(date);
    setSelectedDate(date);
  };
  const setTime = () => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  };
  const getOrderQuantity = async () => {
    const result = await countOrder(userId);
    if (result.status === 200) {
      setResCount(result.data.data.resCount);
    }
  };
  const report = async () => {
    const result = await getReportSaleOrderInMonthAPI();
    if (result.status === 200) {
      setReportSaleOrderList(result.data);
      // console.log(result.data);
    }
  };

  const COLORS = ["#0088FE", "#00C49F"];
  //console.log(reportRevenue);
  const reportRevenues = async (selectedDate) => {
    const month = dayjs(selectedDate).format("MM");
    const year = dayjs(selectedDate).format("YYYY");
    //console.log(month, year);
    const result = await getReportRevenueAPI(month, year);
    if (result.status === 200) {
      setReportRevenue(result.data);
      //console.log(reportRevenue);
    }
  };
  useEffect(() => {
    setTime();
    getOrderQuantity();
    report();
    reportRevenues(selectedDate);
  }, []);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
  ];

  return (
    <div
      style={{
        background: "#E5E4E2",
      }}
    >
      <div className="webContainer">
        <div className="webContainer1 border">Trang chủ</div>
        <div
          className="chartContainer"
          style={{
            maxWidth: "1500px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              border: "1px solid #663333",
              borderRadius: 5,
              marginTop: 12,
            }}
          >
            <div
              className="d-flex justify-content-around"
              style={{
                height: "100px",
                width: "300px",
                backgroundColor: "#663333",
              }}
            >
              <div className="d-flex align-items-center">
                <BsCartCheck size={50} color="#ffffff" />
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  marginLeft: 20,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="textColor" style={{ fontSize: 30 }}>
                  {resCount.confirmWaiting}
                </div>
                <div className="textColor">Chờ xác nhận</div>
              </div>
            </div>
            <Link to={`/orders`} state={{ data: "confirm" }}>
              <div
                className="d-flex align-items-center boxDetailReview"
                style={{
                  height: "40px",
                  marginTop: "1px",
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              >
                <div
                  style={{ marginLeft: "20px" }}
                  className="textDetailReview"
                >
                  Chi tiết
                </div>
              </div>
            </Link>
          </div>
          <div
            style={{
              border: "1px solid #888888",
              borderRadius: 5,
              marginTop: 12,
            }}
          >
            <div
              className="d-flex justify-content-around"
              style={{
                height: "100px",
                width: "300px",
                backgroundColor: "#888888",
              }}
            >
              <div className="d-flex align-items-center">
                <GiWideArrowDunk size={50} color="#ffffff" />
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  marginLeft: 20,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="textColor" style={{ fontSize: 30 }}>
                  {resCount.outputWaiting}
                </div>
                <div className="textColor">Chờ xử lý</div>
              </div>
            </div>
            <Link to={`/orders`} state={{ data: "waitGetProduct" }}>
              <div
                className="d-flex align-items-center boxDetailWait"
                style={{
                  height: "40px",
                  marginTop: "1px",
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              >
                <div style={{ marginLeft: "20px" }} className="textDetailWait">
                  Chi tiết
                </div>
              </div>
            </Link>
          </div>
          <div
            style={{
              border: "1px solid #337ab7",
              borderRadius: 5,
              marginTop: 12,
            }}
          >
            <div
              className="d-flex justify-content-around"
              style={{
                height: "100px",
                width: "300px",
                backgroundColor: "#337ab7",
              }}
            >
              <div className="d-flex align-items-center">
                <FaMotorcycle size={50} color="#ffffff" />
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  marginLeft: 20,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="textColor" style={{ fontSize: 30 }}>
                  {resCount.deliverying}
                </div>
                <div className="textColor">Đang giao</div>
              </div>
            </div>
            <Link to={`/orders`} state={{ data: "delivery" }}>
              <div
                className=" d-flex align-items-center boxDetailDelivery"
                style={{
                  height: "40px",
                  marginTop: "1px",
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              >
                <div
                  style={{ marginLeft: "20px" }}
                  className="textDetailDelivery"
                >
                  Chi tiết
                </div>
              </div>
            </Link>
          </div>
          <div
            style={{
              border: "1px solid #00CC00",
              borderRadius: 5,
              marginTop: 12,
            }}
          >
            <div
              className="d-flex justify-content-around"
              style={{
                height: "100px",
                width: "300px",
                backgroundColor: "#00CC00",
              }}
            >
              <div className="d-flex align-items-center">
                <BiMoney size={50} color="#ffffff" />
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  marginLeft: 20,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="textColor" style={{ fontSize: 30 }}>
                  {resCount.sucess}
                </div>
                <div className="textColor">Chờ thu tiền</div>
              </div>
            </div>
            <Link to={`/orders`} state={{ data: "waitGetMoney" }}>
              <div
                className="d-flex align-items-center boxDetailComplete"
                style={{
                  height: "40px",
                  marginTop: "1px",
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              >
                <div
                  style={{ marginLeft: "20px" }}
                  className="textDetailComplete"
                >
                  Chi tiết
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div
          className="d-flex justify-content-between"
          style={{ width: "100%" }}
        >
          <div
            className="mt-4"
            style={{
              width: "100%",
              marginRight: 10,
            }}
          >
            <div className="chartStyleTitle">
              Biểu đồ số lượng đơn hàng trong tháng
            </div>
            <div
              style={{
                width: "100%",
                height: 400,
                backgroundColor: "#ffffff",
              }}
            >
              <ResponsiveContainer>
                <BarChart
                  width="100%"
                  height={400}
                  data={reportSaleOrderList}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Số lượng" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div
            className="mt-4"
            style={{ width: "100%", marginLeft: 10, marginRight: 4 }}
          >
            <div>
              <div className="chartStyleTitle">
                Biểu đồ doanh thu trong tháng
              </div>
              <div
                style={{
                  width: "100%",
                  height: 400,
                  backgroundColor: "#ffffff",
                }}
              >
                <ResponsiveContainer>
                  <LineChart
                    width="100%"
                    height={400}
                    data={reportSaleOrderList}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) =>
                        new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(value)
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      name="Doanh thu"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div
          className="d-flex justify-content-start mt-4 flex-column"
          style={{
            width: "49%",
            justifyContent: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              marginTop: 16,
              marginLeft: 16,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Chọn Tháng/Năm"
                inputFormat="MM/YYYY"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                views={["year", "month"]}
                openTo="year"
                minDate={new Date("2000-01-01")} // (Tuỳ chọn) Đặt ngày tối thiểu có thể chọn
                maxDate={new Date("2100-12-31")} // (Tuỳ chọn) Đặt ngày tối đa có thể chọn
              />
            </LocalizationProvider>
          </div>
          <div className="mt-4">
            <div
              style={{
                width: "100%",
                height: 400,
                backgroundColor: "#ffffff",
              }}
            >
              <ResponsiveContainer>
                <BarChart
                  width={500}
                  height={300}
                  data={reportRevenue}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) =>
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(value)
                    }
                  />
                  <Legend />
                  <Bar dataKey="revenueGoods" name="Hàng hoá" fill="#82ca9d" />
                  <Bar
                    dataKey="revenueShipping"
                    name="Giao hàng"
                    fill="#8884d8"
                  />
                </BarChart>
              </ResponsiveContainer>
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
    </div>
  );
}
export default ERHome;
