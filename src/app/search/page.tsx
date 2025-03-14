'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiSearch, FiChevronRight } from 'react-icons/fi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  const [searchQuery, setSearchQuery] = useState('');  // 検索クエリを管理するstateを追加

  const decodeHtmlEntity = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.documentElement.textContent || '';
  };
    
  // ボタンクリック時に検索を実行
  const handleSearchClick = async () => {
    if (query.trim() !== '') {
      setSearchQuery(query); // 入力された検索クエリをセット
    }
  };

  // `searchQuery`が変更されたらAPIを呼び出す
  useEffect(() => {
    if (searchQuery === '') return; // クエリが空であれば何もしない

    const fetchVideos = async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setVideos(data);
    };

    fetchVideos();
  }, [searchQuery]);  // `searchQuery`が変更された時に検索を実行

  return (
    <div>
      <Header />

      <div className="md:max-w-md w-full mx-auto py-8">
        <div className="flex items-center mb-8 mx-4 md:mx-0 border border-gray-200 rounded-lg overflow-hidden shadow-xs">
          <div className="z-10 w-full flex items-center bg-white h-10 px-2">
            <FiSearch className="mr-2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full placeholder:text-sm outline-none"
              placeholder="動画を検索..."
            />
          </div>
          <button
            onClick={handleSearchClick}
            className="w-10 h-10 aspect-square bg-white flex items-center justify-center border-l border-gray-200"
          >
            <FiChevronRight className="text-gray-400" />
          </button>
        </div>

        {videos.length === 0 ? (
          <Image src="/amico3.svg" alt="No videos" width={100} height={100} className="w-full" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
            {videos.map((video) => (
                <div key={`${video.id.videoId}-${video.snippet.title}`} className="md:border border-gray-200 md:rounded-lg overflow-hidden">
                    <Image src={video.snippet.thumbnails.high.url} alt={video.snippet.title} width={320} height={180} className="w-full" />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold line-clamp-2">{decodeHtmlEntity(video.snippet.title)}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{decodeHtmlEntity(video.snippet.description)}</p>
                    </div>
                </div>
            ))}
            </div>
        )}
      </div>

      <Footer />
    </div>
  );
}