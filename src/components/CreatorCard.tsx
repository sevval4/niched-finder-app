import { Creator } from "@/types/creator";
import { Heart, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const formatFollowers = (count: number) => {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`;
  return count.toString();
};

const platformColors: Record<string, string> = {
  instagram: "bg-accent/10 text-accent",
  tiktok: "bg-primary/10 text-primary",
  youtube: "bg-destructive/10 text-destructive",
};

interface CreatorCardProps {
  creator: Creator;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelect: () => void;
  index: number;
}

const CreatorCard = ({ creator, isFavorite, onToggleFavorite, onSelect, index }: CreatorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer"
      onClick={onSelect}
    >
      {/* Favorite button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="absolute top-4 right-4 z-10 rounded-full p-1.5 transition-colors hover:bg-muted"
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            isFavorite ? "fill-accent text-accent" : "text-muted-foreground"
          }`}
        />
      </button>

      {/* Avatar & Info */}
      <div className="flex items-start gap-4">
        <img
          src={creator.avatarUrl}
          alt={creator.name}
          className="h-14 w-14 rounded-full object-cover ring-2 ring-border"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-card-foreground truncate">{creator.name}</h3>
          <p className="text-sm text-muted-foreground">{creator.username}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 flex items-center gap-3">
        <div className="rounded-lg bg-muted px-3 py-1.5">
          <span className="text-xs font-medium text-muted-foreground">Takipçi</span>
          <p className="text-sm font-bold text-foreground">{formatFollowers(creator.followersCount)}</p>
        </div>
        <div className="rounded-lg bg-muted px-3 py-1.5">
          <span className="text-xs font-medium text-muted-foreground">Etkileşim</span>
          <p className="text-sm font-bold text-success">%{creator.engagementRate}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${platformColors[creator.platform]}`}>
          {creator.platform}
        </span>
        <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
          {creator.niche}
        </span>
      </div>

      {/* Hover CTA */}
      <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink className="h-3 w-3" />
        Detayları gör
      </div>
    </motion.div>
  );
};

export default CreatorCard;
