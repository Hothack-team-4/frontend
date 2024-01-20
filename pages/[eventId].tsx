"use client";
import React, { useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import "./landing_styles.css";
import { useDBContext } from "@/API/DBContext";

// Initialize an agent at application startup.
// this page will be for the attendees on the venue when they scan the QR
const AttendanceLandingPage = () => {
  const fpPromise = FingerprintJS.load();

  const { db } = useDBContext();

  const getFingerPrint = async () => {
    if (!window) return;
    const fp = await fpPromise;
    const result = await fp.get();
    console.log(result.visitorId);
    return result.visitorId;
  };

  const addAttendeesToEvent = async () => {
    if (!db) return;

    const eventName = window.location.pathname.split("/")[1];
    const events = collection(db, "events");
    const q = query(events, where("name", "==", eventName));
    const querySnapshot = await getDocs(q);
    const fingerPrint = await getFingerPrint();

    if (!querySnapshot.empty) {
      querySnapshot.forEach((innerDoc) => {
        console.log(innerDoc.id, " => ", innerDoc.data());
        const currAttendees = [...innerDoc.data().attendees];
        currAttendees.push(fingerPrint);
        setDoc(doc(db, "events", innerDoc.id), {
          ...innerDoc.data(),
          attendees: currAttendees,
        });
      });
    }
  };

  useEffect(() => {
    addAttendeesToEvent();
  }, []);

  return (
    <main>
      <section>
        <img src="" alt="" />
        ARTIST NAME
      </section>
      <article>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </article>
      <form action="">
        <input type="text" />
        <InputGroup className="mb-3">
          <Form.Control
            placeholder=" email"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            Enter
          </Button>
        </InputGroup>
      </form>
      <footer>
        <a href="https://open.spotify.com/" target="blank">
          Spotify
        </a>
        <a href="https://www.youtube.com/" target="blank">
          Youtube
        </a>
        <a href="https://music.apple.com/us/browse" target="blank">
          Apple
        </a>
      </footer>
    </main>
  );
};

export default AttendanceLandingPage;
