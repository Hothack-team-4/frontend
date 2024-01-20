import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import Card from "react-bootstrap/Card";

const EventList = ({ list }: any) => {
  return (
    <div>
      <h1>YOUR EVENT LIST</h1>
      {list.map((event: any) => {
        return (
          <Card key={event.name}
          style={{}}>
            <Card.Body>
              {event.name}
              Attendees: {event.attendees.length}
              <div id={event.name} />
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default EventList;
