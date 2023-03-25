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
export const addNewAPI = async (
  userLogin,
  storeTypeName,
  storeTypeDescription,
  isHasLimitStock,
  maxProductQuantity
) => {
  try {
    const response = await API.post(
      "storeType/addNew",
      {
        userLogin: userLogin,
        data: {
          storeTypeName: storeTypeName,
          storeTypeDescription: storeTypeDescription,
          isHasLimitStock: isHasLimitStock,
          maxProductQuantity: maxProductQuantity,
          isActived: 1,
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
export const deleteAPI = async (userLogin, storeTypeId) => {
  try {
    const response = await API.post(
      "storeType/update",
      {
        userLogin: userLogin,
        data: {
          storeTypeId: storeTypeId,
          updateData: {
            storeTypeName: null,
            storeTypeDescription: null,
            isHasLimitStock: null,
            maxProductQuantity: null,
            isActived: null,
            isDeleted: 1,
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
