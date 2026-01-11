import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Pencil, Trash } from "react-bootstrap-icons";
import type { Movie } from "../models/Movie";

type Props = {
  movie: Movie;
  index: number;
  isEditing: boolean;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
};


export default function MovieListItem({
  movie,
  index,
  isEditing,
  onEdit,
  onDelete,
}: Props) {

  // Determine if the index is even for styling feature
  const isEven = index % 2 !== 1;

  return (
    <Card className={`mb-2 ${isEditing ? "border-primary" : ""} ${isEven ? "bg-secondary bg-opacity-10" : ""}`}>
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <img
            src={movie.thumbnail}
            alt={movie.title}
            width={45}
            height={67}
            style={{ objectFit: "cover", borderRadius: 2 }}
          />

          <div className="fw-semibold">
            {index + 1}. {movie.title} ({movie.year})
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="fw-semibold">{movie.rating}</div>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onEdit(movie)}
            aria-label="Edit"
          >
            <Pencil />
          </Button>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(movie.id)}
            aria-label="Delete"
          >
            <Trash />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
