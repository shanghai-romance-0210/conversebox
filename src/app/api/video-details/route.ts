import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = "AIzaSyBjQn6CRPP_zhXFAE1RxGtmuG6h-vbjh10";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const videoId = url.searchParams.get("v");

    if (!videoId) {
        return NextResponse.json({ error: "動画IDが必要です" }, { status: 400 });
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`
        );
        const data = await response.json();

        if (data.items.length === 0) {
            return NextResponse.json({ error: '動画が見つかりません' }, { status: 404 });
        }

        const video = data.items[0].snippet;
        const videoDetails = {
            title: video.title,
            description: video.description,
            thumbnails: video.thumbnails,
        };

        return NextResponse.json(videoDetails);
    } catch (error) {
        console.error('Error fetching video details:', error);
        return NextResponse.json({ error: '動画詳細の取得に失敗しました' }, { status: 500 });
    }
}