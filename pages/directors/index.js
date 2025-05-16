import useSWR from 'swr';
import Link from 'next/link';
import { CircularProgress, Container, Typography, Card, CardContent, Grid } from '@mui/material';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorsPage() {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return <div>Failed to load directors.</div>;
  if (!data) return <CircularProgress />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Directors
      </Typography>
      <Grid container spacing={3}>
        {data.map((director) => (
          <Grid item xs={12} md={6} key={director.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{director.name}</Typography>
                <Typography variant="body2" paragraph>{director.biography}</Typography>
                <Typography variant="subtitle1">Movies Directed:</Typography>
                <ul>
                  {director.movies.length > 0 ? (
                    director.movies.map((movie) => (
                      <li key={movie.id}>
                        <Link href={`/movies/${movie.id}`}>
                          <a>{movie.title}</a>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>No movies found.</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
