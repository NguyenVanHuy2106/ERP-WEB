import API from "../../server/APIConfig";
export const getAllDeliveryType = async () => {
  try {
    const response = await API.get("delivery-type/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const addNewDeliveryType = async (
  userLogin,
  deliveryTypeName,
  description,
  isActived
) => {
  try {
    const response = await API.post(
      "delivery-type/add-new-delivery-type",
      {
        userLogin: userLogin,
        data: {
          deliveryTypeName: deliveryTypeName,
          deliveryTypeDescription: description,
          isActived: isActived,
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
export const updateDeliveryType = async (
  deliveryTypeId,
  deliveryTypeName,
  description,
  isActived
) => {
  try {
    const response = await API.post(
      "delivery-type/update-delivery-type",
      {
        data: {
          deliveryTypeId: deliveryTypeId,
          updateData: {
            deliveryTypeName: deliveryTypeName,
            deliveryTypeDescription: description,
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
export const deleteDeliveryType = async (userLogin, deliveryTypeId) => {
  try {
    const response = await API.post(
      "delivery-type/update-delivery-type",
      {
        userLogin: userLogin,
        data: {
          deliveryTypeId: deliveryTypeId,
          updateData: {
            deliveryTypeName: null,
            deliveryTypeDescription: null,
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
