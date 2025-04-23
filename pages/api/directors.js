export default function handler(req, res) {
  const data = require('../../public/data/data.json');
  
  const directorsWithMovies = data.directors.map(director => ({
    ...director,
    movies: data.movies.filter(movie => movie.directorId === director.id),
  }));

  res.status(200).json(directorsWithMovies);
}
