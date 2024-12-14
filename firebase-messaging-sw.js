/* eslint-disable */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyC0MsjMQLqVEsJftEMHmlRZnV8bgFkVLdA',
  authDomain: 'techplatform-d8c14.firebaseapp.com',
  projectId: 'techplatform-d8c14',
  storageBucket: 'techplatform-d8c14.firebasestorage.app',
  messagingSenderId: '148972629828',
  appId: '1:148972629828:web:5c9bdc76fa9b8a6a98f111',
  measurementId: 'G-39N73P443T',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging(firebaseApp);

self.addEventListener('install', () => {
  // eslint-disable-next-line no-console
  console.log('installed SW!');
});

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
