export const prettifyDate = (date: string | Date) => {
  // Returns Month, Day, Year | Hour:Minute AM/PM
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  const hours = newDate.getHours();
  let minutes: string | number = newDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  const ampm = hours >= 12 ? "pm" : "am";
  return `${month}/${day}/${year} | ${hours}:${minutes} ${ampm}`;
};
