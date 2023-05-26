import API from "../../server/APIConfig";
import { storeId } from "../../server/storeConfig";
export const getInventoryListAPI = async (
  modelId,
  storeId,
  inventoryStatusId
) => {
  try {
    const response = await API.post(
      "inventoryModel/get-all",
      {
        data: {
          modelId: modelId,
          storeId: storeId,
          inventoryStatusId: inventoryStatusId,
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
