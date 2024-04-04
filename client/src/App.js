import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import FourOFour from "./components/FourOFour";
import RequiredAuth from "./components/RequiredAuth";
import GuestUser from "./components/GuestUser";
import Dashboard from "./components/Dashboard";
import PresistLogin from "./components/PresistLogin";
import Avatar from "./pages/Avatar";
import SideBar from "./layouts/SideBar";
import RightBar from "./layouts/RightBar";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";
import ChatPage from "./pages/ChatPage";
import { useEffect } from 'react'
import useConv from "./hooks/useConv";
import useAuth from "./hooks/useAuth";
function App() {
  const { setOnlineFriends, socket } = useConv();
  const {
    auth: { userData },
  } = useAuth();

  // on login adding user to online friend list
  useEffect(() => {
    if (userData) {
      socket?.current.emit("addUser", userData._id);
      socket?.current.on("getUsers", (users) => {
        console.log('online users',users);
        setOnlineFriends(users.map((user) => user.userId))
      });
    }
  }, [userData]);

  return (
    <div className="text-white   ">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public Routes */}
            {/* <Route element={<GuestUser />}> */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* </Route> */}

            {/* catch all */}
            <Route path="*" element={FourOFour} />
          </Route>
        </Routes>
        {/* Protected Routes */}
        <div className=" flex justify-between">
          <SideBar />
          <div className="m-auto w-2/4">
            <Routes>
              <Route element={<PresistLogin />}>
                <Route element={<RequiredAuth />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/avatar" element={<Avatar />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/post/:slug" element={<PostDetail />} />
                  <Route path="/chat/:username" element={<ChatPage />} />
                </Route>
              </Route>
            </Routes>
            <RightBar />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
