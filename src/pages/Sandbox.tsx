import { useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import AppButton from "../components/AppButton";

export default function Sandbox() {
  const [count, setCount] = useState<number>(0);

  const canDecrease = useMemo(() => count > 0, [count]);

  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => Math.max(0, prev - 1));

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h1 className="h4 mb-3">Sandbox</h1>

          <div className="fs-4 fw-bold mb-3">{count}</div>

          <Stack direction="horizontal" gap={2}>
            <AppButton onClick={handleIncrease} className="btn-primary">
              Increase
            </AppButton>

            <AppButton
              onClick={handleDecrease}
              className="btn-outline-secondary"
              disabled={!canDecrease}
            >
              Decrease
            </AppButton>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
}
