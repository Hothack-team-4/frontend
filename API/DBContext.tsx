import { createContext, useContext, PropsWithChildren } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MSG_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export type DBContextType = {};

const dbInitialValue = {};
export const DBContext = createContext<DBContextType>(dbInitialValue);

export function useDBContext() {
  const value = useContext(DBContext);

  if (!value) {
    throw new Error("No DB context");
  }
  return value;
}

export const DBWrapper = ({ children }: PropsWithChildren) => {
  const state = {};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log(db);

  return <DBContext.Provider value={state}>{children}</DBContext.Provider>;
};
