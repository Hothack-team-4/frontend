import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import Card from "react-bootstrap/Card";
import "./card-style.css";

const EventList = ({ list }: any) => {
  return (
    <div>
      <h1>YOUR EVENT LIST</h1>
      <div className="qr-code-cards-container">
      {list.map((event: any) => {
        return (
          <Card key={event.name}
          style={{}} className="qr-code-card">
            <Card.Body className="qr-code-body">
              {event.name}
              Attendees: {event.attendees.length}
              <div id={event.name} className="qr-code" />
            </Card.Body>
          </Card>
        );
      })}
    </div>
    </div>
  );
};

export default EventList;
