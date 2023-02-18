import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PromotionProgram from "./promotionProgram/promotionProgram";
import ApplyProducts from "./applyProduct/applyProduct";
import PromotionList from "./promotionList/promotionList";
import { RingLoader, CircleLoader } from "react-spinners";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function ApplyPromotion() {
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
    <div>
      <Tabs
        defaultActiveKey="promotionProgram"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="promotionProgram" title="Chương trình khuyến mãi">
          <PromotionProgram />
        </Tab>
        <Tab eventKey="promotionList" title="Danh sách khuyến mãi">
          <PromotionList />
        </Tab>
        <Tab eventKey="applyProduct" title="Danh sách sản phẩm">
          <ApplyProducts />
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

export default ApplyPromotion;
