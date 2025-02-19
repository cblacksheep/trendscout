import express from "express";
import axios from "axios";
import { GoogleTrend, GoogleTrendsResponse, RawGoogleTrend } from "../types";

const router = express.Router();

// 🔍 Busca os dados do Google Trends
async function fetchGoogleTrends(geo: string = "US"): Promise<GoogleTrend[]> {
  try {
    const url = `https://trends.google.com/trends/api/dailytrends?geo=${geo}`;
    const response = await axios.get(url);
    const rawData = JSON.parse(response.data.substring(5)); // Remove caracteres estranhos
    const trendsData = rawData.default.trendingSearchesDays || [];

    return formatGoogleTrendsData(trendsData);
  } catch (error) {
    console.error("Erro ao buscar tendências:", error);
    throw new Error("Erro ao buscar tendências do Google Trends.");
  }
}

// 🔄 Função para formatar a data de `YYYYMMDD` → `DD/MM/YYYY`
function formatDate(isoDate: string): string {
  if (!isoDate || isoDate.length !== 8) return "Data desconhecida";

  const year = isoDate.substring(0, 4);
  const month = isoDate.substring(4, 6);
  const day = isoDate.substring(6, 8);

  return `${day}/${month}/${year}`; // 🔹 Retorna no formato `DD/MM/YYYY`
}

// 🔄 Formata os dados recebidos da API
function formatGoogleTrendsData(trendingSearchesDays: any[]): GoogleTrend[] {
  return trendingSearchesDays.flatMap((day: any) =>
    day.trendingSearches.map(
      (trend: RawGoogleTrend): GoogleTrend => ({
        title: trend.title.query,
        traffic: trend.formattedTraffic.replace("+", "").replace("K", "000"),
        exploreLink: `https://trends.google.com${trend.title.exploreLink}`,
        relatedQueries: trend.relatedQueries || [],
        image: trend.image,
        articles: trend.articles || [],
        shareUrl: trend.shareUrl || "",
        date: formatDate(day.date), // ✅ Formata a data corretamente antes de enviar ao frontend
      })
    )
  );
}

// 📌 Rota que retorna as tendências
router.get("/", async (req, res) => {
  try {
    const { geo = "US" } = req.query;
    const trends = await fetchGoogleTrends(geo as string);

    const response: GoogleTrendsResponse = {
      date: new Date().toISOString().split("T")[0],
      formattedDate: new Date().toLocaleDateString("pt-BR"),
      trends,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar os dados" });
  }
});

export default router;
