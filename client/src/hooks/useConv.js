import { useContext } from "react";
import ConversationContext from "../context/ConversationProvider";

const useConv = () => {
  return useContext(ConversationContext);
};

export default useConv;
