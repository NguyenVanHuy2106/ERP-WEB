import React, { useState, useEffect, useStyle, useMemo } from "react";

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
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { storage } from "../../server/FirebaseConfig";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
  getAllBrand,
  addNewBrand,
  updateBrand,
  deleteBrand,
} from "../../controller/MDBrandController";
import {
  getAllModelAPI,
  getAllModelBySubGroupAPI,
} from "../../controller/ERProduct";
import { getAllSubGroup } from "../../controller/MDSubGroupController";
import {
  getAllPromotionProgram,
  addNewPromotionProgram,
} from "../../controller/MDPromotion";
import { getAllInventoryStatus } from "../../controller/MDInventoryStatusController";
import PaginationShop from "../shops/paginationShopList";
import { Await } from "react-router-dom";
import { da } from "date-fns/locale";
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
function MDPromotion({ route, navigate }) {
  const classes = useStyles();
  const [tFValue, setTFValue] = useState("");
  const [tFPromotionValue, setTFPromotionValue] = useState("");
  const [modelList, setModelList] = useState([]);
  const [inventoryStatusList, setInventoryStatusList] = useState([]);
  const [subGroupList, setSubGroupList] = useState([]);
  const [subGroupIdSelect, setSubGroupIdSelect] = useState("");
  const [modelIdSelect, setModelIdSelect] = useState("");
  const [tFDesValue, setTFDesValue] = useState("");
  const [promotionList, setPromotionList] = useState([]);
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
  const [isPriority, setIsPriority] = useState(true);
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
  const [valueRadio, setValueRadio] = React.useState(0);

  const handleChangeRadio = (event) => {
    setValueRadio(event.target.value);
  };
  const [valueRadioEdit, setValueRadioEdit] = React.useState(0);

  const handleChangeRadioEdit = (event) => {
    setValueRadioEdit(event.target.value);
  };
  const [subgroupIdAddNew, setSubgroupIdAddNew] = useState("");
  const [modelIdAddNew, setModelIdAddNew] = useState("");
  const [inventoryStatusIdAddNew, setInventoryStatusAddNew] = useState("");
  const [promotionTypeAddNew, setPromotionTypeAddNew] = useState("");
  const [valuePromotion, setValuePromotion] = useState(0);
  const handleChangeSubgroupIdAddNew = (event) => {
    setModelIdAddNew("");
    setSubgroupIdAddNew(event.target.value);
    getAllModelBySubgroup(event.target.value);
  };
  const handleChangeModelIdAddNew = (event) => {
    setModelIdAddNew(event.target.value);
  };
  const handleChangeInventoryStatusIdAddNew = (event) => {
    setInventoryStatusAddNew(event.target.value);
  };

  const handleEditcheck = (event) => {
    setIsActived(event.target.checked);
  };
  const handleIsProiority = (event) => {
    setIsPriority(event.target.checked);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleChangeModelIdSelect = (event) => {
    setModelIdSelect(event.target.value);
  };
  const handleChangeSubGroupIdSelect = (event) => {
    setModelIdSelect("");
    setSubGroupIdSelect(event.target.value);
    getAllModelBySubgroup(event.target.value);
  };
  const handleAgrre = async () => {
    handleCloseModal();
    setLoading(false);
    const fromDate = valueFromDateAddNew.format("YYYY-MM-DD");
    const toDate = valueToDate.format("YYYY-MM-DD");
    //console.log(valueFromDateAddNew, valueToDateAddNew);
    const data = {};
    data.bannerImagePath = url;
    data.promotionProgramName = tFPromotionValue;
    data.subgroupId = subgroupIdAddNew;
    data.modelId = modelIdAddNew !== "" ? modelIdAddNew : null;
    data.inventoryStatusId = inventoryStatusIdAddNew;
    data.isPercentValue = parseInt(valueRadio);
    data.isPriority = isPriority;
    data.value = parseInt(valuePromotion);
    data.fromDate = fromDate;
    data.toDate = toDate;
    data.isActived = 1;
    //console.log(userId, data);

    const result = await addNewPromotionProgram(userId, data);
    if (result.status === 200) {
      getAllPromotion();
      setLoading(true);
    }
  };

  // const currentDate = dayjs();

  // // Lấy ngày cuối tháng
  // const lastDayOfMonth = currentDate.endOf("month");

  // // Lấy giá trị ngày cuối tháng
  // const valueToDateValue = lastDayOfMonth.toDate();

  // // Sử dụng valueToDate trong useState
  // //const [value, setValue] = React.useState(valueToDate);

  //const firstDateInMonth = dayjs().startOf('month');

  // Lấy giá trị ngày cuối tháng

  //
  const firstDateInMonth = dayjs().startOf("month");
  const lastDateInMonth = firstDateInMonth.endOf("month");
  const valueToDateValue = lastDateInMonth.toDate();
  const [valueFromDate, setValueFromDate] = React.useState(
    dayjs(firstDateInMonth)
  );
  const [valueFromDateAddNew, setValueFromDateAddNew] = React.useState(
    dayjs(toDateDayjs)
  );
  const [valueToDateAddNew, setValueToDateAddNew] =
    React.useState(valueToDateValue);

  const [valueToDate, setValueToDate] = React.useState(toDateDayjs);

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
  //   const getAllModelList = async () => {
  //     const result = await getAllModelAPI();
  //     if (result.status === 200) {
  //       setModelList(result.data.data.models);
  //     }
  //   };

  const getAllSubGroupList = async () => {
    const result = await getAllSubGroup();
    if (result.status === 200) {
      setSubGroupList(result.data.data.subgroups);
    }
  };
  const getAllModelBySubgroup = async (subgroupId) => {
    const result = await getAllModelBySubGroupAPI(subgroupId);
    if (result.status === 200) {
      setModelList(result.data.data.models);
    }
  };
  const getInventoryStatus = async () => {
    const result = await getAllInventoryStatus();
    if (result.status === 200) {
      setInventoryStatusList(result.data.data.inventoryStatus);
    }
  };
  const getAllPromotion = async () => {
    const fromDate = valueFromDate.format("YYYY-MM-DD");
    const toDate = valueToDate.format("YYYY-MM-DD");
    let subgroupId = subGroupIdSelect !== "" ? subGroupIdSelect : null;
    let modelId = modelIdSelect !== "" ? modelIdSelect : null;
    //console.log(subgroupId, modelId, fromDate, toDate);
    const result = await getAllPromotionProgram(
      userId,
      subgroupId,
      modelId,
      fromDate,
      toDate
    );
    if (result.status === 200) {
      setPromotionList(result.data.data);
      //console.log(result.data.data);
    }
  };
  useEffect(() => {
    setTime();
    //HandleClick();
    getAllSubGroupList();
    getAllPromotion();
    getInventoryStatus();
    //getAllModelList();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = promotionList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [url, setUrl] = useState("");
  const [urlEdit, setUrlEdit] = useState("");

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
  const handleImageChangeEdit = (e) => {
    if (e.target.files[0]) {
      const uploadTask = storage
        .ref(`images/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      uploadTask.on("state_changed", null, null, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          setUrlEdit(downloadUrl);
        });
      });
    }
  };

  const handleEditClick = (item) => {
    // setTFBrandEditValue(item.brandName);
    // setTFDesEditValue(item.brandDescription);
    // setBrandIdEditValue(item.brandId);
    // setUrlEdit(item.brandImagePath);
    // if (item.isActived === 1) setIsActived(true);
    // else {
    //   setIsActived(false);
    // }
    // handleOpenModalEdit();
  };
  const handleAgrreEdit = async () => {
    const toDate = valueToDate.format("YYYY-MM-DD");

    handleCloseModalEdit();
    setLoading(false);
    const result = await updateBrand(
      userId,
      brandIdEditValue,
      tFBrandEditValue,
      tFDesEditValue,
      isActived,
      urlEdit
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
        <div className="webContainer1 border">
          Khai báo chương trình khuyến mãi
        </div>
        <div
          className="d-flex mt-3 align-items-center justify-content-start"
          style={{ background: "#ffffff", height: "80px", paddingLeft: "30px" }}
        >
          <div className="d-flex mt-3 justify-content-start  search align-items-center">
            <FormControl sx={{ m: 1, width: 200 }}>
              <InputLabel id="demo-select-small">Chọn nhóm hàng</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={subGroupIdSelect}
                label="Chọn nhóm hàng"
                onChange={handleChangeSubGroupIdSelect}
              >
                <MenuItem value="">
                  <em>---Chọn nhóm hàng---</em>
                </MenuItem>
                {subGroupList.map((item, index) => (
                  <MenuItem key={index} value={item.subgroupId}>
                    {item.subgroupId + " - " + item.subgroupName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 200 }}>
              <InputLabel id="demo-select-small">Chọn model</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={modelIdSelect}
                label="Chọn model"
                onChange={handleChangeModelIdSelect}
              >
                <MenuItem value="">
                  <em>---Chọn Model---</em>
                </MenuItem>
                {modelList.map((item, index) => (
                  <MenuItem key={index} value={item.modelId}>
                    {item.modelId + " - " + item.modelName}
                  </MenuItem>
                ))}
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
              <Button variant="contained" onClick={() => getAllPromotion()}>
                <AiOutlineSearch size={20} />
                Tìm
              </Button>
            </div>
            <div style={{ marginLeft: 4 }}>
              <Button variant="contained" onClick={() => getAllPromotion()}>
                <AiOutlineSearch size={20} />
                Xoá
              </Button>
            </div>
            <div style={{ marginLeft: 4 }}>
              <Button variant="contained" onClick={() => handleOpenModal()}>
                <AiOutlinePlus size={20} />
                Thêm
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
                    className="col-2"
                  >
                    Tên chương trình
                  </th>

                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Loại chương trình
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Mức giảm
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Áp dụng
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Trạng thái
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Ngày bắt đầu
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
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
                          checked={selectedItems.includes(
                            item.promotionProgramId
                          )}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.promotionProgramId)
                          }
                        />
                      </label>
                    </td>
                    <th scope="item">{item.promotionProgramId}</th>
                    <td
                      className="brandEdit"
                      onClick={() => handleEditClick(item)}
                    >
                      {item.promotionProgramName}
                    </td>

                    <td>
                      <div>
                        {item.isPercentValue === 1
                          ? "Giảm giá theo %"
                          : "Giảm giá theo số tiền"}
                      </div>
                    </td>
                    <td>
                      {item.isPercentValue === 1
                        ? item.value + "%"
                        : item.value}
                    </td>
                    <td>{item.subgroupId + " - " + item.subgroupName}</td>
                    <td>{item.isActived === 1 ? "Đang chạy" : "Tạm dừng"}</td>
                    <td>{new Date(item.fromDate).toLocaleDateString()}</td>
                    <td>{new Date(item.toDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            <PaginationShop
              postsPerPage={postsPerPage}
              totalPosts={promotionList.length}
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
              Thêm mới chương trình khuyến mãi
            </div>
            <div style={{ marginLeft: 37, marginTop: 12 }}>
              <label htmlFor="image-uploader">
                {url ? (
                  <img src={url} alt="Selected file" width={250} height={150} />
                ) : (
                  <div
                    className="d-flex border border-dashed justify-content-center align-items-center"
                    style={{ width: 250, height: 150 }}
                  >
                    Chọn ảnh banner
                  </div>
                )}
              </label>
              <input
                className="border"
                id="image-uploader"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              {/* <input type="file" onChange={handleImageChange} />
              {url && <img src={url} alt="Uploaded" width="150" height="100" />} */}
            </div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: 12 }}
            >
              <div
                className="d-flex"
                style={{
                  width: "91%",
                  paddingLeft: 4,
                  paddingTop: 4,
                  paddingBottom: 12,
                }}
              >
                <div className="mt-2" style={{ paddingRight: 8 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Từ ngày"
                      value={valueFromDateAddNew}
                      onChange={(newValue) => {
                        setValueFromDateAddNew(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <div className="mt-2">
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
              </div>
              <TextField
                required
                id="outlined-basic"
                label="Tên chương trình khuyến mãi"
                variant="outlined"
                style={{ width: "90%" }}
                onChange={(newValue) =>
                  setTFPromotionValue(newValue.target.value)
                }
                //helperText={error}
                error={isError}
              />

              <div
                className="d-flex"
                style={{ width: "91%", paddingLeft: 4, paddingTop: 4 }}
              >
                <FormControl sx={{ width: "90%", marginTop: 1 }}>
                  <InputLabel id="demo-select-small">Chọn nhóm hàng</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={subgroupIdAddNew}
                    label="Chọn nhóm hàng"
                    onChange={handleChangeSubgroupIdAddNew}
                  >
                    <MenuItem value="">
                      <em>---Chọn nhóm hàng---</em>
                    </MenuItem>
                    {subGroupList.map((item, index) => (
                      <MenuItem key={index} value={item.subgroupId}>
                        {item.subgroupId + " - " + item.subgroupName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: "90%" }}>
                  <InputLabel id="demo-select-small">Chọn model</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={modelIdAddNew}
                    label="Chọn model"
                    onChange={handleChangeModelIdAddNew}
                  >
                    <MenuItem value="">
                      <em>---Chọn Model---</em>
                    </MenuItem>
                    {modelList.map((item, index) => (
                      <MenuItem key={index} value={item.modelId}>
                        {item.modelId + " - " + item.modelName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div
                className="d-flex"
                style={{ width: "91%", paddingLeft: 4, paddingTop: 4 }}
              >
                <FormControl sx={{ width: "90%" }}>
                  <InputLabel id="demo-select-small">
                    Chọn trạng thái tồn kho
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={inventoryStatusIdAddNew}
                    label="Chọn trạng thái tồn kho"
                    onChange={handleChangeInventoryStatusIdAddNew}
                  >
                    <MenuItem value="">
                      <em>---Chọn nhóm hàng---</em>
                    </MenuItem>
                    {inventoryStatusList.map((item, index) => (
                      <MenuItem key={index} value={item.inventoryStatusId}>
                        {item.inventoryStatusId +
                          " - " +
                          item.inventoryStatusName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  required
                  value={valuePromotion}
                  id="outlined-basic"
                  label="Mức giảm"
                  type="number"
                  variant="outlined"
                  style={{ width: "60%", marginLeft: 12, marginRight: 4 }}
                  onChange={(newValue) =>
                    setValuePromotion(newValue.target.value)
                  }
                />
              </div>
              <div style={{ width: "95%" }}>
                <FormControl className="mt-2">
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={valueRadio}
                    onChange={handleChangeRadio}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Giảm giá theo %"
                    />
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Giảm giá trực tiếp"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div style={{ marginTop: 10, marginLeft: 37 }}>
              Ưu tiên hiển thị
              <Checkbox
                checked={isPriority}
                onChange={handleIsProiority}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
            <div style={{ marginTop: 10, marginLeft: 37 }}>
              Kích hoạt{" "}
              <Checkbox
                disabled
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
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
                <Button variant="contained" onClick={handleAgrre}>
                  Đồng ý
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal
          open={openModalEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="border-bottom fw-bold">
              Chỉnh sửa thương hiệu sản phẩm
            </div>
            <div style={{ marginLeft: 37, marginTop: 12 }}>
              <label htmlFor="image-uploader">
                {urlEdit ? (
                  <img
                    src={urlEdit}
                    alt="Selected file"
                    width={150}
                    height={150}
                  />
                ) : (
                  <div
                    className="d-flex border border-dashed justify-content-center align-items-center"
                    style={{ width: 150, height: 150 }}
                  >
                    Chọn ảnh
                  </div>
                )}
              </label>
              <input
                className="border"
                id="image-uploader"
                type="file"
                accept="image/*"
                onChange={handleImageChangeEdit}
                style={{ display: "none" }}
              />
            </div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: 20 }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên thương hiệu"
                variant="outlined"
                style={{ width: "90%" }}
                value={tFBrandEditValue}
                onChange={(value) => setTFBrandEditValue(value.target.value)}
              />

              <TextField
                id="outlined-multiline-flexible"
                label="Mô tả"
                multiline
                rows={6}
                style={{ width: "90%", marginTop: 10 }}
                value={tFDesEditValue}
                onChange={(value) => setTFDesEditValue(value.target.value)}
              />
            </div>
            <div style={{ marginTop: 10, marginLeft: 37 }}>
              Kích hoạt{" "}
              <Checkbox
                checked={isActived}
                onChange={handleEditcheck}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: 20 }}
            >
              <div style={{ marginRight: 20 }}>
                <Button variant="outlined" onClick={handleCloseModalEdit}>
                  Quay lại
                </Button>
              </div>
              <div style={{ marginLeft: 20 }}>
                <Button variant="contained" onClick={handleAgrreEdit}>
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
export default MDPromotion;
