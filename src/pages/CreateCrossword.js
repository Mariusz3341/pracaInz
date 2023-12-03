import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CreateCrossword.css";
import Crossword from "../components/Crossword";
import { Container, Col, Row } from "react-bootstrap";
import WordsList from "../components/WordsList";
import { useNavigate } from "react-router-dom";

export default function CreateCrossword() {
  const [direction, setDirection] = useState(true);
  const [focus, setFocus] = useState("container");
  const [words, setWords] = useState([]);
  const [saveCross, setSaveCross] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById(focus).focus();
  }, [direction]);

  const clearCells = () => {
    //czysci krzyzowke
    const inputs = document.getElementsByClassName("cell");
    for (let input of inputs) {
      input.value = "";
      input.parentElement.className = "";
      if (input.previousElementSibling) {
        input.previousElementSibling.remove();
      }
    }
    setWords([]);
    setSaveCross(false);
  };

  const handleKeyDown = (event) => {
    //wpisuje litere do komorki lub czysci if backspace
    event.preventDefault();
    const key = event.key;
    if (/^[A-Za-z]$/.test(key)) {
      event.target.value = key;
      event.target.parentElement.classList.add("filled");
    } else if (event.key === "Backspace") {
      event.target.value = "";
      event.target.parentElement.classList.remove("filled");
      event.target.parentElement.classList.remove("word");
    }
  };

  const handleFocus = (event) => {
    //zmienia hooka i zaznacza slowo
    let id = event.target.getAttribute("id");
    setFocus(id);
    let parent = document.getElementById(id).parentElement;
    parent.classList.add("focused");
    markWord(id);
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

    fillWordsNumbers();
    printWords();
  };

  const fillWordsNumbers = () => {
    let id,
      idRight,
      idLeft,
      idDown,
      idTop,
      cellTop,
      cell,
      cellRight,
      cellLeft,
      cellDown;
    let num = 1;
    let numEle;
    let childInput;

    const elementsToRemove = document.querySelectorAll(".cellNumber");
    elementsToRemove.forEach((element) => {
      element.remove();
    });

    for (let i = 1; i < 19; i++) {
      for (let j = 1; j < 19; j++) {
        id = i.toString() + "-" + j.toString();
        idRight = i.toString() + "-" + (j + 1).toString();
        idLeft = i.toString() + "-" + (j - 1).toString();
        idTop = (i - 1).toString() + "-" + j.toString();
        idDown = (i + 1).toString() + "-" + j.toString();
        cell = document.getElementById(id).parentElement;
        childInput = cell.querySelector(".cell");
        if (j + 1 !== 19) {
          cellRight = document.getElementById(idRight).parentElement;
        }
        if (j - 1 !== 0) {
          cellLeft = document.getElementById(idLeft).parentElement;
        }
        if (i + 1 !== 19) {
          cellDown = document.getElementById(idDown).parentElement;
        }
        if (i - 1 !== 0) {
          cellTop = document.getElementById(idTop).parentElement;
        }

        if (i === 1) {
          if (j === 1) {
            if (
              (cell.classList.contains("filled") ||
                cell.classList.contains("word")) &&
              (cellRight.classList.contains("filled") ||
                cellRight.classList.contains("word") ||
                cellDown.classList.contains("filled") ||
                cellDown.classList.contains("word"))
            ) {
              numEle = document.createElement("div");
              numEle.classList.add("cellNumber");
              numEle.innerHTML = num.toString();
              num++;
              cell.insertBefore(numEle, childInput);
            }
          } else if (j === 18) {
            if (
              (cell.classList.contains("filled") ||
                cell.classList.contains("word")) &&
              (cellDown.classList.contains("filled") ||
                cellDown.classList.contains("word"))
            ) {
              numEle = document.createElement("div");
              numEle.classList.add("cellNumber");
              numEle.innerHTML = num.toString();
              num++;
              cell.insertBefore(numEle, childInput);
            }
          } else {
            if (
              (cell.classList.contains("filled") ||
                cell.classList.contains("word")) &&
              (((cellRight.classList.contains("filled") ||
                cellRight.classList.contains("word")) &&
                cellLeft.classList.length === 0) ||
                cellDown.classList.contains("filled") ||
                cellDown.classList.contains("word"))
            ) {
              numEle = document.createElement("div");
              numEle.classList.add("cellNumber");
              numEle.innerHTML = num.toString();
              num++;
              cell.insertBefore(numEle, childInput);
            }
          }
        } else if (i === 18) {
          if (j === 1) {
            if (
              (cell.classList.contains("filled") ||
                cell.classList.contains("word")) &&
              (cellRight.classList.contains("filled") ||
                cellRight.classList.contains("word"))
            ) {
              numEle = document.createElement("div");
              numEle.classList.add("cellNumber");
              numEle.innerHTML = num.toString();
              num++;
              cell.insertBefore(numEle, childInput);
            }
          } else if (j === 18) {
          } else {
            if (
              (cell.classList.contains("filled") ||
                cell.classList.contains("word")) &&
              (cellRight.classList.contains("filled") ||
                cellRight.classList.contains("word")) &&
              cellLeft.classList.length === 0
            ) {
              numEle = document.createElement("div");
              numEle.classList.add("cellNumber");
              numEle.innerHTML = num.toString();
              num++;
              cell.insertBefore(numEle, childInput);
            }
          }
        } else if (i > 1 && i < 18) {
          if (j === 1) {
            if (
              (cell.classList.contains("filled") ||
                cell.classList.contains("word")) &&
              (cellRight.classList.contains("word") ||
                cellRight.classList.contains("filled") ||
                (cellTop.classList.length === 0 &&
                  (cellDown.classList.contains("word") ||
                    cellDown.classList.contains("filled"))))
            ) {
              numEle = document.createElement("div");
              numEle.classList.add("cellNumber");
              numEle.innerHTML = num.toString();
              num++;
              cell.insertBefore(numEle, childInput);
            }
          } else if (j === 18) {
            if (
              (cell.classList.contains("filled") ||
                cell.classList.contains("word")) &&
              cellTop.classList.length === 0 &&
              (cellDown.classList.contains("word") ||
                cellDown.classList.contains("filled"))
            ) {
              numEle = document.createElement("div");
              numEle.classList.add("cellNumber");
              numEle.innerHTML = num.toString();
              num++;
              cell.insertBefore(numEle, childInput);
            }
          } else if (
            (cell.classList.contains("filled") ||
              cell.classList.contains("word")) &&
            (((cellRight.classList.contains("filled") ||
              cellRight.classList.contains("word")) &&
              cellLeft.classList.length === 0) ||
              (cellTop.classList.length === 0 &&
                (cellDown.classList.contains("filled") ||
                  cellDown.classList.contains("word"))))
          ) {
            numEle = document.createElement("div");
            numEle.classList.add("cellNumber");
            numEle.innerHTML = num.toString();
            num++;
            cell.insertBefore(numEle, childInput);
          }
        }
      }
    }
  };

  const getWords = (ids) => {
    let words = [];
    let rootId,
      nextId,
      nextCell,
      help,
      collumnId,
      rowId,
      word,
      cellTop,
      cellTopId,
      cellLeft,
      cellLeftId;

    for (let i = 0; i < ids.length; i++) {
      rootId = ids[i];
      word = document.getElementById(rootId).value;
      nextId = getNextId("Poziomo", rootId, true);
      if (nextId) {
        nextCell = document.getElementById(nextId);
      }
      help = rootId.lastIndexOf("-");
      collumnId = parseInt(rootId.substring(help + 1));

      cellLeftId = getNextId("Poziomo", rootId, false);
      if (cellLeftId) {
        cellLeft = document.getElementById(cellLeftId);
      }

      if (!cellLeft) {
        if (collumnId !== 18 && nextId) {
          while (nextCell.value !== "" && nextId) {
            word += nextCell.value;
            nextId = getNextId("Poziomo", nextId, true);
            if (nextId) {
              nextCell = document.getElementById(nextId);
            }
          }
        }
      } else {
        if (
          collumnId !== 18 &&
          nextId &&
          cellLeft.parentElement.classList.length === 0
        ) {
          while (nextCell.value !== "" && nextId) {
            word += nextCell.value;
            nextId = getNextId("Poziomo", nextId, true);
            if (nextId) {
              nextCell = document.getElementById(nextId);
            }
          }
        }
      }

      if (word.length > 1) {
        const wordObj = {
          word: word,
          cordinates: rootId,
          direction: "Poziomo",
          cellNum:
            document.getElementById(rootId).previousElementSibling.innerHTML,
        };
        words.push(wordObj);
        word = document.getElementById(rootId).value;
      }

      nextId = getNextId("Pionowo", rootId, true);
      if (nextId) {
        nextCell = document.getElementById(nextId);
      }
      help = rootId.lastIndexOf("-");
      rowId = parseInt(rootId.substring(0, help));

      cellTopId = getNextId("Pionowo", rootId, false);
      if (cellTopId) {
        cellTop = document.getElementById(cellTopId);
      }

      if (!cellTop) {
        if (rowId !== 18 && nextId) {
          while (nextCell.value !== "" && nextId) {
            word += nextCell.value;
            nextId = getNextId("Pionowo", nextId, true);
            if (nextId) {
              nextCell = document.getElementById(nextId);
            }
          }
        }
      } else {
        if (
          rowId !== 18 &&
          nextId &&
          cellTop.parentElement.classList.length === 0
        ) {
          while (nextCell.value !== "" && nextId) {
            word += nextCell.value;
            nextId = getNextId("Pionowo", nextId, true);
            if (nextId) {
              nextCell = document.getElementById(nextId);
            }
          }
        }
      }

      if (word.length > 1) {
        const wordObj = {
          word: word,
          cordinates: rootId,
          direction: "Pionowo",
          cellNum:
            document.getElementById(rootId).previousElementSibling.innerHTML,
        };
        words.push(wordObj);
      }
    }
    return words;
  };

  const printWords = () => {
    const cellNumDivs = document.getElementsByClassName("cellNumber");
    const ids = [];
    for (let i = 0; i < cellNumDivs.length; i++) {
      ids.push(cellNumDivs[i].nextElementSibling.getAttribute("id"));
    }
    const words = getWords(ids);
    setWords(words);
  };

  const saveCrossword = () => {
    const inputs = document.getElementsByClassName("cell");
    if (words.length > 0) {
      for (let input of inputs) {
        input.disabled = true;
      }
      setSaveCross(true);
    }
  };

  const backToCross = () => {
    const inputs = document.getElementsByClassName("cell");
    for (let input of inputs) {
      input.disabled = false;
    }
    setSaveCross(false);
  };

  const saveWordList = () => {
    const inputs = document.getElementsByClassName("definition");
    let flag = 0;
    for (let definition of inputs) {
      if (definition.value === "") {
        flag = 1;
        break;
      }
    }

    if (flag === 0) {
      for (let word of words) {
        const definition = document.getElementById(word.word);
        word["definition"] = definition.value;
        delete word.cellNum;
      }
      words.sort((a, b) => {
        const cordinatesA = a.cordinates.split("-").map(Number);
        const cordinatesB = b.cordinates.split("-").map(Number);

        if (cordinatesA[0] !== cordinatesB[0]) {
          return cordinatesA[0] - cordinatesB[0];
        }

        return cordinatesA[1] - cordinatesB[1];
      });

      axios
        .post("http://localhost:7777/crosswords", words)
        .then((response) => navigate("/", { replace: true }))
        .catch((error) => console.log(error));
    } else {
      console.log("Nie wypelniono inputow");
    }
  };

  return (
    <Container id="container" className="pt-4">
      <Row>
        <Col md={6}>
          <Crossword
            saved={saveCross}
            direction={direction}
            handleKeyDown={handleKeyDown}
            handleKeyUp={handleKeyUp}
            handleFocus={handleFocus}
            unmarkWord={unmarkWord}
            printWords={printWords}
            setDirection={setDirection}
            clearCells={clearCells}
            saveCrossword={saveCrossword}
            title={"Utwórz krzyżówkę"}
            reason={"create"}
          />
        </Col>
        <Col md={6}>
          <WordsList
            words={words}
            saved={saveCross}
            back={backToCross}
            saveWordList={saveWordList}
            title={"Hasła"}
            reason={"create"}
          />
        </Col>
      </Row>
    </Container>
  );
}
