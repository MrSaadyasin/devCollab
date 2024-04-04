import React from "react";
import { orange } from "../../data/StyleGuide";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import useConv from "../../hooks/useConv";

export default function MessageForm({updateMessageList,sendMessageSocket}) {
  const [msgState, setMsgState] = useState("");
  const { currentConv } = useConv();
  const {
    auth: { userData },
  } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      if (msgState.length > 10) {
        const res = await axiosPrivate.post("/api/message", {
          text: msgState,
          sender: userData._id,
          conversationId: currentConv._id,
        });
        if (res.status === 200) {
          sendMessageSocket(msgState)
          setMsgState("");
          // on success updating conv messages list
          updateMessageList(res.data)
        }
      } else {
        alert("Post lenght should be more than 10 words");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={sendMessage} className="fixed bottom-4  w-2/4 left-50 ">
      <div className="relative">
        <input
          value={msgState}
          placeholder="write your message"
          type="text"
          onChange={(e) => setMsgState(e.target.value)}
          className="w-full bg-gray-800 rounded-md pl-2 pr-29 py-3"
        />
        <button
          type="submit"
          className={`bg${orange} right-2 top-2 absolute px-4 py-1 rounded-lg font-medium tracking-wider `}
        >
          Send
        </button>
      </div>
    </form>
  );
}
