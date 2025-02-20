"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTrendFilters } from "@/context/TrendFiltersContext";
import { useGoogleTrends } from "@/hooks/useGoogleTrends";
import { useYouTubeTrends } from "@/hooks/useYouTubeTrends";
import GoogleTrendCard from "../cards/GoogleTrendCard";
import YouTubeTrendCard from "../cards/YouTubeTrendCard";
import { sortTrends } from "@/utils/sortingHelpers";
import { GoogleTrendProps } from "@/components/cards/GoogleTrendCard";
import { YouTubeVideoProps } from "@/components/cards/YouTubeTrendCard";

const Trends = () => {
  const { source, region, popularity, time } = useTrendFilters();

  // 🔹 Chama ambos os hooks SEMPRE
  const googleTrendsData = useGoogleTrends(region);
  const youtubeTrendsData = useYouTubeTrends(region);

  // 🔹 Define os dados corretos baseados na fonte escolhida
  const rawTrends =
    source === "google" ? googleTrendsData.trends : youtubeTrendsData.videos;
  const loading =
    source === "google" ? googleTrendsData.loading : youtubeTrendsData.loading;

  // 🔹 Aplica a ordenação corretamente
  const sortedTrends = sortTrends(rawTrends, source, popularity, time);

  const [dots, setDots] = useState("");
  const [visibleTrends, setVisibleTrends] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLoadMore = () => {
    if (visibleTrends < sortedTrends.length) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleTrends((prev) => prev + 3);
        setIsLoadingMore(false);
      }, 1000);
    }
  };

  return (
    <div className="mt-4">
      {/* Área de Tendências */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-lg shadow-md transition-colors duration-300 auto-rows-min items-start"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        {loading ? (
          <p className="text-lg font-medium flex items-center">
            Carregando tendências
            <motion.span
              className="w-5 inline-block"
              initial={{ opacity: 1 }}
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              {dots}
            </motion.span>
          </p>
        ) : (
          sortedTrends.slice(0, visibleTrends).map((trend, index) =>
            source === "google" ? (
              <GoogleTrendCard key={index} trend={trend as GoogleTrendProps} />
            ) : (
              <YouTubeTrendCard
                key={index}
                video={
                  {
                    ...trend,
                    views: String((trend as { views: number }).views),
                    likes: String((trend as { likes: number }).likes),
                    comments: String((trend as { comments: number }).comments),
                  } as YouTubeVideoProps
                }
              />
            )
          )
        )}
      </div>

      {/* Botão Carregar Mais */}
      {!loading && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            disabled={visibleTrends >= sortedTrends.length}
            className={`px-6 py-2 font-semibold rounded-lg transition ${
              visibleTrends >= sortedTrends.length
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isLoadingMore ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block w-5 h-5 border-4 border-white border-t-transparent rounded-full"
              />
            ) : visibleTrends >= sortedTrends.length ? (
              "Isso é tudo, pessoal!"
            ) : (
              "Carregar Mais"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Trends;
