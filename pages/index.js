import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home({ trendingMovies }) {
  const router = useRouter();

  const browseGenres = () => {
    router.push('/genres');
  };

  return (
    <div>
      <h1>Welcome to Movie House</h1>
      <h2>Trending Movies</h2>
      <div className="movie-grid">
        {trendingMovies.map(movie => (
          <div key={movie.id} className="movie-card">
            <Link href={`/movies/${movie.id}`}>
              <h3>{movie.title}</h3>
              <p>Rating: {movie.rating}</p>
            </Link>
          </div>
        ))}
      </div>
      <button onClick={browseGenres}>Browse Genres</button>
    </div>
  );
}

export async function getStaticProps() {
  const data = require('../data.json');
  
  // Get top 3 rated movies as trending
  const trendingMovies = [...data.movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return {
    props: {
      trendingMovies,
    },
    revalidate: 60, // ISR: regenerate every 60 seconds if needed
  };
}