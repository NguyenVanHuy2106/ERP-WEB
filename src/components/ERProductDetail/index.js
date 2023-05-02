import React, { useState, useEffect, useStyle, useMemo } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { RingLoader, CircleLoader } from "react-spinners";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { FiEdit, FiTrash } from "react-icons/fi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import Switch from "react-switch";
import "./css/index.css";
import numeral from "numeral";
import Snackbar from "@mui/material/Snackbar";

import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { storage } from "../../server/FirebaseConfig";
import {
  getAllBrand,
  addNewBrand,
  updateBrand,
  deleteBrand,
} from "../../controller/MDBrandController";
import {
  getModelDetail,
  addNewPriceOfModel,
  getProductIdByVarrant,
  getPriceByModelAPI,
} from "../../controller/ERProduct";
import PaginationShop from "../shops/paginationShopList";
import CircularProgress from "@mui/material/CircularProgress";
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
function ERProductDetail({ route, navigate, location }) {
  const classes = useStyles();
  const { modelId } = useParams();

  const [tFBrandValue, setTFBrandValue] = useState("");
  const [modelInfo, setModelInfo] = useState({});
  const [modelDescriptionAttribute, setModelDescriptionAttribute] = useState(
    []
  );
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selected, setSelected] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [varant, setVarrant] = useState([]);
  //console.log(varant);
  const [priceOfModel, setPriceOfModel] = useState(0);
  //console.log(priceOfModel);
  const [priceOfVarrant, setPriceOfVarrant] = useState(0);
  const [maxLevelVarantProduct, setMaxLevelVarantProduct] = useState(0);
  //console.log(maxLevelVarantProduct);
  const handleChangePriceOfModel = (event) => {
    //const formattedValue = numeral(event.target.value).format("0.0");
    setPriceOfModel(event.target.value);
    setErrPrice("");
  };
  const handleChangePriceOfVarrant = (event) => {
    //const formattedValue = numeral(event.target.value).format("0.0");
    setPriceOfVarrant(event.target.value);
    setErrPriceVarrant("");
  };
  const [state, setState] = useState(false);
  const [statePriceOfProductId, setStatePriceOfProductId] = useState(false);
  const [isShowTexInputPriceOfVarrant, setIsShowTexInputPriceOfVarrant] =
    useState(false);
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleObjectClick = (indexValue) => {
    setSelectedIndex(indexValue);
  };
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
  //console.log(modelVarantProduct);
  const [tFDesValue, setTFDesValue] = useState("");
  const [tFBrandEditValue, setTFBrandEditValue] = useState("");
  const [tFDesEditValue, setTFDesEditValue] = useState("");
  const [brandIdEditValue, setBrandIdEditValue] = useState("");
  const [isActived, setIsActived] = useState(false);
  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();
  const [brandData, setBrandData] = useState([]);
  //const [valueCatData, setValueCatData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [productId, setProductId] = useState("");
  const handleOpenModalEdit = () => setOpenModalEdit(true);
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsError(false);
    setError("");
    setUrl("");
  };
  const [checked, setChecked] = React.useState(true);
  const [editChecked, setEditChecked] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isError, setIsError] = useState(false);
  const [errPrice, setErrPrice] = useState("");
  const [errPriceVarrant, setErrPriceVarrant] = useState("");
  let userId = localStorage.getItem("userId");
  const [selectedItems, setSelectedItems] = useState([]);
  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    }
  };
  const handleEditcheck = (event) => {
    setIsActived(event.target.checked);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleAgrre = async () => {
    if (tFBrandValue.length === 0) {
      setError("Vui long nhap ten danh muc");
      setIsError(true);
    } else {
      handleCloseModal();
      setLoading(false);
      const result = await addNewBrand(
        userId,
        tFBrandValue,
        tFDesValue,
        1,
        url
      );
      if (result.status === 200) {
        setLoading(true);

        setError("");
        setTFBrandValue("");
      }
    }
  };

  var firstDateInMonth =
    1 + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const [valueFromDate, setValueFromDate] = React.useState(
    dayjs(firstDateInMonth)
  );
  const [valueToDate, setValueToDate] = React.useState(toDateDayjs);

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

  const getProductId = async (modelId, varant) => {
    setStatePriceOfProductId(true);
    const result = await getProductIdByVarrant(modelId, varant);
    if (result.status === 200) {
      setProductId(result.data.data.productId);
      setStatePriceOfProductId(false);
    } else {
      setStatePriceOfProductId(false);
    }
  };

  useEffect(() => {
    setTime();
    getModelInfoDetail(modelId);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = brandData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [url, setUrl] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const uploadTask = storage
        .ref(`images/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      uploadTask.on("state_changed", null, null, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          setUrl(downloadUrl);
        });
      });
    }
  };

  const handleEditClick = (item) => {
    setTFBrandEditValue(item.brandName);
    setTFDesEditValue(item.brandDescription);
    setBrandIdEditValue(item.brandId);

    if (item.isActived === 1) setIsActived(true);
    else {
      setIsActived(false);
    }

    handleOpenModalEdit();
  };

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
          <div className="d-flex justify-content-center">
            <PaginationShop
              postsPerPage={postsPerPage}
              totalPosts={brandData.length}
              paginate={paginate}
            />
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
