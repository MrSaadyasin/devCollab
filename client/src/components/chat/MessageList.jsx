import useAuth from "../../hooks/useAuth";
import useConv from "../../hooks/useConv";
import ChatSingleMessage from "./ChatSingleMessage";
import { defaultDevImg } from "../../data/defaultData";
import { useRef, useEffect } from "react";
export default function MessageList({ messages }) {
  const {
    auth: { userData },
  } = useAuth();

  const { currentConv } = useConv();
  const msgListRef = useRef();

  useEffect(() => {
    msgListRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="overflow-y-auto mt-24 overflow-hidden pr-3 pb-4"
      id="style-4"
      style={{ height: "78vh" }}
    >
      {messages
        ? messages.map((msg) => {
            const { _id, sender: senderID, text } = msg;
            return (
              <div key={_id} ref={msgListRef}>
                <ChatSingleMessage
                  img={
                    userData._id === senderID
                      ? userData.avatarUrl
                      : currentConv.members[0].avatarUrl
                  }
                  time={`2:30pm`}
                  content={text}
                  current={userData._id === senderID}
                />
              </div>
            );
          })
        : "Loading...."}
    </div>
  );
}
