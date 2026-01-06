import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

export default function Movies() {
  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h4 mb-1">Movies</h1>
              <div className="text-muted">List, edit, delete, sort (coming next)</div>
            </div>
            <Badge bg="secondary" pill>
              React + TS
            </Badge>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
