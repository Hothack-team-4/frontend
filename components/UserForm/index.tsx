"use client";

import React, { useState } from "react";
import Button from "react-bootstrap/Button";

type UserFormProps = {
  isSignUp: boolean;
};

const UserForm = ({}: UserFormProps) => {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});

  const onChangeUserInput = (key: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <Button>lalalalla</Button>
    </div>
  );
};

export default UserForm;
