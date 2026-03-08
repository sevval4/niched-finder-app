import { Influencer } from "@/hooks/useInfluencers";
import { X, Users, UserPlus, Grid3X3, ExternalLink, BadgeCheck, Briefcase, Globe } from "lucide-react";
import { getAvatarFallback } from "@/lib/avatar";
import { motion, AnimatePresence } from "framer-motion";

const formatCount = (count: number) => {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
};

interface InfluencerDetailProps {
  influencer: Influencer | null;
  onClose: () => void;
}

const InfluencerDetail = ({ influencer, onClose }: InfluencerDetailProps) => {
  if (!influencer) return null;

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
          className="relative w-full max-w-lg max-h-[90vh] rounded-2xl bg-card border border-border shadow-card-hover overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-primary p-6 pb-16">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-1.5 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {influencer.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Doğrulanmış
                </span>
              )}
              {influencer.isBusinessAccount && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary-foreground/10 px-2.5 py-0.5 text-xs font-medium text-primary-foreground/70">
                  <Briefcase className="h-3.5 w-3.5" />
                  İş Hesabı
                </span>
              )}
            </div>
          </div>

          {/* Avatar */}
          <div className="relative -mt-12 px-6">
            <img
              src={influencer.profilePicUrlHD}
              alt={influencer.fullName}
              className="h-24 w-24 rounded-2xl object-cover ring-4 ring-card shadow-card-hover bg-muted"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getAvatarFallback(influencer.fullName, influencer.username);
              }}
            />
          </div>

          {/* Body */}
          <div className="p-6 pt-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-card-foreground">
                {influencer.fullName || influencer.username}
              </h2>
              {influencer.verified && (
                <BadgeCheck className="h-5 w-5 text-accent shrink-0" />
              )}
            </div>
            <p className="text-muted-foreground">@{influencer.username}</p>

            {influencer.biography && (
              <p className="mt-3 text-sm text-card-foreground/80 leading-relaxed whitespace-pre-line">
                {influencer.biography}
              </p>
            )}

            {influencer.businessCategoryName && (
              <p className="mt-2 text-xs text-muted-foreground">
                Kategori: <span className="font-medium text-foreground">{influencer.businessCategoryName}</span>
              </p>
            )}

            {/* Stats */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-muted p-3 text-center">
                <Users className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-lg font-bold text-foreground">{formatCount(influencer.followersCount)}</p>
                <p className="text-xs text-muted-foreground">Takipçi</p>
              </div>
              <div className="rounded-xl bg-muted p-3 text-center">
                <UserPlus className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-lg font-bold text-foreground">{formatCount(influencer.followsCount)}</p>
                <p className="text-xs text-muted-foreground">Takip</p>
              </div>
              <div className="rounded-xl bg-muted p-3 text-center">
                <Grid3X3 className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-lg font-bold text-foreground">{formatCount(influencer.postsCount)}</p>
                <p className="text-xs text-muted-foreground">Gönderi</p>
              </div>
            </div>

            {/* External URLs */}
            {influencer.externalUrls.length > 0 && (
              <div className="mt-4 space-y-2">
                {influencer.externalUrls.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-accent hover:underline truncate"
                  >
                    <Globe className="h-3.5 w-3.5 shrink-0" />
                    {url}
                  </a>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-6 flex gap-3">
              <a
                href={influencer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-accent transition-all hover:opacity-90"
              >
                <ExternalLink className="h-4 w-4" />
                Instagram'da Aç
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InfluencerDetail;
