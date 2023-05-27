import API from "../../server/APIConfig";
export const getAllVoucherType = async (userLogIn, data) => {
  try {
    const response = await API.post(
      "payment-voucher/get-by-attribute",
      {
        userLogIn: userLogIn,
        data: data,
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
export const getAllVoucherTypeDetail = async (userLogIn, data) => {
  try {
    const response = await API.post(
      "payment-voucher/get-payment-voucher-detail",
      {
        userLogIn: userLogIn,
        data: data,
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
