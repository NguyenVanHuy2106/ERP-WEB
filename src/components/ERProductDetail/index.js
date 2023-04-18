import React, { useState, useEffect, useStyle, useMemo } from "react";
import { useParams } from "react-router-dom";
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
import { getModelDetail } from "../../controller/ERProduct";
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
function ERProductDetail({ route, navigate, location }) {
  const classes = useStyles();
  const { modelId } = useParams();

  const [tFBrandValue, setTFBrandValue] = useState("");
  const [modelInfo, setModelInfo] = useState({});

  const [tFDesValue, setTFDesValue] = useState("");
  const [tFBrandEditValue, setTFBrandEditValue] = useState("");
  const [tFDesEditValue, setTFDesEditValue] = useState("");
  const [brandIdEditValue, setBrandIdEditValue] = useState("");
  const [isActived, setIsActived] = useState(false);
  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();
  const [brandData, setBrandData] = useState([]);
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
    const result = await getAllBrand();
    if (result.status === 200) {
      setBrandData(result.data.data.brands);
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
  const getModelInfoDetail = async (modelId) => {
    setLoading(false);
    const result = await getModelDetail(modelId);
    if (result.status === 200) {
      //console.log(result.data.data.modelInformation);
      setModelInfo(result.data.data.modelInformation);
      setLoading(true);
    }
  };

  useEffect(() => {
    setTime();
    getModelInfoDetail(modelId);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = brandData.slice(indexOfFirstPost, indexOfLastPost);
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
  //   const handleAgrreEdit = async () => {
  //     const toDate = valueToDate.format("YYYY-MM-DD");

  //     handleCloseModalEdit();
  //     setLoading(false);
  //     const result = await updateBrand(
  //       userId,
  //       brandIdEditValue,
  //       tFBrandEditValue,
  //       tFDesEditValue,
  //       isActived
  //     );
  //     if (result.status === 200) {
  //       setLoading(true);
  //       HandleClick();
  //     }
  //   };

  return (
    <div
      style={{
        background: "#E5E4E2",
      }}
    >
      <div
        style={{ marginLeft: "20px", marginRight: "20px", paddingTop: "20px" }}
      >
        <div className="webContainer1 border">Chi tiết sản phẩm</div>
        <div
          className="d-flex mt-3 align-items-center justify-content-end"
          style={{ background: "#ffffff", height: "20px" }}
        >
          <div className="d-flex containerBtn align-items-center justify-content-end"></div>
        </div>

        <div style={{ background: "#ffffff" }}>
          <div style={{ marginLeft: "180px", marginRight: "180px" }}>
            <div
              className="border-bottom"
              style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}
            >
              {modelInfo.modelName}
            </div>
            <div className="d-flex">
              <div className="col-7">
                <div className="d-flex flex-column align-items-center">
                  <div className="">
                    <img
                      src={modelInfo.modelImagePath}
                      alt="file"
                      width={500}
                      height={500}
                      style={{ padding: 10 }}
                    />
                  </div>
                  <div className="d-flex">
                    {modelInfo.modelImagePathList &&
                      modelInfo.modelImagePathList.map((item, index) => (
                        <div
                          key={index}
                          className="border d-flex justify-content-center align-items-center"
                          style={{
                            height: 90,
                            width: 90,
                            marginLeft: 4,
                            marginRight: 4,
                            marginTop: 20,
                          }}
                        >
                          <img
                            src={item}
                            alt="file"
                            width={85}
                            height={85}
                            style={{ padding: 5 }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <div
                    style={{ padding: 20, fontSize: 18, fontWeight: "bold" }}
                  >
                    Thông tin sản phẩm
                  </div>
                  <div style={{ paddingLeft: 20, textAlign: "justify" }}>
                    <p>{modelInfo.modelDescription}</p>
                  </div>
                </div>
              </div>
              <div className="col-3" style={{ padding: 10 }}>
                Biến thể
              </div>
            </div>
            <div className="d-flex"></div>
          </div>
          <div className="d-flex justify-content-center">
            <PaginationShop
              postsPerPage={postsPerPage}
              totalPosts={brandData.length}
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
export default ERProductDetail;
