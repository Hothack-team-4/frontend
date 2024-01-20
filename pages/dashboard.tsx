"use client";

import React from "react";
import { collection, addDoc } from "firebase/firestore";

import { useDBContext } from "@/API/DBContext";
import "./landing_styles.css";

// this page will be for the attendees on the venue when they scan the QR
const DashboardLandingPage = () => {
  const { db } = useDBContext();
  const createUser = async () => {
    if (db) {
      const docRef = await addDoc(collection(db, "users"), {
        email: "blablabla@mail.com",
        role: "attendees",
        phone: "238493",
      });
      console.log("Document written with ID: ", docRef.id);
    }
  };
  createUser();

  const createEvent = async () => {
    if (db) {
      const docRef = await addDoc(collection(db, "events"), {
        date: "01.01.2024",
        attendeesCount: "0",
        artistId: "123"
      });
      console.log("Document written with ID: ", docRef.id);
    }
  };
  createEvent();
  
  return <div> dashboard</div>;
};

export default DashboardLandingPage;
