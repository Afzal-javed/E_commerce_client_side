import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

// Load environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);



export const listenForNotifications = (callback) => {
    onMessage(messaging, (payload) => {
      console.log("Foreground notification received:", payload);
      const notification = {
        title: payload.notification?.title || "No Title",
        body: payload.notification?.body || "No Body",
        link: payload?.data?.link || "/",
      };
  
      callback(notification);
    });
  };
  
