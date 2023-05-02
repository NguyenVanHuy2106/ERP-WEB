import API from "../../server/APIConfig";
export const getAllAPI = async () => {
  try {
    const response = await API.get("storeType/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const addNewProductAPI = async (
  userLogin,
  modelName,
  modelDescription,
  imagePath,
  maingroupId,
  subgroupId,
  brandId,
  quantityUnitId,
  modelAttributeList
) => {
  try {
    const response = await API.post(
      "model/web/create-new-model",
      {
        userLogin: userLogin,
        data: {
          model: {
            modelId: null,
            modelName: modelName,
            modelDescription: modelDescription,
            imagePath: imagePath,
            maingroupId: maingroupId,
            subgroupId: subgroupId,
            brandId: brandId,
            quantityUnitId: quantityUnitId,
            isActived: 1,
          },
          modelAttributeList: modelAttributeList,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};
export const updateAPI = async (
  userLogin,
  storeTypeId,
  storeTypeName,
  storeTypeDescription,
  isHasLimitStock,
  maxProductQuantity,
  isActived
) => {
  try {
    // console.log(
    //   userLogin,
    //   storeTypeId,
    //   storeTypeName,
    //   storeTypeDescription,
    //   isHasLimitStock,
    //   maxProductQuantity,
    //   isActived
    // );
    const response = await API.post(
      "storeType/update",
      {
        userLogin: userLogin,
        data: {
          storeTypeId: storeTypeId,
          updateData: {
            storeTypeName: storeTypeName,
            storeTypeDescription: storeTypeDescription,
            isHasLimitStock: isHasLimitStock,
            maxProductQuantity: maxProductQuantity,
            isActived: isActived,
            isDeleted: 0,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};
export const deleteAPI = async (userLogin, storeTypeIdList) => {
  try {
    const response = await API.post(
      "storeType/delete",
      {
        userLogin: userLogin,
        data: {
          storeTypeIdList: storeTypeIdList,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};
