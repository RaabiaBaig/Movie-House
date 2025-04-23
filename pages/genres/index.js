import Link from 'next/link';

export default function GenresPage({ genres }) {
  return (
    <div>
      <h1>Browse Genres</h1>
      <div className="genre-list">
        {genres.map(genre => (
          <div key={genre.id} className="genre-card">
            <Link href={`/genres/${genre.id}`}>
              <h3>{genre.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = require('../../data.json');
  
  return {
    props: {
      genres: data.genres,
    },
  };
}