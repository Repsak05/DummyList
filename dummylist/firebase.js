// import firebase from "firebase/compat/app";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove, query, orderBy, where, documentId, setDoc  } from "firebase/firestore";
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
const firestore = getFirestore(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);
//Read users

function readData(readCollection) {
    const userCollection = collection(firestore, readCollection); 

    return new Promise((resolve, reject) => {
        getDocs(userCollection)
            .then((res) => {
                const data = [];
                res.docs.forEach((doc) => {
                    data.push({...doc.data(), id: doc.id});
                });
                // console.table(data);
                resolve(data);
            })
            .catch((err) => {
                console.log("Error" + err);
                reject(err);
            });
    });
}

function readDataWithQuery(readCollection, filters = [], orderings = []) {
    const userCollection = collection(firestore, readCollection); 

    let q = query(userCollection);

    // Apply filters
    filters.forEach(filter => {
        q = query(q, where(filter.field, filter.operator, filter.value));
    });

    // Apply orderings
    orderings.forEach(order => {
        q = query(q, orderBy(order.field, order.direction));
    });

    return new Promise((resolve, reject) => {
        getDocs(q)
            .then((res) => {
                const data = [];
                res.docs.forEach((doc) => {
                    data.push({ ...doc.data(), id: doc.id });
                });
                resolve(data);
            })
            .catch((err) => {
                console.error("Error", err);
                reject(err);
            });
    });
}
//Example ussage:
// readDataWithQuery("Challenges", [{ field: "startingTime", operator: ">", value: new Date() }], [{ field: "startingTime", direction: "desc" }])
//     .then(data => console.log(data))
//     .catch(err => console.error(err));

