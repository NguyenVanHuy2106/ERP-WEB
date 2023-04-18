import React, { useState, useEffect, useStyle, useMemo } from "react";

import dayjs from "dayjs";
import { RingLoader, CircleLoader } from "react-spinners";
import { TextField } from "@mui/material";
import "./css/quantityUnit.css";
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
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import {
  getAll,
  addNew,
  update,
  deleteAPI,
} from "../../controller/modelController";

import {
  getAllQuantityUnit,
  addNewQuantityUnit,
  updateQuantityUnit,
  deleteQuantityUnit,
} from "../../controller/quantityUnit";
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
function MDQuantityUnit({ route, navigate }) {
  let userId = localStorage.getItem("userId");
  const classes = useStyles();
  const [tFValue, setTFValue] = useState("");
  const [tFModelValue, setTFModelValue] = useState("");
  const [tFBaseProductValue, setTFBaseProductValue] = useState("");
  const [tFBaseProductEditValue, setTFBaseProductEditValue] = useState("");
  const [tFDesValue, setTFDesValue] = useState("");
  const [tFQuantityEditValue, setTFQuantityEditValue] = useState("");
  const [tFDesEditValue, setTFDesEditValue] = useState("");
  const [modelIdEditValue, setModelIdEditValue] = useState("");
  const [isActived, setIsActived] = useState(false);
  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();
  const [quantityUnitData, setQuantityUnitData] = useState([]);
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
  const handleAgrre = async () => {
    if (tFModelValue.length === 0) {
      setError("Vui lòng nhập tên đơn vị");
      setIsError(true);
    } else {
      handleCloseModal();
      setLoading(false);
      const result = await addNewQuantityUnit(userId, tFModelValue, tFDesValue);
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
    const result = await getAllQuantityUnit();
    if (result.status === 200) {
      //console.log(result.data.ResultObject);
      setQuantityUnitData(result.data.data.quantityUnits);
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
    const result = await deleteQuantityUnit(userId, item.quantityUnitId);
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
  const currentPosts = quantityUnitData.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (item) => {
    setTFQuantityEditValue(item.quantityUnitName);
    setTFDesEditValue(item.quantityUnitDescription);
    setModelIdEditValue(item.quantityUnitId);
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
    const result = await updateQuantityUnit(
      userId,
      modelIdEditValue,
      tFQuantityEditValue,
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
        <div className="webContainer1 border">Khai báo đơn vị sản phẩm</div>

        <div
          className="d-flex mt-3 align-items-center justify-content-end"
          style={{ height: "80px", background: "#ffffff" }}
        >
          <div className="d-flex containerBtn align-items-center justify-content-end">
            <div className="plus" style={{ marginRight: "10px" }}>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("Huy");
                }}
              >
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
            background: "#FFFFFF",
          }}
        >
          <div
            className="d-flex"
            style={{ marginLeft: "50px", marginRight: "50px" }}
          >
            <table className="table mt-2">
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
                    Tên đơn vị
                  </th>

                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                  >
                    Kich hoat
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
                          checked={selectedItems.includes(item.quantityUnitId)}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.quantityUnitId)
                          }
                        />
                      </label>
                    </td>
                    <th scope="item">{item.quantityUnitId}</th>
                    <td
                      className="quantityUnitText"
                      onClick={() => handleEditClick(item)}
                    >
                      {item.quantityUnitName}
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
              totalPosts={quantityUnitData.length}
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
              Thêm mới đơn vị sản phẩm
            </div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: "20px" }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên đơn vị"
                variant="outlined"
                style={{ width: "90%" }}
                onChange={(newValue) => setTFModelValue(newValue.target.value)}
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
            <div style={{ marginTop: "20px", marginLeft: 37 }}>
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
              style={{ marginTop: "20px" }}
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
              Chỉnh sửa đơn vị sản phẩm
            </div>
            <div
              className="d-flex align-items-center flex-column"
              style={{ marginTop: "20px" }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên đơn vị"
                variant="outlined"
                style={{ width: "90%" }}
                value={tFQuantityEditValue}
                onChange={(value) => setTFQuantityEditValue(value.target.value)}
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
export default MDQuantityUnit;
