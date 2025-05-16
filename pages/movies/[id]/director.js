import Link from 'next/link';
import path from 'path';
import fs from 'fs';

export default function DirectorPage({ director }) {
  if (!director) return <p>Director not found</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{director.name}</h1>
      <p>{director.biography}</p>
      <h3>Movies Directed:</h3>
      <ul>
        {director.movies.map((movie) => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
              <a>{movie.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={`/movies/${director.movies[0]?.id || ''}`}>
        <a>Back to Movie Details</a>
      </Link>
    </div>
  );
}

export async function getStaticPaths() {
  // Get all movie IDs for static paths
  const filePath = path.join(process.cwd(), 'public', 'data', 'data.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const movies = jsonData.movies;

  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'data.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const movie = jsonData.movies.find((m) => m.id === params.id);

  if (!movie) {
    return { notFound: true };
  }

  const director = jsonData.directors.find((d) => d.id === movie.directorId);
  if (!director) {
    return { notFound: true };
  }

  // Get movies directed by this director
  const moviesDirected = jsonData.movies.filter((m) => m.directorId === director.id);

  return {
    props: {
      director: {
        ...director,
        movies: moviesDirected,
      },
    },
    revalidate: 10,
  };
}
