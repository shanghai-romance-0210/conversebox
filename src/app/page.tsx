"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { auth } from "@/lib/firebaseConfig";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Header />

      {/* Main */}
      <div className="md:container mx-auto p-8 md:flex">
        <div className="md:w-1/2 md:hidden mb-8">
          <Image src="/amico1.svg" alt="" width={100} height={100} className="w-full" />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center md:mr-8">
          <h2 className="text-5xl font-semibold drop-shadow-xs">あなたの好きな動画で、さまざまな言語に<span className="bg-gradient-to-b from-purple-400 to-purple-600 bg-clip-text text-transparent">流暢</span>になりましょう！</h2>
          <p className="text-gray-400 mt-4 text-lg">ConverseBoxを使えば、YouTubeを利用してさまざまな言語で日常的な会話を楽しむことができます。</p>
          {user ? (
            <Link href="/search" className="mt-8"><p className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold w-fit active:scale-90 duration-200 select-none cursor-pointer">動画を検索する</p></Link>
          ) : (
            <div className="mt-8 flex flex-col md:flex-row space-y-2 md:space-x-2">
              <Button className="md:w-1/2">登録</Button>
              <Button className="md:w-1/2" variant="secondary">ログイン</Button>
            </div>
          )}
        </div>
        <div className="md:w-1/2 hidden md:flex">
          <Image src="/amico1.svg" alt="" width={100} height={100} className="w-full" />
        </div>
      </div>

      <Footer />
    </div>
  )
}