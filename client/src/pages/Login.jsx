import { Link, useNavigate, useLocation } from "react-router-dom";
import loginImg from "../assests/images/loginImg.svg";
import LoginRegsterSide from "../layouts/LoginRegsterSide";
import { useEffect, useState } from "react";
import axios from "../apies/axios";
import useAuth from "../hooks/useAuth";
import { avatars } from "../data/Avatars";
export default function Login() {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const [user, setUser] = useState({
    email: "usamakaleem505@gmail.com",
    password: "usama",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, //spread operator
      [name]: value,
    });
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = user;
      if (email && password) {
        const res = await axios.post("/api/login", user, {
          withCredentials: true,
        });
        if (res.status === 200) {
          const { foundUser: userData, accessToken, user } = res.data;
          setUser({
            email: "",
            password: "",
          });
          // // setting avatar image from the list to user obj
          // avatars.map((av) => {
          //   if (av.name === userData.avatar) {
          //     avatImg = av.img;
          //   }
          // });
          setAuth({
            userData: { ...userData, },
            accessToken,
            user,
          });
          userData?.avatar ?  navigate(from, { replace: true }):navigate('/avatar')
         
        }
      } else {
        alert("invalid input");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const togglePersist = () => {
    console.log("persist", persist);
    setPersist(!persist);
  };
  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="h-screen md:flex">
      <LoginRegsterSide imgSpc={loginImg} />
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-gray-800 h-screen relative">
        <form
          onSubmit={login}
          className="bg-gray-800 md:w-3/5 w-4/5 absolute left-1/2 transform -translate-x-1/2 top-[200px]"
        >
          <h1 className="md:hidden font-bold text-4xl font-sans text-orange-400">
            DevChat
          </h1>

          <h1 className=" font-bold text-2xl mb-1">Login</h1>
          <p className="text-sm font-normal  mb-7">Lets go..</p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none bg-gray-800"
              type="text"
              name="email"
              onChange={(e) => handleChange(e)}
              value={user.email}
              placeholder="Email Address"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none bg-gray-800"
              type="password"
              name="password"
              autoComplete="on"
              onChange={(e) => handleChange(e)}
              value={user.password}
              placeholder="Password"
            />
          </div>
          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              onChange={togglePersist}
              value={persist}
              defaultChecked={false}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="block w-full bg-orange-400 mt-4 py-2 rounded-2xl  font-semibold mb-2"
          >
            Login
          </button>
          <Link
            to="/register"
            className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
          >
            Or Register?
          </Link>
          <button
            type="button"
            className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-2xl mt-2 "
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
            </svg>
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}
