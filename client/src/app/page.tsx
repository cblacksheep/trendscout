"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Filters from "@/components/ui/Filters";
import ToggleButton from "@/components/ui/ToggleButton";
import Trends from "@/components/ui/Trends";
import { TrendFiltersProvider } from "@/context/TrendFiltersContext";

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <TrendFiltersProvider>
      <div
        className="container mx-auto px-4 py-6 transition-colors"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }}
      >
        {/* Header Principal (Fixo, sem animação) */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">🔥 Trending Now</h1>
          <ToggleButton />
        </div>

        {/* Layout dinâmico para evitar "amassar" */}
        <motion.div layout transition={{ duration: 0.3, ease: "easeInOut" }}>
          {/* Botão de Filtros */}
          <div onClick={() => setShowFilters(!showFilters)}>
            <Filters />
          </div>

          {/* Componente de Tendências com layout estável */}
          <motion.div layout className="mt-4">
            <Trends />
          </motion.div>
        </motion.div>
      </div>
    </TrendFiltersProvider>
  );
}
