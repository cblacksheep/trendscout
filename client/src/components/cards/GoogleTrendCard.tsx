import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getPopularityLevel } from "../../utils/popularityMeter";
import { formatGoogleDate } from "../../utils/formatDate";

export interface GoogleTrendProps {
  title: string;
  traffic: string;
  exploreLink: string;
  relatedQueries: { query: string; exploreLink: string }[];
  image?: { imageUrl?: string; newsUrl?: string; source?: string };
  articles: {
    title: string;
    timeAgo: string;
    source: string;
    url: string;
    snippet?: string;
  }[];
  date: string;
}

const GoogleTrendCard: React.FC<{ trend: GoogleTrendProps }> = ({ trend }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="transition-all rounded-2xl p-4 flex flex-col shadow-md bg-[var(--card-bg)] border border-[var(--card-border)]"
      whileHover={{
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
        opacity: 0.95,
      }}
    >
      {/* 🔥 Cabeçalho do Card */}
      <div className="flex items-center gap-3">
        {trend.image?.imageUrl && (
          <Image
            src={trend.image.imageUrl}
            alt={trend.title}
            width={100}
            height={100}
            style={{ width: "auto", height: "auto" }}
            className="rounded-lg object-cover"
          />
        )}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:underline">
            <a
              href={trend.image?.newsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {trend.title}
            </a>
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm">
            📅 {formatGoogleDate(trend.date)} (
            {trend.articles[0]?.timeAgo || "Desconhecido"})
          </p>
        </div>
      </div>

      {/* 📊 Número de buscas + Termômetro */}
      <div className="mt-2 flex justify-between items-center text-gray-700 dark:text-gray-300">
        <p>🔥 {trend.traffic} buscas</p>
        <p className="text-sm">
          {getPopularityLevel(Number(trend.traffic), trend.date)}
        </p>
      </div>

      {/* 🔗 Botões */}
      <div className="mt-3 flex gap-2">
        <a
          href={trend.exploreLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 transition-all"
        >
          🔗 Fonte
        </a>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 text-center text-sm text-white bg-gray-600 hover:bg-gray-700 rounded-lg py-2 transition-all"
        >
          📑 {expanded ? "Ocultar" : "Leia Mais"}
        </button>
      </div>

      {/* 📌 Insights de IA (Sempre Visível) */}
      <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200">
        🤖 <strong>Insight de IA:</strong> &ldquo;A IA está analisando esta
        tendência. Em breve, você verá um resumo inteligente aqui!&rdquo;
      </div>

      {/* 📌 Expansão do Card com AnimatePresence */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="expand-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative overflow-hidden mt-4 space-y-4"
          >
            {/* 🔍 Consultas Relacionadas */}
            {trend.relatedQueries.length > 0 && (
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <p className="text-sm font-semibold">
                  🎯 Consultas Relacionadas:
                </p>
                <ul className="text-sm">
                  {trend.relatedQueries.map((query, index) => (
                    <li key={index} className="mt-1">
                      <a
                        href={query.exploreLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {query.query}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 📰 Notícias Relacionadas */}
            {trend.articles.length > 0 && (
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <p className="text-sm font-semibold">
                  📰 Notícias Relacionadas:
                </p>
                <ul className="text-sm">
                  {trend.articles.map((article, index) => (
                    <li key={index} className="mt-3">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {article.title}
                      </a>
                      <p className="text-xs text-gray-500">
                        {article.timeAgo} • {article.source}
                      </p>
                      {article.snippet && (
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {article.snippet}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GoogleTrendCard;
