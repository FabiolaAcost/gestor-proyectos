import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBYNZTWXhYdvK6qmsftEn2JDMlnnE7P4Rc",
    authDomain: "project-manager-f7170.firebaseapp.com",
    projectId: "project-manager-f7170",
    storageBucket: "project-manager-f7170.firebasestorage.app",
    messagingSenderId: "581083865170",
    appId: "1:581083865170:web:7f15401e0187ebb1383f8b"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
