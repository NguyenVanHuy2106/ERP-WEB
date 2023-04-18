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
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { storage } from "../../server/FirebaseConfig";
import {
  getAllBrand,
  addNewBrand,
  updateBrand,
  deleteBrand,
} from "../../controller/MDBrandController";
import { getAllCustomer } from "../../controller/ERCustomerController";
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
function ERCustomer({ route, navigate }) {
  const classes = useStyles();
  const [tFValue, setTFValue] = useState("");
  const [tFBrandValue, setTFBrandValue] = useState("");

  const [tFDesValue, setTFDesValue] = useState("");
  const [tFBrandEditValue, setTFBrandEditValue] = useState("");
  const [tFDesEditValue, setTFDesEditValue] = useState("");
  const [brandIdEditValue, setBrandIdEditValue] = useState("");
  const [isActived, setIsActived] = useState(false);
  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();
  const [customerData, setCustomerData] = useState([]);
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
  const handleEditcheck = (event) => {
    setIsActived(event.target.checked);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleAgrre = async () => {
    if (tFBrandValue.length === 0) {
      setError("Vui long nhap ten danh muc");
      setIsError(true);
    } else {
      handleCloseModal();
      setLoading(false);
      const result = await addNewBrand(
        userId,
        tFBrandValue,
        tFDesValue,
        1,
        url
      );
      if (result.status === 200) {
        setLoading(true);
        HandleClick();
        setError("");
        setTFBrandValue("");
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
    const result = await getAllCustomer();
    if (result.status === 200) {
      setCustomerData(result.data.data.customers);
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

  useEffect(() => {
    setTime();
    HandleClick();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = customerData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [url, setUrl] = useState("");

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

  const handleEditClick = (item) => {
    setTFBrandEditValue(item.brandName);
    setTFDesEditValue(item.brandDescription);
    setBrandIdEditValue(item.brandId);

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
    const result = await updateBrand(
      userId,
      brandIdEditValue,
      tFBrandEditValue,
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
        <div className="webContainer1 border">Danh sách khách hàng</div>
        <div
          className="d-flex mt-3 align-items-center justify-content-end"
          style={{ background: "#ffffff", height: "20px" }}
        >
          <div className="d-flex containerBtn align-items-center justify-content-end"></div>
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
                    className="col-3"
                  >
                    Tên khách hàng
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-2"
                  >
                    Tài khoản
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-2"
                  >
                    Giới tính
                  </th>

                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-2"
                  >
                    Số điện thoại
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-2"
                  >
                    Email
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-2"
                  >
                    Ngày sinh
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
                          checked={selectedItems.includes(item.customerId)}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.customerId)
                          }
                        />
                        {item.name}
                      </label>
                    </td>
                    <th scope="item">{item.customerId}</th>
                    <td
                      className="brandEdit d-flex align-items-center"
                      onClick={() => handleEditClick(item)}
                    >
                      <div>
                        <img
                          src={
                            item.md_customer_info.avatar
                              ? item.md_customer_info.avatar
                              : "https://icon-library.com/images/image-icon-png/image-icon-png-6.jpg"
                          }
                          alt="Selected file"
                          width={40}
                          height={40}
                          style={{ borderRadius: 100 }}
                        />
                      </div>
                      <div style={{ marginLeft: 8 }}>
                        {item.md_customer_info.firstname +
                          " " +
                          item.md_customer_info.lastname}
                      </div>
                    </td>
                    <td>{item.username}</td>

                    <td>{item.md_customer_info.gender === 1 ? "Nam" : "Nữ"}</td>
                    <td>{item.md_customer_info.phoneNumber}</td>
                    <td>{item.md_customer_info.email}</td>
                    <td>
                      {new Date(
                        item.md_customer_info.birthday
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            <PaginationShop
              postsPerPage={postsPerPage}
              totalPosts={customerData.length}
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
              Thêm mới thương hiệu sản phẩm
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
              style={{ marginTop: 24 }}
            >
              <TextField
                required
                id="outlined-basic"
                label="Tên thương hiệu"
                variant="outlined"
                style={{ width: "90%" }}
                onChange={(newValue) => setTFBrandValue(newValue.target.value)}
                helperText={error}
                error={isError}
              />

              <TextField
                id="outlined-multiline-flexible"
                label="Mô tả"
                multiline
                rows={6}
                style={{ width: "90%", marginTop: 20 }}
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
              Chỉnh sửa thương hiệu sản phẩm
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
export default ERCustomer;
