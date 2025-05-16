import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';

export default function Home({ trendingMovies }) {
  const router = useRouter();

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Movie House
      </Typography>

      <Typography variant="h5" gutterBottom>
        Trending Movies
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {trendingMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2" noWrap>
                  {movie.description}
                </Typography>
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

      <Button
        variant="contained"
        onClick={() => router.push('/genres')}
        size="large"
      >
        Browse Genres
      </Button>
    </Container>
  );
}

export async function getStaticProps() {
  const filePath = process.cwd() + '/public/data/data.json';
  const data = JSON.parse(require('fs').readFileSync(filePath, 'utf8'));

  // Pick top 3 movies by rating
  const trendingMovies = data.movies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return {
    props: {
      trendingMovies,
    },
    revalidate: 60,
  };
}
