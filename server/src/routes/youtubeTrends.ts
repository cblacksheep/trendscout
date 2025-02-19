import express, { Request, Response } from "express";
import axios from "axios";
import { YouTubeVideo, YouTubeTrendsResponse, RawYouTubeVideo } from "../types";

const router = express.Router();

// 🔍 Função para buscar tendências do YouTube
async function fetchYouTubeTrends(
  regionCode: string = "US",
  maxResults: number = 30
): Promise<YouTubeVideo[]> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) throw new Error("API Key do YouTube não configurada.");

    const url = "https://www.googleapis.com/youtube/v3/videos";
    const response = await axios.get(url, {
      params: {
        part: "snippet,statistics",
        chart: "mostPopular",
        regionCode,
        maxResults,
        key: apiKey,
      },
    });

    return response.data.items.map(
      (video: RawYouTubeVideo): YouTubeVideo => ({
        title: video.snippet.title,
        videoId: video.id,
        description: video.snippet.description,
        views: video.statistics?.viewCount || "0",
        likes: video.statistics?.likeCount || "0",
        comments: video.statistics?.commentCount || "0",
        channel: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        thumbnailUrl: video.snippet.thumbnails.high.url,
        videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
      })
    );
  } catch (error) {
    console.error("Erro ao buscar tendências do YouTube:", error);
    throw new Error("Erro ao buscar tendências do YouTube.");
  }
}

// 📌 Rota para obter tendências do YouTube
router.get("/", async (req: Request, res: Response) => {
  try {
    const { region = "US", maxResults = "25" } = req.query;
    const videos = await fetchYouTubeTrends(
      region as string,
      Number(maxResults)
    );

    const response: YouTubeTrendsResponse = {
      date: new Date().toISOString().split("T")[0],
      region: region as string,
      videos,
    };

    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao processar os dados do YouTube Trends." });
  }
});

export default router; // 🔹 Garante que estamos exportando corretamente
