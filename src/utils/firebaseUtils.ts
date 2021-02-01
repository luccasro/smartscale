import * as firebaseApp from 'firebase/app';
import firebase from '../firebase';
import { Data } from 'types';

export const auth: firebase.auth.Auth = firebase.auth();
export const firestore: firebase.firestore.Firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const loginWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (
  user: firebase.User | null,
  additionalData?: Record<string, any>,
) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        height: '',
        weightGoal: '',
        data: [],
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
};

export const saveData = async (uid: string, bmi: string, weight: number) => {
  await firebaseApp
    .firestore()
    .collection('users')
    .doc(uid)
    .update({
      data: firebaseApp.firestore.FieldValue.arrayUnion({
        bmi,
        weight,
        date: new Date(),
      }),
    });
};

export const removeData = async (index: number, uid: string, data: Data[]) => {
  await firebaseApp
    .firestore()
    .collection('users')
    .doc(uid)
    .update({
      data: firebaseApp.firestore.FieldValue.arrayRemove(data[index]),
    });
};

export const saveWeightGoal = async (uid: string, weightGoal: number) => {
  await firebaseApp.firestore().collection('users').doc(uid).update({
    weightGoal,
  });
};

export const saveHeight = async (uid: string, height: string) => {
  await firebaseApp.firestore().collection('users').doc(uid).update({
    height,
  });
};

export const logout = () => {
  auth.signOut();
};
