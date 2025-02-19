export interface GoogleRelatedQuery {
  query: string;
  exploreLink: string;
}

export interface GoogleTrendArticle {
  title: string;
  timeAgo: string;
  source: string;
  url: string;
  snippet?: string;
}

export interface GoogleTrendImage {
  newsUrl?: string;
  source?: string;
  imageUrl?: string;
}

// 🔍 Tipo intermediário para os dados crus da API
export interface RawGoogleTrend {
  title: { query: string; exploreLink: string };
  formattedTraffic: string;
  relatedQueries?: GoogleRelatedQuery[];
  image?: GoogleTrendImage;
  articles?: GoogleTrendArticle[];
  shareUrl?: string;
}

// 🔄 Tipo final para os dados enviados ao frontend
export interface GoogleTrend {
  title: string;
  traffic: string;
  exploreLink: string;
  relatedQueries: GoogleRelatedQuery[];
  image?: GoogleTrendImage;
  articles: GoogleTrendArticle[];
  shareUrl: string;
  date: string; // ✅ Adicionamos a propriedade `date`
}

export interface GoogleTrendsResponse {
  date: string;
  formattedDate: string;
  trends: GoogleTrend[];
}
