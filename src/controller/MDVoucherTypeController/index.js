import API from "../../server/APIConfig";
export const getAllVoucherTypeAPI = async () => {
  try {
    const response = await API.get("voucherType/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const addNewVoucherTypeAPI = async (
  userLogin,
  voucherTypeName,
  isSpend,
  description
) => {
  try {
    //console.log(userLogin, voucherTypeName, isSpend, description);
    const response = await API.post(
      "voucherType/addNew",
      {
        userLogin: userLogin,
        data: {
          voucherTypeName: voucherTypeName,
          isSpend: isSpend,
          description: description,
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
export const deleteAPI = async (userLogin, voucherTypeIdList) => {
  try {
    const response = await API.post(
      "voucherType/delete",
      {
        userLogin: userLogin,
        data: {
          voucherTypeIdList: voucherTypeIdList,
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
