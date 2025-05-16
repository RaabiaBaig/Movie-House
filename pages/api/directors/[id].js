import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const {
    query: { id },
  } = req;

  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'data.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const director = jsonData.directors.find((d) => d.id === id);
    if (!director) {
      res.status(404).json({ error: 'Director not found' });
      return;
    }

    const moviesDirected = jsonData.movies.filter((movie) => movie.directorId === id);

    res.status(200).json({
      director: {
        ...director,
        movies: moviesDirected,
      },
    });
  } catch (error) {
    console.error('Error reading director:', error);
    res.status(500).json({ error: 'Failed to load director' });
  }
}
