import { Card, Col, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Word from "./Word";

export default function WordsList(props) {
  const [horizontalWords, setHorizontalWords] = useState([]);
  const [verticalWords, setVerticalWords] = useState([]);

  useEffect(() => {
    if (props.words.length > 0) {
      filterWords();
    } else {
      setHorizontalWords([]);
      setVerticalWords([]);
    }
  }, [props.words, props.saved]);

  const filterWords = () => {
    let vertical = [];
    let horizontal = [];
    for (let word of props.words) {
      if (word.direction === "Pionowo") {
        vertical.push(
          <Word
            key={crypto.randomUUID()}
            word={word}
            saved={props.saved}
            reason={props.reason}
          />
        );
      } else {
        horizontal.push(
          <Word
            key={crypto.randomUUID()}
            word={word}
            saved={props.saved}
            reason={props.reason}
          />
        );
      }
    }
    setHorizontalWords(horizontal);
    setVerticalWords(vertical);
  };

  return (
    <Card className="p-3" border="dark">
      <div id="wordsList">
        <h1 className="text-center">{props.title}</h1>
        <hr />
        {props.words.length === 0 && (
          <div className="text-center">
            <span style={{ color: "red" }}>Brak haseł w krzyżówce</span>
          </div>
        )}
        {(horizontalWords.length > 0 || verticalWords.length > 0) && (
          <Row>
            <Col className="text-center" md={6}>
              <h3>Pionowo</h3>
              {verticalWords.map((word) => word)}
            </Col>
            <Col className="text-center" md={6}>
              <h3>Poziomo</h3>
              {horizontalWords.map((word) => word)}
            </Col>
          </Row>
        )}
      </div>

      {props.saved && (
        <div className="mt-4">
          <Button
            className="ms-2"
            variant="primary"
            type="submit"
            onClick={props.saveWordList}
          >
            Zapisz
          </Button>
          <Button
            className="ms-3"
            variant="primary"
            type="submit"
            onClick={props.back}
          >
            Wróć
          </Button>
        </div>
      )}
    </Card>
  );
}
