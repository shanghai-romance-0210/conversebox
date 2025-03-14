"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./ui/Button";
import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from "firebase/auth";
import { FiX } from "react-icons/fi";
import { FaUser } from "react-icons/fa"; // Import FaUser icon

export default function Header() {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [showMenu, setShowMenu] = useState(false);  // State to toggle menu visibility

    useEffect(() => {
        // Set up Firebase listener to track user authentication state
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser); // If user is logged in, store user info
        });

        return () => unsubscribe(); // Clean up listener on component unmount
    }, []);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setShowModal(false);  // Close modal on successful login
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setShowModal(false);  // Close modal on successful signup
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);  // Log out the user
            setError("");  // Clear any previous error
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(`ログアウトに失敗しました: ${error.message}`);  // Set error message
            } else {
                setError("ログアウトに失敗しました");  // Default error message
            }
        }
    };

    return (
        <>
            <div className="px-8 py-4 h-16 flex items-center border-b border-gray-200 border-dashed bg-white sticky top-0 z-50">
                <Link href="/" className="flex items-center">
                    <div className="aspect-square w-3.5 h-3.5 bg-gray-800 rounded-full mr-2" />
                    <h1 className="font-semibold text-xl">ConverseBox</h1>
                </Link>
                <div className="ml-auto flex items-center">
                    {user ? (
                        <>
                            <div className="relative">
                                <button  onClick={() => setShowMenu(!showMenu)} className="flex items-center justify-center rounded-full h-10 w-10 aspect-square bg-purple-200 cursor-pointer text-purple-400">
                                    <FaUser className="text-xl" />
                                </button>
                                {showMenu && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-md rounded-lg p-2">
                                        <div>
                                            <p className="font-semibold">ここにユーザー名</p>
                                            <p className="text-gray-400 text-sm line-clamp-1">{user.email}</p>
                                        </div>
                                        <div className="border-t border-gray-200 my-2" />
                                        <Button onClick={handleLogout} variant="text" className="font-normal w-full text-left">
                                            ログアウト
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Button size="sm" variant="primary" onClick={() => setShowModal(true)}>
                            ログイン
                        </Button>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-800/50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <div className="flex items-center mb-4">
                            <h2 className="text-xl font-semibold">{isSignUp ? "新規登録" : "ログイン"}</h2>
                            <button className="ml-auto p-0 cursor-pointer text-gray-400" onClick={() => setShowModal(false)}><FiX className="text-xl" /></button>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm mb-0.5">メールアドレス</label>
                            <input id="email" type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none duration-200 focus:ring-2 ring-purple-200 focus:border-purple-400" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm mb-0.5">パスワード</label>
                            <input id="password" type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none duration-200 focus:ring-2 ring-purple-200 focus:border-purple-400" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {error && <div className="text-red-400 mt-4 text-sm">{error}</div>}

                        <div className="flex justify-between items-center mt-6">
                            <Button onClick={() => setIsSignUp(!isSignUp)} size="sm" variant="secondary">
                                {isSignUp ? "ログイン画面へ" : "新規登録画面へ"}
                            </Button>
                            <Button onClick={isSignUp ? handleSignUp : handleLogin} size="sm" variant="primary">
                                {isSignUp ? "新規登録" : "ログイン"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}