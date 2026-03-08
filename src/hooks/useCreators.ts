import { useState, useMemo, useCallback } from "react";
import { Creator, Niche } from "@/types/creator";
import { mockCreators } from "@/data/mockCreators";

export function useCreators() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState<Niche>("Hepsi");
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("creator-favorites") || "[]");
    } catch {
      return [];
    }
  });

  const filteredCreators = useMemo(() => {
    return mockCreators.filter((c) => {
      const matchesSearch =
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.niche.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesNiche = selectedNiche === "Hepsi" || c.niche === selectedNiche;
      return matchesSearch && matchesNiche;
    });
  }, [searchQuery, selectedNiche]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem("creator-favorites", JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return {
    creators: filteredCreators,
    searchQuery,
    setSearchQuery,
    selectedNiche,
    setSelectedNiche,
    toggleFavorite,
    isFavorite,
  };
}
