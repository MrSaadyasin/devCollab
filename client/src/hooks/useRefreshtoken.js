import axios from "../apies/axios";
import useAuth from "./useAuth";

// this custom hook will refresh the access token and update in user state
export default function useRefreshtoken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    try {
      const res = await axios.get("/api/refresh/token", {
        withCredentials: true,
      });
      setAuth((prev) => {
        return { ...prev, userData:res.data.foundUser, accessToken: res.data.accessToken,user:true};
      });
      return res.data.accessToken;
    } catch (error) {
      console.log(error);
    }
  };
  return refresh;
}
