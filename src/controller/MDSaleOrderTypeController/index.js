import API from "../../server/APIConfig";
export const getAllSaleOrderType = async () => {
  try {
    const response = await API.get("saleOrderType/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const addNewSaleOrderType = async (userLogin, data) => {
  try {
    const response = await API.post(
      "saleOrderType/addNew",
      {
        userLogin: userLogin,
        data: data,
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
export const updateSaleOrderType = async (
  userLogin,
  saleOrderTypeId,
  updateData
) => {
  try {
    const response = await API.post(
      "saleOrderType/update",
      {
        userLogin: userLogin,
        data: {
          saleOrderTypeId: saleOrderTypeId,
          updateData: updateData,
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
export const deleteSaleOrderType = async (userLogin, saleOrderTypeIdList) => {
  try {
    const response = await API.post(
      "saleOrderType/delete",
      {
        userLogin: userLogin,
        data: {
          saleOrderTypeIdList: saleOrderTypeIdList,
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
