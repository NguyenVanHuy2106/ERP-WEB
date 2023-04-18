import API from "../../server/APIConfig";
export const getAllPaymentOrderTypeAPI = async () => {
  try {
    const response = await API.get("paymentOrderType/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const addNewPaymentOrderTypeAPI = async (
  userLogin,
  paymentOrderTypeName,
  isOrderToPay,
  description
) => {
  try {
    //console.log(userLogin, voucherTypeName, isSpend, description);
    const response = await API.post(
      "paymentOrderType/addNew",
      {
        userLogin: userLogin,
        data: {
          paymentOrderTypeName: paymentOrderTypeName,
          isOrderToPay: isOrderToPay,
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
export const updatePaymentOrderTypeAPI = async (
  userLogin,
  paymentOrderTypeId,
  paymentOrderTypeName,
  isOrderToPay,
  description,
  isActived
) => {
  try {
    const response = await API.post(
      "paymentOrderType/update",
      {
        userLogin: userLogin,
        data: {
          paymentOrderTypeId: paymentOrderTypeId,
          updateData: {
            paymentOrderTypeName: paymentOrderTypeName,
            isOrderToPay: isOrderToPay,
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
export const deletePaymentOrderTypeAPI = async (
  userLogin,
  paymentOrderTypeIdList
) => {
  try {
    const response = await API.post(
      "paymentOrderType/delete",
      {
        userLogin: userLogin,
        data: {
          paymentOrderTypeIdList: paymentOrderTypeIdList,
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
