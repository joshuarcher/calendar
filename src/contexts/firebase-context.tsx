import { Auth, getAuth } from 'firebase/auth';
import { Database, getDatabase } from 'firebase/database';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Firestore, collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { Functions, getFunctions } from 'firebase/functions';
import { createContext, useContext, useEffect, useState } from 'react';

import React from 'react';
import { Reminders } from '../redux/actions';

const CONFIG = {
  APP_NAME: 'google-photos',
  apiKey: 'AIzaSyCwCbnCcsSyqLdpMGygRFGp-xMfdZDVSEA',
  authDomain: 'photos-tools-2022.firebaseapp.com',
  projectId: 'photos-tools-2022',
  storageBucket: 'photos-tools-2022.appspot.com',
  messagingSenderId: '550579950350',
  appId: '1:550579950350:web:d32a68a214c5c58a273d5f',
  measurementId: 'G-5M5ME2ZH0R',
};

declare global {
  interface Window {
    getUA: () => string;
  }
}

interface FirebaseValue {
  app: FirebaseApp | null;
  auth: Auth | null;
  functions: Functions | null;
  db: Firestore | null;
  database: Database | null;
  reminders: Reminders;
}

const FirebaseContext = createContext<FirebaseValue>({
  app: null,
  auth: null,
  database: null,
  db: null,
  functions: null,
  reminders: [],
});

export function useFirebase() {
  return useContext(FirebaseContext);
}

interface Props {
  children: React.ReactNode;
  appName: string;
}

export function FirebaseProvider({ children, appName }: Props) {
  const [app, setApp] = useState<FirebaseValue['app']>(null);
  const [functions, setFunctions] = useState<FirebaseValue['functions']>(null);
  const [db, setDb] = useState<FirebaseValue['db']>(null);
  const [database, setDatabase] = useState<FirebaseValue['database']>(null);
  const [auth, setAuth] = useState<FirebaseValue['auth']>(null);
  const [reminders, setReminders] = useState<Reminders>([]);

  useEffect(() => {
    if (!window.getUA) {
      window.getUA = () => navigator.userAgent;
    }

    let app;

    if (!getApps().length) {
      app = initializeApp(CONFIG, appName);
    } else {
      app = getApp(appName);
    }

    setApp(app);
  }, [appName]);

  useEffect(() => {
    if (app) {
      const auth = getAuth(app);
      const database = getDatabase(app);
      const db = getFirestore(app);
      const functions = getFunctions(app);

      setAuth(auth);
      setDb(db);
      setDatabase(database);
      setFunctions(functions);
    }
  }, [app]);

  useEffect(() => {
    if (db) {
      return onSnapshot(collection(db, 'arketa'), (querySnapshot) => {
        const reminders = querySnapshot.docs.map((doc) => {
          const { datetime: timestamp, ...data } = doc.data();
          const datetime = new Date(timestamp.seconds * 1000);

          return { ...data, datetime };
        });

        setReminders(reminders as Reminders);
      });
    }
  }, [db]);

  return (
    <FirebaseContext.Provider value={{ app, auth, database, db, functions, reminders }}>
      {children}
    </FirebaseContext.Provider>
  );
}
