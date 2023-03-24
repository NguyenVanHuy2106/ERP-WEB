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

export const addNewSubGroup = async (
  userLogin,
  subGroupName,
  mainGroupId,
  description
) => {
  try {
    const response = await API.post(
      "subgroup/add-new-subgroup",
      {
        userLogin: userLogin,
        data: {
          subgroupName: subGroupName,
          subgroupDescription: description,
          maingroupId: mainGroupId,
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
export const updateSubGroup = async (
  userLogin,
  subGroupId,
  subGroupName,
  mainGroupId,
  description,
  isActived
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
export const deleteSubGroup = async (userLogin, subGroupId) => {
  try {
    const response = await API.post(
      `subgroup/update-subgroup`,
      {
        userLogin: userLogin,
        data: {
          subgroupId: subGroupId,
          updateData: {
            subgroupName: null,
            subgroupDescription: null,
            maingroupId: null,
            isActived: null,
            isDeleted: 1,
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
