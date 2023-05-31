import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import { RingLoader } from "react-spinners";
import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { AiOutlineSearch } from "react-icons/ai";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./css/index.css";
import { getAllPriceOfModel } from "../../controller/ERProductPrice";

import PaginationShop from "../shops/paginationShopList";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function ERProductPrice({ route, navigate }) {
  const classes = useStyles();
  const [tFValue, setTFValue] = useState("");

  const [priceList, setPriceList] = useState([]);

  const [keyWordType, setKeyWordType] = useState(0);
  let [loading, setLoading] = useState(false);
  var toDateDayjs = dayjs();
  var today = new Date();
  //const [valueCatData, setValueCatData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(18);

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

  const firstDateInMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  ).toLocaleDateString();

  const [valueFromDate, setValueFromDate] = React.useState(
    dayjs(firstDateInMonth)
  );

  const [valueToDate, setValueToDate] = React.useState(toDateDayjs);

  const setTime = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  const HandleClick = async (keyWordType) => {
    //console.log(keyWordType);
    setLoading(false);

    const fromDate = valueFromDate.format("YYYY-MM-DD");
    const toDate = valueToDate.format("YYYY-MM-DD");

    if (keyWordType === 0) {
      // console.log("0");
      //console.log(keyWordType);
      const result = await getAllPriceOfModel(tFValue, null, fromDate, toDate);
      //console.log(result);
      if (result.status === 200) {
        setLoading(true);
        setPriceList(result.data.data.priceOfModels);
      }
    } else if (keyWordType === 1) {
      //console.log(keyWordType);
      //console.log(tFValue, null, fromDate, toDate);
      const result = await getAllPriceOfModel(tFValue, null, fromDate, toDate);
      //console.log(result);
      if (result.status === 200) {
        setLoading(true);
        setPriceList(result.data.data.priceOfModels);
      }
    } else if (keyWordType === 2) {
      //console.log(keyWordType);
      const result1 = await getAllPriceOfModel(null, tFValue, fromDate, toDate);
      //console.log(result1);
      if (result1.status === 200) {
        setLoading(true);
        setPriceList(result1.data.data.priceOfModels);
      }
    }
  };

  useEffect(() => {
    setTime();
    HandleClick(0);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = priceList.slice(indexOfFirstPost, indexOfLastPost);
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
        <div className="webContainer1 border">Quản lý giá sản phẩm</div>
        <div
          className="d-flex mt-3 align-items-center justify-content-start"
          style={{ background: "#ffffff", height: "80px", paddingLeft: "30px" }}
        >
          <div className="d-flex mt-3 justify-content-start  search align-items-center">
            <div className="searchMargin" style={{ paddingRight: 16 }}>
              <TextField
                id="outlined-basic"
                label="Tu khoa"
                variant="outlined"
                onChange={(newValue) => setTFValue(newValue.target.value)}
              />
            </div>
            <FormControl style={{ width: 200 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={keyWordType}
                onChange={(newValue) => {
                  setKeyWordType(newValue.target.value);
                }}
              >
                <MenuItem value={0}>
                  <em>---Loại từ khoá---</em>
                </MenuItem>
                <MenuItem value={1}>Tên model</MenuItem>
                <MenuItem value={2}>Mã model</MenuItem>
              </Select>
            </FormControl>
            <div className="m-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Từ ngày"
                  value={valueFromDate}
                  onChange={(newValue) => {
                    setValueFromDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Đến ngày"
                  value={valueToDate}
                  onChange={(newValue) => {
                    setValueToDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>

            <div className="searchMargin">
              <Button
                variant="contained"
                onClick={() => HandleClick(keyWordType)}
              >
                <AiOutlineSearch size={20} />
                Tim kiem
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
                    Tên model
                  </th>

                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col-4"
                  >
                    Giá
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col-2"
                  >
                    Ngày bắt đầu
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col-2"
                  >
                    Ngày kết thúc
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
                          checked={selectedItems.includes(item.modelId)}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.modelId)
                          }
                        />
                      </label>
                    </td>
                    <th scope="item">{item.modelId}</th>
                    <td className="brandEdit ">
                      <Link
                        to={`/productPriceDetail/${item.modelId}`}
                        state={{ price: item.modelPrice.price }}
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

                    <td>
                      {item.modelPrice.price
                        ? item.modelPrice.price
                        : "Chưa làm giá"}
                    </td>
                    <td>
                      {item.modelPrice.fromDate
                        ? new Date(
                            item.modelPrice.fromDate
                          ).toLocaleDateString()
                        : ""}
                    </td>
                    <td>
                      {item.modelPrice.toDate
                        ? new Date(item.modelPrice.toDate).toLocaleDateString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
            <PaginationShop
              postsPerPage={postsPerPage}
              totalPosts={priceList.length}
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
export default ERProductPrice;
