import React, { useState, useEffect, useStyle, useMemo } from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import { RingLoader, CircleLoader } from "react-spinners";
import { Alert, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { FiEdit, FiTrash } from "react-icons/fi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Switch from "react-switch";
import "./css/index.css";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { storage } from "../../server/FirebaseConfig";
import { appGetAllMainGroup } from "../../controller/MDMainGroupController";
import { getAllSubGroupByMainGroup } from "../../controller/MDSubGroupController";
import { AppGetAllBrand } from "../../controller/MDBrandController";
import { getAllModelProduct, getModelDetail } from "../../controller/ERProduct";
import { getAllPriceOfModel } from "../../controller/ERProductPrice";
import {
  getAllBrand,
  addNewBrand,
  updateBrand,
  deleteBrand,
} from "../../controller/MDBrandController";
import PaginationShop from "../shops/paginationShopList";
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
function ERProductPrice({ route, navigate }) {
  const classes = useStyles();
  const [tFValue, setTFValue] = useState("");
  const [tFBrandValue, setTFBrandValue] = useState("");
  const [priceList, setPriceList] = useState([]);
  const [mainGroup, setMainGroup] = useState([]);
  const [mainGroupIdSelect, setMainGroupIdSelect] = useState("");
  const [subGroup, setSubGroup] = useState([]);
  const [subGroupIdSelect, setSubGroupIdSelect] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandIdSelect, setBrandIdSelect] = useState("");
  const [modelList, setModelList] = useState([]);
  const [tFDesValue, setTFDesValue] = useState("");
  const [tFBrandEditValue, setTFBrandEditValue] = useState("");
  const [tFDesEditValue, setTFDesEditValue] = useState("");
  const [brandIdEditValue, setBrandIdEditValue] = useState("");
  const [isActived, setIsActived] = useState(false);
  const [keyWordType, setKeyWordType] = useState(0);
  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();
  const [brandData, setBrandData] = useState([]);
  //const [valueCatData, setValueCatData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);
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
  const [checked, setChecked] = React.useState(true);
  const [editChecked, setEditChecked] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isError, setIsError] = useState(false);
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
  const handleChangeMainGroupIdSelect = (event) => {
    setMainGroupIdSelect(event.target.value);
    HandleSubGroup(event.target.value);
  };
  const handleChangeSubGroupIdSelect = (event) => {
    setSubGroupIdSelect(event.target.value);
  };
  const handleChangeBrandIdSelect = (event) => {
    setBrandIdSelect(event.target.value);
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

  const firstDateInMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  ).toLocaleDateString();

  //   var firstDateInMonth =
  //     1 + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const [valueFromDate, setValueFromDate] = React.useState(
    dayjs(firstDateInMonth)
  );
  //console.log(valueFromDate.format("DD-MM-YYYY"));
  const [valueToDate, setValueToDate] = React.useState(toDateDayjs);
  //console.log(valueToDate.format("DD-MM-YYYY"));
  const formatDate = (date) => {
    return date.format("DD/MM/YYYY"); // định dạng ngày-tháng-năm
  };

  const setTime = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };
  const HandleGetAllMainGroup = async () => {
    const result = await appGetAllMainGroup();
    if (result.status === 200) {
      setMainGroup(result.data.data.maingroups);
    }
  };

  const HandleSubGroup = async (mainGroupId) => {
    const result = await getAllSubGroupByMainGroup(mainGroupId);
    if (result.status === 200) {
      setSubGroup(result.data.data.subgroups);
    }
  };
  const HandleGetAllBrand = async () => {
    const result = await AppGetAllBrand();
    if (result.status === 200) {
      setBrand(result.data.data.brands);
    }
  };
  const HandleClick = async (keyWordType) => {
    //console.log(keyWordType);
    setLoading(false);

    const fromDate = valueFromDate.format("YYYY-MM-DD");
    const toDate = valueToDate.format("YYYY-MM-DD");

    if (keyWordType === 0) {
      // console.log("0");
      //console.log(keyWordType);
      const result = await getAllPriceOfModel(tFValue, null, fromDate, toDate);
      //console.log(result);
      if (result.status === 200) {
        setLoading(true);
        setPriceList(result.data.data.priceOfModels);
      }
    } else if (keyWordType === 1) {
      //console.log(keyWordType);
      //console.log(tFValue, null, fromDate, toDate);
      const result = await getAllPriceOfModel(tFValue, null, fromDate, toDate);
      //console.log(result);
      if (result.status === 200) {
        setLoading(true);
        setPriceList(result.data.data.priceOfModels);
      }
    } else if (keyWordType === 2) {
      //console.log(keyWordType);
      const result1 = await getAllPriceOfModel(null, tFValue, fromDate, toDate);
      //console.log(result1);
      if (result1.status === 200) {
        setLoading(true);
        setPriceList(result1.data.data.priceOfModels);
      }
    }

    //console.log(result);
    // if (result.status === 200) {
    //   setLoading(true);
    //   setPriceList(result.data.data.priceOfModels);
    // }
    //console.log(num, fromDate, toDate);
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

  const getAllModel = async (mainGroupId, subGroupId, brandId) => {
    const result = await getAllModelProduct(mainGroupId, subGroupId, brandId);
    if (result.status === 200) {
      setModelList(result.data.data.modelList);
    }
  };

  useEffect(() => {
    setTime();
    //getAllModel(null, null, null);
    HandleClick("0");
    //HandleGetAllMainGroup();
    //HandleGetAllBrand();
  }, []);
  const [url, setUrl] = useState("");

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = priceList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const handleEditClick = (item) => {};

  const handleAgrreEdit = async () => {
    const toDate = valueToDate.format("YYYY-MM-DD");

    handleCloseModalEdit();
    setLoading(false);
    const result = await updateBrand(
      userId,
      brandIdEditValue,
      tFBrandEditValue,
      tFDesEditValue,
      isActived
    );
    if (result.status === 200) {
      setLoading(true);
      HandleClick();
    }
  };

  return (
    <div
      style={{
        background: "#E5E4E2",
        height: "900px",
      }}
    >
      <div
        style={{ marginLeft: "20px", marginRight: "20px", paddingTop: "20px" }}
      >
        <div className="webContainer1 border">Quản lý giá sản phẩm</div>
        <div
          className="d-flex mt-3 align-items-center justify-content-start"
          style={{ background: "#ffffff", height: "80px", paddingLeft: "30px" }}
        >
          <div className="d-flex mt-3 justify-content-start  search align-items-center">
            <div className="searchMargin" style={{ paddingRight: 16 }}>
              <TextField
                id="outlined-basic"
                label="Tu khoa"
                variant="outlined"
                onChange={(newValue) => setTFValue(newValue.target.value)}
              />
            </div>
            <FormControl style={{ width: 200 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={keyWordType}
                onChange={(newValue) => {
                  setKeyWordType(newValue.target.value);
                }}
              >
                <MenuItem value={0}>
                  <em>---Loại từ khoá---</em>
                </MenuItem>
                <MenuItem value={1}>Tên model</MenuItem>
                <MenuItem value={2}>Mã model</MenuItem>
              </Select>
            </FormControl>
            <div className="m-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Từ ngày"
                  value={valueFromDate}
                  onChange={(newValue) => {
                    setValueFromDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Đến ngày"
                  value={valueToDate}
                  onChange={(newValue) => {
                    setValueToDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>

            <div className="searchMargin">
              <Button
                variant="contained"
                onClick={() => HandleClick(keyWordType)}
              >
                <AiOutlineSearch size={20} />
                Tim kiem
              </Button>
            </div>
          </div>
        </div>

        <div style={{ background: "#ffffff" }}>
          <div
            className="d-flex"
            style={{ marginLeft: "50px", marginRight: "50px" }}
          >
            <table className="table mt-2 ">
              <thead>
                <tr style={{ background: "#848482" }}>
                  <th>
                    <label>
                      <input type="checkbox" />
                    </label>
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-1"
                  >
                    Mã
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-4"
                  >
                    Tên model
                  </th>

                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col-4"
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
                    scope="col-2"
                  >
                    Ngày kết thúc
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.modelId)}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.modelId)
                          }
                        />
                      </label>
                    </td>
                    <th scope="item">{item.modelId}</th>
                    <td className="brandEdit ">
                      <Link
                        to={`/productPriceDetail/${item.modelId}`}
                        state={{ price: item.modelPrice.price }}
                        className="d-flex align-items-center"
                      >
                        <div>
                          <img
                            src={item.modelImagePath}
                            className="img-fluid"
                            alt="file"
                            width={50}
                            height={50}
                            style={{ padding: 5 }}
                          />
                        </div>
                        {item.modelName}
                      </Link>
                    </td>

                    <td>
                      {item.modelPrice.price
                        ? item.modelPrice.price
                        : "Chưa làm giá"}
                    </td>
                    <td>
                      {item.modelPrice.fromDate
                        ? new Date(
                            item.modelPrice.fromDate
                          ).toLocaleDateString()
                        : ""}
                    </td>
                    <td>
                      {item.modelPrice.fromDate
                        ? new Date(
                            item.modelPrice.fromDate
                          ).toLocaleDateString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            <PaginationShop
              postsPerPage={postsPerPage}
              totalPosts={priceList.length}
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
export default ERProductPrice;
