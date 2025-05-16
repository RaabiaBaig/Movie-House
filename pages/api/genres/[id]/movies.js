import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const {
    query: { id },
  } = req;

  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'data.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const genreExists = jsonData.genres.some((g) => g.id === id);
    if (!genreExists) {
      res.status(404).json({ error: 'Genre not found' });
      return;
    }

    const moviesByGenre = jsonData.movies.filter((movie) => movie.genreId === id);

    res.status(200).json({ movies: moviesByGenre });
  } catch (error) {
    console.error('Error reading genre movies:', error);
    res.status(500).json({ error: 'Failed to load movies for genre' });
  }
}
