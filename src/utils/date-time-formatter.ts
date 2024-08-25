export const convertTo24HourFormat = (time: string): string => {
  const [hour, modifier] = time.split(" ");
  let [hours, minutes] = hour.split(":");

  if (hours === "12") {
    hours = modifier === "AM" ? "00" : "12";
  } else {
    hours = modifier === "PM" ? String(parseInt(hours, 10) + 12) : hours;
  }

  return `${hours}:${minutes}`;
};
