import React, { useState, useEffect, useStyle, useMemo } from "react";
import { RingLoader, CircleLoader } from "react-spinners";
import Backdrop from "@mui/material/Backdrop";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";

import { AiOutlineSearch, AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
//import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
function PromotionProgram({ route, navigate }) {
  let [loading, setLoading] = useState(false);
  //const [shops, setShops] = useState([]);
  const [tFValue, setTFValue] = useState("");
  const classes = useStyles();
  //const [length, setLength] = useState(0);

  var toDateDayjs = dayjs();
  var today = new Date();
  // var date =
  //   today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
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
    //console.log(fromDate, toDate);
    // const result = await getAllShopsAPI(tFValue, fromDate, toDate);
    // if (result.status === 200) {
    //   setShops(result.data.ResultObject.shopList);
    //   setLength(result.data.ResultObject.shopList);
    //   setLoading(true);
    // }
  };
  useEffect(() => {
    setTime();
    HandleClick();
  }, []);

  return (
    <div className="searchMargin-container App" style={{ marginTop: "20px" }}>
      {/* <div
        className="d-flex border mt-3 containerBtn align-items-center"
        style={{ marginBottom: "10px" }}
      >
        <div className="titlePage ">DANH SÁCH CỬA HÀNG ĐỐI TÁC</div>
      </div> */}
      <div className="d-flex">
        <div className="border d-flex flex-column align-items-center">
          <div
            style={{
              width: "220px",
              background: "#C0C0C0",
              padding: "5px",
              fontWeight: "bold",
            }}
            className="border-bottom d-flex justify-content-center"
          >
            Tìm kiếm
          </div>
          <div style={{ width: "200px", marginTop: "20px" }}>
            <TextField
              id="outlined-basic"
              label="Tu khoa"
              variant="outlined"
              size="small"
              style={{
                width: "200px",
              }}
              onChange={(newValue) => setTFValue(newValue.target.value)}
            />
          </div>
          <div style={{ width: "200px", marginTop: "20px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Từ ngày"
                  value={valueFromDate}
                  onChange={(newValue) => {
                    setValueFromDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <div style={{ width: "200px", marginTop: "20px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Den ngày"
                  value={valueToDate}
                  onChange={(newValue) => {
                    setValueToDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <div
            style={{ width: "220px", marginTop: "20px" }}
            className="d-flex justify-content-center"
          >
            <Button variant="contained" onClick={HandleClick}>
              <AiOutlineSearch size={20} />
              TÌM KIẾM
            </Button>
          </div>
        </div>
        <div>
          <div
            className="d-flex justify-content-center"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              overflowY: "scroll",
              height: "620px",
            }}
          >
            HUYHUY
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
export default PromotionProgram;
