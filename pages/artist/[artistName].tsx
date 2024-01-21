import { useDBContext } from "@/API/DBContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./artistName_styles.css"

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
    <main className="flex min-h-screen flex-col items-center title">
      <h1>{artist?.name}</h1>
      <div
       className='merch-container'
      >
        {mockData.map((item) => {
          return (
            <Card className="card" key={item.name} style={{ width: "18rem" }}>
              <Card.Img variant="top" src="/placeholder.png" />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.price} AUD</Card.Text>
                <Button
                  style={{ backgroundColor: "black", marginTop: "0.5em", width: "100%" }}
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
