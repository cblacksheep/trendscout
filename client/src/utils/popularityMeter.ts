export function getPopularityLevel(
  traffic: number,
  dateString: string
): string {
  const trendDate = new Date(dateString);
  const today = new Date();
  const diffDays = Math.floor(
    (today.getTime() - trendDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 1 && traffic > 1000000) return "🔥🔥🔥🔥🔥 Super tendência!";
  if (diffDays <= 2 && traffic > 750000) return "🔥🔥🔥🔥 Esquentando rápido!";
  if (diffDays <= 5 && traffic > 300000) return "🔥🔥🔥 Crescendo!";
  if (diffDays <= 7 && traffic > 100000) return "⚖️ Tendência estável!";
  if (diffDays > 7 && traffic < 50000) return "❄️❄️ Tendência esfriando!";
  if (diffDays > 14 && traffic < 20000) return "❄️❄️❄️ Quase irrelevante!";

  return "⚖️ Tendência normal.";
}
