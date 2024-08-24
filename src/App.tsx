import React, { useState, useEffect, useCallback } from 'react';
import { Container, CssBaseline, Box, LinearProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherChart from './components/WeatherChart';
import ErrorModal from './components/ErrorModal';
import { fetchWeatherData as fetchWeatherDataService } from './services/weatherService';

const App: React.FC = () => {
  const storedTheme = localStorage.getItem('theme') || 'dark';
  const [darkMode, setDarkMode] = useState<boolean>(storedTheme === 'dark');

  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { cityName } = useParams<{ cityName: string }>();

  const fetchWeatherData = useCallback(
    (cityName: string) => {
      fetchWeatherDataService(
        cityName,
        setLoading,
        setError,
        setWeatherData,
        setCity,
        setCountry,
        navigate
      );
    },
    [navigate]
  );

  useEffect(() => {
    if (cityName) {
      fetchWeatherData(cityName);
    } else {
      fetchWeatherData('Timisoara');
    }
  }, [cityName, fetchWeatherData]);

  const handleThemeToggle = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#fafafa',
        paper: darkMode ? '#1d1d1d' : '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header city={city} country={country} onThemeToggle={handleThemeToggle} darkMode={darkMode} />
      <Container>
        <SearchBar
          onSearch={fetchWeatherData}
          onError={(msg) => setError(msg)}
          loading={loading}
          defaultCity={cityName || city}
        />
        {error && <ErrorModal error={error} onClose={() => setError(null)} />}
        {loading && (
          <Box mt={5}>
            <LinearProgress />
          </Box>
        )}
        {!loading && weatherData && (
          <Box mt={5}>
            <WeatherChart data={weatherData} />
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
