import { GoogleTrendProps } from "@/components/cards/GoogleTrendCard";
import { YouTubeVideo } from "@/types/youtubeTrends";

type TrendType = GoogleTrendProps | YouTubeVideo;

// 🔹 Extrai número e converte "48m ago" para um valor comparável
const parseTimeAgo = (timeAgo: string): number => {
  const match = timeAgo.match(/(\d+)([mhd])/); // Captura número + unidade (m = minutos, h = horas, d = dias)

  if (!match) return Infinity; // Se a string não for válida, retorna um número muito grande (menos prioridade)

  const value = parseInt(match[1], 10);
  const unit = match[2];

  if (unit === "m") return value; // Minutos (mantém o valor)
  if (unit === "h") return value * 60; // Horas para minutos
  if (unit === "d") return value * 1440; // Dias para minutos (1 dia = 1440 min)

  return Infinity; // Se houver algum erro, assume que é "antigo"
};

// 🔹 Retorna um índice numérico baseado no tempo
const getTimeValue = (item: TrendType, source: string): number => {
  if (source === "google") {
    if ("articles" in item && item.articles?.length > 0) {
      return parseTimeAgo(item.articles[0]?.timeAgo || "0m");
    }
    return Infinity; // Sem tempo disponível? Assumimos que é "antigo"
  } else {
    return "publishedAt" in item
      ? new Date(item.publishedAt).getTime()
      : Infinity;
  }
};

// 🔹 Ordenação principal
export const sortTrends = (
  trends: TrendType[],
  source: string,
  popularity: string,
  time: string
): TrendType[] => {
  return [...trends].sort((a, b) => {
    // 🔹 Define a popularidade corretamente
    const getPopularity = (item: TrendType): number => {
      if ("traffic" in item) return Number(item.traffic) || 0;
      if ("views" in item) return Number(item.views) || 0;
      return 0;
    };

    const popularityA = getPopularity(a);
    const popularityB = getPopularity(b);

    // 🔹 Define o tempo corretamente
    const timeA = getTimeValue(a, source);
    const timeB = getTimeValue(b, source);

    // 🔹 Ordenação por Popularidade
    if (popularity === "popular") return popularityB - popularityA;
    if (popularity === "unpopular") return popularityA - popularityB;

    // 🔹 Ordenação por Tempo
    if (time === "latest") return timeA - timeB; // Menor número = mais recente
    return timeB - timeA; // Maior número = mais antigo
  });
};
