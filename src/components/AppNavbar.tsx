import Container from "react-bootstrap/Container"; // Bootstrap container and useful imports for responsive layout and icons support as I know right now
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
            <Nav.Link as={NavLink} to="/movies">
              <Film /> Movies
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sandbox">
              <Box /> Sandbox
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
