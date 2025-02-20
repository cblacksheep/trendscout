import { useState, useEffect } from "react";
import { GoogleTrendProps } from "../components/cards/GoogleTrendCard";

export function useGoogleTrends(geo: string) {
  const [trends, setTrends] = useState<GoogleTrendProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/google-trends?geo=${geo}`
        );
        const data = await response.json();
        setTrends(data.trends);
      } catch (error) {
        console.error("Erro ao buscar Google Trends:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrends();
  }, [geo]);

  return { trends, loading };
}
