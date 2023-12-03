import { Link } from "react-router-dom";

export default function CrosswordsList(props) {
  return (
    <div>
      {props.crosswords.map((crossword) => (
        <p key={crossword._id}>
          <Link to={`/krzyzowka/${crossword._id}`}>Krzyzowka</Link>
        </p>
      ))}
    </div>
  );
}
