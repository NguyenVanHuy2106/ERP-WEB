import API from "../../server/APIConfig";
export const getAllInventoryStatus = async () => {
  try {
    const response = await API.get(
      "inventoryStatus/get-all",

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
export const addNewInventoryStatus = async (
  userLogin,
  inventoryStatusName,
  inventoryStatusDescription
) => {
  try {
    const response = await API.post(
      "inventoryStatus/addNew",
      {
        userLogin: userLogin,
        data: {
          inventoryStatusName: inventoryStatusName,
          inventoryStatusDescription: inventoryStatusDescription,
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
export const updateInventoryStatus = async (
  userLogin,
  inventoryStatusId,
  inventoryStatusName,
  inventoryStatusDescription,
  isActived
) => {
  try {
    const response = await API.post(
      `inventoryStatus/update`,
      {
        userLogin: userLogin,
        data: {
          inventoryStatusId: inventoryStatusId,
          updateData: {
            inventoryStatusName: inventoryStatusName,
            inventoryStatusDescription: inventoryStatusDescription,
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
export const deleteInventoryStatus = async (
  userLogin,
  inventoryStatusIdList
) => {
  try {
    const response = await API.post(
      "inventoryStatus/delete",
      {
        userLogin: userLogin,
        data: {
          inventoryStatusIdList: inventoryStatusIdList,
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
