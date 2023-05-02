import API from "../../server/APIConfig";
import { storeId } from "../../server/storeConfig";
export const getAllPriceOfModel = async (
  keyword,
  modelId,
  fromDate,
  toDate
) => {
  //console.log(modelId, fromDate, toDate);

  try {
    const response = await API.post(
      "price-of-model/get-all",
      {
        userLogin: null,
        data: {
          keyword: keyword,
          modelId: modelId,
          storeId: storeId,
          fromDate: fromDate,
          toDate: toDate,
          offset: 0,
          limit: 400,
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
export const getModelPriceDetail = async (modelId) => {
  try {
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
export const getVarrantPriceDetail = async (modelId, productId) => {
  try {
    const response = await API.post(
      "price-of-product/get-price-detail",
      {
        userLogin: null,
        data: {
          modelId: modelId,
          productId: productId,
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

////////////
export const updatePriceOfModel = async (
  priceOfModelId,
  modelId,
  price,
  fromDate,
  toDate
) => {
  try {
    const response = await API.post(
      "price-of-model/update-price-of-model",
      {
        userLogin: null,
        data: {
          priceOfModelId: priceOfModelId,
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
export const updatePriceOfVarrant = async (
  priceOfProductId,
  modelId,
  productId,
  price,
  fromDate,
  toDate
) => {
  try {
    const response = await API.post(
      "price-of-product/update-price-of-product",
      {
        userLogin: null,
        data: {
          priceOfProductId: priceOfProductId,
          modelId: modelId,
          productId: productId,
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

export const addNewPriceOfVarrant = async (
  modelId,
  productId,
  price,
  fromDate,
  toDate
) => {
  try {
    //console.log(modelId, price, fromDate);
    const response = await API.post(
      "price-of-product/create-price",
      {
        userLogin: null,
        data: {
          modelId: modelId,
          productId: productId,
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
