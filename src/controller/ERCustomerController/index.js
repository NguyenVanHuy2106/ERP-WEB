import API from "../../server/APIConfig";
export const getAllCustomer = async () => {
  try {
    const response = await API.get("customer/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
