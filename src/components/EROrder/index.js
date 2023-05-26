import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ERConfirm from "./ERConfirm";
import ERDelivery from "./ERDelivery";
import ERCancel from "./ERCancel";
import ERWaitGetProduct from "./ERWaitGetProduct";
import ERWaitGetMoney from "./ERWaitGetMoney";
import ERDone from "./ERDone";
import { RingLoader, CircleLoader } from "react-spinners";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
// import "./css/index.css";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function EROrder({ location }) {
  let [loading, setLoading] = useState(false);
  const data = useLocation();
  let defaultTab = data.state || { data: "confirm" };
  //console.log(defaultTab);
  const classes = useStyles();
  const loadingPage = async () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };
  useEffect(() => {
    loadingPage();
  }, []);
  return (
    <div style={{ background: "#E5E4E2" }}>
      <div
        style={{
          marginLeft: "24px",
          marginRight: "24px",
          paddingTop: "20px",
        }}
      >
        <div className="webContainer1 border">Quản lý đơn hàng</div>
        <Tabs
          defaultActiveKey={defaultTab.data}
          transition={true}
          id="noanim-tab-example"
          className="nav-tabs"
          style={{ marginTop: "10px" }}
        >
          <Tab
            eventKey="confirm"
            title="Chờ xác nhận"
            className="nav-link"
            style={{ background: "#ffffff", minHeight: "650px" }}
          >
            <ERConfirm />
          </Tab>
          <Tab
            eventKey="waitGetProduct"
            title="Chờ xử lý"
            className="nav-link"
            style={{ background: "#ffffff", minHeight: "650px" }}
          >
            <ERWaitGetProduct />
          </Tab>
          <Tab
            eventKey="delivery"
            title="Đang giao"
            className="nav-link"
            style={{ background: "#ffffff", minHeight: "650px" }}
          >
            <ERDelivery />
          </Tab>
          <Tab
            eventKey="waitGetMoney"
            title="Chờ thu tiền"
            className="nav-link"
            style={{ background: "#ffffff", minHeight: "650px" }}
          >
            <ERWaitGetMoney />
          </Tab>
          <Tab
            eventKey="done"
            title="Hoàn tất"
            className="nav-link"
            style={{ background: "#ffffff", minHeight: "650px" }}
          >
            <ERDone />
          </Tab>
          <Tab
            eventKey="cancel"
            title="Đã huỷ"
            className="nav-link"
            style={{ background: "#ffffff", minHeight: "650px" }}
          >
            <ERCancel />
          </Tab>
        </Tabs>
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

export default EROrder;
