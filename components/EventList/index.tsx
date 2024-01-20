import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useDBContext } from "@/API/DBContext";

const EventList = () => {
  const { db } = useDBContext();
  const [list, setList] = useState<any>([]);

  const getEventList = async () => {
    if (!db) return;
    const events = collection(db, "events");
    const querySnapshot = await getDocs(events);
    if (!querySnapshot.empty) {
      const tempList: any[] = [];
      querySnapshot.forEach((doc) => {
        tempList.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      setList(tempList);
    }
  };

  useEffect(() => {
    getEventList();
  }, []);

  return (
    <div>
      {/* {list.map((event: any) => {
        return <span>{event.name}</span>;
      })} */}
    </div>
  );
};

export default EventList;
