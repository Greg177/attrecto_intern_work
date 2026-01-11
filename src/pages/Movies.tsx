import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useMemo, useState } from "react";
import { SortDown, SortUpAlt } from "react-bootstrap-icons";

import { MOVIES } from "../data/movies";
import type { Movie } from "../models/Movie";
import MovieList from "../components/MovieList";
import PageTabs from "../components/PageTabs";
import { Container } from "react-bootstrap";

type SortBy = "rating" | "title" | "year";
type SortDir = "desc" | "asc";

export default function Movies() {
  // State
  const [movies, setMovies] = useState<Movie[]>(MOVIES);

  // Edit state
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  // Sort state
  const [sortBy, setSortBy] = useState<SortBy>("rating");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Memos
  const editingMovie = useMemo(
    () => movies.find((m) => m.id === editingMovieId) ?? null,
    [movies, editingMovieId]
  );

  // Sorted movies
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

  // Handlers
  const handleEdit = (movie: Movie) => {
    setEditingMovieId(movie.id);
    setEditTitle(movie.title);
  };

  // Save edited title
  const handleSave = () => {
    if (!editingMovieId) return; // another solution for this is -> if (editingMovieId === null) return;

    const trimmed = editTitle.trim();
    if (!trimmed) return;

    setMovies((prev) =>
      prev.map((m) => (m.id === editingMovieId ? { ...m, title: trimmed } : m))
    );

    setEditingMovieId(null);
    setEditTitle("");
  };

  // Delete movie
  const handleDelete = (id: number) => {
    // Remove from list
    setMovies((prev) => prev.filter((m) => m.id !== id));

    // If the deleted movie is being edited, clear the edit state
    if (editingMovieId === id) {
      setEditingMovieId(null);
      setEditTitle("");
    }
  };

  // Toggle sort direction
  const toggleSortDir = () =>
    setSortDir((d) => (d === "asc" ? "desc" : "asc"));

  return (
    <Container className="py-4">
        <PageTabs /> {/* Including PageTabs for navigation */}
      <Card className="shadow-sm mt-3">
        <Card.Body className="p-4">
          {/* Edit panel */}
          {editingMovie && (
            <div className="mb-3">
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
          <div className="fw-semibold mb-1">Sort by</div>
          <div className="d-flex gap-2 align-items-center">
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
            >
              <option value="rating">Rating</option>
              <option value="title">Title</option>
              <option value="year">Year</option>
            </Form.Select>

            <Button
              variant="primary"
              onClick={toggleSortDir}
              className="px-2"
              title="Toggle sort direction"
            >
              {/* Check for sort direction and switch if needed */}
              {sortDir === "asc" ? <SortUpAlt /> : <SortDown />}
            </Button>
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
