import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { convertTo24HourFormat } from '../utils/date-time-formatter';
import { CustomTooltip } from './CustomTooltip';

interface WeatherChartProps {
  data?: { time: string; temperature: number }[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data = [] }) => {
  const formattedData = data.map(({ time, temperature }) => ({
    time: convertTo24HourFormat(time),
    temperature,
  }));

  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart
        data={formattedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis
          tickFormatter={(value: number) => `${value}°C`}
          padding={{ bottom: 10 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="temperature" stroke="#FFA500" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;
