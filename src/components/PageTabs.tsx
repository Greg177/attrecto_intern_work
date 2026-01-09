import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

export default function PageTabs() {
  return (
    <Nav variant="tabs" className="mb-3">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/movies" end>
          Movies
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={NavLink} to="/sandbox" end>
          Sandbox
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
