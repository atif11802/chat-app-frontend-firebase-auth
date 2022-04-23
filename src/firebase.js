// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCE4QuXDne3J11vGHDTtTxPS0LqU29wO3U",
	authDomain: "weather-app-me.firebaseapp.com",
	projectId: "weather-app-me",
	storageBucket: "weather-app-me.appspot.com",
	messagingSenderId: "98622028041",
	appId: "1:98622028041:web:7e6e4bc7f4dec05a83bbd8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
