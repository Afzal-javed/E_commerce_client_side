import React, { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import callAxios from "../../utils/axios";

const SellProducts = () => {
    const [orders, setOrders] = React.useState([]);
    const [chatOpen, setChatOpen] = useState(false);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    useEffect(()=>{
        const fetchOrders = async () => {
            try {
              const response = await callAxios("get","admin/orders/getAllMyOrderedProducts",null,true);
            //   console.log("response",response);
              setOrders(response?.data);
            
            } catch (error) {
              console.error("Error fetching orders:", error);
            }
          };
          fetchOrders();
    },[])
    const openChat = (order) => {
        setCurrentChat(order);
        setMessages([]);
        setChatOpen(true);
      };

      const sendMessage = () => {
        if (newMessage.trim() !== "") {
          setMessages([...messages, { text: newMessage, sender: "You" }]);
          setNewMessage("");
        }
      };
      const toggleChat = () => setChatOpen(!chatOpen);
      console.log("orders",orders);
    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Orders for Your Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-lg font-semibold mb-2">Order ID: {order._id}</h2>
            <div className="space-y-2">
              {order.products.map((product, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-2 flex items-center gap-4"
                >
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-md font-medium">{product.productName}</h3>
                    <p className="text-sm text-gray-600">Category: {product.productCategory}</p>
                    <p className="text-sm text-gray-600">Brand: {product.productBrand}</p>
                    <p className="text-sm text-gray-600">Price: ₹{product.productPrice}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <h3 className="font-medium">Ordered By:</h3>
              <p className="text-sm text-gray-600">Name: {order.customerAddress.email}</p>
              <p className="text-sm text-gray-600">Phone: {order.customerAddress.phoneNumber}</p>
              <p className="text-sm text-gray-600">
                Address: {order.customerAddress.addressLine1}, {order.customerAddress.city}
              </p>
            </div>

            <div className="mt-3">
              <h3 className="font-medium">Order Details:</h3>
              <p className="text-sm text-gray-600">Total Amount: ₹{order.confirmOrder.totalAmount}</p>
              <p className="text-sm text-gray-600">Order Status: {order.confirmOrder.orderStatus}</p>
              <p className="text-sm text-gray-600">
                Payment: {order.confirmOrder.paymentStatus} ({order.confirmOrder.paymentMethod})
              </p>
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-[700px] bg-white shadow-lg rounded-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h2 className="text-lg font-semibold">Chat</h2>
              <button className="text-gray-500" onClick={toggleChat}>✕</button>
            </div>
            <div className="h-64 overflow-y-auto border p-2 rounded-md mb-2">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 w-[85%]  p-2 ${msg.sender === "seller" ? "bg-blue-500 text-white ml-auto rounded-l-2xl rounded-tr-2xl" : "bg-gray-200 text-black rounded-r-2xl rounded-tl-2xl"}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 border rounded-md p-2"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
        
      </div>
    )
};

export default SellProducts;