import API from "../../server/APIConfig";
export const getAllMainGroup = async (keyWord, fromDate, toDate) => {
  try {
    const response = await API.post(
      "mainGroup/getAll",
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
export const addNewMainGroup = async (
  mainGroupName,
  description,
  createdUser
) => {
  try {
    const response = await API.post(
      "mainGroup/addNew",
      {
        mainGroupName: mainGroupName,
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
export const updateMainGroup = async (
  mainGroupId,
  mainGroupName,
  description,
  isActived,
  updatedUser,
  updatedDate
) => {
  try {
    const response = await API.put(
      `mainGroup/update/${mainGroupId}`,
      {
        mainGroupName: mainGroupName,
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
export const deleteMainGroup = async (mainGroupId) => {
  try {
    const response = await API.put(`mainGroup/delete/${mainGroupId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
