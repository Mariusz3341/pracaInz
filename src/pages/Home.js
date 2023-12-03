import { Container, Card, Col, Row, Toast, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import CrosswordsList from "../components/CrosswordsList";

export default function Home() {
  const [crosswords, setCrosswords] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7777/crosswords")
      .then((response) => setCrosswords(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <Container className="pt-4">
      <Card className="p-3" border="dark">
        <h1 style={{ textAlign: "center" }}>Krzyżówki</h1>
        <hr />
        <CrosswordsList crosswords={crosswords} />
      </Card>
    </Container>
  );
}
