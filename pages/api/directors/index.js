import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'data.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const { directors, movies } = data;

  // For each director, attach their movies
  const directorsWithMovies = directors.map((director) => {
    const directedMovies = movies.filter((movie) => movie.directorId === director.id);
    return {
      ...director,
      movies: directedMovies,
    };
  });

  res.status(200).json(directorsWithMovies);
}
