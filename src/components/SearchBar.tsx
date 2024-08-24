import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';

interface SearchBarProps {
  onSearch: (cityName: string) => void;
  onError: (message: string) => void;
  loading: boolean;
  defaultCity: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onError, loading, defaultCity }) => {
  const [city, setCity] = useState<string>(defaultCity);

  useEffect(() => {
    setCity(defaultCity);
  }, [defaultCity]);

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
    } else {
      onError('City name cannot be blank.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <TextField
        label="Enter City"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        sx={{ mr: 2 }}
        inputProps={{ style: { height: '40px', boxSizing: 'border-box' } }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={loading}
        sx={{
          height: '40px',
          minWidth: '100px',
        }}
      >
        {loading ? <CircularProgress size={24} /> : 'Submit'}
      </Button>
    </Box>
  );
};

export default SearchBar;
