export const changeDateFormat = (data) => {
  const date = new Date(data);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0"); // Получаем часы
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Получаем минуты

  const formatTime = `${hours}:${minutes}`;
  const formatDate = `${day}.${month} ${formatTime}`;
  return formatDate;
};
