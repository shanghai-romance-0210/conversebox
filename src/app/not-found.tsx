import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

export default function NotFound() {
    return (
        <div>
            <Header />
            <div className="md:max-w-md w-full mx-auto">
                <Image src="/amico2.svg" alt="" width={100} height={100} className="w-full" />
            </div>
            <Footer />
        </div>
    )
}