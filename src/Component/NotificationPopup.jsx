import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationPopup = ({ notification, onClose }) => {
  const router = useNavigate();
  const { title, body, link,time } = notification;
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isHovered, onClose]);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="w-80 bg-white shadow-lg rounded-xl p-4 flex items-start space-x-3 border border-gray-200 z-50 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Bell className="text-blue-500 w-6 h-6 mt-1" />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-600">{body}</p>
            <button
              onClick={() => router(link)}
              className="mt-2 text-blue-500 hover:underline"
            >
              View
            </button>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup;
