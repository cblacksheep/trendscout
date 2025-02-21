import { useState, useEffect } from "react";
import { YouTubeVideo } from "../types/youtubeTrends";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function useYouTubeTrends(region: string) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/youtube-trends?region=${region}`
        );
        const data = await response.json();
        setVideos(data.videos);
      } catch (error) {
        console.error("Erro ao buscar YouTube Trends:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrends();
  }, [region]);

  return { videos, loading };
}
