"use client";

import React from "react";
import { Button, Flex } from "antd";
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
  //   createUser();
  return <div> dashboard</div>;
};

export default DashboardLandingPage;
