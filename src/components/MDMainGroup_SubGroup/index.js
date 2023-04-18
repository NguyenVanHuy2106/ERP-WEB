import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MDMainGroup from "./MDMainGroup";
import MDSubGroup from "./MDSubGroup";

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

function MDMainGroupSubGroup() {
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
        <div className="webContainer1 border">
          Khai báo ngành hàng, nhóm hàng
        </div>
        <Tabs
          defaultActiveKey="mainGroup"
          transition={true}
          id="noanim-tab-example"
          className="nav-tabs"
          style={{ marginTop: "10px" }}
        >
          <Tab
            eventKey="mainGroup"
            title="Ngành hàng"
            className="nav-link"
            style={{ background: "#ffffff", height: "700px" }}
          >
            <MDMainGroup />
          </Tab>
          <Tab
            eventKey="subnGroup"
            title="Nhóm hàng"
            className="nav-link"
            style={{ background: "#ffffff", height: "700px" }}
          >
            <MDSubGroup />
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

export default MDMainGroupSubGroup;
