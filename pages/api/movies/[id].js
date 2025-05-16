import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const {
    query: { id },
  } = req;

  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'data.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const movie = jsonData.movies.find((m) => m.id === id);

    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }

    res.status(200).json({ movie });
  } catch (error) {
    console.error('Error reading movie:', error);
    res.status(500).json({ error: 'Failed to load movie' });
  }
}
