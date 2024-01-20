import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import Card from "react-bootstrap/Card";

const EventList = ({ list }: any) => {
  return (
    <div>
      <h1>Here is your event list:</h1>
      {list.map((event: any) => {
        return (
          <Card>
            <Card.Body>
              {event.name}
              <div id={event.name} />
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default EventList;
