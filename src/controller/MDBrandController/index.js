import API from "../../server/APIConfig";
export const getAllBrand = async (keyWord, fromDate, toDate) => {
  try {
    const response = await API.get("brand/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const AppGetAllBrand = async () => {
  try {
    const response = await API.get("app/brand/getAll", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const addNewBrand = async (
  userLogin,
  brandName,
  brandDescription,
  isActived,
  imagePath
) => {
  try {
    const response = await API.post(
      "brand/add-new-brand",
      {
        userLogin: userLogin,
        data: {
          brandName: brandName,
          brandDescription: brandDescription,
          isActived: isActived,
          imagePath: imagePath,
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
export const updateBrand = async (
  userLogin,
  brandId,
  brandName,
  description,
  isActived
) => {
  try {
    const response = await API.post(
      `brand/update-brand`,
      {
        userLogin: userLogin,
        data: {
          brandId: brandId,
          updateData: {
            brandName: brandName,
            brandDescription: description,
            isActived: isActived,
            isDeleted: 0,
          },
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
export const deleteBrand = async (userLogin, brandIdList) => {
  try {
    const response = await API.post(
      `brand/delete-brand`,
      {
        userLogin: userLogin,
        data: {
          brandIdList: brandIdList,
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
