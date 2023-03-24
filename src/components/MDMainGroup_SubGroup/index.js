import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MDMainGroup from "./MDMainGroup";
import MDSubGroup from "./MDSubGroup";

import { RingLoader, CircleLoader } from "react-spinners";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

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
    <div style={{ marginLeft: 10, marginRight: 10 }}>
      <div
        className="d-flex border mt-3 containerBtn align-items-center"
        style={{ marginBottom: "10px" }}
      >
        <div style={{ marginLeft: 20, fontWeight: "bold" }}>
          KHAI BÁO NGÀNH HÀNG, NHÓM HÀNG
        </div>
      </div>
      <Tabs
        defaultActiveKey="mainGroup"
        transition={true}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="mainGroup" title="Ngành hàng">
          <MDMainGroup />
        </Tab>
        <Tab eventKey="subnGroup" title="Nhóm hàng">
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
  );
}

export default MDMainGroupSubGroup;
