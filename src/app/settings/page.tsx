"use client"
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";

export default function Settings() {
    const [username, setUsername] = useState(""); // State to hold the username
    const user = auth.currentUser; // Get the currently authenticated user

    useEffect(() => {
        // Function to fetch the user's username from Firestore
        const fetchUsername = async (uid: string) => {
            const userDocRef = doc(db, "users", uid); // Reference to the user's document
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                setUsername(userDoc.data().username); // Set the username from Firestore if exists
            } else {
                setUsername(""); // Default if no username is found
            }
        };

        // Listen for changes in the authentication state (e.g., re-login, session refresh)
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                fetchUsername(currentUser.uid); // Fetch username if user is logged in
            } else {
                setUsername(""); // Clear username if no user is logged in
            }
        });

        // Cleanup the listener on unmount
        return () => unsubscribe();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const handleSave = async () => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { username }, { merge: true }); // Merge to avoid overwriting other user data
        }
    };

    return (
        <div>
            <Header />

            <div className="md:max-w-md w-full mx-auto p-8 md:px-0">
                <h2 className="text-2xl font-semibold">Settings</h2>

                <div className="mt-4">
                    <label htmlFor="username" className="text-sm mb-0.5">Username</label>
                    <input
                        id="username"
                        value={username} // Pre-fill the username if it exists in the state
                        onChange={(e) => setUsername(e.target.value)} // Update username on input change
                        className="outline-none px-4 py-2 rounded-lg border border-gray-200 h-10 bg-white w-full duration-200 focus:ring-2 ring-purple-200 focus:border-purple-400"
                    />
                </div>

                <Button className="mt-8" onClick={handleSave}>Save</Button>
            </div>

            <Footer />
        </div>
    );
}