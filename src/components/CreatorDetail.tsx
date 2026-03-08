import { Creator } from "@/types/creator";
import { X, Mail, MessageCircle, MapPin, Users, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formatFollowers = (count: number) => {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`;
  return count.toString();
};

interface CreatorDetailProps {
  creator: Creator | null;
  onClose: () => void;
}

const CreatorDetail = ({ creator, onClose }: CreatorDetailProps) => {
  if (!creator) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg rounded-2xl bg-card border border-border shadow-card-hover overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-primary p-6 pb-16">
            <button onClick={onClose} className="absolute top-4 right-4 rounded-full p-1 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
              <MapPin className="h-4 w-4" />
              {creator.location}
            </div>
          </div>

          {/* Avatar */}
          <div className="relative -mt-12 px-6">
            <img
              src={creator.avatarUrl}
              alt={creator.name}
              className="h-24 w-24 rounded-2xl object-cover ring-4 ring-card shadow-card-hover"
            />
          </div>

          {/* Body */}
          <div className="p-6 pt-4">
            <h2 className="text-2xl font-bold text-card-foreground">{creator.name}</h2>
            <p className="text-muted-foreground">{creator.username}</p>
            <p className="mt-3 text-sm text-card-foreground/80 leading-relaxed">{creator.bio}</p>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-muted p-3 text-center">
                <Users className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-lg font-bold text-foreground">{formatFollowers(creator.followersCount)}</p>
                <p className="text-xs text-muted-foreground">Takipçi</p>
              </div>
              <div className="rounded-xl bg-muted p-3 text-center">
                <TrendingUp className="h-4 w-4 mx-auto text-success mb-1" />
                <p className="text-lg font-bold text-success">%{creator.engagementRate}</p>
                <p className="text-xs text-muted-foreground">Etkileşim</p>
              </div>
              <div className="rounded-xl bg-muted p-3 text-center">
                <span className="text-sm">📍</span>
                <p className="text-sm font-bold text-foreground mt-0.5">{creator.location}</p>
                <p className="text-xs text-muted-foreground">Konum</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex gap-3">
              <a
                href={`mailto:${creator.email}`}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-accent transition-all hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                E-posta Gönder
              </a>
              <a
                href={`https://wa.me/?text=Merhaba ${creator.name}!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-success px-4 py-3 text-sm font-semibold text-success-foreground transition-all hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreatorDetail;
