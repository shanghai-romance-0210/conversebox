import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

export default function NotFound() {
    return (
        <div>
            <Header />
            <div className="md:max-w-md w-full mx-auto py-8 select-none">
                <h2 className="text-center font-semibold text-xl text-gray-400">ページが見つかりませんでした</h2>
                <Image src="/amico2.svg" alt="" width={100} height={100} className="w-full" />
            </div>
            <Footer />
        </div>
    )
}