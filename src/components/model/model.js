import React, { useState, useEffect, useStyle, useMemo } from "react";

import dayjs from "dayjs";
import { RingLoader, CircleLoader } from "react-spinners";
import { TextField } from "@mui/material";
import "./css/model.css";
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

import {
  getAllCategoryAPI,
  addNewCategoryAPI,
  updateDetailCategoryAPI,
  deleteCategoryAPI,
} from "../../controller/Category/CategoryController";
import {
  getAll,
  addNew,
  update,
  deleteAPI,
} from "../../controller/modelController";
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
function Model({ route, navigate }) {
  const classes = useStyles();
  const [tFValue, setTFValue] = useState("");
  const [tFModelValue, setTFModelValue] = useState("");
  const [tFBaseProductValue, setTFBaseProductValue] = useState("");
  const [tFBaseProductEditValue, setTFBaseProductEditValue] = useState("");
  const [tFDesValue, setTFDesValue] = useState("");
  const [tFModelEditValue, setTFModelEditValue] = useState("");
  const [tFDesEditValue, setTFDesEditValue] = useState("");
  const [modelIdEditValue, setModelIdEditValue] = useState("");
  const [isActived, setIsActived] = useState(false);
  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();
  const [modelData, setModelData] = useState([]);
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
  };
  const [checked, setChecked] = React.useState(true);
  const [editChecked, setEditChecked] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isError, setIsError] = useState(false);
  // const handleEditcheck = (event) => {
  //   setEditChecked(event.target.checked);
  // };
  const handleEditcheck = (event) => {
    setIsActived(event.target.checked);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleAgrre = async () => {
    if (tFModelValue.length === 0) {
      setError("Vui long nhap ten danh muc");
      setIsError(true);
    } else {
      handleCloseModal();
      setLoading(false);
      const result = await addNew(
        tFModelValue,
        tFDesValue,
        1,
        tFBaseProductValue
      );
      if (result.status === 200) {
        setLoading(true);
        HandleClick();
        setError("");
        setTFModelValue("");
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
    const result = await getAll(tFValue, fromDate, toDate);
    if (result.status === 200) {
      //console.log(result.data.ResultObject);
      setModelData(result.data.ResultObject.modelList);
      setLoading(true);
    }
  };
  const CheckActive = (isActive) => {
    if (isActive === 1) {
      return <AiOutlineCheck />;
    }
  };
  const handleDeleteModel = async (item) => {
    //console.log(item.MODELID);
    setLoading(false);
    const result = await deleteAPI(item.MODELID);
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
  const currentPosts = modelData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (item) => {
    setTFModelEditValue(item.MODELNAME);
    setTFDesEditValue(item.DESCRIPTION);
    setTFBaseProductEditValue(item.BASEPRODUCT);
    setModelIdEditValue(item.MODELID);
    if (item.ISACTIVED == 1) setIsActived(true);
    else {
      setIsActived(false);
    }

    handleOpenModalEdit();
  };
  const handleAgrreEdit = async () => {
    const toDate = valueToDate.format("YYYY-MM-DD");

    handleCloseModalEdit();
    setLoading(false);
    const result = await update(
      modelIdEditValue,
      tFModelEditValue,
      tFDesEditValue,
      isActived,
      1,
      toDate
    );
    if (result.status === 200) {
      setLoading(true);
      HandleClick();
    }
  };

  return (
    <div className="searchMargin-container" style={{ marginTop: "20px" }}>
      <div>
        <div
          className="d-flex border mt-3 containerBtn align-items-center"
          style={{ marginBottom: "10px" }}
        >
          <div className="titlePage ">KHAI BAO DANH SÁCH MODEL SẢN PHẨM</div>
        </div>
        <div className="d-flex justify-content-start  border search align-items-center">
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
        </div>
        <div className="d-flex border mt-3 containerBtn align-items-center justify-content-end">
          <div className="plus">
            <Button variant="contained" onClick={handleOpenModal}>
              <AiOutlinePlus size={20} />
            </Button>
          </div>
        </div>

        <div className="border border-top-0">
          <div className="d-flex">
            <table className="table mt-2 table-margin border">
              <thead>
                <tr className="backgroundTable">
                  <th scope="col">Mã model</th>
                  <th scope="col">Tên model</th>
                  <th scope="col">Sản phẩm cơ sở</th>
                  <th scope="col">Kich hoat</th>
                  <th scope="col">Ngay tao</th>
                  <th scope="col">Nguoi tao</th>
                  <th scope="col">Tac vu</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((item, index) => (
                  <tr key={index}>
                    <th scope="item">{item.MODELID}</th>
                    <td>{item.MODELNAME}</td>
                    <td>{item.BASEPRODUCT}</td>
                    <td>{CheckActive(item.ISACTIVED)}</td>
                    <td>{new Date(item.CREATEDDATE).toLocaleDateString()}</td>
                    <td>{item.CREATEDUSER}</td>
                    <td>
                      <FiEdit
                        className="edit"
                        size={20}
                        onClick={() => handleEditClick(item)}
                      />
                      <FiTrash
                        className="delete"
                        size={20}
                        onClick={() => handleDeleteModel(item)}
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
              totalPosts={modelData.length}
              paginate={paginate}
            />
          </div>
        </div>

        <div className="d-flex  align-items-center justify-content-end">
          <div className="plus">CopyRight</div>
        </div>
      </div>
      <div>
        <Modal
          open={openModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="border-bottom fw-bold">Thêm mới Model sản phẩm</div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: 20 }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên Model"
                variant="outlined"
                size="small"
                style={{ width: "90%" }}
                onChange={(newValue) => setTFModelValue(newValue.target.value)}
                helperText={error}
                error={isError}
              />
              <TextField
                required
                id="outlined-basic"
                label="Sản phẩm cơ sở"
                variant="outlined"
                size="small"
                style={{ width: "90%", marginTop: 10 }}
                onChange={(newValue) =>
                  setTFBaseProductValue(newValue.target.value)
                }
                helperText={error}
                error={isError}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Mô tả"
                multiline
                maxRows={6}
                style={{ width: "90%", marginTop: 10 }}
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
            <div className="border-bottom fw-bold">
              Chỉnh sửa Model sản phẩm
            </div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: 20 }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên Model"
                variant="outlined"
                size="small"
                style={{ width: "90%" }}
                value={tFModelEditValue}
                onChange={(value) => setTFModelEditValue(value.target.value)}
              />
              <TextField
                required
                id="outlined-basic"
                label="Sản phẩm cơ sở"
                variant="outlined"
                size="small"
                style={{ width: "90%", marginTop: 10 }}
                value={tFBaseProductEditValue}
                onChange={(value) =>
                  setTFBaseProductEditValue(value.target.value)
                }
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Mô tả"
                multiline
                maxRows={6}
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
export default Model;
