"use client"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface VideoDetails {
    title: string;
    description: string;
    thumbnails: {
        high: {
            url: string;
        };
    };
}

export default function Watch() {
    const searchParams = useSearchParams();
    const videoId = searchParams.get("v");
    const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);

    useEffect(() => {
        if (!videoId) return;

        const fetchVideoDetails = async () => {
            const res = await fetch(`/api/video-details?v=${videoId}`);
            const data = await res.json();
            setVideoDetails(data);
        };

        fetchVideoDetails();
    }, [videoId]);

    return (
        <div>
            <Header />

            <div className="md:container mx-auto w-full p-8 md:flex">
                <div className="md:w-1/2">
                    <div className="relative overflow-hidden rounded-lg aspect-video">
                        <iframe src={`https://www.youtube.com/embed/${videoId}`} title="Video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute top-0 left-0 w-full h-full"/>
                    </div>
                    {videoDetails && (
                        <div className="mt-4">
                            <h2 className="text-2xl font-semibold">{videoDetails.title}</h2>
                            <div className="mt-4 p-4 rounded-lg bg-white border border-gray-200 border-dashed h-32 overflow-y-auto duration-200 overflow-hidden"><p dangerouslySetInnerHTML={{ __html: videoDetails.description.replace(/\n/g, '<br/>') }} /></div>
                        </div>
                    )}
                </div>
                <div className="md:w-1/2">
                    {/* こっちに動画の時間とリンクした字幕を表示したいです。 */}
                </div>
            </div>

            <Footer />
        </div>
    );
}
