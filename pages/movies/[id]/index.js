import Link from 'next/link';
import path from 'path';
import fs from 'fs';

export default function MovieDetails({ movie, director }) {
  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{movie.title}</h1>
      <p><strong>Description:</strong> {movie.description}</p>
      <p>
        <strong>Director:</strong>{' '}
        <Link href={`/movies/${movie.id}/director`}>
          <a>{director ? director.name : 'Unknown'}</a>
        </Link>
      </p>
      <p><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <Link href="/movies">
        <a>Back to Movies</a>
      </Link>
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'data.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const movies = jsonData.movies;

  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: 'blocking', // fallback for on-demand generation
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'data.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const movie = jsonData.movies.find((m) => m.id === params.id);

  if (!movie) {
    return { notFound: true };
  }

  const director = jsonData.directors.find((d) => d.id === movie.directorId) || null;

  return {
    props: {
      movie,
      director,
    },
    revalidate: 10, // ISR every 10 seconds
  };
}
