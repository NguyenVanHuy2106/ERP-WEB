import React, { useState, useEffect } from "react";

import dayjs from "dayjs";
import { RingLoader } from "react-spinners";
import { TextField } from "@mui/material";
import "../css/index.css";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { AiOutlineCheck } from "react-icons/ai";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";

import {
  getAllAPI,
  addNewAPI,
  updateAPI,
  deleteAPI,
} from "../../../controller/MDOutputTypeController";

import { getAllVoucherTypeAPI } from "../../../controller/MDVoucherTypeController";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
function MDOutputType({ route, navigate }) {
  const classes = useStyles();
  const [tFOutputTypeValue, setTFOutputTypeValue] = useState("");
  const [tFOutputTypeValueEdit, setTFOutputTypeValueEdit] = useState("");
  const [tFDesValue, setTFDesValue] = useState("");
  const [tFDesEditValue, setTFDesEditValue] = useState("");
  const [outputTypeIdEditValue, setOutputTypeIdEditValue] = useState("");
  const [voucherType, setVoucherType] = useState([]);
  const [getPriceType, setGetPriceType] = useState("");
  const [getPriceTypeEdit, setGetPriceTypeEdit] = useState("");
  const [isActived, setIsActived] = useState(false);
  const [isCanReturnEdit, setisCanReturnEdit] = useState(false);
  const [isCanReturn, setisCanReturn] = useState(true);
  const [isSale, setIsSale] = useState(true);
  const [isSaleEdit, setIsSaleEdit] = useState(true);
  const [isPromotion, setIsPromotion] = useState(true);
  const [isPromotionEdit, setIsPromotionEdit] = useState(true);
  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();
  const [voucherTypeSelect, setVoucherTypeSelect] = React.useState("");
  const [voucherTypeSelectEdit, setVoucherTypeSelectEdit] = React.useState("");
  const [outputTypeData, setOutputTypeTypeData] = useState([]);
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

  const handleChangeGetPriceType = (event) => {
    setGetPriceType(event.target.value);
  };
  const handleChangeGetPriceTypeEdit = (event) => {
    setGetPriceTypeEdit(event.target.value);
  };
  const handleChangeVoucherTypeSelect = (event) => {
    setVoucherTypeSelect(event.target.value);
  };

  const handleChangeVoucherTypeSelectEdit = (event) => {
    setVoucherTypeSelectEdit(event.target.value);
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
    setGetPriceType("");
    setVoucherTypeSelect("");
  };
  const [checked, setChecked] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isError, setIsError] = useState(false);
  let userId = localStorage.getItem("userId");

  const handleEditcheck = (event) => {
    setIsActived(event.target.checked);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleChangeIsCanReturnEdit = (event) => {
    setisCanReturnEdit(event.target.checked);
  };
  const handleChangeLimitStock = (event) => {
    setisCanReturn(event.target.checked);
  };

  const handleChangeIsSale = (event) => {
    setIsSale(event.target.checked);
  };
  const handleChangeIsSaleEdit = (event) => {
    setIsSaleEdit(event.target.checked);
  };
  const handleChangeIsPromotion = (event) => {
    setIsPromotion(event.target.checked);
  };
  const handleChangeIsPromotionEdit = (event) => {
    setIsPromotionEdit(event.target.checked);
  };
  const handleAgrre = async () => {
    if (tFOutputTypeValue.length === 0) {
      setError("Vui long nhap ten danh muc");
      setIsError(true);
    } else {
      handleCloseModal();
      setLoading(false);
      const result = await addNewAPI(
        userId,
        tFOutputTypeValue,
        getPriceType,
        isCanReturn,
        isSale,
        isPromotion,
        voucherTypeSelect,
        tFDesValue
      );
      if (result.status === 200) {
        setLoading(true);
        HandleClick();
        setError("");
        setGetPriceType("");
        setVoucherTypeSelect("");
        setTFOutputTypeValue("");
      }
    }
  };

  const setTime = () => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  };
  const HandleClick = async () => {
    setLoading(false);

    const result = await getAllAPI();
    if (result.status === 200) {
      //console.log(result.data.ResultObject.CategoryList);
      setOutputTypeTypeData(result.data.data.outputType);
      setLoading(true);
    }
  };
  const CheckActive = (isActive) => {
    if (isActive === 1) {
      return <AiOutlineCheck />;
    }
  };
  const handleDeleteOutputType = async (item) => {
    setLoading(false);
    const result = await deleteAPI(userId, selectedItems);
    if (result.status === 200) {
      setLoading(true);
      HandleClick();
    }
  };
  const HandleGetVoucherType = async () => {
    const result = await getAllVoucherTypeAPI();
    if (result.status === 200) {
      setVoucherType(result.data.data.voucherType);
      setLoading(true);
    }
  };

  useEffect(() => {
    setTime();
    HandleClick();
    HandleGetVoucherType();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = outputTypeData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (item) => {
    setGetPriceTypeEdit(item.getPriceType);
    setVoucherTypeSelectEdit(item.voucherTypeId);
    setTFOutputTypeValueEdit(item.outputTypeName);
    setTFDesEditValue(item.description);
    setisCanReturnEdit(item.isCanReturn);

    setOutputTypeIdEditValue(item.outputTypeId);

    if (item.isActived === 1) setIsActived(true);
    else {
      setIsActived(false);
    }
    if (item.isSale === 1) setIsSaleEdit(true);
    else {
      setIsSaleEdit(false);
    }
    if (item.isPromotion === 1) setIsPromotionEdit(true);
    else {
      setIsPromotionEdit(false);
    }
    if (item.isCanReturn === 1) setisCanReturnEdit(true);
    else {
      setisCanReturnEdit(false);
    }

    handleOpenModalEdit();
  };
  const handleAgrreEdit = async () => {
    handleCloseModalEdit();
    setLoading(false);

    const result = await updateAPI(
      userId,
      outputTypeIdEditValue,
      tFOutputTypeValueEdit,
      getPriceTypeEdit,
      isCanReturnEdit,
      isSaleEdit,
      isPromotionEdit,
      voucherTypeSelectEdit,
      tFDesEditValue,
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
            <Button variant="contained" onClick={handleDeleteOutputType}>
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
                    Tên hình thức xuất
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
                    Ngày cập nhật
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Người cập nhật
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
                          checked={selectedItems.includes(item.outputTypeId)}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.outputTypeId)
                          }
                        />
                      </label>
                    </th>
                    <th scope="item">{item.outputTypeId}</th>
                    <td
                      onClick={() => handleEditClick(item)}
                      className="titleText"
                    >
                      {item.outputTypeName}
                    </td>

                    <td>{CheckActive(item.isActived)}</td>
                    <td>
                      {item.updatedDate !== null
                        ? new Date(item.updatedDate).toLocaleDateString()
                        : ""}
                    </td>
                    <td>{item.updatedUser}</td>
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
              totalPosts={outputTypeData.length}
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
              Thêm mới hình thức xuất
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
                onChange={(newValue) =>
                  setTFOutputTypeValue(newValue.target.value)
                }
                helperText={error}
                error={isError}
              />
              <FormControl sx={{ m: 1, width: "90%", marginTop: "18px" }}>
                <InputLabel id="demo-select-small">Phương thức giá</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={getPriceType}
                  label="Phương thức lấy giá"
                  onChange={handleChangeGetPriceType}
                >
                  <MenuItem value="">
                    <em>---Chọn phương thức---</em>
                  </MenuItem>

                  <MenuItem value={1}>Giá bán</MenuItem>
                  <MenuItem value={2}>Giá vốn</MenuItem>
                  <MenuItem value={3}>Giá bằng 0</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: "90%", marginTop: "18px" }}>
                <InputLabel id="demo-select-small">
                  Hình thức thu/chi
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={voucherTypeSelect}
                  label="Hình thức thu/chi"
                  onChange={handleChangeVoucherTypeSelect}
                >
                  <MenuItem value="">
                    <em>---Chọn hình thức thu/chi---</em>
                  </MenuItem>
                  {voucherType.map((item, index) => (
                    <MenuItem
                      key={item.voucherTypeId}
                      value={item.voucherTypeId}
                    >
                      {item.voucherTypeId + " - " + item.voucherTypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              <div className="row">
                <div className="col-3 d-flex align-items-center">
                  Cho phép nhập trả
                </div>
                <Checkbox
                  className="col-1"
                  checked={isCanReturn}
                  onChange={handleChangeLimitStock}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="row">
                <div className="col-3 d-flex align-items-center">Xuất bán</div>
                <Checkbox
                  className="col-1"
                  checked={isSale}
                  onChange={handleChangeIsSale}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="row">
                <div className="col-3 d-flex align-items-center">
                  Xuất khuyến mãi
                </div>
                <Checkbox
                  className="col-1"
                  checked={isPromotion}
                  onChange={handleChangeIsPromotion}
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
              style={{ paddingBottom: "20px" }}
            >
              Chỉnh sửa hình thức xuất
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
                value={tFOutputTypeValueEdit}
                onChange={(newValue) =>
                  setTFOutputTypeValueEdit(newValue.target.value)
                }
                helperText={error}
                error={isError}
              />
              <FormControl sx={{ m: 1, width: "90%", marginTop: "18px" }}>
                <InputLabel id="demo-select-small">Phương thức giá</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={getPriceTypeEdit}
                  label="Phương thức lấy giá"
                  onChange={handleChangeGetPriceTypeEdit}
                >
                  <MenuItem value="">
                    <em>---Chọn phương thức---</em>
                  </MenuItem>

                  <MenuItem value={1}>Giá bán</MenuItem>
                  <MenuItem value={2}>Giá vốn</MenuItem>
                  <MenuItem value={3}>Giá bằng 0</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: "90%", marginTop: "18px" }}>
                <InputLabel id="demo-select-small">
                  Hình thức thu/chi
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={voucherTypeSelectEdit}
                  label="Hình thức thu/chi"
                  onChange={handleChangeVoucherTypeSelectEdit}
                >
                  <MenuItem value="">
                    <em>---Chọn hình thức thu/chi---</em>
                  </MenuItem>
                  {voucherType.map((item, index) => (
                    <MenuItem
                      key={item.voucherTypeId}
                      value={item.voucherTypeId}
                    >
                      {item.voucherTypeId + " - " + item.voucherTypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  className="col-1"
                  checked={isActived}
                  onChange={handleEditcheck}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="row">
                <div className="col-3 d-flex align-items-center">
                  Cho phép nhập trả
                </div>
                <Checkbox
                  className="col-1"
                  checked={isCanReturnEdit}
                  onChange={handleChangeIsCanReturnEdit}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="row">
                <div className="col-3 d-flex align-items-center">Xuất bán</div>
                <Checkbox
                  className="col-1"
                  checked={isSaleEdit}
                  onChange={handleChangeIsSaleEdit}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="row">
                <div className="col-3 d-flex align-items-center">
                  Xuất khuyến mãi
                </div>
                <Checkbox
                  className="col-1"
                  checked={isPromotionEdit}
                  onChange={handleChangeIsPromotionEdit}
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
export default MDOutputType;
