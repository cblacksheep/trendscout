"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LuSlidersVertical,
  LuTrendingUp,
  LuTrendingDown,
  LuClock3,
  LuClock,
} from "react-icons/lu";
import { FaGoogle, FaYoutube } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { useTrendFilters } from "@/context/TrendFiltersContext";

const Filters = () => {
  const { source, region, popularity, time, setFilters } = useTrendFilters();
  const [showFilters, setShowFilters] = useState(false);
  const [bounce, setBounce] = useState(false);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ region: e.target.value });
    setBounce(true);
    setTimeout(() => setBounce(false), 500); // Reseta a animação após o efeito
  };

  return (
    <div className="w-full">
      {/* Botão de Mostrar Filtros */}
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition"
        style={{
          backgroundColor: "var(--card-bg)",
          color: "var(--text-color)",
        }}
        onClick={() => setShowFilters(!showFilters)}
      >
        <LuSlidersVertical size={18} />
        Filtros
      </button>

      {/* Painel de Filtros com animação fluída */}
      <motion.div
        layout
        className={`p-4 rounded-lg shadow-md mt-2 transition-all ${
          showFilters ? "opacity-100 visible" : "opacity-0 h-0 overflow-hidden"
        }`}
        style={{
          backgroundColor: "var(--card-bg)",
          color: "var(--text-color)",
          borderColor: "var(--card-border)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {showFilters && (
          <motion.div
            layout="position"
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {/* 📌 Filtro de Trends */}
            <div>
              <label className="font-semibold flex items-center gap-2">
                <motion.span
                  key={source}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {source === "google" ? (
                    <FaGoogle size={18} className="text-red-500" />
                  ) : (
                    <FaYoutube size={18} className="text-red-600" />
                  )}
                </motion.span>
                Fonte de Dados
              </label>
              <select
                className="p-2 border rounded w-full cursor-pointer transition-colors"
                style={{
                  backgroundColor: "var(--card-bg)",
                  color: "var(--text-color)",
                  borderColor: "var(--card-border)",
                }}
                value={source}
                onChange={(e) => setFilters({ source: e.target.value })}
              >
                <option value="google">Google Trends</option>
                <option value="youtube">YouTube Trends</option>
              </select>
            </div>

            {/* 📌 Filtro de Popularidade */}
            <div>
              <label className="font-semibold flex items-center gap-2">
                <motion.span
                  key={popularity}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {popularity === "popular" ? (
                    <LuTrendingUp size={18} className="text-green-500" />
                  ) : (
                    <LuTrendingDown size={18} className="text-red-500" />
                  )}
                </motion.span>
                Popularidade
              </label>
              <select
                className="p-2 border rounded w-full cursor-pointer transition-colors"
                style={{
                  backgroundColor: "var(--card-bg)",
                  color: "var(--text-color)",
                  borderColor: "var(--card-border)",
                }}
                value={popularity}
                onChange={(e) => setFilters({ popularity: e.target.value })}
              >
                <option value="popular">Mais Popular</option>
                <option value="unpopular">Menos Popular</option>
              </select>
            </div>

            {/* 📌 Filtro de Tempo */}
            <div>
              <label className="font-semibold flex items-center gap-2">
                <motion.span
                  key={time}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {time === "latest" ? (
                    <LuClock3 size={18} className="text-blue-500" />
                  ) : (
                    <LuClock size={18} className="text-gray-500" />
                  )}
                </motion.span>
                Tempo
              </label>
              <select
                className="p-2 border rounded w-full cursor-pointer transition-colors"
                style={{
                  backgroundColor: "var(--card-bg)",
                  color: "var(--text-color)",
                  borderColor: "var(--card-border)",
                }}
                value={time}
                onChange={(e) => setFilters({ time: e.target.value })}
              >
                <option value="latest">Mais Atual</option>
                <option value="oldest">Menos Atual</option>
              </select>
            </div>

            {/* 📌 Filtro de Região (Com Bounce no Ícone) */}
            <div>
              <label className="font-semibold flex items-center gap-2">
                <motion.span
                  key={region}
                  animate={bounce ? { y: [-2, 2, -2, 0] } : {}}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <FaMapLocationDot size={18} className="text-purple-500" />
                </motion.span>
                Região
              </label>
              <select
                className="p-2 border rounded w-full cursor-pointer transition-colors"
                style={{
                  backgroundColor: "var(--card-bg)",
                  color: "var(--text-color)",
                  borderColor: "var(--card-border)",
                }}
                value={region}
                onChange={handleRegionChange}
              >
                <option value="US">Estados Unidos</option>
                <option value="BR">Brasil</option>
                <option value="IN">Índia</option>
                <option value="GB">Reino Unido</option>
                <option value="DE">Alemanha</option>
                <option value="JP">Japão</option>
                <option value="KR">Coreia do Sul</option>
                <option value="FR">França</option>
                <option value="MX">México</option>
                <option value="CA">Canadá</option>
              </select>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Filters;
