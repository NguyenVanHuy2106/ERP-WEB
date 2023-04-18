import API from "../../server/APIConfig";
export const getAllSaleOrderType = async () => {
  try {
    const response = await API.get("saleOrderType/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const addNewSaleOrderType = async (
  userLogin,
  saleOrderTypeName,
  IsAutoReviewed,
  isSupplementPromotion,
  isAutoOutputProduct,
  isCollectMoney,
  isOutput,
  outputTypeId,
  paymentOrderTypeId,
  deliveryTypeId,
  description
) => {
  try {
    const response = await API.post(
      "saleOrderType/addNew",
      {
        userLogin: userLogin,
        data: {
          saleOrderTypeName: saleOrderTypeName,
          IsAutoReviewed: IsAutoReviewed,
          isSupplementPromotion: isSupplementPromotion,
          isAutoOutputProduct: isAutoOutputProduct,
          isCollectMoney: isCollectMoney,
          isOutput: isOutput,
          outputTypeId: outputTypeId,
          paymentOrderTypeId: paymentOrderTypeId,
          deliveryTypeId: deliveryTypeId,
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
export const updateSaleOrderType = async (
  userLogin,
  saleOrderTypeId,
  saleOrderTypeName,
  IsAutoReviewed,
  isSupplementPromotion,
  isAutoOutputProduct,
  isCollectMoney,
  isOutput,
  outputTypeId,
  paymentOrderTypeId,
  deliveryTypeId,
  description,
  isActived
) => {
  try {
    const response = await API.post(
      "saleOrderType/update",
      {
        userLogin: userLogin,
        data: {
          saleOrderTypeId: saleOrderTypeId,
          updateData: {
            saleOrderTypeName: saleOrderTypeName,
            IsAutoReviewed: IsAutoReviewed,
            isSupplementPromotion: isSupplementPromotion,
            isAutoOutputProduct: isAutoOutputProduct,
            isCollectMoney: isCollectMoney,
            isOutput: isOutput,
            outputTypeId: outputTypeId,
            paymentOrderTypeId: paymentOrderTypeId,
            deliveryTypeId: deliveryTypeId,
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
export const deleteSaleOrderType = async (userLogin, saleOrderTypeIdList) => {
  try {
    const response = await API.post(
      "saleOrderType/delete",
      {
        userLogin: userLogin,
        data: {
          saleOrderTypeIdList: saleOrderTypeIdList,
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
