function formatDate(date: Date) {
  const dataString = new Date(date)

  return new Intl.DateTimeFormat('pt-BR', {
      timeStyle: 'short',
      dateStyle: 'short'
    }).format(dataString)
}

export default { formatDate };
