import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBXTqBSC-fRQswB93K75lh1NPsrBKQ8zFk",
    authDomain: "react-pf.firebaseapp.com",
    databaseURL: "https://react-pf.firebaseio.com",
    projectId: "react-pf",
    storageBucket: "react-pf.appspot.com",
    messagingSenderId: "249257067380"
};
firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;