import React, { useEffect, useState } from "react";
import "./artiststyle.css";
import codeGen from "@/utils/qrCodeGenerator";
import { collection, getDocs } from "firebase/firestore";
import { useDBContext } from "@/API/DBContext";
import EventForm from "@/components/EventForm";
import EventList from "@/components/EventList";
import Modal from "react-bootstrap/Modal";
import Graph from "@/components/Graph";

// this page will be for the attendees on the venue when they scan the QR
const DashboardLandingPage = () => {
  const { db } = useDBContext();
  const [showModal, setShowModal] = useState(false);

  const [list, setList] = useState<any>([]);
  const [artistName, setArtistName] = useState("");
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

  const getArtistName = () => {
    if (!localStorage) return;
    const name = JSON.parse(localStorage.getItem("user") ?? "")?.name;
    setArtistName(name);
  };

  useEffect(() => {
    getEventList();
    getArtistName();
  }, [db]);

  return (
    <div id="document-body">
      <div>
        <h1>Hello {artistName}</h1>
      </div>
      <div id="current-event">
        <h2>Events Insight</h2>
        <Graph list={list} />
      </div>
      <div>
        <EventList list={list} />
        <EventForm setShowModal={setShowModal} getEventList={getEventList} />
        {/* <div id="stats">
          <h2>NUMBER SCANNED</h2>
        </div> */}
      </div>
      <div>
        {/* <EventList list={list} />
        <Modal show={showModal} onHide={() => setShowModal(false)} animation>
          <EventForm setShowModal={setShowModal} getEventList={getEventList} />
        </Modal> */}
        {/* 
        <button
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          Create New Event!
        </button> */}
      </div>
    </div>
  );
};

export default DashboardLandingPage;
