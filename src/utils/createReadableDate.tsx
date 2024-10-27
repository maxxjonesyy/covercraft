function createReadableDate(dateToConvert: Date | string) {
  const date = new Date(dateToConvert);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  let hours: number = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Ensure two digits
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Ensure two digits

  // Convert to 12-hour format
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12; // Convert to 12-hour format
  hours = hours ? hours : 12; // Handle midnight case; keep hours as number
  const formattedHours = String(hours).padStart(2, "0"); // Convert to string for formatting

  return `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
}

export default createReadableDate;
