import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
const ChatBox = ({ chatOpen, setChatOpen, currentChat,socket, onJoin, onMsgReceived,emitMessage  }) => {
    const {user}=useSelector(state=>state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on(onJoin, async (data) => {
      // setcurrentTurn(data?.currentTurn);
      setMessages(data);
    });

    socket.on(onMsgReceived, async (data) => {
      console.log("__msg_rcvd", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off(onJoin);
      socket.off(onMsgReceived);
    };
  }, [socket]);

  const sendMessage = () => {
   try {
    const data={
      orderId:currentChat?._id,
      message:newMessage,
      senderId:user?._id,
      role:user?.role,
    }
    socket.emit(emitMessage, data);
      setNewMessage("")
   } catch (error) {
    console.error("Error sending message:", error);
   }
  };
  const toggleChat = () => setChatOpen(!chatOpen);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-[700px] bg-white shadow-lg rounded-lg p-4">
        <div className="flex justify-between items-center border-b pb-2 mb-2">
          <h2 className="text-lg font-semibold">Chat</h2>
          <button className="text-gray-500" onClick={toggleChat}>
            ✕
          </button>
        </div>
       {messages?.length > 0 && <div className="min-h-[15rem] overflow-y-auto border p-2 rounded-md mb-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 w-[85%]  p-2 ${
                msg?.senderId === user?._id
                  ? "bg-blue-500 text-white ml-auto rounded-l-2xl rounded-tr-2xl"
                  : "bg-gray-200 text-black rounded-r-2xl rounded-tl-2xl"
              }`}
            >
              {msg?.message}
            </div>
          ))}
        </div>}
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border rounded-md p-2"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

ChatBox.propTypes = {
    chatOpen: PropTypes.bool.isRequired,
    setChatOpen: PropTypes.func.isRequired,
    currentChat: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired,
    onJoin: PropTypes.string.isRequired,
    onMsgReceived: PropTypes.string.isRequired,
    emitMessage: PropTypes.string.isRequired,
  };

export default ChatBox;
