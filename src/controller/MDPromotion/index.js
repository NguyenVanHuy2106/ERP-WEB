import API from "../../server/APIConfig";
export const getAllPromotionProgram = async (
  userLogIn,
  subgroupId,
  modelId,
  fromDate,
  toDate
) => {
  try {
    const response = await API.post(
      "promotion/search-promotion",
      {
        userLogIn: userLogIn,
        data: {
          subgroupId: subgroupId,
          modelId: modelId,
          fromDate: fromDate,
          toDate: toDate,
          isActived: null,
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
export const addNewPromotionProgram = async (userLogIn, data) => {
  try {
    const response = await API.post(
      "promotion/add-new-promotion",
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
