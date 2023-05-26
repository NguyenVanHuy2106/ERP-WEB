import API from "../../server/APIConfig";
import { storeId } from "../../server/storeConfig";
export const checkModelInventory = async (userLogin, modelId) => {
  try {
    const response = await API.post(
      "inventory/validate-model",
      {
        userLogin: userLogin,
        data: {
          modelId: modelId,
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
export const addNewInventoryModel = async (
  userLogin,
  storeId,
  subgroupId,
  modelId,
  inventoryStatusId,
  amount
) => {
  try {
    const response = await API.post(
      "inventory/import-model-good",
      {
        userLogin: userLogin,
        data: {
          storeId: storeId,
          importedGoodList: [
            {
              subgroupId: subgroupId,
              modelId: modelId,
              inventoryStatusId: inventoryStatusId,
              amount: amount,
            },
          ],
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
export const addNewInventoryProductHasIMEI = async (
  userLogin,
  storeId,
  importedGoodList
) => {
  try {
    const response = await API.post(
      "inventory/import-imei-good",
      {
        userLogin: userLogin,
        data: {
          storeId: storeId,
          importedGoodList: importedGoodList,
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
export const addNewInventoryProductNoIMEI = async (
  userLogin,
  storeId,
  importedGoodList
) => {
  try {
    const response = await API.post(
      "inventory/import-not-imei-good",
      {
        userLogin: userLogin,
        data: {
          storeId: storeId,
          importedGoodList: importedGoodList,
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
