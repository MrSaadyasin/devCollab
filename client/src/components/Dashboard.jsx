import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
export default function Dashboard() {
  const [user, setUser] = useState({});
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUserInfo = async () => {
      try {
        const res = await axiosPrivate.get(
          "/api/user/info/usamakaleem505@gmail.com",
          {
            signal: controller.signal,
          }
        );
        if (res.status === 200) {
          const userData = await res.data;
          isMounted &&
            setUser({ name: userData.user.name, email: userData.user.email });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h3 className="text-2xl">Dashboard</h3>
      {user && (
        <div>
          <h2 className="text-2xl">{user.name}</h2>
          <h2 className="text-2xl">{user.email}</h2>
        </div>
      )}
      <Link className="underline text-blue-500" to="/">
        Home
      </Link>
    </div>
  );
}
