import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { collection, getDocs, query, where } from "firebase/firestore";
import { useDBContext } from "@/API/DBContext";

type UserFormProps = {
  isSignUp: boolean;
};

const UserForm = ({}: UserFormProps) => {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});
  const { db } = useDBContext();

  const onChangeUserInput = (key: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmitLogin = async () => {
    if (!db) return;
    const users = collection(db, "users");
    const q = query(users, where("email", "==", formState.email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...doc.data(),
            id: doc.id,
          })
        );
        window.location.href = "/artist";
      });
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center p-24"
      style={{
        margin: 20,
        padding: 20,
        paddingTop: 26,
        width: "34rem",
        backgroundColor: "white",
        borderRadius: 20,
      }}
      onSubmit={onSubmitLogin}
    >
      <Form.Control
        placeholder="Email"
        aria-label="Email"
        aria-describedby="basic-addon1"
        className="mb-3"
        onChange={(e) => onChangeUserInput("email", e.target.value)}
      />
      <Form.Control
        placeholder="Password"
        aria-label="Password"
        type="password"
        aria-describedby="basic-addon1"
        className="mb-3"
        onChange={(e) => onChangeUserInput("password", e.target.value)}
      />
      <Button
        disabled={Object.keys(formState).length !== 2}
        onClick={onSubmitLogin}
        style={{ backgroundColor: "black" }}
      >
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
