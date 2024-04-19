// import firebase from "firebase/compat/app";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth } from "firebase/auth";


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
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const firestore = getFirestore();

const firebaseAuth = getAuth(firebaseApp);

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

async function addToCollection(collectionName, object) {
    try{
        const docRef = await addDoc(collection(firestore, collectionName), object);
        console.log("Document written with ID:", docRef.id);
        return docRef.id

    } catch(err){
        console.error("Error adding document: ", err);
    };
}


function deleteCollection(collection, id) //e.g. "Users", "ND781GH1N89CH17"
{
    const docToBeDelted = doc(firestore, collection, id);
    deleteDoc(docToBeDelted);
}

async function readSingleUserInformation(readCollection, userID) {
    const userDocRef = doc(collection(firestore, readCollection), userID);

    try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const userData = { ...docSnap.data(), id: docSnap.id };
            console.log("User data:", userData);
            return userData;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (err) {
        console.error("Error getting document:", err);
        throw err;
    }
}


async function updateHasCompletedTask(challengeID, eachPlayer, taskRef, postID) {
    try {
        const challengeRef = doc(collection(firestore, "Challenges"), challengeID);

        // Retrieve the challenge document
        const challengeDoc = await getDoc(challengeRef);
        if (!challengeDoc.exists()) {
            console.log("Challenge document not found");
            return;
        }

        // Update the challenge document with the modified friendsTask
        const challengeData = challengeDoc.data();
        const updatedFriendsTask = challengeData.tasks.map(task => {
            if (task.taskDescription === taskRef.taskDescription) {
                task.friendsTask.forEach(friendTask => {
                    if (friendTask.friendID === eachPlayer.friendID) {
                        friendTask.hasCompletedTask = true;
                        friendTask.postID = postID;
                    }
                });
            }
            return task;
        });

        // Update the challenge document
        await updateDoc(challengeRef, { tasks: updatedFriendsTask });
        console.log("Challenge document updated successfully");
    } catch (err) {
        console.error("Error updating challenge document:", err);
    }
}

async function addToDocument(collectionName, documentID, field, newObject, combine = true){
    try{
        let docReference = doc(collection(firestore, collectionName), documentID);

        const chosenDoc = await getDoc(docReference);

        if(!chosenDoc.exists){
            console.log("ID/Document not found");
            return;
        }

        if (combine){
            await updateDoc(docReference, {
                [field]: arrayUnion(newObject)
            });
        } else {
            await updateDoc(docReference, {
                [field]: newObject
            });
        }

    }catch(err){
        console.error(err)
    }
}



async function removeFromDocumentInArr(collectionName, documentID, field, removeItem){
    try{
        let docReference = doc(collection(firestore, collectionName), documentID);

        const chosenDoc = await getDoc(docReference);

        if(!chosenDoc.exists){
            console.log("ID/Document not found");
            return;
        }

        await updateDoc(docReference, {
            [field]: arrayRemove(removeItem)
        });

    }catch(err){
        console.error(err)
    }
}



export {firestore, firebaseApp, firebaseAuth, addToDocument, removeFromDocumentInArr, updateHasCompletedTask, readData, readSingleUserInformation, addToCollection, deleteCollection};
