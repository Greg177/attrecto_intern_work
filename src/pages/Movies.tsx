import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useMemo, useState } from "react";
import { ArrowDownUp } from "react-bootstrap-icons";

import { MOVIES } from "../data/movies.ts";
import type { Movie } from "../models/Movie";
import MovieList from "../components/MovieList";

type SortBy = "rating" | "title" | "year";
type SortDir = "desc" | "asc";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>(MOVIES);

  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  const [sortBy, setSortBy] = useState<SortBy>("rating");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const editingMovie = useMemo(
    () => movies.find((m) => m.id === editingMovieId) ?? null,
    [movies, editingMovieId]
  );

  const sortedMovies = useMemo(() => {
    const copy = [...movies];

    copy.sort((a, b) => {
      let cmp = 0;

      if (sortBy === "rating") cmp = a.rating - b.rating;
      if (sortBy === "year") cmp = a.year - b.year;
      if (sortBy === "title") cmp = a.title.localeCompare(b.title);

      return sortDir === "asc" ? cmp : -cmp;
    });

    return copy;
  }, [movies, sortBy, sortDir]);

  const handleEdit = (movie: Movie) => {
    setEditingMovieId(movie.id);
    setEditTitle(movie.title);
  };

  const handleSave = () => {
    if (!editingMovieId) return;

    const trimmed = editTitle.trim();
    if (!trimmed) return;

    setMovies((prev) =>
      prev.map((m) => (m.id === editingMovieId ? { ...m, title: trimmed } : m))
    );

    setEditingMovieId(null);
    setEditTitle("");
  };

  const handleDelete = (id: number) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));

    // ha épp ezt szerkesztetted, lépj ki edit módból
    if (editingMovieId === id) {
      setEditingMovieId(null);
      setEditTitle("");
    }
  };

  const toggleSortDir = () =>
    setSortDir((d) => (d === "asc" ? "desc" : "asc"));

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h4 mb-1">Movies</h1>
              <div className="text-muted">List, edit, delete, sort</div>
            </div>
            <Badge bg="secondary" pill>
              React + TS
            </Badge>
          </div>

          {/* Edit panel (csak ha van kiválasztva) */}
          {editingMovie && (
            <div className="mt-3">
              <div className="fw-semibold mb-1">
                Edit &quot;{editingMovie.title}&quot;
              </div>

              <Row className="g-2 align-items-center">
                <Col>
                  <Form.Control
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Movie title"
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={!editTitle.trim()}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          {/* Sort bar */}
          <div className="mt-3">
            <div className="fw-semibold mb-1">Sort by</div>
            <Row className="g-2 align-items-center">
              <Col>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                >
                  <option value="rating">Rating</option>
                  <option value="title">Title</option>
                  <option value="year">Year</option>
                </Form.Select>
              </Col>
              <Col xs="auto">
                <Button
                  variant="primary"
                  onClick={toggleSortDir}
                  title="Toggle sort direction"
                >
                  <ArrowDownUp />
                </Button>
              </Col>
            </Row>
          </div>

          {/* List */}
          <MovieList
            movies={sortedMovies}
            editingMovieId={editingMovieId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}
