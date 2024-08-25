import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

interface SummaryCardProps {
  city: string;
  country: string;
  currentTemperature: number;
  date: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ city, country, currentTemperature, date }) => {
  return (
    <Card sx={{ marginTop: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {city}, {country}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {date}
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
