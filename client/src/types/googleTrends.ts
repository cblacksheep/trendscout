export interface GoogleTrend {
  title: string;
  traffic: number;
  exploreLink: string;
  relatedQueries: { query: string; exploreLink: string }[];
  imageUrl?: string;
  newsUrl?: string;
  articles: {
    title: string;
    timeAgo: string;
    source: string;
    url: string;
    snippet: string;
  }[];
  shareUrl: string;
}

// Tipo intermediário que representa os dados crus da API
export interface RawGoogleTrend {
  title: { query: string; exploreLink: string };
  formattedTraffic: string;
  relatedQueries?: { query: string; exploreLink: string }[];
  image?: { source: string; imageUrl: string; newsUrl: string };
  articles?: {
    title: string;
    timeAgo: string;
    source: string;
    url: string;
    snippet: string;
  }[];
  shareUrl?: string;
}
