export interface YouTubeVideo {
  title: string;
  videoId: string;
  description: string;
  views: number;
  likes: number;
  comments: number;
  channel: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoUrl: string;
}

// Tipo intermediário para os dados crus da API do YouTube
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
