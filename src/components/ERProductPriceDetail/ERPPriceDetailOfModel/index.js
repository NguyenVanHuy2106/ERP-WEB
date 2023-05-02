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
import "../css/index.css";
import "dayjs/locale/vi";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { storage } from "../../../server/FirebaseConfig";
import moment from "moment";
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
  getModelPriceDetail,
  updatePriceOfModel,
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
function ERPPriceDetailOfModel({ route, navigate, modelId }) {
  const classes = useStyles();
  // const { modelId } = useParams();
  const location = useLocation();
  //console.log(location.state.price);
  //const price = location.state.price;
  const [errUpdatePrice, setErrUpdatePrice] = useState("");
  const [tFPriceEditValue, setTFPriceEditValue] = useState("");
  const [modelInfo, setModelInfo] = useState({});
  const [modelDescriptionAttribute, setModelDescriptionAttribute] = useState(
    []
  );
  const [modelPriceDetail, setModelPriceDetail] = useState([]);
  const [priceOfModelId, setPriceOfModelId] = useState(0);
  const [modelIdEdit, setModelIdEdit] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selected, setSelected] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [varant, setVarrant] = useState([]);
  //console.log(varant);
  const [priceOfModel, setPriceOfModel] = useState(0);
  //console.log(priceOfModel);
  const [priceOfVarrant, setPriceOfVarrant] = useState(0);
  const [maxLevelVarantProduct, setMaxLevelVarantProduct] = useState(0);
  const [loadingAddNewModel, setLoadingAddNewModel] = useState(false);
  const [state, setState] = useState(false);
  const [statePriceOfProductId, setStatePriceOfProductId] = useState(false);
  const [isCanEditFromDate, setIsCanEditFromDate] = useState(false);
  const [isCanEditToDate, setIsCanEditToDate] = useState(false);
  const [isCanEditPrice, setIsCanEditPrice] = useState(false);
  const [isShowTexInputPriceOfVarrant, setIsShowTexInputPriceOfVarrant] =
    useState(false);
  const { vertical, horizontal, open } = state;
  const [priceOfModelEdit, setPriceOfModelEdit] = useState(0);

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
  const [errEditPrice, setErrEditPrice] = useState("");
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
  const handleAddnewPriceOfModel = async (modelId, priceOfModel) => {
    const fromDate = dayjs(valueFromDate).format("YYYY-MM-DD");
    const toDate = dayjs(valueToDate).format("YYYY-MM-DD");
    //console.log(fromDate, toDate);
    const result = await addNewPriceOfModel(
      modelId,
      priceOfModel,
      fromDate,
      toDate
    );
    if (result.status === 200 && result.data.isError === false) {
      setLoadingAddNewModel(false);
      handleGetModelPriceDetail(modelId);
      //console.log(result);
    } else {
      setLoadingAddNewModel(false);
      setErrPrice(result.data.message);
    }
  };

  const handleGetModelPriceDetail = async (modelId) => {
    const result = await getModelPriceDetail(modelId);
    if (result.status === 200) {
      setModelPriceDetail(result.data.data.priceOfModels);
    }
  };
  const handleEditClick = (item) => {
    setOpenModal(true);
    //console.log(item);
    setPriceOfModelEdit(item.price);
    setValueFromDateEdit(item.fromDate);
    setValueToDateEdit(item.toDate);
    setIsCanEditFromDate(item.isCanEditFromDate);
    setIsCanEditToDate(item.isCanEditToDate);
    setIsCanEditPrice(item.isCanEditPrice);
    setPriceOfModelId(item.priceOfModelId);
    setModelIdEdit(item.modelId);
  };
  const handleAgrre = async () => {
    setLoading(false);
    // const fromDate = valueFromDate.format("YYYY-MM-DD");
    // const fromDate = moment(valueFromDateEdit);
    // const formatFromDate = fromDate.format("YYYY-MM-DD");
    // const toDate = moment(valueToDateEdit);
    // const formatToDate = toDate.format("YYYY-MM-DD");
    const fromDateEdit = dayjs(valueFromDateEdit).format("YYYY-MM-DD");
    const toDateEdit = dayjs(valueToDateEdit).format("YYYY-MM-DD");
    //console.log(fromDate, toDate);
    const result = await updatePriceOfModel(
      priceOfModelId,
      modelIdEdit,
      priceOfModelEdit,
      fromDateEdit,
      toDateEdit
    );
    if (result.status === 200) {
      setLoading(true);
      handleGetModelPriceDetail(modelId);
      if (result.data.isError === true) {
        setErrUpdatePrice(result.data.message);
      } else {
        setOpenModal(false);
      }
    }

    // console.log(
    //   priceOfModelId,
    //   modelIdEdit,
    //   priceOfModelEdit,
    //   formatFromDate,
    //   formatToDate
    // );
  };

  useEffect(() => {
    setTime();
    getModelInfoDetail(modelId);
    handleGetModelPriceDetail(modelId);
    //getPriceBymodel(modelId);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = brandData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [url, setUrl] = useState("");

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
              <div className="col-4">
                <div className="d-flex flex-column align-items-center">
                  <img
                    className="img-fluid"
                    src={
                      imageAvatar
                        ? imageAvatar
                        : "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"
                    }
                    alt="file"
                    width={500}
                    height={500}
                    style={{ padding: 10 }}
                  />
                </div>
              </div>
              <div className="col-9" style={{ padding: 10 }}>
                <div>
                  <div>
                    <div
                      style={{
                        padding: 20,
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                    >
                      Thêm mới giá model
                    </div>

                    <div style={{ paddingLeft: 20 }}>
                      <div className="d-flex">
                        <TextField
                          id="outlined-basic"
                          label="Giá"
                          variant="outlined"
                          type="number"
                          value={priceOfModel}
                          onChange={(newValue) => {
                            setPriceOfModel(newValue.target.value);
                            setErrPrice("");
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              setLoadingAddNewModel(true);
                              handleAddnewPriceOfModel(modelId, priceOfModel);
                            }
                          }}
                          style={{ paddingRight: 16 }}
                        />

                        <div className="d-flex">
                          <div style={{ paddingRight: 16 }}>
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
                        {loadingAddNewModel ? <CircularProgress /> : null}
                      </div>
                      {errPrice && (
                        <div style={{ color: "#ff0000" }}>{errPrice}</div>
                      )}
                      <div style={{ fontStyle: "italic", color: "#000000" }}>
                        (Nhấn Enter để lưu)
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      paddingTop: 20,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingBottom: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#000000",
                    }}
                  >
                    Lịch sử giá theo model
                  </div>
                  {errEditPrice && (
                    <div
                      style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 10,
                        color: "#ff0000",
                        fontStyle: "italic",
                      }}
                    >
                      {errEditPrice}
                    </div>
                  )}
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
                            scope="col-1"
                          >
                            Giá
                          </th>
                          <th
                            style={{ color: "#ffffff", fontWeight: "bold" }}
                            scope="col-1"
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
                        {modelPriceDetail.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.storeId}</td>

                            <td>
                              <div
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
                              </div>
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
                value={priceOfModelEdit}
                onChange={(newValue) => {
                  setPriceOfModelEdit(newValue.target.value);
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
export default ERPPriceDetailOfModel;
