import API from "../../server/APIConfig";
export const getAllSubGroup = async (keyWord, fromDate, toDate) => {
  try {
    const response = await API.post(
      "subGroup/getAll",
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

export const addNewSubGroup = async (
  subGroupName,
  mainGroupId,
  isRequestImei,
  isCheckStockQuantity,
  isCanReturnOutput,
  image,
  isAutoCreateImei,
  description,
  createdUser
) => {
  try {
    const response = await API.post(
      "subGroup/addNew",
      {
        subGroupName: subGroupName,
        mainGroupId: mainGroupId,
        isRequestImei: isRequestImei,
        isCheckStockQuantity: isCheckStockQuantity,
        isCanReturnOutput: isCanReturnOutput,
        image: image,
        isAutoCreateImei: isAutoCreateImei,
        description: description,
        createdUser: createdUser,
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
export const updateSubGroup = async (
  subGroupId,
  subGroupName,
  mainGroupId,
  isRequestImei,
  isCheckStockQuantity,
  isCanReturnOutput,
  isAutoCreateImei,
  description,
  isActived,
  updatedUser,
  updatedDate
) => {
  try {
    const response = await API.put(
      `subGroup/update/${subGroupId}`,
      {
        subGroupName: subGroupName,
        mainGroupId: mainGroupId,
        isRequestImei: isRequestImei,
        isCheckStockQuantity: isCheckStockQuantity,
        isCanReturnOutput: isCanReturnOutput,
        isAutoCreateImei: isAutoCreateImei,
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
export const deleteSubGroup = async (subGroupId) => {
  try {
    const response = await API.put(`subGroup/delete/${subGroupId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
