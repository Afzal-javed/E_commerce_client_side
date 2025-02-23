import React, { useEffect, useState } from "react";
import callAxios from "../../utils/axios";
import { FaRegCommentDots } from "react-icons/fa";
import ChatBox from "../Component/ChatBox";
import { useSocket } from "../Component/SocketProvider";

const Orders = () => {
  const {socket} = useSocket();
  const [orders, setOrders] = React.useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  // const [error, setError] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await callAxios("get", "orders/getOrders", null, true);
        setOrders(response.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);
  useEffect(() => {
    if (currentChat) {
      console.log("currentChat", currentChat);
      socket.emit("join-order-chat", {
        orderId: currentChat?._id,
      });
    }
  }, [currentChat]);
  const openChat = (order) => {
    setCurrentChat(order);
    setChatOpen(true);
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 shadow-md border rounded-lg bg-white"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold">
                Order ID: {order.razorpayOrderId}
              </h2>
              <p className="text-sm text-gray-600">
                Status: {order.orderStatus}
              </p>
              <p className="text-sm text-gray-600">
                Payment: {order.paymentStatus} ({order.paymentMethod})
              </p>
              <p className="text-sm text-gray-600">
                Shipping: {order.shippingStatus}
              </p>
              <p className="text-sm text-gray-600">
                Total Amount: ₹{order.totalAmount}
              </p>
              <div className="mt-2">
                <h3 className="font-medium">Products:</h3>
                {order.productDetails.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-2 mt-1"
                  >
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {product.productName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Price: ₹{product.productPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex items-end justify-end text-white">
              <FaRegCommentDots
                size={24}
                className="w-[2.5rem] cursor-pointer h-[2.5rem] bg-blue-500 p-2 rounded-full"
                onClick={() => openChat(order)}
              />
            </div>
          </div>
        ))}
      </div>
      {chatOpen && (
        <ChatBox
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          currentChat={currentChat}
          socket={socket}
          onJoin={"order-chat-joined"}
          onMsgReceived={"order-chat-messages-received"}
          emitMessage={"order-chat-messages"}
        />
      )}
    </div>
  );
};

export default Orders;
