import Link from 'next/link';

export default function MovieDetail({ movie, director }) {
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Release Year: {movie.releaseYear}</p>
      <p>Rating: {movie.rating}</p>
      <p>Genre: {movie.genreName}</p>
      <div>
        <h3>Director: <Link href={`/movies/${movie.id}/director`}>{director.name}</Link></h3>
      </div>
      <Link href="/movies">Back to Movies</Link>
    </div>
  );
}

export async function getStaticPaths() {
  const data = require('../../../data.json');
  const paths = data.movies.map(movie => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: true, // Enable on-demand generation for new movies
  };
}

export async function getStaticProps({ params }) {
  const data = require('../../../data.json');
  const movie = data.movies.find(m => m.id === params.id);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  const director = data.directors.find(d => d.id === movie.directorId) || {};
  const genre = data.genres.find(g => g.id === movie.genreId) || {};

  return {
    props: {
      movie: {
        ...movie,
        genreName: genre.name || 'Unknown',
      },
      director,
    },
    revalidate: 60, // ISR
  };
}