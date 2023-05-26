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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import Switch from "react-switch";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { BiBlock } from "react-icons/bi";
import { storage } from "../../server/FirebaseConfig";
import {
  getAllBrand,
  addNewBrand,
  updateBrand,
  deleteBrand,
} from "../../controller/MDBrandController";
import { getInventoryListAPI } from "../../controller/ERInventory";
import { getAllCustomer } from "../../controller/ERCustomerController";
import { getAllModelAPI } from "../../controller/ERProduct";
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
function ERInventory({ route, navigate }) {
  const classes = useStyles();
  const [tFValue, setTFValue] = useState("");
  const [tFBrandValue, setTFBrandValue] = useState("");
  const [inventoryList, setInventoryList] = useState([]);
  const [modelIdList, setModelIdList] = useState([]);
  const [modelList, setModelList] = useState([]);
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
  const [postsPerPage] = useState(20);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const [customerObject, setCustomerObject] = useState({});
  const [customerObjectDetail, setCustomerObjectDetail] = useState({});
  //console.log(customerObject);
  const handleOpenModalEdit = () => setOpenModalEdit(true);
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const [storeIdSelect, setStoreIdSelect] = useState("");
  const [inventoryStatusIdSelect, setInventoryStatusIdSelect] = useState("");
  const [checked, setChecked] = React.useState(true);
  const [editChecked, setEditChecked] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isError, setIsError] = useState(false);
  let userId = localStorage.getItem("userId");
  const [selectedItems, setSelectedItems] = useState([]);

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

  const handleChangeSelect = (event) => {
    setStoreIdSelect(event.target.value);
  };
  const handleChangeSelectInventoryStatusId = (event) => {
    setInventoryStatusIdSelect(event.target.value);
  };
  const handleChangeSelectModelIdList = (event) => {
    setModelIdList(event.target.value);
  };

  const getInventoryList = async (
    modelIdList,
    storeIdSelect,
    inventoryStatusIdSelect
  ) => {
    setLoading(false);
    //var modelId = [3, 4, 5, 6, 7, 8, 9];
    if (storeIdSelect !== "" && inventoryStatusIdSelect !== "") {
      const result = await getInventoryListAPI(
        modelIdList,
        storeIdSelect,
        inventoryStatusIdSelect
      );
      if (result.status === 200) {
        setLoading(true);
        setInventoryList(result.data.data.models);
        //console.log(result.data.data.models);
      }
    }
  };
  const getAllModelList = async () => {
    const result = await getAllModelAPI();
    if (result.status === 200) {
      setModelList(result.data.data.models);
    }
  };

  useEffect(() => {
    setTime();
    getAllModelList();
    getInventoryList([], 1, 1);
    //HandleClick();
    //getInventoryList();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = inventoryList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [url, setUrl] = useState("");

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
        <div className="webContainer1 border">Quản lý tồn kho</div>
        <div
          className="d-flex mt-3 align-items-center justify-content-start"
          style={{ background: "#ffffff", height: "80px", paddingLeft: "30px" }}
        >
          <div className="d-flex mt-3 justify-content-start  search align-items-center">
            <FormControl sx={{ m: 1, width: 250 }}>
              <InputLabel id="demo-select-small">Chọn model</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                multiple
                value={modelIdList}
                label="Chọn model"
                onChange={handleChangeSelectModelIdList}
              >
                <MenuItem value="">
                  <em>---Chọn Model---</em>
                </MenuItem>
                {modelList.map((item, index) => (
                  <MenuItem key={index} value={item.modelId}>
                    {item.modelId + " - " + item.modelName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 250 }}>
              <InputLabel id="demo-select-small">Chọn kho</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={storeIdSelect}
                label="Chọn kho"
                onChange={handleChangeSelect}
              >
                <MenuItem value="">
                  <em>---Chọn Kho---</em>
                </MenuItem>

                <MenuItem key={1} value={1}>
                  {"1 - Kho trung tâm"}
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 250 }}>
              <InputLabel id="demo-select-small">
                Chọn tình trạng tồn kho
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={inventoryStatusIdSelect}
                label="Chọn tình trạng tồn kho"
                onChange={handleChangeSelectInventoryStatusId}
              >
                <MenuItem value="">
                  <em>---Chọn tình trạng tồn kho---</em>
                </MenuItem>

                <MenuItem key={1} value={1}>
                  {"1 - Mới"}
                </MenuItem>
              </Select>
            </FormControl>
            <div className="searchMargin">
              <Button
                variant="contained"
                onClick={() =>
                  getInventoryList(
                    modelIdList,
                    storeIdSelect,
                    inventoryStatusIdSelect
                  )
                }
              >
                <AiOutlineSearch size={20} />
                Tra cứu
              </Button>
            </div>
          </div>
        </div>

        <div style={{ background: "#ffffff" }}>
          <div
            className="d-flex"
            style={{ marginLeft: "50px", marginRight: "50px" }}
          >
            <table className="table mt-2 ">
              <thead>
                <tr style={{ background: "#848482" }}>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-1"
                  >
                    Mã model
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-3"
                  >
                    Tên model
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-1"
                  >
                    Tồn
                  </th>

                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-1"
                  >
                    Đặt hàng
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-2"
                  >
                    Trạng thái tồn
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.modelId}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          <img
                            src={
                              item.modelImagePath
                                ? item.modelImagePath
                                : "https://icon-library.com/images/image-icon-png/image-icon-png-6.jpg"
                            }
                            alt="Selected file"
                            width={40}
                            height={40}
                          />
                        </div>
                        <div style={{ paddingLeft: 12 }}>{item.modelName}</div>
                      </div>
                    </td>

                    <td>{item.amount}</td>
                    <td>{item.lockAmount}</td>
                    <td>{item.inventoryStatusId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            <PaginationShop
              postsPerPage={postsPerPage}
              totalPosts={inventoryList.length}
              paginate={paginate}
            />
          </div>
        </div>
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
export default ERInventory;
