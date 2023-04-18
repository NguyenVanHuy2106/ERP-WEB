import API from "../../server/APIConfig";
export const getAllStoreAPI = async () => {
  try {
    const response = await API.get("store/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const addNewStoreAPI = async (
  userLogin,
  storeName,
  description,
  storeProvinceId,
  storeDistrictId,
  storeWardId,
  storeAddress,
  storeManager,
  storeTypeId
) => {
  try {
    const response = await API.post(
      "store/addNew",
      {
        userLogin: userLogin,
        data: {
          storeName: storeName,
          description: description,
          storeProvinceId: storeProvinceId,
          storeDistrictId: storeDistrictId,
          storeWardId: storeWardId,
          storeAddress: storeAddress,
          storeManager: storeManager,
          storeTypeId: storeTypeId,
          isActived: 1,
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
export const updateStoreAPI = async (
  userLogin,
  storeId,
  storeName,
  description,
  storeProvinceId,
  storeDistrictId,
  storeWardId,
  storeAddress,
  storeManager,
  storeTypeId,
  isActived
) => {
  try {
    const response = await API.post(
      "store/update",
      {
        userLogin: userLogin,
        data: {
          storeId: storeId,
          updateData: {
            storeName: storeName,
            description: description,
            storeProvinceId: storeProvinceId,
            storeDistrictId: storeDistrictId,
            storeWardId: storeWardId,
            storeAddress: storeAddress,
            storeManager: storeManager,
            storeTypeId: storeTypeId,
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
export const deleteStoreAPI = async (userLogin, storeIdList) => {
  try {
    const response = await API.post(
      "store/delete",
      {
        userLogin: userLogin,
        data: {
          storeIdList: storeIdList,
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
