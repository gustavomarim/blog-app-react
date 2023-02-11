function formatDate(date: Date): string {
  const newDate = date.toString();
  const [data, time] = newDate.split('T');
  const [year, month, day] = data.split('-');
  const [hour, minute] = time.split(':');

  return `${day}/${month}/${year} - ${hour}:${minute}`;
}

export default { formatDate };
