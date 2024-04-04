import { useLocation } from "react-router-dom";
import { graylight } from "../data/StyleGuide";
import { routesNotForSideBar } from "../data/defaultData";
import useAuth from "../hooks/useAuth";
import UserChatList from "../components/chat/UserChatList";
import FriendsDev from "../components/FriendsDev";

export default function RightBar() {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    <div className="fixed bottom-0 top-0 right-0">
      {!routesNotForSideBar.includes(location.pathname) && auth.user && (
        <div>
          <button
            data-drawer-target="default-sidebar"
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
                {location.pathname.includes("chat") ? (
                  <div>
                    <UserChatList />
                  </div>
                ) : (
                  <div>
                    <li>
                      <form>
                        <label
                          htmlFor="default-search"
                          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                          Search
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-gray-500 dark:text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              ></path>
                            </svg>
                          </div>
                          <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Mockups, Logos..."
                          />
                        </div>
                      </form>
                    </li>
                    <FriendsDev/>
                  </div>
                )}
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
