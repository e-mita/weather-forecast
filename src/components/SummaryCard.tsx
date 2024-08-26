import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

interface SummaryCardProps {
  city: string;
  country: string;
  currentTemperature: number;
  date: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ city, country, currentTemperature, date }) => {
  const [romaniaTime, setRomaniaTime] = useState<string>(() => {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Europe/Bucharest',
    }).format(new Date());
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRomaniaTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Europe/Bucharest',
        }).format(new Date())
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card
      sx={{
        marginTop: 3,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: 'background.paper',
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {city}, {country}
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ fontSize: '1.1rem' }}
        >
          {date}
        </Typography>
        <Typography
          color="textSecondary"
          sx={{ fontSize: '1.1rem' }}
          mt={1}
        >
          Current Time: {romaniaTime}
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <WbSunnyIcon sx={{ marginRight: 1 }} />
          <Typography variant="h4">{currentTemperature}°C</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
