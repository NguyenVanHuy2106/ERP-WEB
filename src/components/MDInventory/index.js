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
import {
  AiOutlineSearch,
  AiOutlinePlus,
  AiOutlineCheck,
  AiOutlineDelete,
} from "react-icons/ai";
import { FiEdit, FiTrash } from "react-icons/fi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import Switch from "react-switch";
import numeral from "numeral";
import Snackbar from "@mui/material/Snackbar";
import "./css/index.css";
import "dayjs/locale/vi";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import moment from "moment";
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
  getProductIdListByModel,
} from "../../controller/ERProduct";
import {
  getModelPriceDetail,
  updatePriceOfModel,
} from "../../controller/ERProductPrice";
import {
  checkModelInventory,
  addNewInventoryModel,
  addNewInventoryProductHasIMEI,
  addNewInventoryProductNoIMEI,
} from "../../controller/MDInventory";
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
function MDInventory({ route, navigate, modelId }) {
  const classes = useStyles();
  // const { modelId } = useParams();
  const location = useLocation();

  //const data = useLocation();
  let defaultModelId = location.state || { data: 0 };
  //let modelIdDefault = defaultModelId.modelId;
  //console.log(defaultModelId);
  const [tFModelId, setTFModelId] = useState(defaultModelId.data);
  const [isInstockManaged, setIsInstockManaged] = useState(null);
  const [isModelInventory, setIsModelInventory] = useState(null);
  const [isProductInventory, setIsProductInventory] = useState(null);
  const [productList, setProductList] = useState([]);
  const [isRequestImei, setIsRequestImei] = useState(null);

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
  const [amountStock, setAmountStock] = useState(0);
  //console.log(importedGoodList);
  //console.log(priceOfModel);
  const [stockOfVarrant, setStockOfVarrant] = useState(0);
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
  const [productId, setProductId] = useState("");
  const [priceOfProductId, setPriceOfProductId] = useState(0);
  const [importedGoodList, setImportedGoodList] = useState([]);
  const [importedIMEIList, setImportedIMEIList] = useState([]);
  const [importedList, setImportedList] = useState([]);
  const [quantityList, setQuantityList] = useState([]);
  //console.log(importedGoodList);
  const handleQuantityChange = (productId, modelId, amount) => {
    // Tìm vị trí của phần tử trong quantityList dựa trên productId và modelId
    const productIndex = quantityList.findIndex(
      (product) =>
        product.productId === productId && product.modelId === modelId
    );

    // Nếu không tìm thấy, thêm mới phần tử với amount là amount, subgroupId là 1 và inventoryStatusId là 1
    if (productIndex === -1) {
      const newProduct = {
        productId,
        modelId,
        amount,
        subgroupId: modelInfo.subgroupId,
        inventoryStatusId: 1,
      };
      setQuantityList((prevQuantityList) => [...prevQuantityList, newProduct]);
    } else {
      // Nếu tìm thấy, cập nhật lại amount của phần tử đó
      const newQuantityList = [...quantityList];
      newQuantityList[productIndex].amount = amount;
      setQuantityList(newQuantityList);
    }
  };
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

      if (index >= 0) {
        // The attribute is already selected, update the value
        const newSelections = prevSelections.map((selection, i) =>
          i === index ? { ...selection, ...updateSelection } : selection
        );
        console.log("New selections:", newSelections);
        if (newSelections.length === maxLevelVarantProduct) {
          getProductId(tFModelId, newSelections);
          setPriceOfProductId(0);
        }

        return newSelections;
      } else {
        // The attribute is not yet selected, add a new selection
        const newSelections = [...prevSelections, updateSelection];
        //console.log("New selections:", newSelections);
        if (newSelections.length === maxLevelVarantProduct) {
          getProductId(tFModelId, newSelections);
          setPriceOfProductId(0);
        }
        console.log("New selections abc:", newSelections);
        return newSelections;
      }
    });
  };
  const getProductId = async (modelId, varant) => {
    console.log(modelId, varant);
    setStatePriceOfProductId(true);
    const result = await getProductIdByVarrant(modelId, varant);
    if (result.status === 200) {
      //console.log(result.data.data);
      setProductId(result.data.data.productId);
      setPriceOfProductId(result.data.data.priceOfProduct);
      setStatePriceOfProductId(false);
    } else {
      setStatePriceOfProductId(false);
    }
  };
  const handleGetProductId = () => {
    if (varant.length === maxLevelVarantProduct) {
      setIsShowTexInputPriceOfVarrant(true);
    }
  };
  const [modelVarantProduct, setModelVarantProduct] = useState([]);
  const [imageAvatar, setImageAvatar] = useState("");
  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();

  //const [valueCatData, setValueCatData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
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
  const [numInputs, setNumInputs] = useState(1);
  const [inputs, setInputs] = useState([{ id: 1, value: "" }]);
  const [imeiList, setImeiList] = useState([]);
  //console.log(imeiList);

  const handleAddIMEI = (productId) => {
    const newImeiList = [...imeiList];
    let amount = 1;
    const productIndex = newImeiList.findIndex(
      (product) => product.productId === productId
    );
    const importedItem = importedList.find(
      (item) => item.productId === productId
    );
    //console.log(importedItem);
    if (productIndex === -1) {
      // const newImeiList = {
      //   varantProductId: importedItem.varantProductId,
      //   productId,
      //   amount: amount,
      //   imeiList: [""],
      // };
      // setImeiList([...imeiList, newImeiList]);
      newImeiList.push({
        subgroupId: modelInfo.subgroupId,
        modelId: importedItem.modelId,
        productId,
        inventoryStatusId: 1,
        amount: amount,
        imeiList: [""],
      });
    } else {
      newImeiList[productIndex].imeiList.push("");
      //newImeiList[productIndex].amount += amount;
    }
    setImeiList(newImeiList);
  };

  // const handleAddIMEI = (productId) => {
  //   setImeiList({
  //     ...imeiList,
  //     [productId]: [...(imeiList[productId] || []), ""],
  //   });
  // };

  // Hàm xử lý sự kiện khi thay đổi giá trị của ô nhập IMEI
  // const handleIMEIChange = (productId, index, value) => {
  //   if (!imeiList) {
  //     return;
  //   }
  //   const updatedIMEIList = imeiList.map((item) => {
  //     if (item.productId === productId) {
  //       const newIMEIList = [...item.imeiList];
  //       newIMEIList[index] = value;
  //       return { productId, imeiList: newIMEIList };
  //     }
  //     return item;
  //   });
  //   setImeiList(updatedIMEIList);
  // };
  const handleIMEIChange = (productId, index, value) => {
    const newImeiList = [...imeiList];
    const productIndex = newImeiList.findIndex(
      (product) => product.productId === productId
    );
    newImeiList[productIndex].imeiList[index] = value;
    newImeiList[productIndex].amount =
      newImeiList[productIndex].imeiList.length;
    setImeiList(newImeiList);
  };

  const renderProductList = (item) => {
    return (
      <div key={item.productId}>
        <button onClick={() => handleAddIMEI(item.productId)}>Thêm</button>
        {imeiList[item.productId]?.map((imei, index) => (
          <div key={index}>
            <input
              value={imei}
              onChange={(e) =>
                handleIMEIChange(item.productId, index, e.target.value)
              }
            />
          </div>
        ))}
      </div>
    );
  };

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

  const handleGetModelPriceDetail = async (modelId) => {
    const result = await getModelPriceDetail(modelId);
    if (result.status === 200) {
      setModelPriceDetail(result.data.data.priceOfModels);
    }
  };
  const addNewStockModel = async (
    userLogin,
    storeId,
    subgroupId,
    modelId,
    inventoryStatusId,
    amount
  ) => {
    console.log(
      userLogin,
      storeId,
      subgroupId,
      modelId,
      inventoryStatusId,
      amount
    );
    const result = await addNewInventoryModel(
      userLogin,
      storeId,
      subgroupId,
      modelId,
      inventoryStatusId,
      amount
    );
    console.log(result);
    if (result.status === 200) {
      setLoadingAddNewModel(false);
    }
  };

  const addNewStockProductHasIMEI = async (userId, imeiList) => {
    setLoading(false);
    const result = await addNewInventoryProductHasIMEI(userId, 1, imeiList);
    if (result.status === 200) {
      setLoading(true);
    }
  };

  const addNewStockProductNoIMEI = async (userId, quantityList) => {
    setLoading(false);
    const result = await addNewInventoryProductNoIMEI(userId, 1, quantityList);
    if (result.status === 200) {
      setLoading(true);
    }
  };

  const getProductList = async (modelId) => {
    const result = await getProductIdListByModel(modelId);
    if (result.status === 200) {
      setProductList(result.data.data.varrantProduct);
      setImportedList(result.data.data.varrantProduct);
      // const importedList = result.data.data.varrantProduct.map((item) => {
      //   return {
      //     varantProductId: item.varantProductId,
      //     productId: item.productId,
      //     modelId: item.modelId,
      //     productName: item.productName,
      //   };
      // });

      setImportedGoodList(importedGoodList.concat(importedList));
    }
  };

  const handleClickFindModelId = async () => {
    if (tFModelId) {
      const result = await checkModelInventory(userId, tFModelId);
      if (result.status === 200) {
        setIsInstockManaged(result.data.data.isInstockManaged);
        setIsModelInventory(result.data.data.isModelInventory);
        setIsProductInventory(result.data.data.isProductInventory);
        setIsRequestImei(result.data.data.isRequestImei);
        if (result.data.data.isProductInventory) {
          getProductList(tFModelId);
        }
      }
      getModelInfoDetail(tFModelId);
      handleGetModelPriceDetail(tFModelId);
    }
  };

  useEffect(() => {
    setTime();
    setNumInputs(1);
    setImportedGoodList([]);
    handleClickFindModelId();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [url, setUrl] = useState("");

  const disPlayMDMStock = (
    isInstockManaged,
    isModelInventory,
    isProductInventory
  ) => {
    if (isInstockManaged) {
      if (isModelInventory) {
        return (
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
            <div className="" style={{ padding: 10, width: "70%" }}>
              <div
                style={{
                  padding: 20,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                Thêm mới số lượng tồn
              </div>

              <div style={{ paddingLeft: 20 }}>
                <TextField
                  id="outlined-basic"
                  label="Số lượng tồn"
                  variant="outlined"
                  type="number"
                  value={amountStock}
                  onChange={(newValue) => {
                    setAmountStock(newValue.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      setLoadingAddNewModel(true);
                      //console.log(amountStock);
                      const amount = parseInt(amountStock);
                      const modelId = parseInt(tFModelId);
                      //userLogin, storeId, subgroupId, modelId,inventoryStatusId,amount
                      addNewStockModel(
                        userId,
                        1,
                        modelInfo.subgroupId,
                        modelId,
                        1,
                        amount
                      );
                    }
                  }}
                  style={{ paddingRight: 16, width: "50%" }}
                />

                {loadingAddNewModel ? <CircularProgress /> : null}

                <div style={{ fontStyle: "italic", color: "#000000" }}>
                  (Nhấn Enter để lưu)
                </div>
              </div>
            </div>
          </div>
        );
      } else if (isProductInventory) {
        return (
          <div>
            <div
              className="d-flex justify-content-end"
              style={{ marginBottom: 20, marginTop: 20, marginRight: 10 }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (isRequestImei) {
                    //console.log("HUY: isRequestImei");
                    addNewStockProductHasIMEI(userId, imeiList);
                  } else {
                    //console.log(quantityList);
                    addNewStockProductNoIMEI(userId, quantityList);
                  }
                }}
              >
                Lưu
              </button>
            </div>
            {productList.map((item, index) => (
              <div key={index} className="card" style={{ margin: 10 }}>
                <div className="card-body d-flex align-items-center">
                  <div style={{ flex: 2 }}>
                    <div>{"Sản phẩm " + (index + 1)}</div>
                    <div
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {modelInfo.productName}
                    </div>
                    <div style={{}}>{item.productName}</div>
                  </div>
                  {isRequestImei ? (
                    <div
                      style={{
                        flex: 3,
                      }}
                    >
                      <button onClick={() => handleAddIMEI(item.productId)}>
                        Thêm
                      </button>
                      <div
                        className="d-flex flex-wrap"
                        style={{
                          paddingTop: 10,
                        }}
                      >
                        {imeiList.map(
                          (product) =>
                            product.productId === item.productId &&
                            product.imeiList.map((imei, index) => (
                              <div
                                key={index}
                                style={{ paddingTop: 5, paddingRight: 5 }}
                              >
                                <input
                                  value={imei}
                                  placeholder="Nhập IMEI"
                                  style={{ paddingLeft: 4 }}
                                  onChange={(e) =>
                                    handleIMEIChange(
                                      product.productId,
                                      index,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        flex: 3,
                      }}
                    >
                      <input
                        type="text"
                        style={{ width: "50%" }}
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Nhập số lượng"
                        value={
                          quantityList.find(
                            (product) =>
                              product.productId === item.productId &&
                              product.modelId === item.modelId
                          )?.amount || ""
                        }
                        onChange={(e) =>
                          handleQuantityChange(
                            item.productId,
                            item.modelId,
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      }
    } else if (isInstockManaged === false) {
      return (
        <div style={{ color: "#ff0000" }}>Sản phẩm không quan tâm đến tồn!</div>
      );
    }
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
          <div style={{ marginLeft: "50px", marginRight: "50px" }}>
            <div style={{ padding: 12, marginTop: 20 }}>
              <div style={{ fontSize: 16, color: "#000000" }}>
                Nhập mã model
              </div>
              <div
                className="d-flex align-items-center"
                style={{ marginTop: 12 }}
              >
                <TextField
                  id="outlined-basic"
                  label="Mã model"
                  type="number"
                  variant="outlined"
                  value={tFModelId}
                  onChange={(newValue) => {
                    setTFModelId(newValue.target.value);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ marginLeft: 12 }}
                  onClick={handleClickFindModelId}
                >
                  Nhập
                </button>
              </div>
            </div>

            {modelInfo.modelId && (
              <div
                className="border-bottom"
                style={{
                  padding: 10,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                {modelInfo.modelId + " - " + modelInfo.modelName}
              </div>
            )}
            {disPlayMDMStock(
              isInstockManaged,
              isModelInventory,
              isProductInventory
            )}
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
export default MDInventory;
