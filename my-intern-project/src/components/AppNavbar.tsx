import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Film, Box } from "react-bootstrap-icons";

export default function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand as={NavLink} to="/movies" className="fw-bold">
          Intern React
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto gap-2">
            <Nav.Link as={NavLink} to="/movies" className="d-flex align-items-center gap-2">
              <Film /> Movies
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sandbox" className="d-flex align-items-center gap-2">
              <Box /> Sandbox
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
