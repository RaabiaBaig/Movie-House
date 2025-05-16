import Link from 'next/link';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';

export default function GenreDetail({ genre, movies }) {
  if (!genre) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Genre not found.</Typography>
        <Link href="/genres" passHref>
          <Button variant="contained" sx={{ mt: 2 }}>
            Back to Genres
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {genre.name}
      </Typography>

      {movies.length === 0 ? (
        <Typography>No movies found for this genre.</Typography>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2" noWrap>{movie.description}</Typography>
                  <Link href={`/movies/${movie.id}`} passHref>
                    <Button size="small" sx={{ mt: 1 }}>
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Link href="/genres" passHref>
        <Button variant="outlined" sx={{ mt: 4 }}>
          Back to Genres
        </Button>
      </Link>
    </Container>
  );
}

export async function getServerSideProps({ params }) {
  const filePath = process.cwd() + '/public/data/data.json';
  const data = JSON.parse(require('fs').readFileSync(filePath, 'utf8'));

  const genre = data.genres.find((g) => g.id === params.id) || null;
  const movies = data.movies.filter((m) => m.genreId === params.id);

  if (!genre) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      genre,
      movies,
    },
  };
}
