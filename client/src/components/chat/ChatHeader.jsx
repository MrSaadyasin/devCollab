import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useConv from "../../hooks/useConv";
import { useNavigate } from "react-router-dom";

export default function ChatHeader({ username, avatar }) {
  const navigate = useNavigate()
  const { currentConv } = useConv();
  const [showMenu, setShowMenu] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const deleteConv = async () => {
    try {
      const res = await axiosPrivate.delete(
        "/api/conversation/" + currentConv._id
      );
      if (res.status === 200) {
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-between fixed w-2/4 rounded-md cover-bg bg-gray-700 my-2 top-2 py-4 px-8 items-center ">
      <div className="flex justify-start items-start gap-3">
        <img
          className=" border-orange-400 border-2 rounded-full w-10 "
          src={avatar}
          alt="user"
        />
        <p className="font-bold text-xl self-center tracking-widest">
          {username}
        </p>
      </div>
      <div className="cursor-pointer">
        <BsThreeDotsVertical size={25} onClick={() => setShowMenu(!showMenu)} />
      </div>
      {/* menu */}
      {showMenu && (
        <div className="bg-gray-700 absolute right-9 -bottom-6 rounded-md px-4 py-2">
          <button onClick={deleteConv}>Delete Chat</button>
        </div>
      )}
    </div>
  );
}
