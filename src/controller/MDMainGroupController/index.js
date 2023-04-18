import API from "../../server/APIConfig";
export const getAllMainGroup = async () => {
  try {
    const response = await API.get(
      "maingroup/get-all",

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
export const appGetAllMainGroup = async () => {
  try {
    const response = await API.get(
      "app/maingroup/getAll",

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
export const getMainGroupById = async (userLogin, mainGroupId) => {
  try {
    const response = await API.get(
      "maingroup/get-by-id",
      {
        userLogin: userLogin,
        data: {
          maingroupList: [mainGroupId],
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
export const addNewMainGroup = async (
  userLogin,
  mainGroupName,
  description,
  imagePath
) => {
  try {
    const response = await API.post(
      "maingroup/add-new-maingroup",
      {
        userLogin: userLogin,
        data: {
          maingroupName: mainGroupName,
          maingroupDescription: description,
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
export const updateMainGroup = async (
  userLogin,
  mainGroupId,
  mainGroupName,
  description,
  isActived
) => {
  try {
    const response = await API.post(
      `maingroup/update-maingroup`,
      {
        userLogin: userLogin,
        data: {
          maingroupId: mainGroupId,
          updateData: {
            maingroupName: mainGroupName,
            maingroupDescription: description,
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
export const deleteMainGroup = async (userLogin, mainGroupIdList) => {
  try {
    const response = await API.post(
      `mainGroup/delete`,
      {
        userLogin: userLogin,
        data: {
          maingroupIdList: mainGroupIdList,
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
