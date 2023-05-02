import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ERPPriceDetailOfModel from "./ERPPriceDetailOfModel";

import ERPPriceDetailOfVarrant from "./ERPPriceDetailOfVarrant";

import { RingLoader, CircleLoader } from "react-spinners";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function ERProductPriceDetail() {
  const { modelId } = useParams();
  const location = useLocation();

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
        <div className="webContainer1 border">Khai báo giá sản phẩm</div>
        <Tabs
          defaultActiveKey="ERPPriceDetailOfModel"
          transition={true}
          id="noanim-tab-example"
          className="nav-tabs"
          style={{ marginTop: "10px" }}
        >
          <Tab
            eventKey="ERPPriceDetailOfModel"
            title="Giá Model"
            className="nav-link"
            style={{ background: "#ffffff", height: "700px" }}
          >
            <ERPPriceDetailOfModel modelId={modelId} />
          </Tab>
          <Tab
            eventKey="ERPPriceDetailOfVarrant"
            title="Giá theo biến thể"
            className="nav-link"
            style={{ background: "#ffffff", height: "700px" }}
          >
            <ERPPriceDetailOfVarrant modelId={modelId} />
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

export default ERProductPriceDetail;
