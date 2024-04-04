import React from "react";
import { defaultDevImg } from "../data/defaultData";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import useConv from "../hooks/useConv";

export default function FriendsDev() {
  const { onlineFriends } = useConv();

  const axiosPrivate = useAxiosPrivate();
  const [friendDevs, setFriendDevs] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getFirendsDev = async () => {
      try {
        const res = await axiosPrivate.get("/api/user/friends", {
          signal: controller.signal,
        });
        if (res.status === 200) {
          const friends = await res.data;
          isMounted && setFriendDevs(friends);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFirendsDev();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      {friendDevs &&
        friendDevs.map((dev, index) => {
          return (
            <div
              key={index}
              className="rounded-md bg-gray-700 my-2 w-full py-2 px-8 items-center "
            >
              <div className="flex justify-between items-center">
                <Link className="flex items-center">
                  <img
                    className="rounded-full w-8  "
                    src={dev.avatarUrl}
                    alt={dev.name}
                  />
                  <p className="font-medium ml-2 self-center tracking-widest">
                    {dev.name}
                  </p>
                  <div className={`${onlineFriends?.includes(dev._id) ? 'bg-green-400' : 'bg-gray-500'} ml-1 h-2 w-2 rounded-full`}></div>
                </Link>
                <Link to={`/chat/${dev.name}`} title="Start a chat">

                  <BsFillChatDotsFill className="w-5 text-orange-300" />
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
}
