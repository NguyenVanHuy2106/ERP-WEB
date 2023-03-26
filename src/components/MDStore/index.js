import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StoreList from "./MDStoreList";
import StoreType from "./MDStoreType";
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

function Store() {
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
    <div style={{ background: "#F5F5F5" }}>
      <div
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          paddingTop: "20px",
        }}
      >
        <div className="webContainer1 border">Khai báo kho</div>
        <Tabs
          defaultActiveKey="storeType"
          transition={true}
          id="noanim-tab-example"
          className=" nav-tabs"
          style={{ marginTop: "10px" }}
        >
          <Tab
            eventKey="storeType"
            title="Loại kho"
            className="nav-link"
            style={{ background: "#ffffff", height: "700px" }}
          >
            <StoreType />
          </Tab>
          <Tab
            eventKey="storeList"
            title="Danh sách kho"
            className="nav-link"
            style={{ background: "#ffffff", height: "700px" }}
          >
            <StoreList />
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

export default Store;
