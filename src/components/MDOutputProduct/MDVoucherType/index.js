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
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
// import Switch from "react-switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import {
  getAllAPI,
  addNewAPI,
  updateAPI,
} from "../../../controller/MDStoreTypeController";
import {
  getAllVoucherTypeAPI,
  addNewVoucherTypeAPI,
  deleteAPI,
} from "../../../controller/MDVoucherTypeController";

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
function MDVoucherType({ route, navigate }) {
  const classes = useStyles();
  // const [tFValue, setTFValue] = useState("");
  const [tFVoucherTypeValue, setTFVoucherTypeValue] = useState("");
  const [tFDesValue, setTFDesValue] = useState("");
  const [tFVoucherTypeEditValue, setTFVoucherTypeEditValue] = useState("");
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
  const [voucherTypeData, setVoucherTypeTypeData] = useState([]);
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

  const [valueRadio, setValueRadio] = React.useState(0);

  const handleChangeRadio = (event) => {
    setValueRadio(event.target.value);
  };
  const [valueRadioEdit, setValueRadioEdit] = React.useState(0);

  const handleChangeRadioEdit = (event) => {
    setValueRadioEdit(event.target.value);
  };

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
    if (tFVoucherTypeValue.length === 0) {
      setError("Vui long nhap ten danh muc");
      setIsError(true);
    } else {
      handleCloseModal();
      setLoading(false);
      const result = await addNewVoucherTypeAPI(
        userId,
        tFVoucherTypeValue,
        valueRadio,
        tFDesValue
      );
      if (result.status === 200) {
        setLoading(true);
        HandleClick();
        setError("");
        setTFVoucherTypeValue("");
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
    const result = await getAllVoucherTypeAPI();
    if (result.status === 200) {
      //console.log(result.data.ResultObject.CategoryList);
      setVoucherTypeTypeData(result.data.data.voucherType);
      setLoading(true);
    }
  };
  const CheckActive = (isActive) => {
    if (isActive === 1) {
      return <AiOutlineCheck />;
    }
  };
  const handleDeleteVoucherType = async (item) => {
    setLoading(false);
    const result = await deleteAPI(userId, selectedItems);
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
  const currentPosts = voucherTypeData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (item) => {
    setTFVoucherTypeEditValue(item.voucherTypeName);
    setTFDesEditValue(item.description);
    setStoreTypeIdEditValue(item.voucherTypeId);
    setValueRadioEdit(item.isSpend);
    console.log(item.isSpend);
    if (item.isActived == 1) setIsActived(true);
    else {
      setIsActived(false);
    }

    handleOpenModalEdit();
  };
  const handleAgrreEdit = async () => {
    handleCloseModalEdit();
    setLoading(false);
    const result = await updateAPI(
      userId,
      storeTypeIdEditValue,
      tFVoucherTypeEditValue,
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
    <div>
      <div className="mt-2">
        <div className="d-flex containerBtn align-items-center justify-content-end">
          <div className="plus" style={{ marginRight: "10px" }}>
            <Button variant="contained" onClick={handleDeleteVoucherType}>
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

        <div
          style={{
            background: "#ffffff",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          <div className="d-flex">
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
                    Tên hình thức
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
                          checked={selectedItems.includes(item.voucherTypeId)}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.voucherTypeId)
                          }
                        />
                      </label>
                    </th>
                    <th scope="item">{item.voucherTypeId}</th>
                    <td
                      onClick={() => handleEditClick(item)}
                      className="titleText"
                    >
                      {item.voucherTypeName}
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
              totalPosts={voucherTypeData.length}
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
              Thêm mới hình thức thu chi
            </div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: "20px" }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên hình thức thu chi"
                variant="outlined"
                style={{ width: "90%" }}
                onChange={(newValue) =>
                  setTFVoucherTypeValue(newValue.target.value)
                }
                helperText={error}
                error={isError}
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
            {/* <div style={{ marginTop: 10, marginLeft: 37 }}>
              Kích hoạt{" "}
              <Checkbox
                disabled
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div> */}
            <div style={{ marginTop: "20px", marginLeft: 38 }}>
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

              <FormControl className="mt-2">
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={valueRadio}
                  onChange={handleChangeRadio}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Hình thức thu"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Hình thức chi"
                  />
                </RadioGroup>
              </FormControl>
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
              Chỉnh sửa hình thức thu chi
            </div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: "20px" }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên hình thức"
                variant="outlined"
                style={{ width: "90%" }}
                value={tFVoucherTypeEditValue}
                onChange={(value) =>
                  setTFVoucherTypeEditValue(value.target.value)
                }
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Mô tả"
                multiline
                rows={6}
                style={{ width: "90%", marginTop: "20px" }}
                value={tFDesEditValue}
                onChange={(value) => setTFDesEditValue(value.target.value)}
              />
            </div>

            <div style={{ marginTop: "20px", marginLeft: 37 }}>
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
              <FormControl className="mt-2">
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={valueRadioEdit}
                  onChange={handleChangeRadioEdit}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Hình thức thu"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Hình thức chi"
                  />
                </RadioGroup>
              </FormControl>
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
export default MDVoucherType;
