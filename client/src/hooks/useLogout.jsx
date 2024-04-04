import axios from "../apies/axios";
import useAuth from "../hooks/useAuth";

export default function useLogout() {
  const { auth, setAuth,setPersist } = useAuth();
  const logout = async () => {
    setAuth({ user: false });
    try {
      setPersist(false)
      localStorage.removeItem("persist")
      const res = await axios("/api/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
}
