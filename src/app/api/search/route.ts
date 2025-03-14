// src/app/api/search/route.ts
import { NextResponse } from 'next/server';

const API_KEY = "AIzaSyBjQn6CRPP_zhXFAE1RxGtmuG6h-vbjh10";
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

interface YouTubeVideoItem {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

interface YouTubeResponse {
  items: YouTubeVideoItem[];
}

async function searchYouTube(query: string): Promise<YouTubeVideoItem[]> {
  const url = new URL(BASE_URL);
  url.searchParams.append('part', 'snippet');
  url.searchParams.append('q', query);
  url.searchParams.append('type', 'video');
  url.searchParams.append('key', API_KEY);
  url.searchParams.append('maxResults', '10');

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('YouTube API request failed');
  }
  const data: YouTubeResponse = await response.json();
  
  const videos = data.items.filter((item) => item.id.kind === 'youtube#video');
  return videos;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || 'Next.js';

  try {
    const videos = await searchYouTube(query);
    return NextResponse.json(videos);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}