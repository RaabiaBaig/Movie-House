import Link from 'next/link';
import { Container, Typography, Button, Box } from '@mui/material';

export default function Custom404() {
  return (
    <Container sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h3" gutterBottom>
        Oops! Page Not Found.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The page you are looking for does not exist.
      </Typography>
      <Box>
        <Link href="/" passHref>
          <Button variant="contained" size="large">
            Go Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
