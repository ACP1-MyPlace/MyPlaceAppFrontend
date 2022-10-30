// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import uuid from 'react-uuid';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXgl-MhDwl80SMG5_pJtBcptYAx2WNKLo",
  authDomain: "myplace-acp1.firebaseapp.com",
  projectId: "myplace-acp1",
  storageBucket: "myplace-acp1.appspot.com",
  messagingSenderId: "497670043631",
  appId: "1:497670043631:web:249137bedcfd4c1b10281a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);

export const handleUploadFirebaseImage = async (image:Blob) => {
    const firebaseFileName = uuid();
    const storageRef = ref(firebaseStorage, `files/${firebaseFileName}`);
    await uploadBytesResumable(storageRef, image);
    return firebaseFileName; 
}

export const getFirebaseImage = async (name:string) => {
    return await getDownloadURL(ref(firebaseStorage, name));
}

export const deleteFirebaseImage = async (name:string) => {
    const fileRef = ref(firebaseStorage, name);
    try{
        await deleteObject(fileRef);
    }catch(error){
        console.log(error)
        throw error;
    }
}