import { GoogleTrend, RawGoogleTrend } from "../types/googleTrends";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchGoogleTrends(geo = "US"): Promise<GoogleTrend[]> {
  const response = await fetch(`${API_BASE_URL}/api/google-trends?geo=${geo}`);
  const data = await response.json();

  console.log("🔍 Dados crus da API:", data);

  return data.trends.map((trend: RawGoogleTrend) => {
    console.log("🔍 Trend antes da formatação:", trend); // Verificar se newsUrl e shareUrl estão presentes

    return {
      title: trend.title.query,
      traffic: Number(
        trend.formattedTraffic.replace("+", "").replace("K", "000")
      ),
      exploreLink: `https://trends.google.com${trend.title.exploreLink}`,
      relatedQueries: trend.relatedQueries || [],
      imageUrl: trend.image?.imageUrl,
      newsUrl: trend.image?.newsUrl,
      articles: trend.articles || [],
      shareUrl: trend.shareUrl || "",
    };
  });
}
