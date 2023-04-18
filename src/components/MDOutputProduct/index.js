import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MDOutputType from "./MDOutputType";
import MDSaleOrderType from "./MDSaleOrderType";
import MDVoucherType from "./MDVoucherType";
import MDPaymentOrderType from "./MDPaymentOrderType";
import { RingLoader, CircleLoader } from "react-spinners";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import "./css/index.css";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function MDOutputProduct() {
  let [loading, setLoading] = useState(false);
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
          marginLeft: "20px",
          marginRight: "20px",
          paddingTop: "20px",
        }}
      >
        <div className="webContainer1 border">Khai báo xuất hàng</div>
        <Tabs
          defaultActiveKey="storeType"
          transition={true}
          id="noanim-tab-example"
          className="nav-tabs"
          style={{ marginTop: "10px" }}
        >
          <Tab
            eventKey="storeType"
            title="Loại yêu cầu xuất"
            className="nav-link"
            style={{ background: "#ffffff", height: "700px" }}
          >
            <MDSaleOrderType />
          </Tab>
          <Tab
            eventKey="storeList"
            title="Hình thức xuất"
            className="nav-link"
            style={{ background: "#ffffff", height: "700px" }}
          >
            <MDOutputType />
          </Tab>
          <Tab
            eventKey="voucherType"
            title="Hình thức thu/chi"
            className="nav-link"
            style={{ background: "#ffffff", height: "700px" }}
          >
            <MDVoucherType />
          </Tab>
          <Tab
            eventKey="paymentOrderType"
            title="Hình thức thanh toán"
            className="nav-link"
            style={{ background: "#ffffff", height: "700px" }}
          >
            <MDPaymentOrderType />
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

export default MDOutputProduct;
