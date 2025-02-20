import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { formatYouTubeDate } from "../../utils/formatDate";

export interface YouTubeVideoProps {
  title: string;
  videoId: string;
  description: string;
  views: string;
  likes: string;
  comments: string;
  channel: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const YouTubeTrendCard: React.FC<{ video: YouTubeVideoProps }> = ({
  video,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="transition-all rounded-2xl p-4 flex flex-col shadow-md bg-black border border-red-600"
      whileHover={{
        boxShadow: "0px 4px 15px rgba(255, 0, 0, 0.4)",
        opacity: 0.95,
      }}
    >
      {/* 🎥 Cabeçalho do Card */}
      <div className="flex flex-col">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          width={320}
          height={180}
          className="rounded-lg object-cover w-full"
        />
        <h3 className="text-xl font-bold text-white text-left mt-2 hover:underline">
          <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
            {video.title}
          </a>
        </h3>
      </div>

      {/* 📊 Informações do Vídeo */}
      <div className="mt-2 flex justify-between items-center text-gray-300">
        <p>👀 {video.views} views</p>
        <p className="text-sm">
          📅 {formatYouTubeDate(video.publishedAt, true)}
        </p>
      </div>

      {/* 🎭 Canal, Likes e Comentários */}
      <div className="mt-2 flex flex-col text-gray-300">
        <p>
          📢 Canal:{" "}
          <span className="text-white font-semibold">{video.channel}</span>
        </p>
        <div className="flex gap-4 mt-1">
          <p>👍 {video.likes} likes</p>
          <p>💬 {video.comments} comentários</p>
        </div>
      </div>

      {/* 📌 Placeholder para Insights de IA */}
      <div className="mt-3 p-3 bg-gray-800 rounded-lg text-gray-300">
        🤖 <strong>Insight de IA:</strong> &ldquo;Em breve, um resumo
        inteligente estará disponível aqui!&rdquo;
      </div>

      {/* 🔗 Botões */}
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 text-center text-sm text-white bg-gray-700 hover:bg-gray-800 rounded-lg py-2 transition-all"
        >
          📑 {expanded ? "Ocultar" : "Leia Mais"}
        </button>
        <a
          href={video.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg py-2 transition-all"
        >
          🔗 Assistir no YouTube
        </a>
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
            className="relative overflow-hidden mt-4 p-3 bg-gray-900 rounded-lg text-gray-300"
          >
            {/* 📝 Descrição do Vídeo */}
            <p className="text-sm">{video.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default YouTubeTrendCard;
