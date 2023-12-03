import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import CreateCrossword from "./pages/CreateCrossword";
import SolveCrossword from "./pages/SolveCrossword";
import EditCrossword from "./pages/EditCrossword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dodajKrzyzowke" element={<CreateCrossword />} />
          <Route path="krzyzowka/:id" element={<SolveCrossword />} />
          <Route path="krzyzowka/:id/edytuj" element={<EditCrossword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
