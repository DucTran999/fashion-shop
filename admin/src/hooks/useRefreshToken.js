import axios from "../api/init.axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/auth/authSlice";
import API_URL from "../api/url.init";

const getUserCredential = (res) => {
  const { access_token } = res.data.elements[0];
  const userInfo = JSON.parse(atob(access_token.split(".")[1]));
  const credentials = { ...userInfo, accessToken: access_token };

  return credentials;
};

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    // request to get new token
    try {
      const response = await axios.post(
        `${API_URL.sessions}/refresh-token`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const newAccessToken = response.data.elements[0].access_token;
      const userRefresh = getUserCredential(response);

      // set new token for user
      dispatch(loginSuccess(userRefresh));

      return newAccessToken;
    } catch (err) {
      console.log(err.message);
    }
  };

  return refresh;
};

export default useRefreshToken;
