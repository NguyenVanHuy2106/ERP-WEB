import React, { useState, useEffect } from "react";

import { RingLoader } from "react-spinners";

import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { AiOutlineSearch } from "react-icons/ai";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { FaLaptopHouse } from "react-icons/fa";
import { getInventoryListAPI } from "../../controller/ERInventory";
import { Link } from "react-router-dom";
import { getAllModelAPI } from "../../controller/ERProduct";
import PaginationShop from "../shops/paginationShopList";
import ExportExcel from "../ExportExcel";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
function ERInventory({ route, navigate }) {
  const classes = useStyles();
  const [inventoryList, setInventoryList] = useState([]);
  const [modelIdList, setModelIdList] = useState([]);
  const [modelList, setModelList] = useState([]);
  let [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  const [storeIdSelect, setStoreIdSelect] = useState("");
  const [inventoryStatusIdSelect, setInventoryStatusIdSelect] = useState("");

  const setTime = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };
  var dataExport = [];
  inventoryList.forEach((item) => {
    //console.log(item);
    dataExport.push({
      "Mã model": item.modelId,
      "Tên model": item.modelName,
      Kho: item.storeId,
      "Trạng thái tồn": item.inventoryStatusId,
      "Số lượng khoá": item.lockAmount,
      "Tồn còn lại": item.amount,
    });
  });

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
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = inventoryList.slice(indexOfFirstPost, indexOfLastPost);
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
            <div>
              <ExportExcel data={dataExport} />
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
                    className="col-1"
                  >
                    Trạng thái tồn
                  </th>
                  <th
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    scope="col"
                    className="col-1"
                  >
                    Khai báo tồn
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
                        <div style={{ paddingLeft: 12 }}>
                          <Link to={`/inventoryManage/${item.modelId}`}>
                            {item.modelName}
                          </Link>
                        </div>
                      </div>
                    </td>

                    <td>{item.amount}</td>
                    <td>{item.lockAmount}</td>
                    <td>{item.inventoryStatusId}</td>
                    <td>
                      <Link to={"/inventory"} state={{ data: item.modelId }}>
                        <FaLaptopHouse className="brandEdit" size={35} />
                      </Link>
                    </td>
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
