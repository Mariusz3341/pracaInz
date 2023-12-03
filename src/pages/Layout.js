import { Outlet, Link } from "react-router-dom";
import "../styles/Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <Link to="/">Home</Link> <Link to="/dodajKrzyzowke">Dodaj krzyzowke</Link>
      <Outlet />
    </div>
  );
}
