import { useDBContext } from "@/API/DBContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function ArtistPage() {
  const { db } = useDBContext();

  const [artist, setArtist] = useState<any>();

  const getArtistData = async () => {
    const artistId = window.location.pathname.split("/")[2];
    if (!db || !artistId) return;

    console.log(artistId, "artistId", window.location.pathname.split("/"));

    const docRef = doc(db, "users", artistId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setArtist({
        id: artistId,
        ...docSnap.data(),
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const mockData = [
    {
      name: "Printed Tee",
      price: 35,
    },
    {
      name: "Mug",
      price: 10,
    },
    {
      name: "Candle",
      price: 8,
    },
    {
      name: "Air",
      price: 1,
    },
    {
      name: "Pen",
      price: 5,
    },
  ];

  useEffect(() => {
    getArtistData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center  p-10">
      <h1 className="mb-10">{artist?.name}</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "1em",
        }}
      >
        {mockData.map((item) => {
          return (
            <Card key={item.name} style={{ width: "10rem" }}>
              <Card.Img variant="top" src="/placeholder.png" />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.price} AUD</Card.Text>
                <Button
                  style={{ backgroundColor: "black", marginTop: "0.5em" }}
                  variant="dark"
                >
                  Buy
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
