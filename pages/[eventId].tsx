"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

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
  addDoc,
} from "firebase/firestore";

import "./landing_styles.css";
import { useDBContext } from "@/API/DBContext";

// Initialize an agent at application startup.
// this page will be for the attendees on the venue when they scan the QR
const AttendanceLandingPage = () => {
  const fpPromise = FingerprintJS.load();

  const [event, setEvent] = useState<any>();
  const [artist, setArtist] = useState<any>();
  const [email, setEmail] = useState("");
  const [sentEmail, setSentEmail] = useState(false);

  const { db } = useDBContext();

  const getFingerPrint = async () => {
    if (!window) return;
    const fp = await fpPromise;
    const result = await fp.get();
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
      querySnapshot.forEach(async (innerDoc) => {
        const currAttendees = [...innerDoc.data().attendees];
        console.log(fingerPrint, "fingerPrint top");
        currAttendees.push(fingerPrint);
        setDoc(doc(db, "events", innerDoc.id), {
          ...innerDoc.data(),
          attendees: currAttendees,
        });
        setEvent({
          id: innerDoc.id,
          ...innerDoc.data(),
        });
        const users = collection(db, "users");
        const q = query(
          users,
          where("email", "==", innerDoc.data().artistEmail)
        );
        const userSnapshot = await getDocs(q);

        console.log(artist, "artist");
        if (!userSnapshot.empty) {
          userSnapshot.forEach((innerDoc) => {
            setArtist({
              id: innerDoc.id,
              ...innerDoc.data(),
            });
          });
        }
      });
    }
  };

  const onSubmitEmail = async () => {
    const fingerPrint = await getFingerPrint();
    console.log(fingerPrint);
    if (!db) return;

    try {
      await addDoc(collection(db, "attendees"), {
        fingerPrint,
        email,
      });

      toast("Thanks for attending!");
      setSentEmail(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    addAttendeesToEvent();
  }, []);

  return (
    <main>
      <section className="flex flex-col justify-center items-center">
        <span>{artist?.name}</span>
        <span>{event?.name}</span>
      </section>
      <article>
        <p>
          This text is customisable. Add your own content here.
          This text is customisable. Add your own content here.
          This text is customisable. Add your own content here.
          This text is customisable. Add your own content here.
          This text is customisable. Add your own content here.
          This text is customisable. Add your own content here.
          This text is customisable. Add your own content here.
          This text is customisable. Add your own content here.
          This text is customisable. Add your own content here.
          This text is customisable. Add your own content here.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </article>
      {sentEmail ? (
        <Button
          style={{
            marginRight: 20,
            marginLeft: 20,
            width: "90%",
            backgroundColor: "black",
          }}
          variant="dark"
          onClick={() => {
            window.location.href = `/artist/${artist?.id}`;
          }}
        >
          Checkout {artist?.name} Merch
        </Button>
      ) : (
        <InputGroup className="mb-1 p-3">
          <Form.Control
            placeholder=" email"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={onSubmitEmail}
            variant="outline-secondary"
            id="button-addon2"
          >
            Enter
          </Button>
        </InputGroup>
      )}

      <footer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a href="https://open.spotify.com/" target="blank">
          <Image
            alt="spotify-logo"
            src={"/spotify.png"}
            width={50}
            height={50}
          />
        </a>
        <a href="https://www.youtube.com/" target="blank">
          <Image
            alt="youtube-logo"
            src={"/Youtube_logo.png"}
            width={50}
            height={50}
          />
        </a>
        <a href="https://music.apple.com/us/browse" target="blank">
          <Image
            alt="apple-music-logo"
            src={"/apple_music.png"}
            width={50}
            height={50}
          />
        </a>
      </footer>
    </main>
  );
};

export default AttendanceLandingPage;
