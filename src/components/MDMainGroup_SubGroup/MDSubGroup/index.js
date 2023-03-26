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

import {
  getAllSubGroup,
  addNewSubGroup,
  updateSubGroup,
  deleteSubGroup,
} from "../../../controller/subGroup";
import {
  getAllMainGroup,
  getMainGroupById,
} from "../../../controller/mainGroupController";

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
        tFDesValue
      );
      if (result.status === 200) {
        setLoading(true);
        HandleClick();
        setError("");
        setTFSubGroupValue("");
        setMainGroupSelect("");
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
    const result = await deleteSubGroup(userId, item.subgroupId);
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

    setMainGroupSelectEdit(item.maingroupId);

    setSubGroupIdValueEdit(item.subgroupId);
    if (item.isActived === 1) setCheckedActivedEdit(true);
    else {
      setCheckedActivedEdit(false);
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
      checkedActiveEdit
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
        <div className="d-flex border containerBtn align-items-center justify-content-end">
          <div className="plus">
            <Button variant="contained" onClick={handleOpenModal}>
              <AiOutlinePlus size={20} />
            </Button>
          </div>
        </div>

        <div className="border border-top-0" style={{ background: "#ffffff" }}>
          <div className="d-flex">
            <table className="table mt-3 table-margin border">
              <thead>
                <tr style={{ background: "#e5e4e2" }}>
                  <th scope="col">Mã nhóm hàng</th>
                  <th scope="col">Tên nhóm hàng</th>
                  <th scope="col">Ngành hàng</th>
                  <th scope="col">Kích hoạt</th>
                  <th scope="col">Ngay tao</th>
                  <th scope="col">Nguoi tao</th>
                  <th scope="col">Tac vu</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((item, index) => (
                  <tr key={index}>
                    <th scope="item">{item.subgroupId}</th>
                    <td>{item.subgroupName}</td>
                    <td>{item.maingroupId}</td>
                    {/* <td>{item.MAINGROUPID + "-" + item.MAINGROUPNAME}</td> */}
                    <td>{CheckActive(item.isActived)}</td>
                    <td>{new Date(item.createdDate).toLocaleDateString()}</td>
                    <td>{item.createdUser}</td>
                    <td>
                      <FiEdit
                        className="edit"
                        size={20}
                        onClick={() => handleEditClick(item)}
                      />
                      <FiTrash
                        className="delete"
                        size={20}
                        onClick={() => handleDeleteSubGroup(item)}
                      />
                    </td>
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
            <div className="border-bottom fw-bold">Thêm mới nhóm hàng</div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: 20 }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên nhóm hàng"
                variant="outlined"
                size="small"
                style={{ width: "90%" }}
                onChange={(newValue) =>
                  setTFSubGroupValue(newValue.target.value)
                }
                helperText={error}
                error={isError}
              />
              <FormControl
                sx={{ m: 1, width: "90%", marginTop: 1 }}
                size="small"
              >
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
                maxRows={6}
                style={{ width: "90%", marginTop: 5 }}
                onChange={(newValue) => setTFDesValue(newValue.target.value)}
              />
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
            <div className="border-bottom fw-bold">
              Chỉnh sửa nhóm hàng sản phẩm
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
                size="small"
                style={{ width: "90%" }}
                value={tFSubGroupEditValue}
                onChange={(newValue) =>
                  setTFSubGroupEditValue(newValue.target.value)
                }
                helperText={error}
                error={isError}
              />
              <FormControl
                sx={{ m: 1, width: "90%", marginTop: 1 }}
                size="small"
              >
                {/* <InputLabel id="demo-select-small">Ngành hàng</InputLabel> */}
                <NativeSelect
                  value={mainGroupSelectEdit}
                  className="border-top border-start border-end rounded "
                  style={{ height: 40, paddingLeft: 10 }}
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
                maxRows={6}
                style={{ width: "90%", marginTop: 5 }}
                value={tFDesEditValue}
                onChange={(newValue) =>
                  setTFDesEditValue(newValue.target.value)
                }
              />
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
