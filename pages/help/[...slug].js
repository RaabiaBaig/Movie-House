import { useRouter } from 'next/router';

const helpContent = {
  '': <div><h1>Help Center</h1><p>Welcome to the Movie House help center.</p></div>,
  'faqs': <div><h1>FAQs</h1><p>Frequently asked questions will appear here.</p></div>,
  'contact': <div><h1>Contact Us</h1><p>Email us at support@moviehouse.com</p></div>,
  'privacy': <div><h1>Privacy Policy</h1><p>Our privacy policy details.</p></div>,
};

export default function HelpPage() {
  const router = useRouter();
  const { slug = [] } = router.query;
  const path = slug.join('/');

  return (
    <div>
      {helpContent[path] || <div><h1>Help Section Not Found</h1><p>The requested help section does not exist.</p></div>}
      <Link href="/">Go Home</Link>
    </div>
  );
}