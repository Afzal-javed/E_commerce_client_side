importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyC4EmCVrKlH_i6Y2Moem1BqFfFv_YtW1AA",
    authDomain: "ecommerce-backend-5a9e2.firebaseapp.com",
    projectId: "ecommerce-backend-5a9e2",
    storageBucket: "ecommerce-backend-5a9e2.firebasestorage.app",
    messagingSenderId: "737460548139",
    appId: "1:737460548139:web:1ef57db1c072525e10f06e",
    measurementId: "G-4Y6C2WB1J1"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ",
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });