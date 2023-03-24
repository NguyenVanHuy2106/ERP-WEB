import API from "../server/APIConfig";
export const authApi = async (username, password) => {
  try {
    const response = await API.post(
      "auth/sign-in",
      {
        data: {
          signInData: {
            username: username,
            password: password,
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
