import Link from 'next/link';

export default function DirectorPage({ director, movies }) {
  return (
    <div>
      <h1>{director.name}</h1>
      <p>{director.biography}</p>
      <h3>Movies Directed:</h3>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <Link href={`/movies/${movies[0]?.id}`}>Back to Movie</Link>
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
    fallback: true,
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
  const movies = data.movies.filter(m => m.directorId === movie.directorId);

  return {
    props: {
      director,
      movies,
    },
    revalidate: 60,
  };
}