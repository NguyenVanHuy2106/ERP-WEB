import API from "../../server/APIConfig";
export const getAllCategoryAPI = async (keyWord, fromDate, toDate) => {
  try {
    const response = await API.post(
      "category/getAllByCondition",
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
export const addNewCategoryAPI = async (
  catName,
  description,
  level,
  parent
) => {
  try {
    const response = await API.post(
      "category/addNewCategory",
      {
        catName: catName,
        description: description,
        level: level,
        parent: parent,
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

export const updateDetailCategoryAPI = async (
  catId,
  catName,
  description,
  level,
  parent,
  updatedUser,
  updatedDate,
  isActived
) => {
  try {
    const response = await API.put(
      `category/updateDetail/${catId}`,
      {
        catName: catName,
        description: description,
        level: level,
        parent: parent,
        updatedUser: updatedUser,
        updatedDate: updatedDate,
        isActived: isActived,
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

export const deleteCategoryAPI = async (catId) => {
  try {
    const response = await API.put(`category/delete/${catId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
