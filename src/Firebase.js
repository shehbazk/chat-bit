import firebase from 'firebase'
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD9IbZWA6TmslAovwRcDLJC7m9TPI7qmyc",
    authDomain: "whatsapp-clone-a4947.firebaseapp.com",
    projectId: "whatsapp-clone-a4947",
    storageBucket: "whatsapp-clone-a4947.appspot.com",
    messagingSenderId: "312353563219",
    appId: "1:312353563219:web:4a176299aa8bade2e21ca6",
    measurementId: "G-J1E8TQD7JG"
  };
  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export{auth, provider};
  export default db;