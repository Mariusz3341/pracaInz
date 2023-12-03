import { useEffect, useState } from "react";
import axios from "axios";

export default function Word(props) {
  useEffect(() => {
    if (props.saved) {
      axios
        .get(`http://localhost:7777/words/word/${props.word.word}`)
        .then((response) => {
          if (response.data) {
            document.getElementById(props.word.word).disabled = true;
            document.getElementById(props.word.word).value = response.data;
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div style={{ textAlign: "left" }}>
      <div className="item p-2">
        {props.reason === "solve" ? (
          <span>
            {props.word.cellNum}. {props.word.definition}
          </span>
        ) : (
          <span>
            {props.word.cellNum}. {props.word.word}
          </span>
        )}

        {
          props.saved && (
            <input
              className="definition"
              id={props.word.word}
              style={{ width: "100%" }}
            />
          )
          // (definition ? (
          //   <input
          //     className="definition"
          //     id={props.word.word}
          //     style={{ width: "100%" }}
          //     value={definition}
          //     disabled
          //   />
          // ) : (
          //   <input
          //     className="definition"
          //     id={props.word.word}
          //     style={{ width: "100%" }}
          //   />
          // ))
        }
        <br />
      </div>
    </div>
  );
}
