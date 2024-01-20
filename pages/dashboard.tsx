"use client";

import React, { useState, useEffect } from "react";
import EventForm from "@/components/EventForm";
import EventList from "@/components/EventList";

import "./landing_styles.css";
import { useDBContext } from "@/API/DBContext";
import { collection, getDocs } from "firebase/firestore";

import codeGen from "@/utils/qrCodeGenerator";

// this page will be for the attendees on the venue when they scan the QR
const DashboardLandingPage = () => {
  const { db } = useDBContext();
  const [list, setList] = useState<any>([]);

  const getEventList = async () => {
    if (!db) return;

    const events = collection(db, "events");
    const querySnapshot = await getDocs(events);
    if (!querySnapshot.empty) {
      const tempList: any[] = [];
      querySnapshot.forEach((doc) => {
        tempList.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      setList(tempList);
    }
  };

  useEffect(() => {
    if (list.length > 0) {
      list.forEach((event: any) => {
        codeGen(`https://fantasia-one.vercel.app/${event.name}`, event.name);
      });
    }
  }, [list]);

  useEffect(() => {
    getEventList();
  }, [db]);
  return (
    <main className="flex min-h-screen flex-col  p-24">
      Hello Back to Your dashboard
      <EventList list={list} />
      <EventForm getEventList={getEventList} />
    </main>
  );
};

export default DashboardLandingPage;
