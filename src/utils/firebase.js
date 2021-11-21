// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import firebaseConfig from "../firebase.json";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage"
import { getDatabase, ref, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
export const DB = getDatabase(app);
const storage = getStorage(app);

const uploadImage = async uri => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const user = Auth.currentUser;
    const ref = storage.ref(`/profile/${user.uid}/photo.png`);
    const snapshot = await ref.put(blob, {contentType: 'image/png'});

    blob.close();
    return await snapshot.ref.getDownloadURL();
};

export const createChannel = async ({title, description}) => {
    const newChannelRef = push(ref(DB, 'channels'));
    const id = newChannelRef.key;
    const newChannel = {
        id,
        title,
        description,
        createdAt: Date.now(),
    };
    await newChannelRef.set(newChannel);
    return id;
};

export const createMessage = async ({channelId, message}) => {
    return await set(ref(DB, 'channels/'+channelId+'/messages'), {
        ...message,
        createdAt: Date.now(),
    })
};

export const login = async ({email, password}) => {
    const { user } = await Auth.signInWithEmailAndPassword(email, password)
    return user;
};

export const logout = async () => {
    return await Auth.signOut();
};

export const signup = async ({name, email, password, photoUrl}) => {
    const {user} = await Auth.createUserWithEmailAndPassword(email, password);
    const storageUrl = photoUrl.startsWith('https')
        ? photoUrl
        : await uploadImage(photoUrl);
    await user.updateProfile({
        displayName: name,
        photoURL: storageUrl,
    });
    return user;
};

export const getCurrentUser = () => {
    const {uid, displayName, email, photoURL} = Auth.currentUser;
    return {uid, name: displayName, email, photoUrl: photoURL};
};

export const updateUserPhoto = async photoUrl => {
    const user = Auth.currentUser;
    const storageUrl = photoUrl.startsWith('https')
        ? photoUrl
        : await uploadImage(photoUrl);
    await user.updateProfile({photoURL: storageUrl});
    return {name: user.displayName, email: user.email, photoUrl: user.photoURL};
};