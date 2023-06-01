import React, { useState, useEffect, useStyle, useMemo } from "react";

import dayjs from "dayjs";
import { RingLoader, CircleLoader } from "react-spinners";
import { TextField } from "@mui/material";
import "./css/subGroup.css";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { storage } from "../../../server/FirebaseConfig";

import {
  getAllSubGroup,
  addNewSubGroup,
  updateSubGroup,
  deleteSubGroup,
} from "../../../controller/MDSubGroupController";
import {
  getAllMainGroup,
  getMainGroupById,
} from "../../../controller/MDMainGroupController";

import PaginationShop from "../../shops/paginationShopList";
import { height } from "@mui/system";

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
function MDSubGroup({ route, navigate }) {
  const classes = useStyles();
  const [tFValue, setTFValue] = useState("");
  const [tFSubGroupValue, setTFSubGroupValue] = useState("");
  const [tFDesValue, setTFDesValue] = useState("");
  //const [tFMainGroupEditValue, setTFSubGroupEditValue] = useState("");
  const [tFDesEditValue, setTFDesEditValue] = useState("");
  const [mainGroupEditValue, setMainGroupEditValue] = useState("");
  const [isActived, setIsActived] = useState(false);
  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();
  const [subGroupData, setSubGroupData] = useState([]);
  //const [valueCatData, setValueCatData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [mainGroupSelect, setMainGroupSelect] = React.useState("");
  const [mainGroupSelectEdit, setMainGroupSelectEdit] = React.useState("");
  const [mainGroupData, setMainGroupData] = useState([]);
  const [tFSubGroupEditValue, setTFSubGroupEditValue] = React.useState("");
  const [subGroupIdValueEdit, setSubGroupIdValueEdit] = React.useState("");
  const [tFDesValueEdit, setTFDesValueEdit] = React.useState("");

  const handleChangeSelect = (event) => {
    setMainGroupSelect(event.target.value);
  };
  const handleChangeSelectEdit = (event) => {
    setMainGroupSelectEdit(event.target.value);
  };
  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
    HandleGetMainGroup();
  };
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
    HandleGetMainGroup();
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsError(false);
    setError("");
    setMainGroupSelect("");
    setUrl("");
  };
  const [checked, setChecked] = React.useState(true);
  const [checkedIMEI, setCheckedIMEI] = React.useState(true);
  const [checkedStock, setCheckedStock] = React.useState(true);
  const [isCanReturnOutput, setIsCanReturnOutput] = React.useState(true);
  const [isAutoCreateIMEI, setIsAutoCreateIMEI] = React.useState(true);

  const [error, setError] = React.useState("");

  const [checkedActiveEdit, setCheckedActivedEdit] = React.useState(true);
  const [checkedIMEIEdit, setCheckedIMEIEdit] = React.useState(true);
  const [checkedStockEdit, setCheckedStockEdit] = React.useState(true);
  const [isCanReturnOutputEdit, setIsCanReturnOutputEdit] =
    React.useState(true);
  const [isAutoCreateIMEIEdit, setIsAutoCreateIMEIEdit] = React.useState(true);
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

  const handleEditcheck = (event) => {
    setIsActived(event.target.checked);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleChangeActiveEdit = (event) => {
    setCheckedActivedEdit(event.target.checked);
  };

  const handleChangeIMEI = (event) => {
    setCheckedIMEI(event.target.checked);
  };
  const handleChangeIMEIEdit = (event) => {
    setCheckedIMEIEdit(event.target.checked);
  };
  const handleChangeStock = (event) => {
    setCheckedStock(event.target.checked);
  };
  const handleChangeStockEdit = (event) => {
    setCheckedStockEdit(event.target.checked);
  };
  const handleChangeReturnOutput = (event) => {
    setIsCanReturnOutput(event.target.checked);
  };
  const handleChangeReturnOutputEdit = (event) => {
    setIsCanReturnOutputEdit(event.target.checked);
  };
  const handleChangeAutoCreateIMEI = (event) => {
    setIsAutoCreateIMEI(event.target.checked);
  };
  const handleChangeAutoCreateIMEIEdit = (event) => {
    setIsAutoCreateIMEIEdit(event.target.checked);
  };
  const handleAgrre = async () => {
    if (tFSubGroupValue.length === 0) {
      setError("Vui long nhap ten danh muc");
      setIsError(true);
    } else {
      handleCloseModal();
      setLoading(false);
      const result = await addNewSubGroup(
        userId,
        tFSubGroupValue,

        mainGroupSelect,
        tFDesValue,
        url,
        checkedIMEI
      );
      if (result.status === 200) {
        setLoading(true);
        HandleClick();
        setError("");
        setTFSubGroupValue("");
        setMainGroupSelect("");
        setUrl("");
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
  const HandleClick = async () => {
    setLoading(false);
    const fromDate = valueFromDate.format("YYYY-MM-DD");
    const toDate = valueToDate.format("YYYY-MM-DD");
    //console.log(tFValue, fromDate, toDate);
    const result = await getAllSubGroup();
    if (result.status === 200) {
      //console.log(result.data);
      setSubGroupData(result.data.data.subgroups);
      setLoading(true);
    }
  };
  const HandleGetMainGroup = async () => {
    const result = await getAllMainGroup();
    if (result.status === 200) {
      //console.log(result.data.ResultObject);
      setMainGroupData(result.data.data.maingroups);
      //console.log(result.data.ResultObject.mainGroupList);
    }
  };
  const CheckActive = (isActive) => {
    if (isActive === 1) {
      return <AiOutlineCheck />;
    }
  };
  const handleDeleteSubGroup = async (item) => {
    //console.log(item.MODELID);
    setLoading(false);
    const result = await deleteSubGroup(userId, selectedItems);
    if (result.status === 200) {
      setLoading(true);
      HandleClick();
    }
  };

  useEffect(() => {
    setTime();
    HandleClick();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = subGroupData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (item) => {
    setTFSubGroupEditValue(item.subgroupName);
    setTFDesEditValue(item.subgroupDescription);
    setUrlEdit(item.subgroupImagePath);
    setMainGroupSelectEdit(item.maingroupId);

    setSubGroupIdValueEdit(item.subgroupId);
    if (item.isActived === 1) setCheckedActivedEdit(true);
    else {
      setCheckedActivedEdit(false);
    }
    if (item.isRequestImei === 1) setCheckedIMEIEdit(true);
    else {
      setCheckedIMEIEdit(false);
    }

    handleOpenModalEdit();
  };
  const handleAgrreEdit = async () => {
    const toDate = valueToDate.format("YYYY-MM-DD");

    handleCloseModalEdit();
    setLoading(false);
    const result = await updateSubGroup(
      userId,
      subGroupIdValueEdit,
      tFSubGroupEditValue,
      mainGroupSelectEdit,
      tFDesEditValue,
      checkedIMEIEdit,
      checkedActiveEdit,
      urlEdit
    );
    if (result.status === 200) {
      setLoading(true);
      HandleClick();
    }
  };
  // const getMainGroupName = async (item) => {
  //   const result = await getMainGroupById(userId, item);
  //   if (result.status === 200) {
  //     return <td>{result.data.data.maingroups.maingroupName}</td>;
  //   }
  // };

  //////////firebase
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

  return (
    <div>
      <div className="mt-2">
        {/* <div
          className="d-flex border mt-3 containerBtn align-items-center"
          style={{ marginBottom: "10px" }}
        >
          <div className="titlePage ">KHAI BÁO NHÓM HÀNG SẢN PHẨM</div>
        </div> */}
        {/* <div className="d-flex justify-content-start  border search align-items-center">
          <div className="searchMargin">
            <TextField
              id="outlined-basic"
              label="Tu khoa"
              variant="outlined"
              size="small"
              onChange={(newValue) => setTFValue(newValue.target.value)}
            />
          </div>
          <div className="searchMargin">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Từ ngày"
                  value={valueFromDate}
                  minDate={dayjs("2017-01-01")}
                  onChange={(newValue) => {
                    setValueFromDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <div className="searchMargin">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Đến ngày"
                  value={valueToDate}
                  minDate={dayjs("2017-01-01")}
                  onChange={(newValue) => {
                    setValueToDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <div className="searchMargin">
            <Button variant="contained" onClick={HandleClick}>
              <AiOutlineSearch size={20} />
              Tim kiem
            </Button>
          </div>
        </div> */}
        <div className="d-flex containerBtn align-items-center justify-content-end">
          <div className="d-flex containerBtn align-items-center justify-content-end">
            <div className="plus" style={{ marginRight: "10px" }}>
              <Button variant="contained" onClick={handleDeleteSubGroup}>
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
        </div>

        <div
          style={{
            background: "#ffffff",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          <div className="d-flex">
            <table className="table mt-3 ">
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
                    className="col-3"
                  >
                    Tên nhóm hàng
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-2"
                  >
                    Ngành hàng
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
                    Ngay tao
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Nguoi tao
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
                          checked={selectedItems.includes(item.subgroupId)}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.subgroupId)
                          }
                        />
                      </label>
                    </td>
                    <th scope="item">{item.subgroupId}</th>
                    <td
                      className="subGroupText"
                      onClick={() => handleEditClick(item)}
                    >
                      {item.subgroupName}
                    </td>
                    <td>{item.maingroupId}</td>
                    {/* <td>{item.MAINGROUPID + "-" + item.MAINGROUPNAME}</td> */}
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
              totalPosts={subGroupData.length}
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
              style={{ paddingBottom: "20px" }}
            >
              Thêm mới nhóm hàng
            </div>

            <div style={{ marginLeft: 37, marginTop: 12 }}>
              <label htmlFor="image-uploader">
                {url ? (
                  <img src={url} alt="Selected file" width={150} height={150} />
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
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              {/* <input type="file" onChange={handleImageChange} />
              {url && <img src={url} alt="Uploaded" width="150" height="100" />} */}
            </div>

            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: 20 }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên nhóm hàng"
                variant="outlined"
                style={{ width: "90%" }}
                onChange={(newValue) =>
                  setTFSubGroupValue(newValue.target.value)
                }
                helperText={error}
                error={isError}
              />
              <FormControl sx={{ m: 1, width: "90%", marginTop: "18px" }}>
                <InputLabel id="demo-select-small">Ngành hàng</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={mainGroupSelect}
                  label="Ngành hàng"
                  onChange={handleChangeSelect}
                >
                  <MenuItem value="">
                    <em>---Chọn ngành hàng---</em>
                  </MenuItem>
                  {mainGroupData.map((item, index) => (
                    <MenuItem key={item.maingroupId} value={item.maingroupId}>
                      {item.maingroupId + " - " + item.maingroupName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="outlined-multiline-flexible"
                label="Mô tả"
                multiline
                rows={6}
                style={{ width: "90%", marginTop: "10px" }}
                onChange={(newValue) => setTFDesValue(newValue.target.value)}
              />
            </div>
            <div style={{ marginTop: 10, marginLeft: 37 }}>
              <div className="row">
                <div className="col-3 d-flex align-items-center">
                  Yêu cầu IMEI
                </div>
                <Checkbox
                  className="col-1"
                  checked={checkedIMEI}
                  onChange={handleChangeIMEI}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
            <div style={{ marginTop: 10, marginLeft: 37 }}>
              <div className="row">
                <div className="col-3 d-flex align-items-center">
                  Kích hoạt{" "}
                </div>
                <Checkbox
                  className="col-1"
                  disabled
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
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
              style={{ paddingBottom: 20 }}
            >
              Chỉnh sửa nhóm hàng sản phẩm
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
                label="Tên nhóm hàng"
                variant="outlined"
                style={{ width: "90%" }}
                value={tFSubGroupEditValue}
                onChange={(newValue) =>
                  setTFSubGroupEditValue(newValue.target.value)
                }
                helperText={error}
                error={isError}
              />
              <FormControl sx={{ m: 1, width: "90%", marginTop: "16px" }}>
                {/* <InputLabel id="demo-select-small">Ngành hàng</InputLabel> */}
                <NativeSelect
                  value={mainGroupSelectEdit}
                  className="border-top border-start border-end rounded "
                  style={{ height: 60, paddingLeft: 10 }}
                  inputProps={{
                    name: "age",
                  }}
                  onChange={handleChangeSelectEdit}
                >
                  {mainGroupData.map((item) => (
                    <option key={item.maingroupId} value={item.maingroupId}>
                      {item.maingroupId + " - " + item.maingroupName}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
              <TextField
                id="outlined-multiline-flexible"
                label="Mô tả"
                multiline
                rows={6}
                style={{ width: "90%", marginTop: "16px" }}
                value={tFDesEditValue}
                onChange={(newValue) =>
                  setTFDesEditValue(newValue.target.value)
                }
              />
            </div>
            <div style={{ marginTop: 10, marginLeft: 37 }}>
              <div className="row">
                <div className="col-3 d-flex align-items-center">
                  Yêu cầu IMEI
                </div>
                <Checkbox
                  className="col-1"
                  checked={checkedIMEIEdit}
                  onChange={handleChangeIMEIEdit}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
            <div style={{ marginTop: 10, marginLeft: 37 }}>
              <div className="row">
                <div className="col-3 d-flex align-items-center">
                  Kích hoạt{" "}
                </div>
                <Checkbox
                  className="col-1"
                  checked={checkedActiveEdit}
                  onChange={handleChangeActiveEdit}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
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
export default MDSubGroup;
