// pages/_app.js

import { useContext } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider, ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <InnerApp Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  );
}

// Separate inner component to consume ThemeContext and provide MUI theme
function InnerApp({ Component, pageProps }) {
  const { darkMode } = useContext(ThemeContext);

  // Create MUI theme based on darkMode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Component {...pageProps} />
    </MUIThemeProvider>
  );
}

export default MyApp;
