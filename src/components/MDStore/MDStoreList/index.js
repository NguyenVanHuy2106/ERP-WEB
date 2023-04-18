import React, { useState, useEffect, useStyle, useMemo } from "react";

import dayjs from "dayjs";
import { RingLoader, CircleLoader } from "react-spinners";
import { TextField } from "@mui/material";
import "../css/index.css";
// import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { FiEdit, FiTrash } from "react-icons/fi";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import Switch from "react-switch";
import {
  getAllDeliveryType,
  addNewDeliveryType,
  updateDeliveryType,
  deleteDeliveryType,
} from "../../../controller/MDDeliveryTypeController";
import {
  getAllStoreAPI,
  addNewStoreAPI,
  updateStoreAPI,
  deleteStoreAPI,
} from "../../../controller/MDStoreController";
import {
  getProvinceAPI,
  getDistrictAPI,
  getWardAPI,
} from "../../../controller/APIGHN";
import { getAllAPI } from "../../../controller/MDStoreTypeController";
import PaginationShop from "../../shops/paginationShopList";
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
function MDStoreList({ route, navigate }) {
  const classes = useStyles();
  // const [tFValue, setTFValue] = useState("");
  const [tFStoreValue, setTFStoreValue] = useState("");
  const [tFStoreValueEdit, setTFStoreValueEdit] = useState("");
  const [tFAddressValue, setTFAddressValue] = useState("");
  const [tFAddressValueEdit, setTFAddressValueEdit] = useState("");
  const [tFStoreManagerValue, setTFStoreManagerValue] = useState("");
  const [tFStoreManagerValueEdit, setTFStoreManagerValueEdit] = useState("");
  const [tFDesValue, setTFDesValue] = useState("");
  const [tFDeliveryTypeEditValue, setTFDeliveryTypeEditValue] = useState("");
  const [tFDesEditValue, setTFDesEditValue] = useState("");
  const [storeIdEditValue, setStoreIdEditValue] = useState("");
  const [isActived, setIsActived] = useState(false);
  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();
  ////Province
  const [provinceList, setProvinceList] = useState([]);
  const [provinceIdSelect, setProvinceIdSelect] = useState("");
  const [provinceIdSelectEdit, setProvinceIdSelectEdit] = useState("");
  ///district
  const [districtList, setDistrictList] = useState([]);
  const [districtIdSelect, setDistrictIdSelect] = useState("");
  const [districtIdSelectEdit, setDistrictIdSelectEdit] = useState("");
  ///Ward
  const [wardList, setWardList] = useState([]);
  const [wardIdSelect, setWardIdSelect] = useState("");
  const [wardIdSelectEdit, setWardIdSelectEdit] = useState("");
  ///storeType
  const [storeTypeList, setStoreTypeList] = useState([]);
  const [storeTypeIdSelect, setStoreTypeIdSelect] = useState("");
  const [storeTypeIdSelectEdit, setStoreTypeIdSelectEdit] = useState("");

  const [storeData, setStoreData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
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
  const handleOpenModalEdit = () => setOpenModalEdit(true);
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsError(false);
    setError("");
    setTFStoreValue("");
    setStoreTypeIdSelect("");
    setTFStoreManagerValue("");
    setProvinceIdSelect("");
    setDistrictIdSelect("");
    setWardIdSelect("");
    setTFAddressValue("");
  };
  const [checked, setChecked] = React.useState(true);
  // const [editChecked, setEditChecked] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isError, setIsError] = useState(false);
  let userId = localStorage.getItem("userId");

  const handleEditcheck = (event) => {
    setIsActived(event.target.checked);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleAgrre = async () => {
    if (tFStoreValue.length === 0) {
      setError("Vui long nhap ten danh muc");
      setIsError(true);
    } else {
      handleCloseModal();
      setLoading(false);
      //     userLogin,
      // storeName,
      // description,
      // storeProvinceId,
      // storeDistrictId,
      // storeWardId,
      // storeAddress,
      // storeManager,
      // storeTypeId
      const result = await addNewStoreAPI(
        userId,
        tFStoreValue,
        tFDesValue,
        provinceIdSelect,
        districtIdSelect,
        wardIdSelect,
        tFAddressValue,
        tFStoreManagerValue,
        storeTypeIdSelect
      );
      if (result.status === 200) {
        setLoading(true);
        HandleClick();
        setError("");
        setTFStoreValue("");
        setStoreTypeIdSelect("");
        setTFStoreManagerValue("");
        setProvinceIdSelect("");
        setDistrictIdSelect("");
        setWardIdSelect("");
        setTFAddressValue("");
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
    }, 2000);
  };
  const HandleClick = async () => {
    setLoading(false);
    const fromDate = valueFromDate.format("YYYY-MM-DD");
    const toDate = valueToDate.format("YYYY-MM-DD");
    //console.log(tFValue, fromDate, toDate);
    const result = await getAllStoreAPI();
    if (result.status === 200) {
      //console.log(result.data.ResultObject.CategoryList);
      setStoreData(result.data.data.store);
      setLoading(true);
    }
  };
  const CheckActive = (isActive) => {
    if (isActive === 1) {
      return <AiOutlineCheck />;
    }
  };
  const handleDeleteStore = async () => {
    setLoading(false);
    const result = await deleteStoreAPI(userId, selectedItems);
    if (result.status === 200) {
      setLoading(true);
      HandleClick();
    }
  };

  const handleChangeProvince = (event) => {
    setProvinceIdSelect(event.target.value);
    getDistrictList(event.target.value);
    setDistrictIdSelect("");
    setWardIdSelect("");
  };
  const handleChangeProvinceEdit = (event) => {
    setProvinceIdSelectEdit(event.target.value);
    getDistrictList(event.target.value);
    setDistrictIdSelectEdit("");
    setWardIdSelectEdit("");
  };

  const handleChangeDistrict = (event) => {
    setDistrictIdSelect(event.target.value);
    getWardList(event.target.value);
    setWardIdSelect("");
  };
  const handleChangeDistrictEdit = (event) => {
    setDistrictIdSelectEdit(event.target.value);
    getWardList(event.target.value);
    setWardIdSelectEdit("");
  };
  const handleChangeWard = (event) => {
    setWardIdSelect(event.target.value);
  };
  const handleChangeWardEdit = (event) => {
    setWardIdSelectEdit(event.target.value);
  };
  const handleChangeStoreType = (event) => {
    setStoreTypeIdSelect(event.target.value);
  };
  const handleChangeStoreTypeEdit = (event) => {
    setStoreTypeIdSelectEdit(event.target.value);
  };

  const getProvinceList = async () => {
    const result = await getProvinceAPI();
    if (result.status === 200) {
      setProvinceList(result.data.data);
    }
  };
  const getDistrictList = async (province_id) => {
    const result = await getDistrictAPI(province_id);
    if (result.status === 200) {
      setDistrictList(result.data.data);
    }
  };

  const getWardList = async (district_id) => {
    const result = await getWardAPI(district_id);
    if (result.status === 200) {
      setWardList(result.data.data);
    }
  };
  const getStoreType = async () => {
    const result = await getAllAPI();
    if (result.status === 200) {
      setStoreTypeList(result.data.data.storeType);
    }
  };

  useEffect(() => {
    setTime();
    getProvinceList();
    getStoreType();
    HandleClick();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = storeData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (item) => {
    setStoreIdEditValue(item.storeId);
    setTFStoreValueEdit(item.storeName);
    setTFStoreManagerValueEdit(item.storeManager);
    setTFAddressValueEdit(item.storeAddress);
    setWardIdSelectEdit(item.storeWardId);
    setDistrictIdSelectEdit(item.storeDistrictId);
    setProvinceIdSelectEdit(item.storeProvinceId);
    setTFDesEditValue(item.description);
    setStoreTypeIdSelectEdit(item.storeTypeId);
    if (item.isActived === 1) setIsActived(true);
    else {
      setIsActived(false);
    }

    handleOpenModalEdit();
  };
  const handleAgrreEdit = async () => {
    const toDate = valueToDate.format("YYYY-MM-DD");

    handleCloseModalEdit();
    setLoading(false);
    //   userLogin,
    // storeId,
    // storeName,
    // description,
    // storeProvinceId,
    // storeDistrictId,
    // storeWardId,
    // storeAddress,
    // storeManager,
    // storeTypeId,
    // isActived
    const result = await updateStoreAPI(
      userId,
      storeIdEditValue,
      tFStoreValueEdit,
      tFDesEditValue,
      provinceIdSelectEdit,
      districtIdSelectEdit,
      wardIdSelectEdit,
      tFAddressValueEdit,
      tFStoreManagerValueEdit,
      storeTypeIdSelectEdit,
      isActived
    );
    if (result.status === 200) {
      setLoading(true);
      HandleClick();
    }
  };

  return (
    <div>
      <div className="mt-2">
        <div className="d-flex containerBtn align-items-center justify-content-end">
          <div className="plus" style={{ marginRight: "10px" }}>
            <Button variant="contained" onClick={handleDeleteStore}>
              <div
                style={{
                  display: "flex",
                  paddingBottom: "3px",
                  paddingTop: "3px",
                  paddingLeft: 15,
                  paddingRight: 15,
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <FaRegTrashAlt size={18} />
                <div
                  style={{
                    fontWeight: "bold",
                    paddingLeft: "8px",
                  }}
                >
                  Xoá
                </div>
              </div>
            </Button>
          </div>
          <div className="plus" style={{ marginRight: "50px" }}>
            <Button variant="contained" onClick={handleOpenModal}>
              <div
                style={{
                  display: "flex",
                  paddingBottom: "3px",
                  paddingTop: "3px",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <FaPlus size={18} />
                <div
                  style={{
                    fontWeight: "bold",
                    paddingLeft: "8px",
                  }}
                >
                  Thêm mới
                </div>
              </div>
            </Button>
          </div>
        </div>

        <div className="" style={{ background: "#ffffff" }}>
          <div
            className="d-flex"
            style={{ marginLeft: "50px", marginRight: "50px" }}
          >
            <table className="table mt-3">
              <thead>
                <tr style={{ background: "#848482" }}>
                  <th className="col-0">
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
                    Tên kho
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Kích hoạt
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Ngày tạo
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Người tạo
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((item, index) => (
                  <tr key={index}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.storeId)}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.storeId)
                          }
                        />
                      </label>
                    </th>
                    <th scope="item">{item.storeId}</th>
                    <td
                      onClick={() => handleEditClick(item)}
                      className="titleText"
                    >
                      {item.storeName}
                    </td>

                    <td>{CheckActive(item.isActived)}</td>
                    <td>{new Date(item.createdDate).toLocaleDateString()}</td>
                    <td>{item.createdUser}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            <PaginationShop
              postsPerPage={postsPerPage}
              totalPosts={storeData.length}
              paginate={paginate}
            />
          </div>
        </div>

        {/* <div className="d-flex  align-items-center justify-content-end">
          <div className="plus">CopyRight</div>
        </div> */}
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
              style={{ paddingBottom: "20px" }}
            >
              Thêm mới kho
            </div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: "20px" }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên kho"
                variant="outlined"
                style={{ width: "90%" }}
                onChange={(newValue) => setTFStoreValue(newValue.target.value)}
                helperText={error}
                error={isError}
              />
              <TextField
                id="outlined-basic"
                label="Thủ kho"
                variant="outlined"
                style={{ width: "90%", marginTop: "12px" }}
                onChange={(newValue) =>
                  setTFStoreManagerValue(newValue.target.value)
                }
              />
              <FormControl sx={{ m: 1, width: "90%", marginTop: "12px" }}>
                <InputLabel id="demo-select-small">Chọn loại kho</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={storeTypeIdSelect}
                  label="Chọn loại kho"
                  onChange={handleChangeStoreType}
                >
                  <MenuItem value="">
                    <em>---Chọn loại kho---</em>
                  </MenuItem>
                  {storeTypeList.map((item, index) => (
                    <MenuItem key={index} value={item.storeTypeId}>
                      {item.storeTypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div
                className="d-flex justify-content-between"
                style={{ width: "90%", marginTop: "6px" }}
              >
                <div>
                  <FormControl sx={{ m: 0, width: 215 }}>
                    <InputLabel id="demo-select-small">Chọn Tỉnh/TP</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={provinceIdSelect || ""}
                      label="Chọn Tỉnh/TP"
                      onChange={handleChangeProvince}
                    >
                      <MenuItem value="">
                        <em>---Chọn Tỉnh/TP---</em>
                      </MenuItem>
                      {provinceList.map((item, index) => (
                        <MenuItem key={index} value={item.ProvinceID}>
                          {item.ProvinceName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <FormControl sx={{ m: 0, width: 215 }}>
                  <InputLabel id="demo-select-small">
                    Chọn Quận/Huyện
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={districtIdSelect || ""}
                    label="Chọn Quân/Huyện"
                    onChange={handleChangeDistrict}
                  >
                    <MenuItem value="">
                      <em>---Chọn Quận/Huyện---</em>
                    </MenuItem>
                    {districtList.map((item, index) => (
                      <MenuItem key={index} value={item.DistrictID}>
                        {item.DistrictName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 0, width: 215 }}>
                  <InputLabel id="demo-select-small">Chọn Phường/Xã</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={wardIdSelect || ""}
                    label="Chọn Phường/Xã"
                    onChange={handleChangeWard}
                  >
                    <MenuItem value="">
                      <em>---Chọn Phường/Xã---</em>
                    </MenuItem>
                    {wardList.map((item, index) => (
                      <MenuItem key={index} value={item.WardCode}>
                        {item.WardName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <TextField
                id="outlined-basic"
                label="Địa chỉ"
                variant="outlined"
                style={{ width: "90%", marginTop: "12px" }}
                onChange={(newValue) =>
                  setTFAddressValue(newValue.target.value)
                }
              />

              <TextField
                id="outlined-multiline-flexible"
                label="Mô tả"
                multiline
                rows={6}
                style={{ width: "90%", marginTop: "20px" }}
                onChange={(newValue) => setTFDesValue(newValue.target.value)}
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
            <div
              className="border-bottom fw-bold"
              style={{ paddingBottom: "20px" }}
            >
              Chỉnh sửa hình thức giao hàng
            </div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: "20px" }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên kho"
                variant="outlined"
                style={{ width: "90%" }}
                value={tFStoreValueEdit}
                onChange={(newValue) =>
                  setTFStoreValueEdit(newValue.target.value)
                }
                helperText={error}
                error={isError}
              />
              <TextField
                id="outlined-basic"
                label="Thủ kho"
                variant="outlined"
                style={{ width: "90%", marginTop: "12px" }}
                value={tFStoreManagerValueEdit}
                onChange={(newValue) =>
                  setTFStoreManagerValueEdit(newValue.target.value)
                }
              />
              <FormControl sx={{ m: 1, width: "90%", marginTop: "12px" }}>
                <InputLabel id="demo-select-small">Chọn loại kho</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={storeTypeIdSelectEdit}
                  label="Chọn loại kho"
                  onChange={handleChangeStoreTypeEdit}
                >
                  <MenuItem value="">
                    <em>---Chọn loại kho---</em>
                  </MenuItem>
                  {storeTypeList.map((item, index) => (
                    <MenuItem key={index} value={item.storeTypeId}>
                      {item.storeTypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div
                className="d-flex justify-content-between"
                style={{ width: "90%" }}
              >
                <div>
                  <FormControl sx={{ m: 1, marginTop: "12px", width: 200 }}>
                    <InputLabel id="demo-select-small">Chọn Tỉnh/TP</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={provinceIdSelectEdit || ""}
                      label="Chọn Tỉnh/TP"
                      onChange={handleChangeProvinceEdit}
                    >
                      <MenuItem value="">
                        <em>---Chọn Tỉnh/TP---</em>
                      </MenuItem>
                      {provinceList.map((item, index) => (
                        <MenuItem key={index} value={item.ProvinceID}>
                          {item.ProvinceName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <FormControl sx={{ m: 1, marginTop: "12px", width: 200 }}>
                  <InputLabel id="demo-select-small">
                    Chọn Quận/Huyện
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={districtIdSelectEdit || ""}
                    label="Chọn Quân/Huyện"
                    onChange={handleChangeDistrictEdit}
                  >
                    <MenuItem value="">
                      <em>---Chọn Quận/Huyện---</em>
                    </MenuItem>
                    {districtList.map((item, index) => (
                      <MenuItem key={index} value={item.DistrictID}>
                        {item.DistrictName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, marginTop: "12px", width: 200 }}>
                  <InputLabel id="demo-select-small">Chọn Phường/Xã</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={wardIdSelectEdit || ""}
                    label="Chọn Phường/Xã"
                    onChange={handleChangeWardEdit}
                  >
                    <MenuItem value="">
                      <em>---Chọn Phường/Xã---</em>
                    </MenuItem>
                    {wardList.map((item, index) => (
                      <MenuItem key={index} value={item.WardCode}>
                        {item.WardName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <TextField
                id="outlined-basic"
                label="Địa chỉ"
                variant="outlined"
                style={{ width: "90%", marginTop: "12px" }}
                value={tFAddressValueEdit}
                onChange={(newValue) =>
                  setTFAddressValueEdit(newValue.target.value)
                }
              />

              <TextField
                id="outlined-multiline-flexible"
                label="Mô tả"
                multiline
                rows={6}
                style={{ width: "90%", marginTop: "20px" }}
                value={tFDesEditValue}
                onChange={(newValue) =>
                  setTFDesEditValue(newValue.target.value)
                }
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
export default MDStoreList;
