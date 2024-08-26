import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { convertTo24HourFormat } from '../utils/date-time-formatter';
import { CustomTooltip } from './CustomTooltip';
import { Box } from '@mui/material';

interface WeatherChartProps {
  data?: { time: string; temperature: number }[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data = [] }) => {
  const formattedData = data.map(({ time, temperature }) => ({
    time: convertTo24HourFormat(time),
    temperature,
  }));

  return (
    <Box
      sx={{
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        paddingTop: '20px'
      }}
    >
      <ResponsiveContainer width="95%" height={400}>
        <LineChart
          data={formattedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="2" stdDeviation="4" floodColor="#aaa" />
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis
            tickFormatter={(value: number) => `${value}°C`}
            padding={{ bottom: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#FFA500"
            strokeWidth={3}
            filter="url(#shadow)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WeatherChart;
