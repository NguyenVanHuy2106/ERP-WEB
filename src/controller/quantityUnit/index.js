import API from "../../server/APIConfig";
export const getAllQuantityUnit = async () => {
  try {
    const response = await API.get("quantity-unit/get-all", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const AppGetAllQuantityUnit = async () => {
  try {
    const response = await API.get("app/quantity-unit/getAll", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const addNewQuantityUnit = async (
  userLogin,
  quantityUnitName,
  description
) => {
  try {
    const response = await API.post(
      "quantity-unit/add-new-quantity-unit",
      {
        userLogin: userLogin,
        data: {
          quantityUnitName: quantityUnitName,
          quantityUnitDescription: description,
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
export const updateQuantityUnit = async (
  userLogin,
  quantityUnitId,
  quantityUnitName,
  description,
  isActived
) => {
  try {
    const response = await API.post(
      `quantity-unit/update-quantity-unit`,
      {
        userLogin: userLogin,
        data: {
          quantityUnitId: quantityUnitId,
          updateData: {
            quantityUnitName: quantityUnitName,
            quantityUnitDescription: description,
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
export const deleteQuantityUnit = async (userLogin, quantityUnitId) => {
  try {
    const response = await API.post(
      `quantity-unit/update-quantity-unit`,
      {
        userLogin: userLogin,
        data: {
          quantityUnitId: quantityUnitId,
          updateData: {
            quantityUnitName: null,
            quantityUnitDescription: null,
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
