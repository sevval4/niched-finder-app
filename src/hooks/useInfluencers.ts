import { useState, useMemo, useCallback } from "react";
import rawData from "@/data/influencers.json";

export interface Influencer {
  id: string;
  fullName: string;
  username: string;
  biography: string;
  followersCount: number;
  followsCount: number;
  profilePicUrl: string;
  profilePicUrlHD: string;
  url: string;
  verified: boolean;
  isBusinessAccount: boolean;
  businessCategoryName: string | null;
  postsCount: number;
  private: boolean;
  externalUrls: string[];
}

export function useInfluencers() {
  const [searchQuery, setSearchQuery] = useState("");

  const influencers: Influencer[] = useMemo(() => {
    return (rawData as any[]).map((item) => ({
      id: item.id,
      fullName: item.fullName || "",
      username: item.username || "",
      biography: item.biography || "",
      followersCount: item.followersCount ?? 0,
      followsCount: item.followsCount ?? 0,
      profilePicUrl: item.profilePicUrl || "/placeholder.svg",
      profilePicUrlHD: item.profilePicUrlHD || item.profilePicUrl || "/placeholder.svg",
      url: item.url || "",
      verified: item.verified || false,
      isBusinessAccount: item.isBusinessAccount || false,
      businessCategoryName: item.businessCategoryName || null,
      postsCount: item.postsCount ?? 0,
      private: item.private || false,
      externalUrls: item.externalUrls || [],
    }));
  }, []);

  const filtered = useMemo(() => {
    if (!searchQuery) return influencers;
    const q = searchQuery.toLowerCase();
    return influencers.filter(
      (i) =>
        i.fullName.toLowerCase().includes(q) ||
        i.username.toLowerCase().includes(q) ||
        i.biography.toLowerCase().includes(q)
    );
  }, [influencers, searchQuery]);

  return { influencers: filtered, searchQuery, setSearchQuery, total: influencers.length };
}
