import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';

interface HeaderProps {
  city: string;
  country: string;
  onThemeToggle: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ city, country, onThemeToggle, darkMode }) => {
  const isDataLoaded = city && country;

  return (
    <AppBar position="static">
      <Toolbar>
        <WbCloudyIcon style={{ marginRight: '8px' }} />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Weather Forecast for <span style={{ fontWeight: 'bold' }}>
            {isDataLoaded ? `${city}, ${country}` : '...'}
          </span>
        </Typography>
        <IconButton edge="end" color="inherit" onClick={onThemeToggle}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
