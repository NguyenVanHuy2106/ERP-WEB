import API from "../../server/APIConfig";
import { storeId } from "../../server/storeConfig";
export const getOrderDetailAPI = async (saleOrder) => {
  try {
    const response = await API.post(
      "saleorder/get-saleorder-detail",
      {
        userLogIn: null,
        data: saleOrder,
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
export const exportProductAPI = async (userLogIn, saleOrder) => {
  try {
    const response = await API.post(
      "saleorder/web/update-saleorder",
      {
        userLogIn: userLogIn,
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
export const incomeAPI = async (userLogIn, saleOrder) => {
  try {
    const response = await API.post(
      "saleorder/web/income-saleorder",
      {
        userLogIn: userLogIn,
        appId: 1,
        logInStoreId: storeId,
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
