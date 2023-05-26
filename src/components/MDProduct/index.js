import React, { useState, useEffect, useStyle, useMemo } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { RingLoader, CircleLoader } from "react-spinners";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import Drawer from "@material-ui/core/Drawer";
import Select from "@mui/material/Select";

import {
  FiChevronRight,
  FiChevronLeft,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { appGetAllMainGroup } from "../../controller/MDMainGroupController";
import { getAllSubGroupByMainGroup } from "../../controller/MDSubGroupController";
import { AppGetAllBrand } from "../../controller/MDBrandController";
import { AppGetAllQuantityUnit } from "../../controller/quantityUnit";
import { addNewProductAPI } from "../../controller/MDProductController";
import { storage } from "../../server/FirebaseConfig";
import "./css/index.css";
const steps = [
  "Khai báo thông tin cơ bản sản phẩm",
  "Khai báo thuộc tính sản phẩm",
];
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

export default function MDProduct() {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  let [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [modelName, setModelName] = useState("");
  const [modelDescription, setModelDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [mainGroup, setMainGroup] = useState([]);
  let userId = localStorage.getItem("userId");
  //   console.log(mainGroupData);
  const [mainGroupIdSelect, setMainGroupIdSelect] = useState("");
  const [subGroup, setSubGroup] = useState([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [weightP, setWeightP] = useState(0);
  const [length, setLength] = useState(0);
  const [subGroupIdSelect, setSubGroupIdSelect] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandIdSelect, setBrandIdSelect] = useState("");
  const [quantity, setQuantity] = useState([]);
  const [quantityIdSelect, setQuantityIdSelect] = useState("");
  const [items, setItems] = useState([
    {
      modelAttributeId: null,
      modelAttributeName: "",
      isActived: 1,
      modelMDLAttributeValue: "",
      isVarrantAttribute: false,
      VarrantAttributeValueList: [
        {
          modelVarantAttributeGroupId: null,
          modelVarantAttributeValueId: null,
          modelVarantAttributeValueName: "",
          isActived: 1,
          imagePath: "",
        },
      ],
    },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        modelAttributeId: null,
        modelAttributeName: "",
        isActived: 1,
        modelMDLAttributeValue: "",
        isVarrantAttribute: false,
        VarrantAttributeValueList: [],
      },
    ]);
  };
  const handleInputChange = (event, index) => {
    const newItems = [...items];
    newItems[index].modelAttributeName = event.target.value;
    setItems(newItems);
  };
  const handleDeleteItems = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleRemoveVariant = (index, VariantIndex) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item, itemIndex) => {
        if (itemIndex !== index) return item;
        return {
          ...item,
          VarrantAttributeValueList: item.VarrantAttributeValueList.filter(
            (variant, variantIndex) => variantIndex !== VariantIndex
          ),
        };
      });
      return newItems;
    });
  };
  const handleCheckboxChange = (event, index) => {
    const newItems = [...items];
    newItems[index].isVarrantAttribute = event.target.checked;
    setItems(newItems);
    setIsOpenDrawer(true);
  };
  const addSubItem = (index) => {
    const newSubItem = {
      modelVarantAttributeGroupId: null,
      modelVarantAttributeValueId: null,
      modelVarantAttributeValueName: "",
      isActived: 1,
    };
    const newItem = {
      ...items[index],
      VarrantAttributeValueList: [
        ...items[index].VarrantAttributeValueList,
        newSubItem,
      ],
    };
    const newItems = [...items];
    newItems[index] = newItem;
    setItems(newItems);
  };
  const handleDesChange = (event, index) => {
    const newItems = [...items];
    newItems[index].modelMDLAttributeValue = event.target.value;
    setItems(newItems);
  };

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setIsOpenDrawer(false);
  };

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

  const [urlVarrant, setUrlVarrant] = useState("");

  // const handleImageChangeVarrant = (e, index, indexVariant) => {
  //   if (e.target.files[0]) {
  //     const uploadTask = storage
  //       .ref(`images/${e.target.files[0].name}`)
  //       .put(e.target.files[0]);
  //     uploadTask.on("state_changed", null, null, () => {
  //       uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
  //         setItems((prevItems) => {
  //           const newItems = [...prevItems];
  //           newItems[index].VarrantAttributeValueList[indexVariant].imagePath =
  //             downloadUrl;
  //           return newItems;
  //         });
  //       });
  //     });
  //   }
  // };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === steps.length - 1) {
      setLoading(false);
      const result = await addNewProductAPI(
        userId,
        modelName,
        modelDescription,
        url,
        mainGroupIdSelect,
        subGroupIdSelect,
        brandIdSelect,
        quantityIdSelect,
        items,
        length,
        width,
        height,
        weightP
      );
      if (result.status === 200) {
        setShowAlert(true);
        setLoading(true);
      }
      // console.log(items);
      // console.log(
      //   userId,
      //   modelName,
      //   modelDescription,
      //   url,
      //   mainGroupIdSelect,
      //   subGroupIdSelect,
      //   brandIdSelect,
      //   quantityIdSelect,
      //   "modelAttributeList",
      //   items
      // );
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleChangeLength = (event) => {
    setLength(event.target.value);
  };
  const handleChangeWidth = (event) => {
    setWidth(event.target.value);
  };
  const handleChangeHeight = (event) => {
    setHeight(event.target.value);
  };
  const handleChangeWeightP = (event) => {
    setWeightP(event.target.value);
  };
  const handleChangeModelName = (event) => {
    setModelName(event.target.value);
  };
  const handleChangeModelDescription = (event) => {
    setModelDescription(event.target.value);
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
  const handleChangeQuantityUnitIdSelect = (event) => {
    setQuantityIdSelect(event.target.value);
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
  const HandleGetAllQuantiyUnit = async () => {
    const result = await AppGetAllQuantityUnit();
    if (result.status === 200) {
      setQuantity(result.data.data.quantityUnits);
    }
  };
  const handleImageChangeVarrant = (e, index, indexVariant) => {
    //console.log(index, indexVariant);
    if (e.target.files[0]) {
      const uploadTask = storage
        .ref(`images/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      uploadTask.on("state_changed", null, null, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          setItems((prevItems) => {
            const newItems = [...prevItems];
            newItems[index].VarrantAttributeValueList[indexVariant].imagePath =
              downloadUrl;
            return newItems;
          });
        });
      });
    }
  };

  useEffect(() => {
    setTime();
    HandleGetAllMainGroup();
    HandleGetAllBrand();
    HandleGetAllQuantiyUnit();
  }, []);

  const TwoScreen = (activeStep) => {
    if (activeStep === 0) {
      return (
        <div
          style={{ marginTop: 20, marginLeft: 80, marginRight: 80 }}
          className="d-flex justify-content-evenly"
        >
          <div style={{ marginTop: 16 }}>
            <div className="d-flex flex-column">
              <label htmlFor="text-input">Tên Model sản phẩm</label>
              <input
                id="text-input"
                type="text"
                value={modelName}
                placeholder="Nhập tên Model"
                onChange={handleChangeModelName}
                style={{
                  height: 50,
                  marginTop: 12,
                  paddingLeft: 10,
                }}
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <div>Chọn ngành hàng</div>
              <select
                value={mainGroupIdSelect}
                onChange={handleChangeMainGroupIdSelect}
                style={{
                  height: 50,
                  width: 500,
                  marginTop: 12,
                  color: "#757575",
                  fontSize: 16,
                  paddingLeft: 5,
                }}
              >
                <option value="">--Chọn ngành hàng--</option>
                {mainGroup.map((item, index) => (
                  <option key={index} value={item.maingroupId}>
                    {item.maingroupId + " - " + item.maingroupName}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: 16 }}>
              <div>Chọn nhóm hàng</div>
              <select
                value={subGroupIdSelect}
                onChange={handleChangeSubGroupIdSelect}
                style={{
                  height: 50,
                  width: 500,
                  marginTop: 12,
                  color: "#757575",
                  fontSize: 16,
                  paddingLeft: 5,
                }}
              >
                <option value="">--Chọn nhóm hàng--</option>
                {subGroup.map((item, index) => (
                  <option key={index} value={item.subgroupId}>
                    {item.subgroupId + " - " + item.subgroupName}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: 16 }}>
              <div>Chọn thương hiệu</div>
              <select
                value={brandIdSelect}
                onChange={handleChangeBrandIdSelect}
                style={{
                  height: 50,
                  width: 500,
                  marginTop: 12,
                  color: "#757575",
                  fontSize: 16,
                  paddingLeft: 5,
                }}
              >
                <option value="">--Chọn thương hiệu hàng--</option>
                {brand.map((item, index) => (
                  <option key={index} value={item.brandId}>
                    {item.brandId + " - " + item.brandName}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: 16 }}>
              <div>Chọn đơn vị</div>
              <select
                value={quantityIdSelect}
                onChange={handleChangeQuantityUnitIdSelect}
                style={{
                  height: 50,
                  width: 500,
                  marginTop: 12,
                  color: "#757575",
                  fontSize: 16,
                  paddingLeft: 5,
                }}
              >
                <option value="">--Chọn đơn vị--</option>
                {quantity.map((item, index) => (
                  <option key={index} value={item.quantityUnitId}>
                    {item.quantityUnitId + " - " + item.quantityUnitName}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex flex-column" style={{ marginTop: 16 }}>
              <label htmlFor="text-input">Khối lượng sản phẩm (gram)</label>
              <input
                id="text-input"
                type="number"
                value={weightP}
                placeholder="Nhập khối lượng sản phẩm"
                onChange={handleChangeWeightP}
                style={{
                  width: 500,
                  height: 50,
                  marginTop: 12,
                  paddingLeft: 10,
                }}
              />
            </div>
            <div className="d-flex flex-column" style={{ marginTop: 16 }}>
              <label htmlFor="text-input">Chiều dài sản phẩm (cm)</label>
              <input
                id="text-input"
                type="number"
                value={length}
                placeholder="Nhập chiều dài sản phẩm"
                onChange={handleChangeLength}
                style={{
                  width: 500,
                  height: 50,
                  marginTop: 12,
                  paddingLeft: 10,
                }}
              />
            </div>
            <div className="d-flex flex-column" style={{ marginTop: 16 }}>
              <label htmlFor="text-input">Chiều rộng sản phẩm (cm)</label>
              <input
                id="text-input"
                type="number"
                value={width}
                placeholder="Nhập chiều rộng sản phẩm"
                onChange={handleChangeWidth}
                style={{
                  width: 500,
                  height: 50,
                  marginTop: 12,
                  paddingLeft: 10,
                }}
              />
            </div>
            <div className="d-flex flex-column" style={{ marginTop: 16 }}>
              <label htmlFor="text-input">Chiều cao sản phẩm (cm)</label>
              <input
                id="text-input"
                type="number"
                value={height}
                placeholder="Nhập chiều rộng sản phẩm"
                onChange={handleChangeHeight}
                style={{
                  width: 500,
                  height: 50,
                  marginTop: 12,
                  paddingLeft: 10,
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="d-flex flex-column">
              <label htmlFor="text-input">Mô tả</label>
              <textarea
                id="text-input"
                type="text"
                value={modelDescription}
                placeholder="Nhập mô tả"
                multiple
                onChange={handleChangeModelDescription}
                style={{
                  width: 500,
                  height: 200,
                  marginTop: 12,
                  paddingLeft: 10,
                }}
              />
            </div>
            <div className="d-flex flex-column" style={{ marginTop: 16 }}>
              <label htmlFor="image-uploader">
                {url ? (
                  <img
                    src={url}
                    alt="Selected file"
                    width={200}
                    height={200}
                    className="border"
                  />
                ) : (
                  <div
                    className="d-flex border border-dashed justify-content-center align-items-center"
                    style={{ width: 200, height: 200 }}
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
          </div>
        </div>
      );
    } else {
      //////////////////////////////////////STEP 2////////////////////////////////////
      return (
        <div style={{ marginTop: 20, marginLeft: 80, marginRight: 80 }}>
          <div>
            <div>
              <Button
                onClick={handleAddItem}
                variant="contained"
                style={{
                  marginRight: 20,
                  marginTop: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    paddingBottom: "3px",
                    paddingTop: "3px",
                    width: 60,
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <FiPlus size={20} />
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Thêm
                  </div>
                </div>
              </Button>
            </div>
            <div className="mt-3">
              <div className="d-flex flex-column">
                {items.map((item, index) => (
                  <div key={index} className="d-flex">
                    <div
                      onClick={() => handleDeleteItems(index)}
                      className="d-flex justify-content-end DeleDeleteItems"
                      style={{
                        marginTop: 10,
                        position: "absolute",
                        backgroundColor: "#EEEEEE",
                      }}
                    >
                      <FiTrash2 size={25} />
                    </div>
                    <div
                      style={{
                        marginTop: 24,
                        backgroundColor: "#EEEEEE",
                        paddingLeft: 50,
                        paddingRight: 50,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      <div className="d-flex flex-column">
                        Thuộc tính {index + 1}
                        <input
                          type="text"
                          value={item.modelAttributeName}
                          placeholder={`Nhập tên thuộc tính ${index + 1}`}
                          onChange={(event) => handleInputChange(event, index)}
                          style={{
                            width: 300,
                            height: 50,
                            marginTop: 8,
                            paddingLeft: 10,
                          }}
                        />
                      </div>
                      <div
                        className="d-flex flex-column"
                        style={{ marginTop: 8 }}
                      >
                        <label htmlFor="text-input">Mô tả</label>
                        <textarea
                          id="text-input"
                          type="text"
                          value={item.modelMDLAttributeValue}
                          placeholder="Nhập mô tả"
                          multiple
                          onChange={(event) => handleDesChange(event, index)}
                          style={{
                            width: 300,
                            height: 100,
                            marginTop: 8,
                            paddingLeft: 10,
                          }}
                        />
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ marginTop: 16 }}
                      >
                        <input
                          type="checkbox"
                          checked={item.isVarrantAttribute}
                          onChange={(event) =>
                            handleCheckboxChange(event, index)
                          }
                          style={{
                            height: 25,
                            width: 25,
                            marginRight: 15,
                          }}
                        />
                        Thuộc tính phân loại
                      </div>
                    </div>

                    <div>
                      {item.isVarrantAttribute && (
                        <div style={{ marginTop: 24, marginLeft: 16 }}>
                          <div>Thêm giá trị thuộc tính phân loại</div>
                          <button
                            variant="outline"
                            onClick={() => addSubItem(index)}
                          >
                            +
                          </button>
                          {item.VarrantAttributeValueList.map(
                            (varrant, indexVariant) => (
                              <div
                                //className="d-flex align-items-center"
                                key={indexVariant}
                                style={{ marginTop: 12 }}
                              >
                                <div>
                                  Giá trị {indexVariant + 1}
                                  <div className="d-flex">
                                    <input
                                      type="text"
                                      style={{
                                        height: 40,
                                        width: 200,
                                        marginLeft: 10,
                                      }}
                                      value={
                                        varrant.modelVarantAttributeValueName
                                      }
                                      onChange={(event) => {
                                        const newValue = event.target.value;
                                        setItems((prevItems) => {
                                          const newItems = [...prevItems];

                                          newItems[
                                            index
                                          ].VarrantAttributeValueList[
                                            indexVariant
                                          ].modelVarantAttributeValueName =
                                            newValue;
                                          return newItems;
                                        });
                                      }}
                                    />
                                    <button
                                      className="d-flex justify-content-center align-items-center"
                                      style={{
                                        marginLeft: 10,
                                        width: 30,
                                        height: 30,
                                      }}
                                      onClick={() =>
                                        handleRemoveVariant(index, indexVariant)
                                      }
                                    >
                                      <FiTrash2 />
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  <div
                                    style={{ marginLeft: 37, marginTop: 12 }}
                                  >
                                    <label htmlFor="image-uploader1">
                                      {varrant.imagePath ? (
                                        <img
                                          src={varrant.imagePath}
                                          alt="Selected file"
                                          width={150}
                                          height={150}
                                        />
                                      ) : (
                                        <div
                                          className="d-flex border border-dashed justify-content-center align-items-center"
                                          style={{ width: 100, height: 100 }}
                                        >
                                          Chọn ảnh
                                        </div>
                                      )}
                                    </label>
                                    <input
                                      id="image-uploader1"
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleImageChangeVarrant(
                                          e,
                                          index,
                                          indexVariant
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {/* <label htmlFor="text-input">Tên thuộc tính</label>
                <input
                  id="text-input"
                  type="text"
                  value={modelName}
                  placeholder="Nhập tên thuộc tính"
                  onChange={handleChangeModelName}
                  style={{
                    width: 300,
                    height: 50,
                    marginTop: 12,
                    paddingLeft: 10,
                  }}
                /> */}
              </div>
            </div>
          </div>

          {/* <Drawer anchor="right" open={isOpenDrawer} onClose={toggleDrawer}>
            <div>Huy</div>
          </Drawer> */}
        </div>
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#E5E4E2",
        height: "800px",
      }}
    >
      <div
        style={{
          marginLeft: 20,
          marginRight: 20,
          paddingTop: 20,
        }}
      >
        <Stepper
          activeStep={activeStep}
          style={{
            backgroundColor: "#ffffff",
            paddingLeft: 300,
            paddingRight: 300,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 3,
          }}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  {...labelProps}
                  className="d-flex flex-wrap justify-content-center "
                  style={{ textAlign: "center", width: 150 }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
      {activeStep === steps.length ? (
        <React.Fragment>
          {showAlert && (
            <Typography sx={{ mt: 2, mb: 1 }}>
              Thêm sản phẩm thành công
            </Typography>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div
            style={{
              backgroundColor: "#ffffff",
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 3,
              paddingBottom: 24,
            }}
          >
            {TwoScreen(activeStep)}
          </div>
          <div
            className="d-flex justify-content-between"
            style={{
              backgroundColor: "#ffffff",
              marginLeft: 20,
              marginRight: 20,
              marginTop: 20,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="contained"
              style={{ marginLeft: 20 }}
            >
              <div
                style={{
                  display: "flex",
                  paddingBottom: "3px",
                  paddingTop: "3px",
                  width: 100,
                  justifyItems: "center",
                  alignItems: "center",
                  marginLeft: 15,
                }}
              >
                <FiChevronLeft size={20} color="#1876d2" />
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#1876d2",
                  }}
                >
                  Trở về
                </div>
              </div>
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              onClick={handleNext}
              variant="contained"
              style={{ marginRight: 20 }}
            >
              <div
                style={{
                  display: "flex",
                  paddingBottom: "3px",
                  paddingTop: "3px",
                  width: 100,
                  justifyItems: "center",
                  alignItems: "center",
                  marginLeft: 15,
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {activeStep === steps.length - 1 ? "Kết thúc" : "Tiếp tục"}
                </div>
                <FiChevronRight size={20} />
              </div>
            </Button>
          </div>
        </React.Fragment>
      )}

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
