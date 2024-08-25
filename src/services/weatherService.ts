import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const fetchWeatherData = async (
  cityName: string,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setWeatherData: (data: any) => void,
  setCity: (city: string) => void,
  setCountry: (country: string) => void,
  navigate: (path: string, options?: { replace?: boolean }) => void
) => {
  setLoading(true);
  setError(null);

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City "${cityName}" not found.`);
    }

    const { latitude, longitude } = geoData.results[0];

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`
    );
    const weatherData = await weatherResponse.json();

    const timezone = "Europe/Bucharest";

    const formattedData = weatherData.hourly.time.map(
      (time: string, index: number) => {
        const utcDate = parseISO(time);
        const zonedDate = toZonedTime(utcDate, timezone);
        const formattedTime = format(zonedDate, "HH:mm");
        return {
          time: formattedTime,
          temperature: weatherData.hourly.temperature_2m[index],
        };
      }
    );

    setWeatherData(formattedData);
    setCity(geoData.results[0].name);
    setCountry(geoData.results[0].country);

    navigate(`/${geoData.results[0].name}`, { replace: true });
  } catch (err) {
    setError((err as Error).message);
  } finally {
    setLoading(false);
  }
};
