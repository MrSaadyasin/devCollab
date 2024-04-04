import { Link, useLocation, useNavigate } from "react-router-dom";
import devchatLogo from "../assests/images/logo/devchatIcon.png";
import useLogout from "../hooks/useLogout";
import { graylight, hoverTextOrange } from "../data/StyleGuide";
import { routesNotForSideBar } from "../data/defaultData";
import useAuth from "../hooks/useAuth";
import useConv from "../hooks/useConv";
import {FaMasksTheater} from 'react-icons/fa'
export default function SideBar() {
  const { convListState, arrivalMsg } = useConv();

  const { auth } = useAuth();
  const location = useLocation();
  const logout = useLogout();
  const navigate = useNavigate();
  const singout = async () => {
    await logout();
    navigate("/login");
  };
console.log(location.pathname === '/');
  return (
    <div className='fixed bottom-0 top-0 '>
      {!routesNotForSideBar.includes(location.pathname) && auth.user && (
        <div >
          <button
            data-drawer-target="default-sidebar "
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <aside
            id="default-sidebar"
            className=" text-xl top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div
              className={`h-full px-8 py-4 overflow-y-auto bg-gray-50 bg${graylight}`}
            >
              <ul className="space-y-2 font-medium">
                <li>
                  <div>
                    <img
                      className="w-16 h-16"
                      src={devchatLogo}
                      alt="devchat"
                    />
                  </div>
                </li>
                <li>
                  <Link
                    to="/"
                    className={`flex items-center p-2  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700   ${hoverTextOrange} ${location.pathname === '/' ? 'bg-gray-700 text-orange-400':'text-white'}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap ">Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    // to=""
                    className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ${hoverTextOrange}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Notifications
                    </span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium  rounded-full bg-blue-900 text-orange-400">
                      3
                    </span>
                  </Link>
                </li>
                <Link to={`/chat/${convListState[0]?.members[0]?.name}`}>
                  <div
                    className={`flex items-center p-2  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700  ${hoverTextOrange} ${location.pathname.split('/').includes('chat')  ? 'bg-gray-700 text-orange-400':'text-white'}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Chat</span>
                    {arrivalMsg && <span style={{fontSize:"10px"}} className="inline-flex items-center justify-center px-4 ml-3 text-sm font-medium  rounded-full bg-blue-900 text-orange-400">
                      new
                    </span>}
                  </div>
                </Link>
                <Link to="/dashboard">
                  <div
                    className={`flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ${hoverTextOrange}`}
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover: dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Developers
                    </span>
                  </div>
                </Link>
                <Link to="/avatar">
                  <div
                    className={`flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ${hoverTextOrange}`}
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover: dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Avatars
                    </span>
                  </div>
                </Link>

                <li>
                  <button
                    onClick={singout}
                    className={` flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ${hoverTextOrange}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Logout
                    </span>
                  </button>
                </li>
              </ul>
            </div>

            <Link
              to="/profile"
              className="absolute bottom-0 left-0 right-0 bg-gray-700 py-2 px-8 items-center "
            >
              <div className="flex justify-between">
                <p className="font-medium self-center tracking-widest">
                  {auth?.userData?.name}
                </p>
                <img
                  className="rounded-full w-10 "
                  src={auth.userData.avatarUrl}
                  alt="user"
                />
              </div>
            </Link>
          </aside>{" "}
        </div>
      )}
    </div>
  );
}
