import { useState, useMemo } from "react";
import rawData from "@/data/influencers.json";

export interface Influencer {
  id: string;
  fullName: string;
  username: string;
  biography: string;
  followersCount: number;
  profilePicUrl: string;
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
      profilePicUrl: item.profilePicUrl || "/placeholder.svg",
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
