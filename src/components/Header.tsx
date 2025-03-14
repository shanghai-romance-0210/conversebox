import Link from "next/link";
import Button from "./ui/Button";

export default function Header() {
    return (
        <div className="px-8 py-4 h-16 flex items-center border-b border-gray-200 border-dashed bg-white sticky top-0 z-50">
            <Link href="/" className="flex items-center">
                <div className="aspect-square w-3.5 h-3.5 bg-gray-800 rounded-full mr-2" />
                <h1 className="font-semibold text-xl">ConverseBox</h1>
            </Link>
            <div className="ml-auto flex items-center">
                <Button size="sm" variant="primary">ログイン</Button>
            </div>
        </div>
    )
}