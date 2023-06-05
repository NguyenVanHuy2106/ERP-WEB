import API from "../../server/APIConfig";
import { storeId } from "../../server/storeConfig";
export const getBestSellerListAPI = async (fromDate, toDate) => {
  try {
    const response = await API.post(
      "outputVoucher/get-best-seller",
      {
        data: {
          fromDate: fromDate,
          toDate: toDate,
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
