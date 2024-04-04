// import firebase from "firebase/compat/app";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";


// Initialize Firebase
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1E-hoUAmyAJzFwQ6UKAIlVmS-zwMU1vc",
  authDomain: "dummylist-37183.firebaseapp.com",
  projectId: "dummylist-37183",
  storageBucket: "dummylist-37183.appspot.com",
  messagingSenderId: "23063983562",
  appId: "1:23063983562:web:ffb339c50aa21c53068b33",
  measurementId: "G-ZSG7XBHZ65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore();


//Read users

console.log("HEy")

function readData(readCollection) {
    const userCollection = collection(firestore, readCollection); 

    return new Promise((resolve, reject) => {
        getDocs(userCollection)
            .then((res) => {
                const data = [];
                res.docs.forEach((doc) => {
                    data.push({...doc.data(), id: doc.id});
                });
                console.table(data);
                resolve(data);
            })
            .catch((err) => {
                console.log("Error" + err);
                reject(err);
            });
    });
}

function addToCollection(collectionName, object) {
    addDoc(collection(firestore, collectionName), {
        ...object
    })
    .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(err => {
        console.error("Error adding document: ", err);
    });
}


function deleteCollection(collection, id) //e.g. "Users", "ND781GH1N89CH17"
{
    const docToBeDelted = doc(firestore, collection, id);
    deleteDoc(docToBeDelted);
}

export {firestore, readData, addToCollection, deleteCollection};
