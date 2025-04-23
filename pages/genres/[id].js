import Link from 'next/link';

export default function GenreDetail({ genre, movies }) {
  return (
    <div>
      <h1>{genre.name} Movies</h1>
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <Link href={`/movies/${movie.id}`}>
              <h3>{movie.title}</h3>
              <p>Rating: {movie.rating}</p>
            </Link>
          </div>
        ))}
      </div>
      <Link href="/genres">Back to Genres</Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const data = require('../../data.json');
  
  const genre = data.genres.find(g => g.id === id);
  if (!genre) {
    return {
      notFound: true,
    };
  }

  const movies = data.movies.filter(m => m.genreId === id);

  return {
    props: {
      genre,
      movies,
    },
  };
}