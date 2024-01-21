import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import Card from "react-bootstrap/Card";
import "./card-style.css";

const EventList = ({ list }: any) => {
  return (
    <div>
      <div className="qr-code-cards-container">
      {list.map((event: any) => {
        return (
          <Card key={event.name}
          style={{}} className="qr-code-card">
            <Card.Body className="qr-code-body">
              <div className="qr-code-wrapper">
              <div id={event.name} className="qr-code" />
              </div>
              <div className="event-details">
                  {event.name}
                  <br/>
                  Attendees: {event.attendees.length}
                </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
    </div>
  );
};

export default EventList;
