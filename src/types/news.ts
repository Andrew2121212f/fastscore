// Типы для новостного блока
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  imageUrl: string;
  source: string;
  category: string;
  publishedAt: string;
  isPromo: boolean;
}

export type NewsCategory = "all" | "football" | "basketball" | "tennis" | "hockey" | "general";
