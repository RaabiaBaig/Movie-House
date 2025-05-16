import { useRouter } from 'next/router';
import { Container, Typography } from '@mui/material';

const helpContent = {
  faqs: "Here are some frequently asked questions...",
  contact: "Contact us at contact@moviehouse.com or call 123-456-7890.",
  privacy: "Our privacy policy ensures your data is safe with us.",
};

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) {
    // /help
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>Help Center</Typography>
        <Typography>Welcome to the Movie House Help Center. Choose a topic:</Typography>
        <ul>
          <li><a href="/help/faqs">FAQs</a></li>
          <li><a href="/help/contact">Contact</a></li>
          <li><a href="/help/privacy">Privacy Policy</a></li>
        </ul>
      </Container>
    );
  }

  // slug can be an array for nested catch-all. We'll use first element only
  const topic = slug[0];
  const content = helpContent[topic];

  if (!content) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Page not found.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>{topic.toUpperCase()}</Typography>
      <Typography>{content}</Typography>
    </Container>
  );
}
