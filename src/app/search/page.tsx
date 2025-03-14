'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const decodeHtmlEntity = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.documentElement.textContent || '';
  };
    
  const handleSearchClick = async () => {
    if (query.trim() !== '') {
      setSearchQuery(query);
    }
  };

  useEffect(() => {
    if (searchQuery === '') return;

    const fetchVideos = async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setVideos(data);
    };

    fetchVideos();
  }, [searchQuery]);

  return (
    <div>
      <Header />

      <div className="md:max-w-md w-full mx-auto py-8">
        <div className="flex items-center mb-8 mx-4 md:mx-0">
          <div className="w-full z-10 flex items-center bg-white h-10 px-2 focus-within:border-purple-400 focus-within:ring-2 ring-purple-200 border border-gray-200 rounded-lg duration-200">
            <FiSearch className="mr-2 text-gray-400" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full placeholder:text-sm outline-none" placeholder="動画を検索" />
          </div>
          <Button onClick={handleSearchClick} className="ml-2">検索</Button>
        </div>

        {videos.length === 0 ? (
            <Image src="/amico3.svg" alt="No videos" width={100} height={100} className="w-full select-none opacity-75" />
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
                {videos.map((video) => (
                    <div key={`${video.id.videoId}-${video.snippet.title}`} className="md:border border-gray-200 md:rounded-lg overflow-hidden hover:bg-gray-200 duration-200">
                        <div className="relative aspect-video w-full">
                            <Image  src={video.snippet.thumbnails.high.url}  alt={video.snippet.title}  layout="fill"  objectFit="cover"  className="w-full h-full" />
                        </div>
                        <div className="p-4"><h3 className="text-lg font-semibold line-clamp-2">{decodeHtmlEntity(video.snippet.title)}</h3><p className="text-sm text-gray-600 line-clamp-2 mt-2 hidden">{decodeHtmlEntity(video.snippet.description)}</p></div>
                    </div>
                ))}
            </div>
        )}
      </div>

      <Footer />
    </div>
  );
}