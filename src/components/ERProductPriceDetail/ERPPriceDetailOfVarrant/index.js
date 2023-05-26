import React, { useState, useEffect, useStyle, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
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

import numeral from "numeral";
import Snackbar from "@mui/material/Snackbar";
import moment from "moment";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { storage } from "../../../server/FirebaseConfig";
import {
  getAllBrand,
  addNewBrand,
  updateBrand,
  deleteBrand,
} from "../../../controller/MDBrandController";
import {
  getModelDetail,
  addNewPriceOfModel,
  getProductIdByVarrant,
  getPriceByModelAPI,
} from "../../../controller/ERProduct";
import {
  getVarrantPriceDetail,
  addNewPriceOfVarrant,
  updatePriceOfVarrant,
} from "../../../controller/ERProductPrice";
import PaginationShop from "../../shops/paginationShopList";
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
function ERPPriceDetailOfVarrant({ route, navigate, modelId }) {
  const classes = useStyles();
  //const { modelId } = useParams();
  const location = useLocation();
  //console.log(location.state.price);
  //const price = location.state.price;

  const [tFBrandValue, setTFBrandValue] = useState("");
  const [modelInfo, setModelInfo] = useState({});
  const [modelDescriptionAttribute, setModelDescriptionAttribute] = useState(
    []
  );
  const [varrantPriceDetail, setVarrantPriceDetail] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selected, setSelected] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [varant, setVarrant] = useState([]);
  //console.log(varant);
  const [priceOfModel, setPriceOfModel] = useState(location.state.price);
  //console.log(priceOfModel);
  const [priceOfVarrant, setPriceOfVarrant] = useState(0);
  const [priceOfVarrantEdit, setPriceOfVarrantEdit] = useState(0);

  const [errAddNewPrice, setErrAddNewPrice] = useState("");
  const [errUpdatePrice, setErrUpdatePrice] = useState("");
  const [isCanEditFromDate, setIsCanEditFromDate] = useState(false);
  const [isCanEditToDate, setIsCanEditToDate] = useState(false);
  const [isCanEditPrice, setIsCanEditPrice] = useState(false);
  const [priceOfProductlId, setPriceOfProductlId] = useState(0);
  const [modelIdEdit, setModelIdEdit] = useState(0);
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

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleObjectClick = (indexValue) => {
    setSelectedIndex(indexValue);
  };
  const handleSelect = (indexOption, group, valueId) => {
    setProductId("");
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
      // if (index >= 0) {
      //   // The attribute is already selected, update the value
      //   return prevSelections.map((selection, i) =>
      //     i === index ? { ...selection, ...updateSelection } : selection
      //   );
      // } else {
      //   // The attribute is not yet selected, add a new selection
      //   return [...prevSelections, updateSelection];
      // }
      if (index >= 0) {
        // The attribute is already selected, update the value
        const newSelections = prevSelections.map((selection, i) =>
          i === index ? { ...selection, ...updateSelection } : selection
        );
        console.log("New selections:", newSelections);
        if (newSelections.length === maxLevelVarantProduct) {
          getProductId(modelId, newSelections);
          setPriceOfProductId(0);
        }

        return newSelections;
      } else {
        // The attribute is not yet selected, add a new selection
        const newSelections = [...prevSelections, updateSelection];
        //console.log("New selections:", newSelections);
        if (newSelections.length === maxLevelVarantProduct) {
          getProductId(modelId, newSelections);
          setPriceOfProductId(0);
        }
        console.log("New selections abc:", newSelections);
        return newSelections;
      }
    });
  };
  const [modelVarantProduct, setModelVarantProduct] = useState([]);
  const [imageAvatar, setImageAvatar] = useState("");
  //console.log(modelVarantProduct);
  const [errEditPrice, setErrEditPrice] = useState("");
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
  const [priceOfProductId, setPriceOfProductId] = useState(0);
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
    setLoading(false);
    const fromDate = dayjs(valueFromDateEdit).format("YYYY-MM-DD");
    const toDate = dayjs(valueToDateEdit).format("YYYY-MM-DD");
    const result = await updatePriceOfVarrant(
      priceOfProductlId,
      modelIdEdit,
      productId,
      priceOfVarrantEdit,
      fromDate,
      toDate
    );
    if (result.status === 200) {
      setOpenModal(false);
      setLoading(true);
      handleGetVarrantPriceDetail(modelIdEdit, productId);
    }
    //   priceOfProductId,
    // modelId,
    // productId,
    // price,
    // fromDate,
    // toDate
    // console.log(
    //   priceOfVarrantEdit,
    //   modelIdEdit,
    //   priceOfProductlId,
    //   productId,
    //   fromDate,
    //   toDate
    // );
  };
  var firstDateInMonth =
    1 + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  const lastDateInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  );

  const [valueFromDate, setValueFromDate] = React.useState(toDateDayjs);
  const [valueToDate, setValueToDate] = React.useState(lastDateInMonth);

  const [valueFromDateEdit, setValueFromDateEdit] = React.useState(toDateDayjs);
  const [valueToDateEdit, setValueToDateEdit] = React.useState(lastDateInMonth);

  const setTime = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };
  const HandleClick = async () => {
    setLoading(false);
    const fromDate = valueFromDate.format("YYYY-MM-DD");
    const toDate = valueToDate.format("YYYY-MM-DD");
    //console.log(tFValue, fromDate, toDate);
    const result = await getAllBrand();
    if (result.status === 200) {
      setBrandData(result.data.data.brands);
      setLoading(true);
    }
  };
  const CheckActive = (isActive) => {
    if (isActive === 1) {
      return <AiOutlineCheck />;
    }
  };
  const handleDeleteBrand = async () => {
    //console.log(item.MODELID);
    setLoading(false);
    const result = await deleteBrand(userId, selectedItems);
    if (result.status === 200) {
      setLoading(true);
      HandleClick();
    }
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
      console.log(result.data.data);
      setProductId(result.data.data.productId);
      setPriceOfProductId(result.data.data.priceOfProduct);
      setStatePriceOfProductId(false);
      handleGetVarrantPriceDetail(modelId, result.data.data.productId);
    } else {
      setStatePriceOfProductId(false);
    }
  };
  const handleGetProductId = () => {
    if (varant.length === maxLevelVarantProduct) {
      setIsShowTexInputPriceOfVarrant(true);
    }
  };
  //
  const handleGetVarrantPriceDetail = async (modelId, productId) => {
    //console.log(modelId, productId);
    const result = await getVarrantPriceDetail(modelId, productId);
    if (result.status === 200) {
      setVarrantPriceDetail(result.data.data.priceOfProducts);
      //console.log(result.data.data.priceOfProducts);
    }
  };
  const handleAddNewPriceOfVarrant = async (
    modelId,
    productId,
    priceOfVarrant
  ) => {
    const fromDate = dayjs(valueFromDate).format("YYYY-MM-DD");
    const toDate = dayjs(valueToDate).format("YYYY-MM-DD");

    //console.log(fromDate, toDate);
    // console.log(
    //   modelId,
    //   productId,
    //   priceOfVarrant,
    //   formatFromDate,
    //   formatToDate
    // );
    const result = await addNewPriceOfVarrant(
      modelId,
      productId,
      priceOfVarrant,
      fromDate,
      toDate
    );
    if (result.status === 200) {
      handleGetVarrantPriceDetail(modelId, productId);
      setStatePriceOfProductId(false);
      setErrAddNewPrice("");
      getProductId(modelId, varant);
      if (result.data.isError === true) {
        setErrAddNewPrice(result.data.message);
      } else {
        setOpenModal(false);
      }
    }
    if (result.status === 200) {
      setStatePriceOfProductId(false);
      console.log(result.data);
    }
  };

  useEffect(() => {
    setTime();
    getModelInfoDetail(modelId);
    //handleGetModelPriceDetail(modelId);
    //getPriceBymodel(modelId);
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
    setOpenModal(true);
    //console.log(item);
    setPriceOfVarrantEdit(item.price);
    setValueFromDateEdit(item.fromDate);
    setValueToDateEdit(item.toDate);
    setIsCanEditFromDate(item.isCanEditFromDate);
    setIsCanEditToDate(item.isCanEditToDate);
    setIsCanEditPrice(item.isCanEditPrice);
    setPriceOfProductlId(item.priceOfProductId);
    setModelIdEdit(item.modelId);
  };

  return (
    <div
      style={{
        background: "#ffffff",
      }}
    >
      <div
        style={{ marginLeft: "20px", marginRight: "20px", paddingTop: "20px" }}
      >
        <div style={{ background: "#ffffff" }}>
          <div style={{ marginLeft: "50px", marginRight: "180px" }}>
            <div
              className="border-bottom"
              style={{
                padding: 10,
                fontSize: 18,
                fontWeight: "bold",
                color: "#000000",
              }}
            >
              {modelId + " - " + modelInfo.modelName}
            </div>
            <div className="d-flex">
              <div className="col-5" style={{ padding: 4 }}>
                {modelVarantProduct && (
                  <div>
                    {modelVarantProduct.map((item, index) => (
                      <div key={index}>
                        <div style={{ marginTop: 20, color: "#000000" }}>
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
                                    color: "#000000",
                                  }}
                                  onClick={() => {
                                    setErrAddNewPrice("");
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
              </div>
              <div className="col-9">
                <div
                  style={{
                    paddingLeft: 20,
                    paddingTop: 20,
                    paddingBottom: 10,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#000000",
                  }}
                >
                  Lịch sử giá theo tổ hợp sản phẩm
                </div>
                <div style={{ paddingLeft: 20 }}>
                  <div>
                    {priceOfProductId ? (
                      <div style={{ color: "#ff0000", fontSize: 30 }}>
                        {priceOfProductId.toLocaleString() + "đ"}
                      </div>
                    ) : null}
                  </div>
                  <div style={{ color: "#000000" }}>
                    Thêm giá sản phẩm theo tổ hợp
                  </div>

                  <div>
                    {productId ? (
                      <div>{"Mã sản phẩm: " + productId}</div>
                    ) : null}
                  </div>

                  <div style={{ paddingBottom: 12 }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        handleGetProductId();
                        //console.log(productId);
                      }}
                    >
                      <AiOutlinePlus size={20} />
                    </button>
                  </div>
                  {errAddNewPrice && (
                    <div style={{ color: "#ff0000", paddingBottom: 12 }}>
                      {errAddNewPrice}
                    </div>
                  )}
                  <div className="d-flex">
                    <div className="d-flex align-items-center">
                      {isShowTexInputPriceOfVarrant && (
                        <div className="d-flex align-items-center">
                          <TextField
                            id="outlined-basic"
                            label="Giá"
                            variant="outlined"
                            type="number"
                            value={priceOfVarrant}
                            aria-label="First name"
                            className="form-control"
                            onChange={(value) => {
                              handleChangePriceOfVarrant(value);
                              setErrAddNewPrice("");
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                setStatePriceOfProductId(true);
                                handleAddNewPriceOfVarrant(
                                  modelId,
                                  productId,
                                  priceOfVarrant
                                );
                              }
                            }}
                            style={{ paddingRight: 4, width: "30%" }}
                          />
                          {/* <input
                            style={{
                              width: 120,
                              marginLeft: 5,
                              marginRight: 5,
                              height: 55,
                            }}
                            type="number"
                            value={priceOfVarrant}
                            aria-label="First name"
                            className="form-control"
                            onChange={(value) =>
                              handleChangePriceOfVarrant(value)
                            }
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                setStatePriceOfProductId(true);
                                handleAddnewPriceOfVarrant();
                              }
                            }}
                          /> */}
                          <div>đ</div>
                          <div className="d-flex">
                            <div style={{ paddingRight: 16, paddingLeft: 16 }}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                  label="Ngày hiệu lực"
                                  value={valueFromDate}
                                  onChange={(newValue) => {
                                    setValueFromDate(newValue);
                                    setErrPrice("");
                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                              </LocalizationProvider>
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                label="Ngày kết thúc"
                                value={valueToDate}
                                onChange={(newValue) => {
                                  setValueToDate(newValue);
                                  setErrPrice("");
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </div>
                        </div>
                      )}

                      {statePriceOfProductId ? (
                        <Stack
                          sx={{ color: "grey.500" }}
                          spacing={2}
                          direction="row"
                        >
                          <CircularProgress color="secondary" />
                        </Stack>
                      ) : null}
                    </div>
                  </div>
                  {errPrice && (
                    <div style={{ color: "#ff0000", fontSize: 13 }}>
                      {errPrice}
                    </div>
                  )}
                  <div style={{ fontSize: 15, fontStyle: "italic" }}>
                    (Nhấn Enter để lưu)
                  </div>
                </div>
                <div style={{ paddingLeft: 20, textAlign: "justify" }}>
                  <table className="table ">
                    <thead>
                      <tr style={{ background: "#848482" }}>
                        <th
                          style={{ color: "#ffffff", fontWeight: "bold" }}
                          scope="col"
                          className="col-1"
                        >
                          STT
                        </th>
                        <th
                          style={{ color: "#ffffff", fontWeight: "bold" }}
                          scope="col"
                          className="col-2"
                        >
                          Kho
                        </th>

                        <th
                          style={{ color: "#ffffff", fontWeight: "bold" }}
                          scope="col-3"
                        >
                          Giá
                        </th>
                        <th
                          style={{ color: "#ffffff", fontWeight: "bold" }}
                          scope="col-2"
                        >
                          Ngày bắt đầu
                        </th>
                        <th
                          style={{ color: "#ffffff", fontWeight: "bold" }}
                          scope="col-1"
                        >
                          Ngày kết thúc
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {varrantPriceDetail.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.storeId}</td>

                          <td
                            className="editPrice"
                            onClick={() => {
                              if (item.isCanEdit === false) {
                                setErrEditPrice("Giá không được chỉnh sửa");
                              } else {
                                setErrEditPrice("");
                                handleEditClick(item);
                              }
                            }}
                          >
                            {item.price.toLocaleString()}
                          </td>
                          <td>
                            {item.fromDate
                              ? new Date(item.fromDate).toLocaleDateString()
                              : ""}
                          </td>
                          <td>
                            {item.toDate
                              ? new Date(item.toDate).toLocaleDateString()
                              : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
      <div>
        <Modal
          open={openModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              className="border-bottom fw-bold"
              style={{ paddingBottom: "16px" }}
            >
              Chỉnh sửa giá
            </div>
            {errUpdatePrice && (
              <div style={{ paddingTop: 10, color: "#ff0000" }}>
                {errUpdatePrice}
              </div>
            )}
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: 24 }}
            >
              <TextField
                required
                disabled={isCanEditPrice ? false : true}
                id="outlined-basic"
                label="Giá"
                variant="outlined"
                type="number"
                style={{ width: "90%" }}
                value={priceOfVarrantEdit}
                onChange={(newValue) => {
                  setPriceOfVarrantEdit(newValue.target.value);
                  setErrUpdatePrice("");
                }}
                helperText={error}
                error={isError}
              />
            </div>
            <div className="d-flex" style={{ paddingLeft: 20 }}>
              <div style={{ padding: 16 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    disabled={isCanEditFromDate ? false : true}
                    label="Ngày hiệu lực"
                    value={valueFromDateEdit}
                    onChange={(newValue) => {
                      setValueFromDateEdit(newValue);
                      setErrUpdatePrice("");
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div style={{ padding: 16 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    disabled={isCanEditToDate ? false : true}
                    label="Ngày kết thúc"
                    value={valueToDateEdit}
                    onChange={(newValue) => {
                      setValueToDateEdit(newValue);
                      setErrPrice("");
                      setErrUpdatePrice("");
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    // renderInput={(params) => (
                    //   <TextField
                    //     {...params}
                    //     value={dayjs(valueToDateEdit).format("DD/MM/YYYY")}
                    //   />
                    // )}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div
              className="d-flex justify-content-center"
              style={{ marginTop: 20 }}
            >
              <div style={{ marginRight: 20 }}>
                <Button variant="outlined" onClick={handleCloseModal}>
                  Quay lại
                </Button>
              </div>
              <div style={{ marginLeft: 20 }}>
                <Button variant="contained" onClick={() => handleAgrre()}>
                  Đồng ý
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
export default ERPPriceDetailOfVarrant;
