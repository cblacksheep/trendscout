import { useState, useEffect } from "react";
import { YouTubeVideo } from "../types/youtubeTrends";

export function useYouTubeTrends(region: string) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/youtube-trends?region=${region}`
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
