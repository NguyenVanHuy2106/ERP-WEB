import API from "../../server/APIConfig";
import { storeId } from "../../server/storeConfig";
export const getAllModelProduct = async (maingroupId, subgroupId, brandId) => {
  try {
    const response = await API.post(
      "model/web/get-model-by-attribute",
      {
        userLogin: null,
        data: {
          maingroupId: maingroupId,
          subgroupId: subgroupId,
          brandId: brandId,
          isActive: 1,
          limit: 100,
          offset: 0,
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
export const getModelDetail = async (modelId) => {
  try {
    const response = await API.post(
      "model/general/get-model-detail",
      {
        userLogin: null,
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

export const addNewPriceOfModel = async (modelId, price, fromDate, toDate) => {
  try {
    //console.log(modelId, price, fromDate);
    const response = await API.post(
      "price-of-model/create-price",
      {
        userLogin: null,
        data: {
          modelId: modelId,
          storeId: storeId,
          price: price,
          fromDate: fromDate,
          toDate: toDate,
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
export const getPriceByModelAPI = async (modelId) => {
  try {
    //console.log(modelId, price, fromDate);
    const response = await API.post(
      "price-of-model/get-price-detail",
      {
        userLogin: null,
        data: {
          modelId: modelId,
          storeId: storeId,
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
export const getProductIdByVarrant = async (
  modelId,
  varantProductAttributeList
) => {
  try {
    //console.log(modelId, varantProductAttributeList);
    const response = await API.post(
      "model/general/get-productid-by-varant",
      {
        userLogin: null,
        data: {
          modelId: modelId,
          storeId: storeId,
          VarantProductAttributeList: varantProductAttributeList,
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