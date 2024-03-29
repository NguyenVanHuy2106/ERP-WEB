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

import { deleteAPI } from "../../../controller/MDOutputTypeController";

import {
  getAllSaleOrderType,
  updateSaleOrderType,
  addNewSaleOrderType,
  deleteSaleOrderType,
} from "../../../controller/MDSaleOrderTypeController";
import { getAllAPI } from "../../../controller/MDOutputTypeController";
import { getAllPaymentOrderTypeAPI } from "../../../controller/MDPaymentOrderTypeController";
import { getAllDeliveryType } from "../../../controller/MDDeliveryTypeController";
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
function MDSaleOrderType({ route, navigate }) {
  const classes = useStyles();
  // const [tFValue, setTFValue] = useState("");
  const [tFSaleOrderTypeValue, setTFSaleOrderTypeValue] = useState("");
  const [tFSaleOrderTypeValueEdit, setTFSaleOrderTypeValueEdit] = useState("");
  const [tFDesValue, setTFDesValue] = useState("");
  const [tFDesEditValue, setTFDesEditValue] = useState("");
  const [outputTypeIdEditValue, setOutputTypeIdEditValue] = useState("");
  const [saleOrderTypeIdEditValue, setSaleOrderTypeIdEditValue] = useState("");
  const [outputType, setOutputType] = useState([]);
  const [paymentOrderType, setPaymentOrderType] = useState([]);
  const [paymentOrderTypeEdit, setPaymentOrderTypeEdit] = useState([]);
  const [paymentOrderTypeSelect, setPaymentOrderTypeSelect] = useState([]);
  const [paymentOrderTypeSelectEdit, setPaymentOrderTypeSelectEdit] = useState(
    []
  );
  const [isAutoReviewed, setIsAutoReviewed] = useState(true);
  const [isAutoReviewedEdit, setIsAutoReviewedEdit] = useState(true);
  const [isSupplementPromotion, setIsSupplementPromotion] = useState(true);
  const [isSupplementPromotionEdit, setIsSupplementPromotionEdit] =
    useState(true);
  const [isAutoOutputProduct, setIsAutoOutputProduct] = useState(true);
  const [isAutoOutputProductEdit, setIsAutoOutputProductEdit] = useState(true);
  const [isCollectMoney, setIsCollectMoney] = useState(true);
  const [isCollectMoneyEdit, setIsCollectMoneyEdit] = useState(true);
  const [isOutput, setIsOutput] = useState(true);
  const [isOutputEdit, setIsOutputEdit] = useState(true);
  let [loading, setLoading] = useState(false);

  const [outputTypeSelect, setOutputTypeSelect] = React.useState("");
  const [outputTypeSelectEdit, setOutputTypeSelectEdit] = React.useState("");
  const [saleOrderTypeData, setSaleOrderTypeTypeData] = useState([]);
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
  const handleChangeIsAutoReviewed = (event) => {
    setIsAutoReviewed(event.target.checked);
  };
  const handleChangeIsAutoReviewedEdit = (event) => {
    setIsAutoReviewedEdit(event.target.checked);
  };
  const handleChangeIsSupplementPromotion = (event) => {
    setIsSupplementPromotion(event.target.checked);
  };
  const handleChangeIsSupplementPromotionEdit = (event) => {
    setIsSupplementPromotionEdit(event.target.checked);
  };
  const handleChangeIsAutoOutputProduct = (event) => {
    setIsAutoOutputProduct(event.target.checked);
  };
  const handleChangeIsAutoOutputProductEdit = (event) => {
    setIsAutoOutputProductEdit(event.target.checked);
  };
  const handleChangeIsCollectMoney = (event) => {
    setIsCollectMoney(event.target.checked);
  };
  const handleChangeIsCollectMoneyEdit = (event) => {
    setIsCollectMoneyEdit(event.target.checked);
  };

  const handleChangeIsOutput = (event) => {
    setIsOutput(event.target.checked);
  };
  const handleChangeIsOutputEdit = (event) => {
    setIsOutputEdit(event.target.checked);
  };

  const handleChangeOutputTypeSelect = (event) => {
    setOutputTypeSelect(event.target.value);
  };
  const handleChangeOutputTypeSelectEdit = (event) => {
    setOutputTypeSelectEdit(event.target.value);
  };
  const handleChangePaymentOrderTypeSelect = (event) => {
    setPaymentOrderTypeSelect(event.target.value);
  };
  const handleChangePaymentOrderTypeSelectEdit = (event) => {
    setPaymentOrderTypeEdit(event.target.value);
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
    setOutputTypeSelect("");
    setPaymentOrderTypeSelect("");

    setIsAutoReviewed(true);
    setIsSupplementPromotion(true);
    setIsAutoOutputProduct(true);
    setIsOutput(true);
    setIsCollectMoney(true);
  };
  const [checked, setChecked] = React.useState(true);
  // const [editChecked, setEditChecked] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isError, setIsError] = useState(false);
  let userId = localStorage.getItem("userId");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleAgrre = async () => {
    if (tFSaleOrderTypeValue.length === 0) {
      setError("Vui long nhap ten danh muc");
      setIsError(true);
    } else {
      handleCloseModal();
      setLoading(false);
      const saleOrderTypeData = {};
      saleOrderTypeData.saleOrderTypeName = tFSaleOrderTypeValue;
      saleOrderTypeData.IsAutoReviewed = isAutoReviewed;
      saleOrderTypeData.isSupplementPromotion = isSupplementPromotion;
      saleOrderTypeData.isAutoOutputProduct = isAutoOutputProduct;
      saleOrderTypeData.isCollectMoney = isCollectMoney;
      saleOrderTypeData.isOutput = isOutput;
      saleOrderTypeData.outputTypeId = outputTypeSelect;
      saleOrderTypeData.paymentOrderTypeId = paymentOrderTypeSelect;
      saleOrderTypeData.deliveryTypeId = null;
      saleOrderTypeData.description = tFDesValue;
      saleOrderTypeData.isActived = 1;

      const result = await addNewSaleOrderType(userId, saleOrderTypeData);
      if (result.status === 200) {
        setLoading(true);
        HandleClick();
        setError("");
        setOutputTypeSelect("");
        setPaymentOrderTypeSelect("");
        setIsAutoReviewed(true);
        setIsSupplementPromotion(true);
        setIsAutoOutputProduct(true);
        setIsOutput(true);
        setIsCollectMoney(true);
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

    //console.log(tFValue, fromDate, toDate);
    const result = await getAllSaleOrderType();
    if (result.status === 200) {
      //console.log(result.data.ResultObject.CategoryList);
      setSaleOrderTypeTypeData(result.data.data.saleOrderType);
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

  const HandleGetOutputType = async () => {
    const result = await getAllAPI();
    if (result.status === 200) {
      //console.log(result.data.ResultObject.CategoryList);
      setOutputType(result.data.data.outputType);
      setLoading(true);
    }
  };
  const HandleGetPaymentOrderType = async () => {
    const result = await getAllPaymentOrderTypeAPI();
    if (result.status === 200) {
      //console.log(result.data.ResultObject.CategoryList);
      setPaymentOrderType(result.data.data.paymentOrderType);
      setLoading(true);
    }
  };

  useEffect(() => {
    setTime();
    HandleClick();
    HandleGetOutputType();
    HandleGetPaymentOrderType();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = saleOrderTypeData.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (item) => {
    setSaleOrderTypeIdEditValue(item.saleOrderTypeId);
    setOutputTypeSelectEdit(item.outputTypeId);
    setTFSaleOrderTypeValueEdit(item.saleOrderTypeName);
    setPaymentOrderTypeSelectEdit(item.paymentOrderTypeId);
    setTFDesEditValue(item.description);
    setOutputTypeIdEditValue(item.outputTypeId);

    if (item.IsAutoReviewed === 1) setIsAutoReviewedEdit(true);
    else {
      setIsAutoReviewedEdit(false);
    }
    if (item.isSupplementPromotion === 1) setIsSupplementPromotionEdit(true);
    else {
      setIsSupplementPromotionEdit(false);
    }
    if (item.isAutoOutputProduct === 1) setIsAutoOutputProductEdit(true);
    else {
      setIsAutoOutputProductEdit(false);
    }
    if (item.isCollectMoney === 1) setIsCollectMoneyEdit(true);
    else {
      setIsCollectMoneyEdit(false);
    }
    if (item.isOutput === 1) setIsOutputEdit(true);
    else {
      setIsOutputEdit(false);
    }
    handleOpenModalEdit();
  };
  const handleAgrreEdit = async () => {
    handleCloseModalEdit();
    setLoading(false);

    const updateData = {};
    updateData.saleOrderTypeName = tFSaleOrderTypeValueEdit;
    updateData.IsAutoReviewed = isAutoReviewedEdit;
    updateData.isSupplementPromotion = isSupplementPromotionEdit;
    updateData.isAutoOutputProduct = isAutoOutputProductEdit;
    updateData.isCollectMoney = isCollectMoneyEdit;
    updateData.isOutput = isOutputEdit;
    updateData.outputTypeId = outputTypeIdEditValue;
    updateData.paymentOrderTypeId = paymentOrderTypeSelectEdit;
    updateData.deliveryTypeId = null;
    updateData.description = tFDesEditValue;
    updateData.isActived = checked;
    updateData.isDeleted = 0;
    //console.log(updateData);

    const result = await updateSaleOrderType(
      userId,
      saleOrderTypeIdEditValue,
      updateData
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
                    Tên loại yêu cầu xuất
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
                          checked={selectedItems.includes(item.saleOrderTypeId)}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.saleOrderTypeId)
                          }
                        />
                      </label>
                    </th>
                    <th scope="item">{item.saleOrderTypeId}</th>
                    <td
                      onClick={() => handleEditClick(item)}
                      className="titleText"
                    >
                      {item.saleOrderTypeName}
                    </td>

                    <td>{CheckActive(item.isActived)}</td>
                    <td>{new Date(item.updatedDate).toLocaleDateString()}</td>
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
              totalPosts={saleOrderTypeData.length}
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
              style={{ paddingBottom: "12px" }}
            >
              Thêm mới loại yêu cầu xuất
            </div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: "12px" }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên hình thức"
                variant="outlined"
                style={{ width: "90%" }}
                onChange={(newValue) =>
                  setTFSaleOrderTypeValue(newValue.target.value)
                }
                helperText={error}
                error={isError}
              />

              <FormControl sx={{ m: 1, width: "90%", marginTop: "12px" }}>
                <InputLabel id="demo-select-small">Hình thức xuất</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={outputTypeSelect}
                  label="Hình thức xuất"
                  onChange={handleChangeOutputTypeSelect}
                >
                  <MenuItem value="">
                    <em>---Chọn hình thức xuất---</em>
                  </MenuItem>
                  {outputType.map((item, index) => (
                    <MenuItem key={item.outputTypeId} value={item.outputTypeId}>
                      {item.outputTypeId + " - " + item.outputTypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: "90%", marginTop: "7px" }}>
                <InputLabel id="demo-select-small">
                  Hình thức thanh toán
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={paymentOrderTypeSelect}
                  label="Hình thức thanh toán"
                  onChange={handleChangePaymentOrderTypeSelect}
                >
                  <MenuItem value="">
                    <em>---Chọn hình thức thanh toán---</em>
                  </MenuItem>
                  {paymentOrderType.map((item, index) => (
                    <MenuItem
                      key={item.paymentOrderTypeId}
                      value={item.paymentOrderTypeId}
                    >
                      {item.paymentOrderTypeId +
                        " - " +
                        item.paymentOrderTypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <FormControl sx={{ m: 1, width: "90%", marginTop: "7px" }}>
                <InputLabel id="demo-select-small">
                  Hình thức giao hàng
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={deliveryTypeSelect}
                  label="Hình thức giao hàng"
                  onChange={handleChangeDeliveryTypeSelect}
                >
                  <MenuItem value="">
                    <em>---Chọn hình thức giao hàng---</em>
                  </MenuItem>
                  {deliveryType.map((item, index) => (
                    <MenuItem
                      key={item.deliveryTypeId}
                      value={item.deliveryTypeId}
                    >
                      {item.deliveryTypeId + " - " + item.deliveryTypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <TextField
                id="outlined-multiline-flexible"
                label="Mô tả"
                multiline
                rows={6}
                style={{ width: "90%", marginTop: "7px" }}
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
            <div
              style={{ marginTop: "12px", marginLeft: 38 }}
              className="d-flex flex-column justify-content-center"
            >
              <div className="d-flex">
                <div className="row col-6">
                  <div className="col-8 d-flex align-items-center">
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
                <div className="row col-7">
                  <div className="col-8 d-flex align-items-center">
                    Tự động duyệt
                  </div>
                  <Checkbox
                    className="col-1"
                    checked={isAutoReviewed}
                    onChange={handleChangeIsAutoReviewed}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="row col-6">
                  <div className="col-8 d-flex align-items-center">
                    Xuất bổ sung khuyến mãi
                  </div>
                  <Checkbox
                    className="col-1"
                    checked={isSupplementPromotion}
                    onChange={handleChangeIsSupplementPromotion}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>

                <div className="row col-7">
                  <div className="col-8 d-flex align-items-center">
                    Tự động xuất hàng
                  </div>
                  <Checkbox
                    className="col-1"
                    checked={isAutoOutputProduct}
                    onChange={handleChangeIsAutoOutputProduct}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="row col-6">
                  <div className="col-8 d-flex align-items-center">
                    Có xuất hàng hay không
                  </div>
                  <Checkbox
                    className="col-1"
                    checked={isOutput}
                    onChange={handleChangeIsOutput}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="row col-7">
                  <div className="col-8 d-flex align-items-center">
                    Thu tiền khi xuất hàng
                  </div>
                  <Checkbox
                    className="col-1"
                    checked={isCollectMoney}
                    onChange={handleChangeIsCollectMoney}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
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
              style={{ paddingBottom: "12px" }}
            >
              Thêm mới hình thức xuất
            </div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: "12px" }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên hình thức"
                variant="outlined"
                style={{ width: "90%" }}
                value={tFSaleOrderTypeValueEdit}
                onChange={(newValue) =>
                  setTFSaleOrderTypeValueEdit(newValue.target.value)
                }
              />

              <FormControl sx={{ m: 1, width: "90%", marginTop: "12px" }}>
                <InputLabel id="demo-select-small">Hình thức xuất</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={outputTypeSelectEdit}
                  label="Hình thức xuất"
                  onChange={handleChangeOutputTypeSelectEdit}
                >
                  <MenuItem value="">
                    <em>---Chọn hình thức xuất---</em>
                  </MenuItem>
                  {outputType.map((item, index) => (
                    <MenuItem key={item.outputTypeId} value={item.outputTypeId}>
                      {item.outputTypeId + " - " + item.outputTypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: "90%", marginTop: "7px" }}>
                <InputLabel id="demo-select-small">
                  Hình thức thanh toán
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={paymentOrderTypeSelectEdit}
                  label="Hình thức thanh toán"
                  onChange={handleChangePaymentOrderTypeSelectEdit}
                >
                  <MenuItem value="">
                    <em>---Chọn hình thức thanh toán---</em>
                  </MenuItem>
                  {paymentOrderType.map((item, index) => (
                    <MenuItem
                      key={item.paymentOrderTypeId}
                      value={item.paymentOrderTypeId}
                    >
                      {item.paymentOrderTypeId +
                        " - " +
                        item.paymentOrderTypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <FormControl sx={{ m: 1, width: "90%", marginTop: "7px" }}>
                <InputLabel id="demo-select-small">
                  Hình thức giao hàng
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={deliveryTypeSelectEdit}
                  label="Hình thức giao hàng"
                  onChange={handleChangeDeliveryTypeSelectEdit}
                >
                  <MenuItem value="">
                    <em>---Chọn hình thức giao hàng---</em>
                  </MenuItem>
                  {deliveryType.map((item, index) => (
                    <MenuItem
                      key={item.deliveryTypeId}
                      value={item.deliveryTypeId}
                    >
                      {item.deliveryTypeId + " - " + item.deliveryTypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <TextField
                id="outlined-multiline-flexible"
                label="Mô tả"
                multiline
                rows={6}
                style={{ width: "90%", marginTop: "7px" }}
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
            <div
              style={{ marginTop: "12px", marginLeft: 38 }}
              className="d-flex flex-column justify-content-center"
            >
              <div className="d-flex">
                <div className="row col-6">
                  <div className="col-8 d-flex align-items-center">
                    Kích hoạt{" "}
                  </div>
                  <Checkbox
                    className="col-1"
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="row col-7">
                  <div className="col-8 d-flex align-items-center">
                    Tự động duyệt
                  </div>
                  <Checkbox
                    className="col-1"
                    checked={isAutoReviewedEdit}
                    onChange={handleChangeIsAutoReviewedEdit}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="row col-6">
                  <div className="col-8 d-flex align-items-center">
                    Xuất bổ sung khuyến mãi
                  </div>
                  <Checkbox
                    className="col-1"
                    checked={isSupplementPromotionEdit}
                    onChange={handleChangeIsSupplementPromotionEdit}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>

                <div className="row col-7">
                  <div className="col-8 d-flex align-items-center">
                    Tự động xuất hàng
                  </div>
                  <Checkbox
                    className="col-1"
                    checked={isAutoOutputProductEdit}
                    onChange={handleChangeIsAutoOutputProductEdit}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="row col-6">
                  <div className="col-8 d-flex align-items-center">
                    Có xuất hàng hay không
                  </div>
                  <Checkbox
                    className="col-1"
                    checked={isOutputEdit}
                    onChange={handleChangeIsOutputEdit}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
                <div className="row col-7">
                  <div className="col-8 d-flex align-items-center">
                    Thu tiền khi xuất hàng
                  </div>
                  <Checkbox
                    className="col-1"
                    checked={isCollectMoneyEdit}
                    onChange={handleChangeIsCollectMoneyEdit}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
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
export default MDSaleOrderType;
