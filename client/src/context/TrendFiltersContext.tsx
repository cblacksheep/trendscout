"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// 🔹 Chave do Local Storage
const LOCAL_STORAGE_KEY = "trendFilters";

interface TrendFilters {
  source: string;
  region: string;
  popularity: string;
  time: string;
  setFilters: (filters: Partial<TrendFilters>) => void;
}

const TrendFiltersContext = createContext<TrendFilters | undefined>(undefined);

export const TrendFiltersProvider = ({ children }: { children: ReactNode }) => {
  // 🔹 Estado inicial padrão
  const defaultFilters: TrendFilters = {
    source: "google",
    region: "US",
    popularity: "popular",
    time: "latest",
    setFilters: () => {},
  };

  // 🔹 Estado dos filtros
  const [filters, setFilters] = useState<TrendFilters>(defaultFilters);

  // 🔹 Carregar do Local Storage ao montar
  useEffect(() => {
    const storedFilters = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedFilters) {
      try {
        setFilters((prev) => ({
          ...prev,
          ...JSON.parse(storedFilters),
        }));
      } catch (error) {
        console.error("Erro ao carregar filtros do Local Storage:", error);
      }
    }
  }, []);

  // 🔹 Atualiza o estado e salva no Local Storage
  const updateFilters = (newFilters: Partial<TrendFilters>) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, ...newFilters };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  };

  return (
    <TrendFiltersContext.Provider
      value={{ ...filters, setFilters: updateFilters }}
    >
      {children}
    </TrendFiltersContext.Provider>
  );
};

// 🔹 Hook para acessar os filtros
export const useTrendFilters = () => {
  const context = useContext(TrendFiltersContext);
  if (!context)
    throw new Error(
      "useTrendFilters deve estar dentro de um TrendFiltersProvider"
    );
  return context;
};
