import API from "../../server/APIConfig";
export const getAll = async (keyWord, fromDate, toDate) => {
  try {
    const response = await API.post(
      "model/getAll",
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
export const addNew = async (
  modelName,
  description,
  createdUser,
  baseProduct
) => {
  try {
    const response = await API.post(
      "model/addNew",
      {
        modelName: modelName,
        description: description,
        createdUser: createdUser,
        baseProduct: baseProduct,
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
export const update = async (
  modelId,
  modelName,
  description,
  isActived,
  updatedUser,
  updatedDate
) => {
  try {
    const response = await API.put(
      `model/update/${modelId}`,
      {
        modelName: modelName,
        description: description,
        isActived: isActived,
        updatedUser: updatedUser,
        updatedDate: updatedDate,
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
export const deleteAPI = async (modelId) => {
  try {
    const response = await API.put(`model/delete/${modelId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
