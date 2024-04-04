import useConv from "../../hooks/useConv";
import { Link } from "react-router-dom";
import { orange, gray400 } from "../../data/StyleGuide";

export default function UserChatList() {
  const { convListState, setCurrentConv, onlineFriends,arrivalMsg } =
    useConv();
  let currentUser = window.location.pathname.split("/").slice(-1)[0];

  return (
    <div>
      <h2 className="text-2xl mb-2">Chat</h2>
      <hr />
      {/* list */}
      <div className="">
        {convListState.length > 0 &&
          convListState.map((singleConv) => {
            return (
              <div
                key={singleConv._id}
                className={`${
                  currentUser === singleConv.members[0].name
                    ? `border-2 border${orange} bg${gray400} font-extrabold`
                    : "bg-gray-700"
                } rounded-md  my-2 w-full py-2 px-5 items-center flex justify-between`}
              >
                <Link
                  to={`chat/${singleConv.members[0].name}`}
                  onClick={() => setCurrentConv(singleConv)}
                >
                  <div className="flex gap-2 ">
                    <img
                      className={`${
                        currentUser === singleConv.members[0].name &&
                        " border-orange-400 border-2"
                      } rounded-full w-10 `}
                      src={singleConv.members[0].avatarUrl}
                      alt="user"
                    />
                    <div className="flex items-center gap-2">
                      <p className="font-medium self-center tracking-widest">
                        {singleConv.members[0].name}
                      </p>
                      <div
                        className={`${
                          onlineFriends?.includes(singleConv.members[0]._id)
                            ? "bg-green-400"
                            : "bg-gray-500"
                        } h-2 w-2 rounded-full`}
                      ></div>
                    </div>
                  </div>
                </Link>
                {/* show new message tag   */}
               {arrivalMsg?.sender === singleConv.members[0]._id &&  <span className="  px-3   text-sm font-medium  rounded-lg bg-blue-900 text-orange-400" style={{fontSize:"9px"}}>
                      new
                    </span>}

              </div>
            );
          })}
      </div>
    </div>
  );
}
