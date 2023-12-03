import "../styles/Crossword.css";
import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Crossword(props) {
  const navigate = useNavigate();
  //const [wordsIds, setWordsIds] = useState([]);
  //const [wordNum, setWordNum] = useState(1);
  //const [words, setWords] = useState([]);

  useEffect(() => {
    if (props.words) {
      setCellsForWords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCellsForWords = () => {
    let words = props.words;
    let cordinates, cordinatesEle, numEle;
    for (let word of words) {
      cordinates = word.cordinates;

      for (let i = 0; i < word.word.length; i++) {
        if (i === 0) {
          cordinatesEle = document.getElementById(cordinates);
          if (!cordinatesEle.previousElementSibling) {
            numEle = document.createElement("div");
            numEle.classList.add("cellNumber");
            numEle.innerHTML = word.cellNum.toString();
            cordinatesEle.parentElement.insertBefore(numEle, cordinatesEle);
          }
        } else {
          cordinates = props.getNextId(word.direction, cordinates, true);
          cordinatesEle = document.getElementById(cordinates);
        }
        cordinatesEle.parentElement.classList.add("filled");
        if (props.reason === "edit") {
          cordinatesEle.value = word.word[i];
        }
      }
    }
    if (props.reason === "solve") {
      disableInputs();
    }
  };

  const disableInputs = () => {
    let cells = document.querySelectorAll("#crosswordTable td");
    cells.forEach((cell) => {
      if (!cell.classList.contains("filled")) {
        let input = cell.firstElementChild;
        input.setAttribute("disabled", "true");
      }
    });
  };

  const saveCrossword = () => {
    let yourWords = getAnswer();
    let result = chceckCorectness(yourWords);
    if (result) {
      console.log("Wygrałeś!");
    } else {
      console.log("Przegrałeś!");
    }
  };

  const getAnswer = () => {
    let yourWords = [];
    let cordinates, input, yourWord;
    for (let word of props.words) {
      yourWord = "";
      cordinates = word.cordinates;
      input = document.getElementById(cordinates);
      for (let i = 0; i < word.word.length; i++) {
        yourWord += input.value;
        cordinates = props.getNextId(word.direction, cordinates, true);
        input = document.getElementById(cordinates);
      }
      yourWords.push(yourWord);
    }
    return yourWords;
  };

  const chceckCorectness = (yourWords) => {
    for (let i = 0; i < yourWords.length; i++) {
      if (yourWords[i] !== props.words[i].word) {
        return false;
      }
    }
    return true;
  };

  return (
    <Card className="px-3" border="dark">
      <div id="xd">
        <h1 className="mt-3 text-center">{props.title}</h1>

        <table className="my-3" id="crosswordTable">
          <tbody>
            <tr>
              <td>
                <input
                  className="cell"
                  id="1-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                  tabIndex={2}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                  tabIndex={1}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                  tabIndex={3}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="1-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="2-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="2-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="3-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="3-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="4-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="4-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="5-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="5-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="6-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="6-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="7-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="7-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="8-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="8-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="9-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="9-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="10-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="10-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="11-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="11-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="12-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="12-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="13-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="13-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="14-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="14-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="15-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="15-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="16-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="16-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="17-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="17-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="cell"
                  id="18-1"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-2"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-3"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-4"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-5"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-6"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-7"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-8"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-9"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-10"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-11"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-12"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-13"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-14"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-15"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-16"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-17"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
              <td>
                <input
                  className="cell"
                  id="18-18"
                  maxLength={1}
                  onKeyDown={(e) => props.handleKeyDown(e)}
                  onKeyUp={(e) => props.handleKeyUp(e)}
                  onFocus={(e) => {
                    props.handleFocus(e);
                  }}
                  onBlur={(e) => props.unmarkWord(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {!props.saved && (
          <div className="mb-3">
            {props.reason === "solve" && (
              <Button
                className="me-2"
                variant="primary"
                type="submit"
                onClick={saveCrossword}
              >
                Zatwierdź
              </Button>
            )}

            {(props.reason === "create" || props.reason === "edit") && (
              <Button
                className="me-2"
                variant="primary"
                type="submit"
                onClick={props.saveCrossword}
              >
                Zapisz
              </Button>
            )}

            <Button
              className="me-2"
              variant="primary"
              type="submit"
              onClick={() => props.setDirection(!props.direction)}
            >
              Odwróć kierunek
            </Button>
            <Button
              className="me-2"
              variant="primary"
              type="submit"
              onClick={() => props.download()}
            >
              Pobierz
            </Button>
            {/* <Button
              className="me-2"
              variant="danger"
              type="submit"
              onClick={props.clearCells}
            >
              Wyczyść
            </Button> */}
            {props.reason === "solve" && (
              <>
                <Button
                  className="me-2"
                  variant="warning"
                  type="submit"
                  onClick={props.edit}
                >
                  Edytuj
                </Button>
                <Button
                  className="me-2"
                  variant="danger"
                  type="submit"
                  onClick={props.deleteCrossword}
                >
                  Usuń krzyżówkę
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
