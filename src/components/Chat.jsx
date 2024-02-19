import { useContext } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { ChatContext } from "../context/ChatContext";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  const {data} = useContext(ChatContext);
  console.log(data);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <span>
            <FaVideo />
          </span>
          <span>
            <AiOutlineUserAdd />
          </span>
          <span>
            <IoIosMore />
          </span>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
