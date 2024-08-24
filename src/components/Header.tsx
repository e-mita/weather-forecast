import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface HeaderProps {
  city: string;
  country: string;
  onThemeToggle: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ city, country, onThemeToggle, darkMode }) => {
  const displayCity = city || '...';
  const displayCountry = country || '...';

  return (
    <AppBar position="static">
      <Toolbar>
        <WbCloudyIcon style={{ marginRight: '8px' }} />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Weather Forecast for <span style={{ fontWeight: 'bold' }}>{displayCity}, {displayCountry}</span>
        </Typography>
        <IconButton edge="end" color="inherit" onClick={onThemeToggle}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
