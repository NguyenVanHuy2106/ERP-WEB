import axios from "axios";
export const getProvinceAPI = async () => {
  try {
    const response = await axios.get(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
      {
        headers: {
          Token: "17fdb6e5-c950-11ed-b09a-9a2a48e971b0",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getDistrictAPI = async (province_id) => {
  try {
    const response = await axios.post(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
      {
        province_id: province_id,
      },
      {
        headers: {
          Token: "17fdb6e5-c950-11ed-b09a-9a2a48e971b0",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getWardAPI = async (district_id) => {
  try {
    const response = await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district_id}`,
      {
        headers: {
          Token: "17fdb6e5-c950-11ed-b09a-9a2a48e971b0",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};
