import type { Movie } from "../models/Movie"; // Importing the Movie type from the models folder, there was an error  it must be represented as or shown as type after import that solved the problem for me
import MovieListItem from "./MovieListItem";

type Props = {
  movies: Movie[];
  editingMovieId: number | null;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
};

export default function MovieList({
  movies,
  editingMovieId,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="mt-3">
      {movies.map((movie, index) => (
        <MovieListItem
          key={movie.id}
          movie={movie}
          index={index}
          isEditing={editingMovieId === movie.id}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
