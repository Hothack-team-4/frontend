import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import "./card-style.css";

const EventList = ({ list }: any) => {
  return (
    <div>
      <div className="qr-code-cards-container">
        {list.map((event: any) => {
          return (
            <Card key={event.name} className="qr-code-card">
              <Card.Body className="qr-code-body">
                <div className="qr-code-wrapper">
                  <div id={event.name} className="qr-code" />
                </div>
                <div className="event-details">
                  <div className="event-name">{event.name}</div>
                  <div className="event-attendees">
                    Attendees: {event.attendees.length}
                  </div>
                  <Button 
                    variant="primary" 
                    href={`/${event.name}`} 
                    className="event-link-button">
                    View Artist
                  </Button>
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
