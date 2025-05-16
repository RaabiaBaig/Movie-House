import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AppBar, Toolbar, Typography, Switch, FormControlLabel } from '@mui/material';

export default function Header() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Movie House
        </Typography>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label="Dark Mode"
        />
      </Toolbar>
    </AppBar>
  );
}
