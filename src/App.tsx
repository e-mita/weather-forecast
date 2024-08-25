import React, { useState, useEffect, useCallback } from 'react';
import { Container, CssBaseline, Box, LinearProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherChart from './components/WeatherChart';
import ErrorModal from './components/ErrorModal';
import SummaryCard from './components/SummaryCard';
import { fetchWeatherData as fetchWeatherDataService } from './services/weatherService';

const App: React.FC = () => {
  const storedTheme = localStorage.getItem('theme') || 'dark';
  const [darkMode, setDarkMode] = useState<boolean>(storedTheme === 'dark');

  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { cityName } = useParams<{ cityName: string }>();

  const fetchWeatherData = useCallback(
    async (cityName: string) => {
      fetchWeatherDataService(
        cityName,
        setLoading,
        setError,
        (data) => {
          setWeatherData(data);

          const now = new Date();
          const romaniaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Bucharest' }));
          const currentHour = romaniaTime.getHours();
          const currentMinutes = romaniaTime.getMinutes();

          const closestDataPoint = data.reduce((closest: any, point: any) => {
            const [pointHour, pointMinutes] = point.time.split(':').map(Number);

            const pointTimeInMinutes = pointHour * 60 + pointMinutes;
            const currentTimeInMinutes = currentHour * 60 + currentMinutes;

            const currentDiff = Math.abs(pointTimeInMinutes - currentTimeInMinutes);
            const closestDiff = Math.abs(
              parseInt(closest.time.split(':')[0], 10) * 60 + parseInt(closest.time.split(':')[1], 10) - currentTimeInMinutes
            );

            return currentDiff < closestDiff ? point : closest;
          }, data[0]);

          setCurrentTemperature(closestDataPoint.temperature);
        },
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

  const todayDate = format(new Date(), 'eeee, MMMM do, yyyy');

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
            {currentTemperature !== null && (
              <SummaryCard
                city={city}
                country={country}
                currentTemperature={currentTemperature}
                date={todayDate}
              />
            )}
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
