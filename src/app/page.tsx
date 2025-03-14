import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function Home() {
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
          <div className="mt-8 flex space-x-2">
            <Button className="w-full">登録</Button>
            <Button className="w-full" variant="secondary">ログイン</Button>
          </div>
        </div>
        <div className="md:w-1/2 hidden md:flex">
          <Image src="/amico1.svg" alt="" width={100} height={100} className="w-full" />
        </div>
      </div>

      <Footer />
    </div>
  )
}