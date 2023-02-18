import API from "../server/APIConfig";
export const getAllShopsAPI = async (keyWord, fromDate, toDate) => {
  try {
    const response = await API.post(
      "shops/getAllByCondition",
      { keyWord: keyWord, fromDate: fromDate, toDate: toDate },
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
