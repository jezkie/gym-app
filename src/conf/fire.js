import * as firebase from 'firebase';

const fircnf = {
    apiKey: "AIzaSyAaTS7m_qGPDWrmOQKzhacLaFUasUKY_PE",
    authDomain: "spotter-8a6d5.firebaseapp.com",
    databaseURL: "https://spotter-8a6d5.firebaseio.com",
    projectId: "spotter-8a6d5",
    storageBucket: "spotter-8a6d5.appspot.com",
    messagingSenderId: "666744978054"
  }

const fire = firebase.initializeApp(fircnf);
export const provider = new firebase.auth.FacebookAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default fire;