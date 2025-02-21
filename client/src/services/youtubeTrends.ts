import { YouTubeVideo, RawYouTubeVideo } from "../types/youtubeTrends";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchYouTubeTrends(
  regionCode: string = "US"
): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/youtube-trends?region=${regionCode}`
    );
    const data = await response.json();

    return data.videos.map((video: RawYouTubeVideo) => ({
      title: video.snippet.title,
      videoId: video.id,
      description: video.snippet.description,
      views: Number(video.statistics?.viewCount || 0),
      likes: Number(video.statistics?.likeCount || 0),
      comments: Number(video.statistics?.commentCount || 0),
      channel: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt,
      thumbnailUrl: video.snippet.thumbnails.high.url,
      videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
    }));
  } catch (error) {
    console.error("Erro ao buscar YouTube Trends:", error);
    return [];
  }
}
