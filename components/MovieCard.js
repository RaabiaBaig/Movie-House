import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useRouter } from 'next/router';

export default function MovieCard({ movie }) {
  const router = useRouter();

  return (
    <Card>
      <CardActionArea onClick={() => router.push(`/movies/${movie.id}`)}>
        <CardContent>
          <Typography variant="h6">{movie.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.releaseYear} | Rating: {movie.rating}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
