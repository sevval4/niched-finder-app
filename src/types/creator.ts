export interface Creator {
  id: string;
  name: string;
  username: string;
  followersCount: number;
  niche: string;
  avatarUrl: string;
  engagementRate: number;
  bio: string;
  platform: "instagram" | "tiktok" | "youtube";
  email: string;
  location: string;
}

export const NICHES = [
  "Hepsi",
  "Moda",
  "Teknoloji",
  "Yemek",
  "Fitness",
  "Seyahat",
  "Güzellik",
  "Oyun",
  "Müzik",
  "Eğitim",
] as const;

export type Niche = (typeof NICHES)[number];
