import { Container, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import WordsList from "../components/WordsList";
import Crossword from "../components/Crossword";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function SolveCrossword() {
  const [crossword, setCrossword] = useState(null);
  const [words, setWords] = useState(null);
  const [direction, setDirection] = useState(true);
  const [focus, setFocus] = useState("as");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7777/crosswords/id/${id}`)
      .then((response) => setCrossword(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (crossword) {
      let cordinates;
      let wordsObj = crossword.words;
      let cellNum = 1;

      for (let i = 0; i < crossword.words.length; i++) {
        cordinates = wordsObj[i].cordinates;
        if (i === 0) {
          wordsObj[i].cellNum = cellNum;
        } else {
          if (cordinates === wordsObj[i - 1].cordinates) {
            wordsObj[i].cellNum = cellNum;
          } else {
            cellNum++;
            wordsObj[i].cellNum = cellNum;
          }
        }
      }

      for (let word of wordsObj) {
        axios
          .get(`http://localhost:7777/words/id/${word.wordId}`)
          .then((response) => {
            word.definition = response.data.definition;
            word.word = response.data.word;
            if (word === wordsObj[wordsObj.length - 1]) {
              setWords(wordsObj);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  }, [crossword]);

  useEffect(() => {
    document.getElementById(focus).focus();
  }, [direction]);

  const handleKeyDown = (event) => {
    //wpisuje litere do komorki lub czysci if backspace
    event.preventDefault();
    const key = event.key;
    if (/^[A-Za-z]$/.test(key)) {
      event.target.value = key;
      event.target.parentElement.classList.add("filled");
    } else if (event.key === "Backspace") {
      event.target.value = "";
    }
  };

  const markWord = (rootId) => {
    //zaznacza slowo przy focusie
    let idsToFocus = [];
    let nextCellId, cell;

    if (direction === true) {
      nextCellId = getNextId("Poziomo", rootId, true);
      if (nextCellId) {
        cell = document.getElementById(nextCellId).parentElement;
      }
      if (nextCellId) {
        while (cell.classList.contains("filled") && nextCellId) {
          idsToFocus.push(nextCellId);
          nextCellId = getNextId("Poziomo", nextCellId, true);
          if (nextCellId) {
            cell = document.getElementById(nextCellId).parentElement;
          }
        }
      }

      nextCellId = getNextId("Poziomo", rootId, false);
      if (nextCellId) {
        cell = document.getElementById(nextCellId).parentElement;
      }
      if (nextCellId) {
        while (cell.classList.contains("filled") && nextCellId) {
          idsToFocus.push(nextCellId);
          nextCellId = getNextId("Poziomo", nextCellId, false);
          if (nextCellId) {
            cell = document.getElementById(nextCellId).parentElement;
          }
        }
      }
    } else if (direction === false) {
      nextCellId = getNextId("Pionowo", rootId, true);
      if (nextCellId) {
        cell = document.getElementById(nextCellId).parentElement;
      }

      if (nextCellId) {
        while (cell.classList.contains("filled") && nextCellId) {
          idsToFocus.push(nextCellId);
          nextCellId = getNextId("Pionowo", nextCellId, true);
          if (nextCellId) {
            cell = document.getElementById(nextCellId).parentElement;
          }
        }
      }
      nextCellId = getNextId("Pionowo", rootId, false);
      if (nextCellId) {
        cell = document.getElementById(nextCellId).parentElement;
      }

      if (nextCellId) {
        while (cell.classList.contains("filled") && nextCellId) {
          idsToFocus.push(nextCellId);
          nextCellId = getNextId("Pionowo", nextCellId, false);
          if (nextCellId) {
            cell = document.getElementById(nextCellId).parentElement;
          }
        }
      }
    }
    for (let i = 0; i < idsToFocus.length; i++) {
      let id = idsToFocus[i];
      let cell = document.getElementById(id).parentElement;
      cell.className = "word";
    }
  };

  const unmarkWord = (event) => {
    let id = event.target.getAttribute("id");
    let parent = document.getElementById(id).parentElement;
    parent.classList.remove("focused");
    let cells = document.getElementsByClassName("word");
    let length = cells.length;

    for (let i = 0; i < length; i++) {
      let cell = cells[0];
      cell.classList.remove("word");
      cell.classList.add("filled");
    }
  };

  const getNextId = (direction, cordinates, flow) => {
    let help = cordinates.indexOf("-");
    let newId = "";
    let newColumnId = "";
    let newRowId = "";

    if (direction === "Poziomo") {
      if (flow) {
        newColumnId =
          parseInt(cordinates.substring(help + 1, cordinates.length + 1)) + 1;
        newId = cordinates.substring(0, help + 1) + newColumnId;
      } else {
        newColumnId =
          parseInt(cordinates.substring(help + 1, cordinates.length + 1)) - 1;
        newId = cordinates.substring(0, help + 1) + newColumnId;
      }
    } else {
      if (flow) {
        newRowId = parseInt(cordinates.substring(0, help)) + 1;
        newId = newRowId + cordinates.substring(help, cordinates.length);
      } else {
        newRowId = parseInt(cordinates.substring(0, help)) - 1;
        newId = newRowId + cordinates.substring(help, cordinates.length);
      }
    }

    if (
      newColumnId === 0 ||
      newColumnId === 19 ||
      newRowId === 0 ||
      newRowId === 19
    ) {
      return null;
    }
    return newId;
  };

  //   let ids = [];
  //   let tempId = id;
  //   let parent = document.getElementById(id).parentElement;

  //   if (direction === true) {
  //     while (
  //       parent.classList.contains("filled") ||
  //       parent.classList.contains("focused")
  //     ) {
  //       const help = tempId.indexOf("-");
  //       let newColumnId =
  //         parseInt(tempId.substring(help + 1, tempId.length + 1)) + 1;
  //       let newId = tempId.substring(0, help + 1) + newColumnId;
  //       if (newColumnId > 18) {
  //         break;
  //       }
  //       const input = document.getElementById(newId);
  //       // if (input.value === "") {
  //       //   break;
  //       // }
  //       tempId = newId;
  //       if (input.parentElement.classList.contains("filled")) {
  //         ids.push(newId);
  //       }

  //       parent = input.parentElement;
  //     }

  //     tempId = id;
  //     parent = document.getElementById(id).parentElement;

  //     while (
  //       parent.classList.contains("filled") ||
  //       parent.classList.contains("focused")
  //     ) {
  //       const help = tempId.indexOf("-");
  //       let newColumnId =
  //         parseInt(tempId.substring(help + 1, tempId.length + 1)) - 1;
  //       let newId = tempId.substring(0, help + 1) + newColumnId;
  //       if (newColumnId < 1) {
  //         break;
  //       }
  //       const input = document.getElementById(newId);
  //       // if (input.value === "") {
  //       //   break;
  //       // }
  //       tempId = newId;
  //       if (input.parentElement.classList.contains("filled")) {
  //         ids.push(newId);
  //       }
  //       parent = input.parentElement;
  //     }
  //   } else if (direction === false) {
  //     while (
  //       parent.classList.contains("filled") ||
  //       parent.classList.contains("focused")
  //     ) {
  //       const help = tempId.indexOf("-");
  //       let newRowId = parseInt(tempId.substring(0, help)) + 1;
  //       let newId = newRowId + tempId.substring(help, tempId.length);
  //       if (newRowId > 18) {
  //         break;
  //       }
  //       const input = document.getElementById(newId);
  //       // if (input.value === "") {
  //       //   break;
  //       // }
  //       tempId = newId;
  //       if (input.parentElement.classList.contains("filled")) {
  //         ids.push(newId);
  //       }
  //       parent = input.parentElement;
  //     }

  //     tempId = id;
  //     parent = document.getElementById(id).parentElement;

  //     while (
  //       parent.classList.contains("filled") ||
  //       parent.classList.contains("focused")
  //     ) {
  //       const help = tempId.indexOf("-");
  //       let newRowId = parseInt(tempId.substring(0, help)) - 1;
  //       let newId = newRowId + tempId.substring(help, tempId.length);
  //       if (newRowId < 1) {
  //         break;
  //       }
  //       const input = document.getElementById(newId);
  //       // if (input.value === "") {
  //       //   break;
  //       // }
  //       tempId = newId;
  //       if (input.parentElement.classList.contains("filled")) {
  //         ids.push(newId);
  //       }
  //       parent = input.parentElement;
  //     }
  //   }
  //   return ids;
  // };

  const handleFocus = (event) => {
    //zmienia hooka i zaznacza slowo
    let id = event.target.getAttribute("id");
    setFocus(id);
    let parent = document.getElementById(id).parentElement;
    parent.classList.add("focused");
    markWord(id);
  };

  const handleKeyUp = (event) => {
    const key = event.key;
    const currentId = event.target.getAttribute("id");
    let nextId = "";

    if (/^[A-Za-z]$/.test(key)) {
      if (direction === true) {
        nextId = getNextId("Poziomo", currentId, true);
      } else {
        nextId = getNextId("Pionowo", currentId, true);
      }
    } else if (event.key === "Backspace") {
      if (direction === true) {
        nextId = getNextId("Poziomo", currentId, false);
      } else {
        nextId = getNextId("Pionowo", currentId, false);
      }
    } else if (key === "ArrowUp") {
      nextId = getNextId("Pinonowo", currentId, false);
    } else if (key === "ArrowDown") {
      nextId = getNextId("Pinonowo", currentId, true);
    } else if (key === "ArrowLeft") {
      nextId = getNextId("Poziomo", currentId, false);
    } else if (key === "ArrowRight") {
      nextId = getNextId("Poziomo", currentId, true);
    }

    if (nextId !== null) {
      document.getElementById(nextId).focus();
    }

    //fillWordsNumbers();
    //printWords();
  };

  // const saveCrossword = () => {
  //   const inputs = document.getElementsByClassName("cell");
  //   if (words.length > 0) {
  //     for (let input of inputs) {
  //       input.disabled = true;
  //     }
  //     setSaveCross(true);
  //   }
  // };

  const clearCells = () => {
    const inputs = document.getElementsByClassName("cell");
    for (let input of inputs) {
      input.value = "";
    }
  };

  const deleteCrossword = () => {
    axios
      .delete(`http://localhost:7777/crosswords/id/${id}`)
      .then((response) => navigate("/", { replace: true }))
      .catch((error) => console.log(error));
  };

  const edit = () => {
    navigate(`/krzyzowka/${id}/edytuj`);
  };

  const download = () => {
    const pdf = new jsPDF("landscape");
    const pdfElement = document.getElementById("crosswordTable");
    const pdfElement2 = document.getElementById("wordsList");

    html2canvas(pdfElement).then((canvas1) => {
      const imgData1 = canvas1.toDataURL("image/jpeg");

      html2canvas(pdfElement2).then((canvas2) => {
        const imgData2 = canvas2.toDataURL("image/jpeg");

        pdf.addImage(imgData1, "JPEG", 5, 5, 160, 200); // Dodaj pierwszy obraz na stronę PDF
        pdf.addImage(imgData2, "JPEG", 170, 5, 120, 200); // Dodaj drugi obraz na stronę PDF

        pdf.save("krzyzowka.pdf");
      });
    });
  };

  return (
    <Container className="py-4" id="as">
      <Row>
        <Col md={6}>
          {words && (
            <Crossword
              words={words}
              direction={direction}
              handleKeyDown={handleKeyDown}
              handleKeyUp={handleKeyUp}
              handleFocus={handleFocus}
              unmarkWord={unmarkWord}
              setDirection={setDirection}
              clearCells={clearCells}
              deleteCrossword={deleteCrossword}
              getNextId={getNextId}
              edit={edit}
              title={"Krzyżówka"}
              reason={"solve"}
              download={download}
            />
          )}
        </Col>
        <Col md={6}>
          {words && (
            <WordsList reason={"solve"} title={"Hasła"} words={words} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
