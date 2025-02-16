import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import callAxios from "../../utils/axios";

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
      });
      const user = JSON.parse(localStorage.getItem("user:detail"));
      if (token && user && !user.fcmTokens.includes(token)) {
        const res = await callAxios("put", "auth/save-fcm-tokens", {
          fcmToken: token,
          userId: user._id,
        });
        if (res?.status === 200) {
          const updatedUser = { ...user, fcmTokens: token };
          localStorage.setItem("user:detail", JSON.stringify(updatedUser));
        }
      }
    }
  } catch (error) {
    console.log("error in notification", error);
  }
};
