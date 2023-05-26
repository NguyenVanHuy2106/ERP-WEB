import API from "../../server/APIConfig";
import { storeId } from "../../server/storeConfig";
export const getOutputVoucherAPI = async (
  outputVoucherId,
  fromDate,
  toDate
) => {
  try {
    const response = await API.post(
      "outputVoucher/get-all",
      {
        data: {
          outputVoucherId: outputVoucherId,
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
export const getDetailOutputVoucherAPI = async (outputVoucherId) => {
  try {
    const response = await API.get(
      `outputVoucher/get-by-id`,
      {
        params: { outputVoucherId: outputVoucherId },
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
