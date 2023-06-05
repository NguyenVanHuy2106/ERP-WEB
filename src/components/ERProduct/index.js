import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { RingLoader } from "react-spinners";
import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import {
  AiOutlineSearch,
  AiOutlineCheck,
  AiOutlineFileAdd,
} from "react-icons/ai";
import { FiTrash } from "react-icons/fi";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./css/index.css";

import { appGetAllMainGroup } from "../../controller/MDMainGroupController";
import { getAllSubGroupByMainGroup } from "../../controller/MDSubGroupController";
import { AppGetAllBrand } from "../../controller/MDBrandController";
import {
  getAllModelProduct,
  updateModelList,
} from "../../controller/ERProduct";

import PaginationShop from "../shops/paginationShopList";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function ERProduct({ route, navigate }) {
  // const history = useHistory();
  const classes = useStyles();
  const [tFValue, setTFValue] = useState("");

  const [mainGroup, setMainGroup] = useState([]);
  const [mainGroupIdSelect, setMainGroupIdSelect] = useState("");
  const [subGroup, setSubGroup] = useState([]);
  const [subGroupIdSelect, setSubGroupIdSelect] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandIdSelect, setBrandIdSelect] = useState("");
  const [modelList, setModelList] = useState([]);

  let [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);

  let userId = localStorage.getItem("userId");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (event, item) => {
    const { modelId, isActived } = item;

    if (event.target.checked) {
      setSelectedItems([...selectedItems, { modelId, isActived: !isActived }]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.modelId !== modelId)
      );
    }
  };

  const handleChangeMainGroupIdSelect = (event) => {
    setMainGroupIdSelect(event.target.value);
    HandleSubGroup(event.target.value);
  };
  const handleChangeSubGroupIdSelect = (event) => {
    setSubGroupIdSelect(event.target.value);
  };
  const handleChangeBrandIdSelect = (event) => {
    setBrandIdSelect(event.target.value);
  };

  const setTime = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };
  const HandleGetAllMainGroup = async () => {
    const result = await appGetAllMainGroup();
    if (result.status === 200) {
      setMainGroup(result.data.data.maingroups);
    }
  };

  const HandleSubGroup = async (mainGroupId) => {
    const result = await getAllSubGroupByMainGroup(mainGroupId);
    if (result.status === 200) {
      setSubGroup(result.data.data.subgroups);
    }
  };
  const HandleGetAllBrand = async () => {
    const result = await AppGetAllBrand();
    if (result.status === 200) {
      setBrand(result.data.data.brands);
    }
  };
  const HandleClick = async () => {
    if (mainGroupIdSelect === "") {
      //console.log("Huy");
    }
  };

  const getAllModel = async (mainGroupId, subGroupId, brandId) => {
    const result = await getAllModelProduct(mainGroupId, subGroupId, brandId);
    if (result.status === 200) {
      setModelList(result.data.data.modelList);
    }
  };
  const handleDeleteItems = async () => {
    setLoading(false);
    const result = await updateModelList(userId, selectedItems);

    if (result.status === 200) {
      setLoading(true);
      getAllModel(null, null, null);
    }
  };

  useEffect(() => {
    setTime();
    getAllModel(null, null, null);
    HandleClick();
    HandleGetAllMainGroup();
    HandleGetAllBrand();
  }, []);
  const [url, setUrl] = useState("");

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = modelList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className="webContainer1 border">Quản lý sản phẩm</div>
        <div
          className="d-flex mt-3 align-items-center justify-content-start"
          style={{ background: "#ffffff", height: "80px", paddingLeft: "30px" }}
        >
          <div className="d-flex mt-3 justify-content-start  search align-items-center">
            <div className="searchMargin">
              <TextField
                id="outlined-basic"
                label="Tu khoa"
                variant="outlined"
                size="small"
                onChange={(newValue) => setTFValue(newValue.target.value)}
              />
            </div>
            <FormControl sx={{ m: 1, width: 250 }} size="small">
              <InputLabel
                id="demo-select-small"
                className="d-flex justify-content-center"
              >
                Chọn ngành hàng
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={mainGroupIdSelect}
                label="Chọn ngành hàng"
                onChange={handleChangeMainGroupIdSelect}
              >
                <MenuItem value="">
                  <em>---Chọn ngành hàng---</em>
                </MenuItem>
                {mainGroup.map((item, index) => (
                  <MenuItem key={index} value={item.maingroupId}>
                    {item.maingroupName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 250 }} size="small">
              <InputLabel
                id="demo-select-small"
                className="d-flex justify-content-center"
              >
                Chọn ngành hàng
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={subGroupIdSelect}
                label="Chọn nhóm hàng"
                onChange={handleChangeSubGroupIdSelect}
              >
                <MenuItem value="">
                  <em>---Chọn nhóm hàng---</em>
                </MenuItem>
                {subGroup.map((item, index) => (
                  <MenuItem key={index} value={item.subgroupId}>
                    {item.subgroupName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 250 }} size="small">
              <InputLabel
                id="demo-select-small"
                className="d-flex justify-content-center"
              >
                Chọn thương hiệu
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={brandIdSelect}
                label="Chọn thương hiệu"
                onChange={handleChangeBrandIdSelect}
              >
                <MenuItem value="">
                  <em>---Chọn thương hiệu---</em>
                </MenuItem>
                {brand.map((item, index) => (
                  <MenuItem key={index} value={item.brandId}>
                    {item.brandName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ marginLeft: 8, marginRight: 8 }}>
              <Button variant="contained" onClick={HandleClick}>
                <AiOutlineSearch size={20} />
                Tìm
              </Button>
            </div>
            <div style={{ marginLeft: 8, marginRight: 8 }}>
              <Button variant="contained" onClick={() => handleDeleteItems()}>
                <FiTrash size={15} />
                Xoá
              </Button>
            </div>
            <div style={{ marginLeft: 8, marginRight: 8 }}>
              <Link to={"/products"}>
                <Button variant="contained">
                  <AiOutlineFileAdd size={15} />
                  Thêm
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div style={{ background: "#ffffff" }}>
          <div
            className="d-flex"
            style={{ marginLeft: "50px", marginRight: "50px", paddingTop: 10 }}
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
                    className="col-2"
                  >
                    Mã model
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-6"
                  >
                    Tên model
                  </th>

                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col-4"
                  >
                    Kích hoạt
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <label>
                        {/* <input
                          type="checkbox"
                          checked={selectedItems.includes(item.modelId)}
                          onChange={(event) =>
                            handleCheckboxChange(
                              event,
                              item.modelId,
                              item.isActived
                            )
                          }
                        /> */}
                        <input
                          type="checkbox"
                          checked={selectedItems.some(
                            (selectedItem) =>
                              selectedItem.modelId === item.modelId
                          )}
                          onChange={(event) =>
                            handleCheckboxChange(event, item)
                          }
                        />
                      </label>
                    </td>
                    <th scope="item">
                      <div className="d-flex align-items-center">
                        {item.modelId}
                      </div>
                    </th>
                    <td className="brandEdit ">
                      <Link
                        to={`/productManage/${item.modelId}`}
                        className="d-flex align-items-center"
                      >
                        <div>
                          <img
                            src={item.modelImagePath}
                            className="img-fluid"
                            alt="file"
                            width={50}
                            height={50}
                            style={{ padding: 5 }}
                          />
                        </div>
                        {item.modelName}
                      </Link>
                    </td>
                    <td>{item.isActived ? <AiOutlineCheck /> : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div
              className="d-flex justify-content-center"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                overflowY: "scroll",
              }}
            >
              {currentPosts.map((item, index) => (
                <div key={index}>
                  <Link to={`/productManage/${item.modelId}`}>
                    <Card
                      className="d-flex justify-content-center align-items-center"
                      sx={{
                        maxWidth: 200,
                        height: 320,
                        boxShadow: "none",

                        borderRadius: 1,
                        marginLeft: "0.5px",
                        marginRight: "0.5px",
                        backgroundColor: "#FFFFFF",
                      }}
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="200"
                          src={item.modelImagePath}
                          alt="green iguana"
                        />
                        <CardContent className="d-flex justify-content-center">
                          <Typography gutterBottom variant="h7" component="div">
                            {item.modelName}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </div>
              ))}
            </div> */}
          </div>
          <div className="d-flex justify-content-center">
            <PaginationShop
              postsPerPage={postsPerPage}
              totalPosts={modelList.length}
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
export default ERProduct;
