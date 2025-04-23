import useSWR from 'swr';
import Link from 'next/link';

const fetcher = async () => {
  const res = await fetch('/api/directors');
  const data = await res.json();
  return data;
};

export default function DirectorsPage() {
  const { data: directors, error } = useSWR('directors', fetcher);

  if (error) return <div>Failed to load directors</div>;
  if (!directors) return <div>Loading...</div>;

  return (
    <div>
      <h1>Directors</h1>
      <div className="director-list">
        {directors.map(director => (
          <div key={director.id} className="director-card">
            <h2>{director.name}</h2>
            <p>{director.biography}</p>
            <h4>Movies:</h4>
            <ul>
              {director.movies.map(movie => (
                <li key={movie.id}>
                  <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}