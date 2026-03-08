import { motion } from "framer-motion";
import { Users, BadgeCheck } from "lucide-react";
import { getAvatarFallback } from "@/lib/avatar";

interface Influencer {
  id: string;
  fullName: string;
  username: string;
  biography: string;
  followersCount: number;
  profilePicUrl: string;
  verified?: boolean;
  isBusinessAccount?: boolean;
}

const formatFollowers = (count: number) => {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
};

interface InfluencerCardProps {
  influencer: Influencer;
  onSelect: () => void;
  index: number;
}

const InfluencerCard = ({ influencer, onSelect, index }: InfluencerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.5) }}
      className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex items-start gap-4">
        <img
          src={influencer.profilePicUrl}
          alt={influencer.fullName}
          className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-border bg-muted"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = getAvatarFallback(influencer.fullName, influencer.username);
          }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-card-foreground truncate">
              {influencer.fullName || influencer.username}
            </h3>
            {influencer.verified && (
              <BadgeCheck className="h-4 w-4 text-accent shrink-0" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">@{influencer.username}</p>
        </div>
      </div>

      {influencer.biography && (
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {influencer.biography}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5">
          <Users className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-sm font-bold text-foreground">
            {formatFollowers(influencer.followersCount)}
          </span>
        </div>
      </div>

      <div className="mt-3 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        Detayları gör →
      </div>
    </motion.div>
  );
};

export default InfluencerCard;
