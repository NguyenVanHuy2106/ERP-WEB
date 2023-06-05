import API from "../../server/APIConfig";
import { storeId } from "../../server/storeConfig";
export const getOrderListAPI = async (userLogIn, condition) => {
  try {
    const response = await API.post(
      "saleorder/get-saleorder-list",
      {
        userLogIn: userLogIn,
        data: {
          condition: condition,
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

export const updateOrderAPI = async (
  userLogIn,
  saleOrderList,
  isReviewed,
  isDelivery,
  isOutput,
  isIncome,
  isDeleted,
  deletedNote
) => {
  try {
    const response = await API.post(
      "saleorder/update-saleorder",
      {
        userLogIn: userLogIn,
        data: {
          updateStatus: {
            saleOrderList: saleOrderList,
            isReviewed: isReviewed,
            isDelivery: isDelivery,
            isOutput: isOutput,
            isIncome: isIncome,
            isDeleted: isDeleted,
            deletedNote: deletedNote,
            deletedApp: 1,
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

export const updateCancelOrderAPI = async (userLogIn, saleOrder) => {
  try {
    const response = await API.post(
      "saleorder/web/cancel-saleorder",
      {
        userLogIn: userLogIn,
        appId: 2,
        logInStoreId: 1,
        data: {
          saleOrder: saleOrder,
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
