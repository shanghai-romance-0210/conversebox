import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Header */}
      <div className="px-8 py-4 h-16 flex items-center border-b border-gray-200 border-dashed bg-white sticky top-0">
        <Link href="/" className="flex items-center">
          <div className="aspect-square w-3.5 h-3.5 bg-gray-800 rounded-full mr-2" />
          <h1 className="font-semibold text-xl">ConverseBox</h1>
        </Link>
        <div className="ml-auto flex items-center">
          <Button size="sm" variant="primary">ログイン</Button>
        </div>
      </div>

      {/* Main */}
      <div className="md:container mx-auto p-8 md:flex">
        <div className="md:w-1/2 md:hidden mb-8">
          <Image src="/amico1.svg" alt="" width={100} height={100} className="w-full" />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center md:mr-8">
          <h2 className="text-4xl font-semibold">あなたの好きな動画で、さまざまな言語に<span className="bg-gradient-to-b from-purple-400 to-purple-600 bg-clip-text text-transparent">流暢</span>になりましょう！</h2>
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

      {/* Footer */}
      <div className="mt-8 md:container mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 p-8 bg-white rounded-lg md:mb-8 border-t md:border border-gray-200 border-dashed">
        <div>
          <Link href="/" className="flex items-center">
            <div className="aspect-square w-3.5 h-3.5 bg-gray-800 rounded-full mr-2" />
            <h1 className="font-semibold text-xl">ConverseBox</h1>
          </Link>
          <p className="text-gray-400 mt-2">&copy; 2025 ConverseBox. All rights reserved.</p>
        </div>
        <div className="md:hidden" />
        <div>
          <h3 className="font-semibold text-lg">About</h3>
          <div className="mt-4 space-y-0.5 flex flex-col">
            <Link href="#" className="hover:underline"><p>Link1</p></Link>
            <Link href="#" className="hover:underline"><p>Link2</p></Link>
            <Link href="#" className="hover:underline"><p>Link3</p></Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Legal</h3>
          <div className="mt-4 space-y-0.5 flex flex-col">
            <Link href="#" className="hover:underline"><p>Link1</p></Link>
            <Link href="#" className="hover:underline"><p>Link2</p></Link>
            <Link href="#" className="hover:underline"><p>Link3</p></Link>
          </div>
        </div>
      </div>
    </div>
  )
}