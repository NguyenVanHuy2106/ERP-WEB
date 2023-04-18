import React, { useState, useEffect, useStyle, useMemo } from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FaMotorcycle, FaCheck, FaBan } from "react-icons/fa";
import "./css/index.css";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { RingLoader, CircleLoader } from "react-spinners";
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
  let [loading, setLoading] = useState(false);
  const setTime = () => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  };
  useEffect(() => {
    setTime();
  }, []);

  return (
    <div
      style={{
        background: "#E5E4E2",
      }}
    >
      <div className="webContainer">
        <div className="webContainer1 border">Trang chủ</div>
        <div className="chartContainer">
          <div style={{ border: "1px solid #888888", borderRadius: 5 }}>
            <div
              className="d-flex justify-content-around"
              style={{
                height: "100px",
                width: "300px",
                backgroundColor: "#888888",
              }}
            >
              <div className="d-flex align-items-center">
                <AiTwotoneCalendar size={50} color="#ffffff" />
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
                  15
                </div>
                <div className="textColor">Chờ xử lý</div>
              </div>
            </div>
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
          </div>
          <div style={{ border: "1px solid #337ab7", borderRadius: 5 }}>
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
                  15
                </div>
                <div className="textColor">Đang giao</div>
              </div>
            </div>
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
          </div>
          <div style={{ border: "1px solid #00CC00", borderRadius: 5 }}>
            <div
              className="d-flex justify-content-around"
              style={{
                height: "100px",
                width: "300px",
                backgroundColor: "#00CC00",
              }}
            >
              <div className="d-flex align-items-center">
                <FaCheck size={50} color="#ffffff" />
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
                  15
                </div>
                <div className="textColor">Hoàn tất</div>
              </div>
            </div>
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
          </div>
          <div style={{ border: "1px solid #FF0044", borderRadius: 5 }}>
            <div
              className="d-flex justify-content-around"
              style={{
                height: "100px",
                width: "300px",
                backgroundColor: "#FF0044",
              }}
            >
              <div className="d-flex align-items-center">
                <FaBan size={50} color="#ffffff" />
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
                  15
                </div>
                <div className="textColor">Huỷ giao</div>
              </div>
            </div>
            <div
              className="d-flex align-items-center boxDetailCancel"
              style={{
                height: "40px",
                marginTop: 1,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}
            >
              <div style={{ marginLeft: "20px" }} className="textDetailCancel">
                Chi tiết
              </div>
            </div>
          </div>
        </div>
        <div className="chartContainer">
          <div>
            <div className="chartStyleTitle">
              Biểu đồ số lượng đơn hàng trong tuần
            </div>
            <div className="chartStyleBody">
              Biểu đồ số lượng đơn hàng trong tuần
            </div>
          </div>
          <div>
            <div className="chartStyleTitle">
              Biểu đồ số lượng đơn hàng trong tháng
            </div>
            <div className="chartStyleBody">
              Biểu đồ số lượng đơn hàng trong tuần
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
