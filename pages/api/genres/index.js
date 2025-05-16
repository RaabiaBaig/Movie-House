import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'data.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const genres = jsonData.genres || [];

    res.status(200).json({ genres });
  } catch (error) {
    console.error('Error reading genres:', error);
    res.status(500).json({ error: 'Failed to load genres' });
  }
}
