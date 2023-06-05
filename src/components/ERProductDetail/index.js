import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@mui/material/Backdrop";
import "./css/index.css";
import Quagga from "quagga";
import { getModelDetail } from "../../controller/ERProduct";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function ERProductDetail({ route, navigate, location }) {
  const classes = useStyles();
  const { modelId } = useParams();
  const videoRef = useRef(null);
  const [showScanner, setShowScanner] = useState(false);
  const [modelInfo, setModelInfo] = useState({});
  const [modelDescriptionAttribute, setModelDescriptionAttribute] = useState(
    []
  );

  const [selected, setSelected] = useState({});

  const [varant, setVarrant] = useState([]);

  const [maxLevelVarantProduct, setMaxLevelVarantProduct] = useState(0);
  //console.log(maxLevelVarantProduct);

  const [isShowTexInputPriceOfVarrant, setIsShowTexInputPriceOfVarrant] =
    useState(false);

  const handleSelect = (indexOption, group, valueId) => {
    setSelected((prevSelected) => ({ ...prevSelected, [group]: valueId }));
    const updateSelection = {
      level: indexOption + 1,
      modelVarantAttributeId: group,
      modelVarantAttributeValueId: valueId,
    };
    setIsShowTexInputPriceOfVarrant(false);
    setProductId("");
    setVarrant((prevSelections) => {
      const index = prevSelections.findIndex(
        (selection) => selection.modelVarantAttributeId === group
      );
      if (index >= 0) {
        // The attribute is already selected, update the value
        return prevSelections.map((selection, i) =>
          i === index ? { ...selection, ...updateSelection } : selection
        );
      } else {
        // The attribute is not yet selected, add a new selection
        return [...prevSelections, updateSelection];
      }
    });
  };
  const [modelVarantProduct, setModelVarantProduct] = useState([]);
  const [imageAvatar, setImageAvatar] = useState("");

  let [loading, setLoading] = useState(false);

  const [productId, setProductId] = useState("");

  let userId = localStorage.getItem("userId");

  const setTime = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  const getModelInfoDetail = async (modelId) => {
    setLoading(false);
    const result = await getModelDetail(modelId);
    if (result.status === 200) {
      //console.log(result.data.data.modelInformation);
      setModelInfo(result.data.data.modelInformation);
      setMaxLevelVarantProduct(
        result.data.data.modelInformation.maxLevelVarantProduct
      );
      setImageAvatar(result.data.data.modelInformation.modelImagePath);
      setModelDescriptionAttribute(
        result.data.data.modelInformation.modelDescriptionAttribute
      );
      setModelVarantProduct(
        result.data.data.modelInformation.modelVarantProduct
      );
      setLoading(true);
    }
  };

  useEffect(() => {
    setTime();
    getModelInfoDetail(modelId);
  }, []);

  return (
    <div
      style={{
        background: "#E5E4E2",
      }}
    >
      <div
        style={{ marginLeft: "20px", marginRight: "20px", paddingTop: "20px" }}
      >
        <div className="webContainer1 border">Chi tiết sản phẩm</div>
        <div
          className="d-flex mt-3 align-items-center justify-content-end"
          style={{ background: "#ffffff", height: "20px" }}
        >
          <div className="d-flex containerBtn align-items-center justify-content-end"></div>
        </div>

        <div style={{ background: "#ffffff" }}>
          <div style={{ marginLeft: "180px", marginRight: "180px" }}>
            <div
              className="border-bottom"
              style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}
            >
              {modelInfo.modelName}
            </div>
            <div className="d-flex">
              <div className="col-6">
                <div className="d-flex flex-column align-items-center">
                  <img
                    className="img-fluid"
                    src={imageAvatar}
                    alt="file"
                    width={500}
                    height={500}
                    style={{ padding: 10 }}
                  />

                  <div className="d-flex flex-wrap">
                    {modelInfo.modelImagePathList &&
                      modelInfo.modelImagePathList.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            //console.log(item);
                            setImageAvatar(item);
                          }}
                          className="border d-flex justify-content-center align-items-center avatarHover img-fluid"
                          style={{
                            height: 90,
                            width: 90,
                            marginLeft: 4,
                            marginRight: 4,
                            marginTop: 20,
                          }}
                        >
                          <img
                            src={item}
                            className="img-fluid"
                            alt="file"
                            width={85}
                            height={85}
                            style={{ padding: 5 }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <div
                    style={{ padding: 20, fontSize: 18, fontWeight: "bold" }}
                  >
                    Mô tả sản phẩm
                  </div>
                  <div
                    style={{
                      paddingLeft: 16,
                      paddingRight: 4,
                      textAlign: "justify",
                    }}
                  >
                    <p>{modelInfo.modelDescription}</p>
                  </div>
                </div>
              </div>
              <div className="col-6" style={{ padding: 10 }}>
                {modelVarantProduct && (
                  <div>
                    {modelVarantProduct.map((item, index) => (
                      <div key={index}>
                        <div style={{ marginTop: 20 }}>
                          {item.modelVarantAttributeName}
                        </div>
                        <div className="d-flex flex-wrap">
                          {item.modelVarantProductValueList.map(
                            (itemValue, indexValue) => (
                              <div key={indexValue} className="d-flex ">
                                <div
                                  className={`d-flex flex-column border justify-content-center align-items-center avatarHover ${
                                    selected[item.modelVarantAttributeId] ===
                                    itemValue.modelVarantAttributeValueId
                                      ? "border-primary border-2"
                                      : "border-secondary"
                                  }`}
                                  //className="d-flex flex-column border justify-content-center align-items-center avatarHover"
                                  style={{
                                    marginLeft: 4,
                                    marginRight: 4,
                                    marginTop: 10,
                                    width: 100,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                  }}
                                  onClick={() => {
                                    if (itemValue.varantProductImagePath) {
                                      setImageAvatar(
                                        itemValue.varantProductImagePath
                                      );
                                      // console.log(
                                      //   itemValue.varantProductImagePath
                                      // );
                                    }
                                    handleSelect(
                                      index,
                                      item.modelVarantAttributeId,
                                      itemValue.modelVarantAttributeValueId
                                    );
                                  }}
                                >
                                  {itemValue.varantProductImagePath && (
                                    <img
                                      className="img-fluid"
                                      src={
                                        itemValue.varantProductImagePath
                                          ? itemValue.varantProductImagePath
                                          : null
                                      }
                                      alt="file"
                                      width={80}
                                      height={80}
                                      style={{ padding: 10 }}
                                    />
                                  )}
                                  {itemValue.modelVarantAttributeValueName}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <div
                    style={{
                      paddingTop: 20,
                      paddingRight: 20,
                      paddingBottom: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Thông tin sản phẩm
                  </div>
                  <div className="d-flex" style={{ paddingBottom: 10 }}>
                    <div className="col-8">Thương hiệu</div>
                    <div className="col-5">{modelInfo.brandName}</div>
                  </div>
                  <div className="d-flex" style={{ paddingBottom: 10 }}>
                    <div className="col-8">Ngành hàng</div>
                    <div className="col-5">{modelInfo.maingroupName}</div>
                  </div>
                  <div className="d-flex" style={{ paddingBottom: 10 }}>
                    <div className="col-8">Nhóm hàng</div>
                    <div className="col-5">{modelInfo.subgroupName}</div>
                  </div>
                  <div className="d-flex" style={{ paddingBottom: 10 }}>
                    <div className="col-8">Đơn vị</div>
                    <div className="col-5">{modelInfo.quantityUnitName}</div>
                  </div>

                  {modelDescriptionAttribute &&
                    modelDescriptionAttribute.map((itemDes, index) => (
                      <div
                        key={index}
                        className="d-flex"
                        style={{ paddingBottom: 10 }}
                      >
                        <div className="col-8">
                          {itemDes.modelAttributeName}
                        </div>
                        <div className="col-5">
                          {itemDes.modelMDLAttributeValue}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="d-flex"></div>
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
export default ERProductDetail;
