export type Rarity = 'N' | 'R' | 'SR' | 'SSR' | 'UR';

export interface CardItem {
  id: string;
  url: string;
  rarity: Rarity;
  isR18: boolean;
  timestamp: number;
  pid?: number;
  title?: string;
  author?: string;
  platform?: 'pixiv' | 'x';
}