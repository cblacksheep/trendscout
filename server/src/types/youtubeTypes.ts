// 🔍 Tipo intermediário para os dados crus da API do YouTube
export interface RawYouTubeVideo {
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: { high: { url: string } };
  };
  id: string;
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
}

// 🔄 Tipo final para os dados enviados ao frontend
export interface YouTubeVideo {
  title: string;
  videoId: string;
  description: string;
  views: string;
  likes: string;
  comments: string;
  channel: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export interface YouTubeTrendsResponse {
  date: string;
  region: string;
  videos: YouTubeVideo[];
}
