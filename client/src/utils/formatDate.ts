// 🔹 Formata datas do Google Trends (YYYYMMDD)
export function formatGoogleDate(isoDate?: string): string {
  if (!isoDate || isoDate.length !== 8) return isoDate || "Data desconhecida";

  const year = isoDate.substring(0, 4);
  const month = isoDate.substring(4, 6);
  const day = isoDate.substring(6, 8);

  return `${day}/${month}/${year}`;
}

// 🔹 Formata datas do YouTube (ISO 8601: YYYY-MM-DDTHH:MM:SSZ)
export function formatYouTubeDate(
  isoDate?: string,
  showTime: boolean = false
): string {
  if (!isoDate) return "Data desconhecida";

  const dateObj = new Date(isoDate);

  const formattedDate = dateObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  if (showTime) {
    const formattedTime = dateObj.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Formato 24 horas
    });

    return `${formattedDate} às ${formattedTime}`;
  }

  return formattedDate;
}
