export interface TenyoTrick {
  product_code: string;
  name: string;
  description: string;
  year_released: string;
  creator: string;
  popularity_score: number;
  rarity_score: number;
  combined_score: number;
  image_filename: string;
  reviews: string[];
  consensus: string;
}

export type SortOption = 'combined' | 'popularity' | 'rarity' | 'year' | 'name';
export type FilterOption = 'all' | 'rare' | 'popular' | 'classic';
