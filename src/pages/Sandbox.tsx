import { useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import AppButton from "../components/AppButton";
import PageTabs from "../components/PageTabs"; // Importing PageTabs component to maintain consistent navigation beetween pages or should I say tabs

export default function Sandbox() {
  const [count, setCount] = useState<number>(0);

  const canDecrease = useMemo(() => count > 0, [count]);

  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => Math.max(0, prev - 1));

  return (
    <Container className="py-4">
        <PageTabs /> {/* Including PageTabs for navigation */}
      <Card className="shadow-sm mt-3">
        <Card.Body className="p-4 ms-2 mb-3">

          <div className="mt-3">
            <h2 className="fw-semibold mb-2">Counter: {count}</h2>

            <Stack direction="horizontal" gap={2}>
                <AppButton onClick={handleIncrease} className="btn-primary">
                + Increase
                </AppButton>

                <AppButton
                onClick={handleDecrease}
                className="btn-outline-secondary"
                disabled={!canDecrease}
                >
                - Decrease
                </AppButton>
            </Stack>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
