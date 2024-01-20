"use client";

import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./landing_styles.css";

// this page will be for the attendees on the venue when they scan the QR
const AttendanceLandingPage = () => {
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
            <a href="https://open.spotify.com/" target="blank">Spotify</a>
            <a href="https://www.youtube.com/" target="blank">Youtube</a>
            <a href="https://music.apple.com/us/browse" target="blank">Apple</a>
      </footer>
    </main>
  );
};

export default AttendanceLandingPage;
