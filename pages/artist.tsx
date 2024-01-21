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
      <div className="pl-16">
        <h1>Hello {artistName}</h1>
        <span
          style={{
            display: "flex",
            width: "90%",
            marginBottom: "2em",
          }}
        >
          This is your event dashboard and insight, you can explore more
          conversion rate and demographic by subscribing on our service.
          <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aliquam nec facilisis ipsum. Sed faucibus eros quam, quis luctus lorem
          ultricies id. Nulla felis ante, vehicula non finibus id, dictum ut
          lacus. Suspendisse mollis nulla ligula, a fermentum massa euismod
          eget. Nullam quis neque a lectus congue lacinia a sit amet justo. Ut
          nec lectus quis dui bibendum rutrum. Sed commodo iaculis metus, non
          ullamcorper nibh cursus quis.
        </span>
      </div>
      <div id="current-event">
        <Graph list={list} />
      </div>
      <div
        className="p-10"
        style={{
          paddingTop: 0,
        }}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Event List</h1>
          <button
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            Create New Event!
          </button>
        </span>
        <EventList list={list} />
        <Modal show={showModal} onHide={() => setShowModal(false)} animation>
          <EventForm setShowModal={setShowModal} getEventList={getEventList} />
        </Modal>
      </div>
    </div>
  );
};

export default DashboardLandingPage;
