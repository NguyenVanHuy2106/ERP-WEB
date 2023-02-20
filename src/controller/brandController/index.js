import API from "../../server/APIConfig";
export const getAllBrand = async (keyWord, fromDate, toDate) => {
  try {
    const response = await API.post(
      "brand/getAllBrand",
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
export const addNewBrand = async (brandName, description, createdUser) => {
  try {
    const response = await API.post(
      "brand/addNewBrand",
      {
        brandName: brandName,
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
export const updateBrand = async (
  brandId,
  brandName,
  description,
  isActived,
  updatedUser,
  updatedDate
) => {
  try {
    const response = await API.put(
      `brand/update/${brandId}`,
      {
        brandName: brandName,
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
export const deleteBrand = async (brandId) => {
  try {
    const response = await API.put(`brand/delete/${brandId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
