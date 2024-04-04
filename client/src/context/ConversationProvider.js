import { createContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
const ConversationContext = createContext({});

export const ConversationProiver = ({ children }) => {
  const [convListState, setConvListState] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [onlineFriends, setOnlineFriends] = useState(null);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const socket = useRef();
  // establish connection

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);
  // useEffect(()=>{
  //   console.log('from provider',convListState);
  // },[convListState])
  //on starting chat with any user this func will check it conv btw both user already
  //exist if not then add to list otherwise ignore
  // const checkAndUpdate = (user) => {
  //   console.log('user',user)
  //   let conv = convListState.filter((convUser)=> convUser.name === user.name)
  //   console.log('filter conv',conv);
  //   console.log('convo list',conv);
  // };
  return (
    <ConversationContext.Provider
      value={{
        convListState,
        setConvListState,
        currentConv,
        setCurrentConv,
        onlineFriends,
        setOnlineFriends,
        arrivalMsg,
        setArrivalMsg,
        socket,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContext;
