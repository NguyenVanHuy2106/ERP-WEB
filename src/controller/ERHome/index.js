import API from "../../server/APIConfig";
import { storeId } from "../../server/storeConfig";
export const countOrder = async (userLogIn) => {
  try {
    const response = await API.post(
      "saleorder/get-saleorder-count",
      {
        userLogIn: userLogIn,
        data: { customerId: null },
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
export const getReportSaleOrderInMonthAPI = async () => {
  try {
    const response = await API.get(
      "saleorder/web/get-saleorder-reports-by-month",
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
export const getReportRevenueAPI = async (month, year) => {
  try {
    const response = await API.get(
      "saleorder/web/get-saleorder-reports-sales-by-month",
      {
        params: { month: month, year: year },
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