function readDocumentsInArray(readCollection, filters = [], orderings = [], documentIDs = []) {
    const userCollection = collection(firestore, readCollection); 

    let q = query(userCollection);

    // Apply filters
    filters.forEach(filter => {
        q = query(q, where(filter.field, filter.operator, filter.value));
    });

    // Apply orderings
    orderings.forEach(order => {
        q = query(q, orderBy(order.field, order.direction));
    });

    // Apply document ID filter
    if (documentIDs.length > 0) {
        q = query(q, where(documentId(), 'in', documentIDs));
    }
    
    return new Promise((resolve, reject) => {
        getDocs(q)
            .then((res) => {
                const data = [];
                res.docs.forEach((doc) => {
                    data.push({ ...doc.data(), id: doc.id });
                });
                resolve(data);
            })
            .catch((err) => {
                console.error("Error", err);
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

async function addSingleValueToDocument(collectionName, documentID, field, value) {
    try {
        const docRef = doc(firestore, collectionName, documentID);
    
        // Set the field with the specified value
        await setDoc(docRef, { [field]: value }, { merge: true });
      
        return { [field]: value };
    } catch (error) {
        console.error('Error adding value to document:', error);
        return false;
    }
}

function deleteCollection(collection, id) //e.g. "Users", "ND781GH1N89CH17"
{
    const docToBeDelted = doc(firestore, collection, id);
    deleteDoc(docToBeDelted);
}

async function deleteDocument(collectionName, documentId) {
    // Reference to the document
    const docRef = doc(firestore, collectionName, documentId);
  
    try {
      // Delete the document
      await deleteDoc(docRef);
      console.log(`Document with ID ${documentId} has been deleted successfully.`);
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  }

async function readSingleUserInformation(readCollection, userID) {
    const userDocRef = doc(collection(firestore, readCollection), userID);

    try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const userData = { ...docSnap.data(), id: docSnap.id };
            // console.log("User data:", userData);
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

async function addToDocument(collectionName, documentID, field, newObject, combine = true, incrementBy = 0, fieldValueTwo = false){
    try{
        let docReference = doc(collection(firestore, collectionName), documentID);

        const chosenDoc = await getDoc(docReference);

        if(!chosenDoc.exists){
            console.log("ID/Document not found");
            return;
        }

        if (combine && !fieldValueTwo){
            await updateDoc(docReference, {
                [field]: arrayUnion(newObject)
            });
        } else if (incrementBy !== 0 && !fieldValueTwo){
            let currentValue = chosenDoc.data()[field] || 0;
            let newValue = currentValue + incrementBy;

            console.log("Firebase");
            console.log(chosenDoc.data()[field]);
            console.log(currentValue);
            console.log(newValue);

            await updateDoc(docReference, {
                [field]: newValue
            });
            
            return newValue;
        }else if (incrementBy !== 0 && fieldValueTwo){
            let stats = chosenDoc.data()[field] || {};
            let currentValue = stats[fieldValueTwo] || 0;
            let newValue = currentValue + incrementBy;

            await updateDoc(docReference, {
                [field]: {
                    ...stats,
                    [fieldValueTwo]: newValue
                }
            }); 
            
            return newValue;
        }else if (fieldValueTwo && combine && !incrementBy){

            await updateDoc(docReference, {
                [`${field}.${fieldValueTwo}`]: arrayUnion(newObject)
            });

        }else {
            await updateDoc(docReference, {
                [field]: newObject
            });
        }

    }catch(err){
        console.error(err)
    }
}

async function updateArrayFieldInDocument(collectionName, docId, arrayName, value, addToSet) {
    const docRef = doc(firestore, collectionName, docId);

    try {
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const currentArray = docSnapshot.data()[arrayName] || [];
            let updatedArray;

            if (addToSet) {
                // Add the value to the array if it's not already present
                updatedArray = [...new Set([...currentArray, value])];
            } else {
                // Remove the value from the array
                updatedArray = currentArray.filter(item => item !== value);
            }

            // Update the array field in the document
            await updateDoc(docRef, { [arrayName]: updatedArray });
            console.log(`Array field "${arrayName}" updated in document ${docId}.`);
        } else {
            console.error(`Document ${docId} does not exist in collection ${collectionName}.`);
        }
    } catch (error) {
        console.error("Error updating array field:", error);
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

async function getPositionInSortedCollection(collectionName, documentId, elementToSortBy) {
    try {
        // Get a reference to the Firestore collection
        const collectionRef = collection(firestore, collectionName);

        // Construct the query to retrieve documents sorted by the specified element in descending order
        const q = query(collectionRef, orderBy(elementToSortBy, "desc"));

        // Execute the query and get the sorted documents
        const querySnapshot = await getDocs(q);

        // Find the index of the specified document ID in the sorted array
        const sortedDocs = querySnapshot.docs.map(doc => doc.id);
        const position = sortedDocs.findIndex(id => id === documentId);

        // Return the position (index + 1) of the document in the sorted collection
        return position !== -1 ? position + 1 : -1; // Return -1 if document ID not found
    } catch (error) {
        console.error("Error getting position in sorted collection:", error);
        return -1; // Return -1 in case of error
    }
}

async function getUsernamesByIds(userIds) {
    if (!Array.isArray(userIds) || userIds.length === 0) {
        throw new Error('User IDs must be a non-empty array');
    }

    const userCollection = collection(firestore, 'Users');
    const userMap = {};

    try {
        // Fetch user documents one by one based on IDs
        for (const userId of userIds) {
            const q = query(userCollection, where('__name__', '==', userId)); // '__name__' refers to the document ID
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
                userMap[doc.id] = doc.data().Username;
            });
        }

        return userMap;
    } catch (err) {
        console.error('Error fetching usernames:', err);
        throw err;
    }
}

async function createOrUpdateDocument(collection, docId, data) {
    try {
        // Get a reference to the document
        const docRef = doc(firestore, collection, docId);

        // Check if the document exists
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            // If document exists, update it
            await setDoc(docRef, data, { merge: true });
            console.log('Document updated with ID:', docId);
        } else {
            // If document does not exist, create a new one
            await setDoc(docRef, data);
            console.log('Document created with ID:', docId);
        }
    } catch (error) {
        console.error('Error creating or updating document: ', error);
    }
}

export {
    firestore,
    firebaseApp,
    firebaseAuth,
    createOrUpdateDocument,
    updateArrayFieldInDocument,
    readDocumentsInArray,
    getUsernamesByIds,
    addToDocument,
    addSingleValueToDocument,
    removeFromDocumentInArr,
    updateHasCompletedTask,
    readData,
    readDataWithQuery,
    readSingleUserInformation,
    addToCollection,
    deleteCollection,
    deleteDocument,
    getPositionInSortedCollection,
};