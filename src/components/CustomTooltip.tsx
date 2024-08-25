import React from 'react';
import { TooltipProps } from 'recharts';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import { Box, Typography } from '@mui/material';

export const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const temperature = payload[0].value;

    const IconComponent =
      temperature !== undefined && temperature > 25 ? WbSunnyIcon : CloudIcon;

    return (
      <Box
        sx={{
          backgroundColor: '#333',
          borderColor: '#666',
          padding: '10px',
          borderRadius: '4px',
          color: '#fff',
        }}
      >
        <Typography variant="body2" color="inherit">
          {label}
        </Typography>
        <Box display="flex" alignItems="center">
          <IconComponent sx={{ marginRight: 1 }} />
          <Typography variant="h6" color="inherit">
            {temperature}°C
          </Typography>
        </Box>
      </Box>
    );
  }

  return null;
};
