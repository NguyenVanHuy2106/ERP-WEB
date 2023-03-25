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
import {
  AiOutlineSearch,
  AiOutlinePlus,
  AiOutlineCheck,
  AiFillExclamationCircle,
} from "react-icons/ai";
import { FiEdit, FiTrash } from "react-icons/fi";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
// import Switch from "react-switch";
import {
  getAllDeliveryType,
  addNewDeliveryType,
  updateDeliveryType,
  deleteDeliveryType,
} from "../../../controller/deliveryTypeController";

import {
  getAllAPI,
  addNewAPI,
  updateAPI,
  deleteAPI,
} from "../../../controller/MDStoreTypeController";

import PaginationShop from "../../shops/paginationShopList";
import { el } from "date-fns/locale";
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
function MDStoreType({ route, navigate }) {
  const classes = useStyles();
  // const [tFValue, setTFValue] = useState("");
  const [tFStoreTypeValue, setTFStoreTypeValue] = useState("");
  const [tFDesValue, setTFDesValue] = useState("");
  const [tFStoreTypeEditValue, setTFStoreTypeEditValue] = useState("");
  const [tFDesEditValue, setTFDesEditValue] = useState("");
  const [tFEditMaxProductQuantity, setTFEditMaxProductQuantity] = useState("");
  const [tFEMaxProductQuantity, setTFMaxProductQuantity] = useState("");
  const [storeTypeIdEditValue, setStoreTypeIdEditValue] = useState("");
  const [isActived, setIsActived] = useState(false);
  const [isHasLimitStockEdit, setIsHasLimitStockEdit] = useState(false);
  const [isHasLimitStock, setIsHasLimitStock] = useState(true);
  let [loading, setLoading] = useState(false);
  const [errorMaxEdit, setErrorMaxEdit] = useState("");
  const [errorMax, setErrorMax] = useState("");
  var toDateDayjs = dayjs();
  var today = new Date();
  const [storeTypeData, setStoreTypeTypeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const handleOpenModalEdit = () => setOpenModalEdit(true);
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
    setErrorMaxEdit("");
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsError(false);
    setError("");
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
  const handleChangeLimitStockEdit = (event) => {
    setIsHasLimitStockEdit(event.target.checked);
  };
  const handleChangeLimitStock = (event) => {
    setIsHasLimitStock(event.target.checked);
  };

  const handleAgrre = async () => {
    if (tFStoreTypeValue.length === 0) {
      setError("Vui long nhap ten danh muc");
      setIsError(true);
    } else {
      handleCloseModal();
      setLoading(false);
      const result = await addNewAPI(
        userId,
        tFStoreTypeValue,
        tFDesValue,
        isHasLimitStock,
        tFEMaxProductQuantity
      );
      if (result.status === 200) {
        setLoading(true);
        HandleClick();
        setError("");
        setTFStoreTypeValue("");
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
    const result = await getAllAPI();
    if (result.status === 200) {
      //console.log(result.data.ResultObject.CategoryList);
      setStoreTypeTypeData(result.data.data.storeType);
      setLoading(true);
    }
  };
  const CheckActive = (isActive) => {
    if (isActive === 1) {
      return <AiOutlineCheck />;
    }
  };
  const handleDeleteDeliveryType = async (item) => {
    setLoading(false);
    const result = await deleteAPI(userId, item.storeTypeId);
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
  const currentPosts = storeTypeData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (item) => {
    setTFStoreTypeEditValue(item.storeTypeName);
    setTFDesEditValue(item.storeTypeDescription);
    setStoreTypeIdEditValue(item.storeTypeId);
    setTFEditMaxProductQuantity(item.maxProductQuantity);
    if (item.isActived == 1) setIsActived(true);
    else {
      setIsActived(false);
    }
    if (item.isHasLimitStock == 1) setIsHasLimitStockEdit(true);
    else {
      setIsHasLimitStockEdit(false);
    }

    handleOpenModalEdit();
  };
  const handleAgrreEdit = async () => {
    handleCloseModalEdit();
    setLoading(false);
    const result = await updateAPI(
      userId,
      storeTypeIdEditValue,
      tFStoreTypeEditValue,
      tFDesEditValue,
      isHasLimitStockEdit,
      tFEditMaxProductQuantity,
      isActived
    );
    if (result.status === 200) {
      setLoading(true);
      HandleClick();
    }
  };

  return (
    <div className="searchMargin-container" style={{ marginTop: "20px" }}>
      <div>
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
                  <th scope="col">Mã loại kho</th>
                  <th scope="col">Tên loại kho</th>
                  <th scope="col">Kích hoạt</th>
                  <th scope="col">Ngày tao</th>
                  <th scope="col">Người tao</th>
                  <th scope="col">Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((item, index) => (
                  <tr key={index}>
                    <th scope="item">{item.storeTypeId}</th>
                    <td>{item.storeTypeName}</td>

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
                        onClick={() => handleDeleteDeliveryType(item)}
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
              totalPosts={storeTypeData.length}
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
            <div className="border-bottom fw-bold">Thêm mới loại kho</div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: 20 }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên loại kho"
                variant="outlined"
                size="small"
                style={{ width: "90%" }}
                onChange={(newValue) =>
                  setTFStoreTypeValue(newValue.target.value)
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
            {/* <div style={{ marginTop: 10, marginLeft: 37 }}>
              Kích hoạt{" "}
              <Checkbox
                disabled
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div> */}
            <div style={{ marginTop: 10, marginLeft: 37 }}>
              <div className="row">
                <div className="col-3 d-flex align-items-center">
                  Kích hoạt{" "}
                </div>
                <Checkbox
                  disabled
                  className="col-1"
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="row">
                <div className="col-3 d-flex align-items-center">
                  Có giới hạn tồn kho{" "}
                </div>
                <Checkbox
                  className="col-1"
                  checked={isHasLimitStock}
                  onChange={handleChangeLimitStock}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              {errorMax && (
                <div
                  className="d-flex align-items-center"
                  style={{ color: "#FF0000" }}
                >
                  <div>
                    <AiFillExclamationCircle />
                  </div>
                  <div>{errorMax}</div>
                </div>
              )}
              <TextField
                id="outlined-multiline-flexible"
                label="Số lượng tồn tối đa"
                type="number"
                inputProps={{ max: 99999999 }}
                maxRows={6}
                style={{ width: "90%", marginTop: 5 }}
                value={tFEMaxProductQuantity}
                onChange={(value) => {
                  setErrorMax("");
                  setTFMaxProductQuantity(value.target.value);
                  if (tFEMaxProductQuantity.length > 10) {
                    setErrorMax("Lỗi vượt mức cho phép");
                  }
                }}
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
            <div className="border-bottom fw-bold">Chỉnh sửa loại kho</div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: 20 }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên loại kho"
                variant="outlined"
                size="small"
                style={{ width: "90%" }}
                value={tFStoreTypeEditValue}
                onChange={(value) =>
                  setTFStoreTypeEditValue(value.target.value)
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
              <div className="row">
                <div className="col-3 d-flex align-items-center">
                  Kích hoạt{" "}
                </div>
                <Checkbox
                  className="col-1"
                  checked={isActived}
                  onChange={handleEditcheck}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="row">
                <div className="col-3 d-flex align-items-center">
                  Có giới hạn tồn kho{" "}
                </div>
                <Checkbox
                  className="col-1"
                  checked={isHasLimitStockEdit}
                  onChange={handleChangeLimitStockEdit}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              {errorMaxEdit && (
                <div
                  className="d-flex align-items-center"
                  style={{ color: "#FF0000" }}
                >
                  <div>
                    <AiFillExclamationCircle />
                  </div>
                  <div>{errorMaxEdit}</div>
                </div>
              )}
              <TextField
                id="outlined-multiline-flexible"
                label="Số lượng tồn tối đa"
                type="number"
                inputProps={{ max: 99999999 }}
                maxRows={6}
                style={{ width: "90%", marginTop: 5 }}
                value={tFEditMaxProductQuantity}
                onChange={(value) => {
                  setErrorMaxEdit("");
                  setTFEditMaxProductQuantity(value.target.value);
                  if (tFEditMaxProductQuantity.length > 10) {
                    setErrorMaxEdit("Lỗi vượt mức cho phép");
                  }
                }}
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
export default MDStoreType;