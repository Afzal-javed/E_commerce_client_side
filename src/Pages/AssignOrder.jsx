import React, { useEffect, useState } from "react";
import callAxios from "../../utils/axios";
import { FaRegCommentDots } from "react-icons/fa";
import ChatBox from "../Component/ChatBox";

const AssignOrder = () => {
  const [data, setData] = React.useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await callAxios(
          "get",
          "admin/orders/getAllAssignedOrders",
          null,
          true
        );
        //   console.log("response",response);
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);
  console.log("current ",currentChat);
  useEffect(() => {
    // if (currentChat?._id) {
    //   // alert(JSON.stringify(userDetails?._id + '&' + currentChat.partNumber))
    //   console.log("currentChat", currentChat);
    //   socket.emit("join-quotation-chat", {
    //     chatRoomId: userDetails?._id + "&" + currentChat.partNumber,
    //   });
    // }
  }, [currentChat]);
  const openChat = (order) => {
    setCurrentChat(order);
    setChatOpen(true);
  };
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>
      {data.length > 0 ? (
        data.map((order) => (
          <div
            key={order._id}
            className="border p-4 mb-4 rounded-lg bg-gray-50"
          >
            <p className="text-lg font-semibold">
              Order ID: <span className="text-blue-600">{order._id}</span>
            </p>
            <p>User ID: {order.userId}</p>
            <p>Razorpay Order ID: {order.razorpayOrderId}</p>
            <p className="font-medium">
              Total Amount:{" "}
              <span className="text-green-600">₹{order.totalAmount}</span>
            </p>
            <p>Payment Method: {order.paymentMethod}</p>
            <p
              className={`font-semibold ${
                order.paymentStatus === "Paid"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Payment Status: {order.paymentStatus}
            </p>
            <p
              className={`font-semibold ${
                order.orderStatus === "Confirmed"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Order Status: {order.orderStatus}
            </p>
            <p>Shipping Status: {order.shippingStatus}</p>
            <p className="text-gray-600 text-sm">
              Created At: {new Date(order.createdAt).toLocaleString()}
            </p>
            <div className="w-full flex items-end justify-end text-white">
              <FaRegCommentDots
                size={24}
                className="w-[2.5rem] cursor-pointer h-[2.5rem] bg-blue-500 p-2 rounded-full"
                onClick={() => openChat(order)}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No orders available.</p>
      )}
      {chatOpen && (
        <ChatBox
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          currentChat={currentChat}
        />
      )}
    </div>
  );
};

export default AssignOrder;
