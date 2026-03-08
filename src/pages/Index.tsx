import { useState } from "react";
import { Search, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { NICHES, Niche } from "@/types/creator";
import { useCreators } from "@/hooks/useCreators";
import CreatorCard from "@/components/CreatorCard";
import CreatorDetail from "@/components/CreatorDetail";
import { Creator } from "@/types/creator";

const Index = () => {
  const {
    creators,
    searchQuery,
    setSearchQuery,
    selectedNiche,
    setSelectedNiche,
    toggleFavorite,
    isFavorite,
  } = useCreators();

  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const displayedCreators = showFavoritesOnly
    ? creators.filter((c) => isFavorite(c.id))
    : creators;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-primary px-4 pb-12 pt-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" />
              <h1 className="text-xl font-bold text-primary-foreground">CreatorHunter</h1>
            </div>
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                showFavoritesOnly
                  ? "bg-accent text-accent-foreground shadow-accent"
                  : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
              }`}
            >
              <Heart className={`h-4 w-4 ${showFavoritesOnly ? "fill-current" : ""}`} />
              Favoriler
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              İçerik Üreticilerini <span className="text-gradient-accent">Keşfet</span>
            </h2>
            <p className="text-primary-foreground/60 text-base mb-6">
              Markanız için en uygun influencer'ları bulun ve iletişime geçin.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="İsim, kullanıcı adı veya niş ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-card py-4 pl-12 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground shadow-card-hover outline-none ring-2 ring-transparent focus:ring-accent transition-all"
            />
          </motion.div>
        </div>
      </header>

      {/* Filter Chips */}
      <div className="mx-auto max-w-5xl px-4 -mt-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        >
          {NICHES.map((niche) => (
            <button
              key={niche}
              onClick={() => setSelectedNiche(niche as Niche)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedNiche === niche
                  ? "bg-accent text-accent-foreground shadow-accent"
                  : "bg-card text-card-foreground border border-border hover:border-accent/30"
              }`}
            >
              {niche}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Results */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{displayedCreators.length}</span> creator bulundu
          </p>
        </div>

        {displayedCreators.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <p className="text-lg font-medium text-foreground">Sonuç bulunamadı</p>
            <p className="text-sm text-muted-foreground mt-1">Arama kriterlerinizi değiştirmeyi deneyin.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedCreators.map((creator, i) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                isFavorite={isFavorite(creator.id)}
                onToggleFavorite={() => toggleFavorite(creator.id)}
                onSelect={() => setSelectedCreator(creator)}
                index={i}
              />
            ))}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedCreator && (
        <CreatorDetail creator={selectedCreator} onClose={() => setSelectedCreator(null)} />
      )}
    </div>
  );
};

export default Index;
