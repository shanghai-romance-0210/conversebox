import Link from "next/link";

export default function Footer() {
    return (
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
                    <Link href="#" className="hover:underline"><p>リンク1</p></Link>
                    <Link href="#" className="hover:underline"><p>リンク2</p></Link>
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-lg">Legal</h3>
                <div className="mt-4 space-y-0.5 flex flex-col">
                    <Link href="#" className="hover:underline"><p>利用規約</p></Link>
                    <Link href="#" className="hover:underline"><p>プライバシーポリシー</p></Link>
                </div>
            </div>
        </div>
    )
}