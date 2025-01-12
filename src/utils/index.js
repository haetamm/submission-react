const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

const isActive = (currentPrefix, targetPrefix) => {
  return currentPrefix === targetPrefix;
};

export { showFormattedDate, isActive };
