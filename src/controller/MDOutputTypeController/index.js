import API from "../../server/APIConfig";
export const getAllAPI = async () => {
  try {
    const response = await API.get("outputType/get-all", {
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
  outputTypeName,
  getPriceType,
  isCanReturn,
  isSale,
  isPromotion,
  voucherTypeId,
  description
) => {
  try {
    const response = await API.post(
      "outputType/addNew",
      {
        userLogin: userLogin,
        data: {
          outputTypeName: outputTypeName,
          getPriceType: getPriceType,
          isCanReturn: isCanReturn,
          isSale: isSale,
          isPromotion: isPromotion,
          voucherTypeId: voucherTypeId,
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
  outputTypeId,
  outputTypeName,
  getPriceType,
  isCanReturn,
  isSale,
  isPromotion,
  voucherTypeId,
  description,
  isActived
) => {
  try {
    const response = await API.post(
      "outputType/update",
      {
        userLogin: userLogin,
        data: {
          outputTypeId: outputTypeId,
          updateData: {
            outputTypeName: outputTypeName,
            getPriceType: getPriceType,
            isCanReturn: isCanReturn,
            isSale: isSale,
            isPromotion: isPromotion,
            voucherTypeId: voucherTypeId,
            description: description,
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
export const deleteAPI = async (userLogin, outputTypeIdList) => {
  try {
    const response = await API.post(
      "outputType/delete",
      {
        userLogin: userLogin,
        data: {
          outputTypeIdList: outputTypeIdList,
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
