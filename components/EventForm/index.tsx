import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { doc, setDoc } from "firebase/firestore";

import { useDBContext } from "@/API/DBContext";

type Props = {};

const EventForm = ({}: Props) => {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});
  const { db } = useDBContext();

  const onChangeUserInput = (key: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmitEventForm = async () => {
    if (!db) return;

    const currUser = JSON.parse(localStorage.getItem("user") ?? "");
    // Add a new events to db
    await setDoc(doc(db, "events"), {
      name: formState.name,
      date: formState.date,
      attendees: [],
      qrLink: "",
      artistEmail: currUser.email,
    });
  };

  return (
    <form
      className="flex flex-col items-center justify-center p-24"
      style={{
        margin: 20,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 20,
      }}
      onSubmit={onSubmitEventForm}
    >
      <Form.Control
        placeholder="Event name"
        aria-label="Event name"
        aria-describedby="basic-addon1"
        className="mb-3"
        onChange={(e) => onChangeUserInput("name", e.target.value)}
      />
      <Form.Control
        placeholder="Date"
        aria-label="Date"
        aria-describedby="basic-addon1"
        className="mb-3"
        type="date"
        onChange={(e) => onChangeUserInput("date", e.target.value)}
      />
      <Button
        disabled={Object.keys(formState).length !== 2}
        onClick={onSubmitEventForm}
        style={{ backgroundColor: "black" }}
      >
        Create Event
      </Button>
    </form>
  );
};

export default EventForm;