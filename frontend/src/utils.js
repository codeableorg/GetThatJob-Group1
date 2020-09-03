function getLocalDate(dateString) {
  return new Date(dateString + 'Z');
}

function getTimeSince(date) {
  const seconds = Math.round((new Date() - date) / 1000);
  const days = Math.floor(seconds / (60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export { getLocalDate, getTimeSince };
