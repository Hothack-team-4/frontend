import React, { useEffect, useState } from "react";
import "./artiststyle.css";
import codeGen from "@/utils/qrCodeGenerator";
import { collection, getDocs } from "firebase/firestore";
import { useDBContext } from "@/API/DBContext";
import EventForm from "@/components/EventForm";
import EventList from "@/components/EventList";
import Modal from "react-bootstrap/Modal";

// this page will be for the attendees on the venue when they scan the QR

const DashboardLandingPage = () => {
  const { db } = useDBContext();
  const [showModal, setShowModal] = useState(false);

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
    <div id="document-body">
      <div>
        <h1>HELLO</h1>
      </div>
      <div id="current-event">
        <h2>CURRENT EVENTS</h2>
        {/* JS insert: name/date of event or no event found*/}
      </div>
      <div>
        <EventList list={list} />
        <EventForm setShowModal={setShowModal} getEventList={getEventList} />
        <button>Create New Event!</button>
        <div id="stats">
          <h2>NUMBER SCANNED</h2>
        </div>
        <div id="QR-code">
          <div id="placeholder-for-qrcode"></div>
          <button>DOWNLOAD</button>
        </div>
      </div>
      <div>
        <EventList list={list} />

        <Modal show={showModal} onHide={() => setShowModal(false)} animation>
          <EventForm setShowModal={setShowModal} getEventList={getEventList} />
        </Modal>

        <button
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          Create New Event!
        </button>
      </div>
    </div>
  );
};

//export { DashboardLandingPage, qrcodeGenerator }
export default DashboardLandingPage;
