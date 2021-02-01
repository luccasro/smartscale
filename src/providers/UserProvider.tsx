import React, { useState, useEffect, createContext, ReactNode } from 'react';
import firebase from 'firebase/app';
import { UserData } from 'types';
import { auth, generateUserDocument } from 'utils/firebaseUtils';

interface UserContextProps {
  user: UserData | null;
  uid?: string;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  uid: undefined,
  isLoading: true,
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [uid, setUid] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      await generateUserDocument(userAuth);
      setUid(userAuth?.uid);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!uid) return;

    const userDocRef = firebase.firestore().collection('users').doc(uid);
    const unsubscribeSnapshot = userDocRef.onSnapshot((doc) => {
      setUser(doc.data() as UserData);
    });

    return () => {
      unsubscribeSnapshot();
    };
  }, [uid]);

  return (
    <UserContext.Provider value={{ user, uid, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
