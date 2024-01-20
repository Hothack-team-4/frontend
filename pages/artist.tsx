import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./artiststyle.css";
import codeGen from "@/utils/qrCodeGenerator";
import { collection, getDocs } from "firebase/firestore";
import { useDBContext } from "@/API/DBContext";
import EventForm from "@/components/EventForm";
import EventList from "@/components/EventList";
// import DashboardLandingPage from "../pages/dashboard.tsx"

// this page will be for the attendees on the venue when they scan the QR

const DashboardLandingPage = () => {
    const myRef = useRef(null);
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
    return <div id= "document-body">
    <div>
        <h1>HELLO</h1>
      </div>
      <div id="current-event">
        <h2>CURRENT EVENTS</h2>
        {/* JS insert: name/date of event or no event found*/}
    </div>
    <div>
    <EventList list={list} />
      <EventForm getEventList={getEventList} />
        <button>Create New Event!</button>
      </div>
    </div>
  
};

//export { DashboardLandingPage, qrcodeGenerator }
export default DashboardLandingPage;
