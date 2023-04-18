import API from "../../server/APIConfig";
export const getAllModelProduct = async (maingroupId, subgroupId, brandId) => {
  try {
    const response = await API.post(
      "model/get-model-by-attribute",
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
      "model/search-model-for-app",
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
