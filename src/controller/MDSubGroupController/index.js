import API from "../../server/APIConfig";
export const getAllSubGroup = async () => {
  try {
    const response = await API.get("subgroup/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const getAllSubGroupByMainGroup = async (mainGroupId) => {
  try {
    const response = await API.post(
      "app/subgroup/getByMainGroup",
      { mainGroupId: mainGroupId },
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
  userLogin,
  subGroupName,
  mainGroupId,
  description,
  imagePath,
  isRequestImei
) => {
  try {
    const response = await API.post(
      "subgroup/add-new-subgroup",
      {
        userLogin: userLogin,
        data: {
          subgroupName: subGroupName,
          subgroupDescription: description,
          isRequestImei: isRequestImei,
          maingroupId: mainGroupId,
          isActived: 1,
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
export const updateSubGroup = async (
  userLogin,
  subGroupId,
  subGroupName,
  mainGroupId,
  description,
  isActived,
  imagePath
) => {
  try {
    const response = await API.post(
      `subgroup/update-subgroup`,
      {
        userLogin: userLogin,
        data: {
          subgroupId: subGroupId,
          updateData: {
            subgroupName: subGroupName,
            subgroupDescription: description,
            maingroupId: mainGroupId,
            isActived: isActived,
            isDeleted: 0,
            imagePath: imagePath,
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
export const deleteSubGroup = async (userLogin, subGroupIdList) => {
  try {
    const response = await API.post(
      `subgroup/delete`,
      {
        userLogin: userLogin,
        data: {
          subgroupIdList: subGroupIdList,
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
