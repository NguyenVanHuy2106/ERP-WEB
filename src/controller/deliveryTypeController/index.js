import API from "../../server/APIConfig";
export const getAllDeliveryType = async (keyWord, fromDate, toDate) => {
  try {
    const response = await API.post(
      "deliveryType/getAll",
      { keyWord: keyWord, fromDate: fromDate, toDate: toDate },
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
export const addNewDeliveryType = async (
  deliveryTypeName,
  description,
  createdUser
) => {
  try {
    const response = await API.post(
      "deliveryType/addNew",
      {
        deliveryTypeName: deliveryTypeName,
        description: description,
        createdUser: createdUser,
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
export const updateDeliveryType = async (
  deliveryTypeId,
  deliveryTypeName,
  description,
  isActived,
  updatedUser,
  updatedDate
) => {
  try {
    const response = await API.put(
      `deliveryType/update/${deliveryTypeId}`,
      {
        deliveryTypeName: deliveryTypeName,
        description: description,
        isActived: isActived,
        updatedUser: updatedUser,
        updatedDate: updatedDate,
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
export const deleteDeliveryType = async (deliveryTypeId) => {
  try {
    const response = await API.put(`deliveryType/delete/${deliveryTypeId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
