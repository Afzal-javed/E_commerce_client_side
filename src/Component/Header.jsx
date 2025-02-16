import React, { useEffect, useState } from "react";
import logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import UserAccount from "./UserAccount";
import SearchBar from "./SearchBar";
import { requestPermission } from "../config/notification";
import { onMessage } from "firebase/messaging";
import { listenForNotifications, messaging } from "../config/firebase";
import toast from "react-hot-toast";
import NotificationPopup from "./NotificationPopup";
const Header = ({ seach, setSearch }) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
        //   console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
    requestPermission();
    listenForNotifications((newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]); 
    });
  }, []);
  const removeNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <header className="fixed w-full bg-white shadow-md h-16 px-2 md:px-4 z-10">
      <div className="fixed top-5 right-5 space-y-3 z-50">
        {notifications.map((notification, index) => (
          <NotificationPopup
            key={index}
            notification={notification}
            onClose={() => removeNotification(index)}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Link to={"/"}>
          <div className="">
            <img src={logo} alt="logo" width={65} height={65} />
          </div>
        </Link>
        <SearchBar />
        <div className="flex items-center justify-center gap-4 md:gap-7">
          <nav className=" md:gap-6 text-base md:text-lg md:flex hidden">
            <Link to={""}>Home</Link>
            <Link to={"/menu/null"}>Menu</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/contact"}>Contact</Link>
          </nav>
          <UserAccount />
        </div>
      </div>
    </header>
  );
};

export default Header;
