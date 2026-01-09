import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AppNavbar from "./components/AppNavbar";
import Movies from "./pages/Movies";
import Sandbox from "./pages/Sandbox";

export default function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/sandbox" element={<Sandbox />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
