"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dateStarted, setDateStarted] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const voucherCode = localStorage.getItem("voucherCode");
    if (voucherCode) {
      const fetchDateStarted = async () => {
        try {
          const res = await fetch(`/api/voucher/${voucherCode}`);
          if (res.ok) {
            const data = await res.json();
            const date = new Date(data.dateStarted).toLocaleDateString();
            setDateStarted(date);
          }
        } catch (error) {
          console.error("Failed to fetch date started:", error);
        }
      };
      fetchDateStarted();
    }
  }, []);

  const handleLogout = async () => {
    const voucherCode = localStorage.getItem("voucherCode");
    if (voucherCode) {
      try {
        await fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: voucherCode }),
        });
        localStorage.removeItem("voucherCode");
        router.push("/");
      } catch (error) {
        console.error("Failed to log out:", error);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/50 p-4 shadow-[0_0_10px_rgba(255,255,255,0.5)] backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-white">BRAND</div>
        <div className="hidden md:flex flex-grow justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/2 rounded-md border border-white bg-black p-2 text-center text-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-shadow duration-300 focus:outline-none focus:shadow-[0_0_20px_rgba(255,255,255,0.8)]"
          />
        </div>
        <div className="hidden items-center gap-8 text-white md:flex">
          <a href="#" className="hover:text-gray-400">
            Movies
          </a>
          <a href="#" className="hover:text-gray-400">
            TV Shows
          </a>
          <a href="#" className="hover:text-gray-400">
            Kdrama
          </a>
          <a href="#" className="hover:text-gray-400">
            Anime
          </a>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute right-4 mt-2 w-48 rounded-md bg-black shadow-[0_0_10px_rgba(255,255,255,0.5)] md:hidden">
          <div className="p-2 text-white">
            {dateStarted ? (
              <p>Date Started: {dateStarted}</p>
            ) : (
              <p>Loading...</p>
            )}
            <button
              onClick={handleLogout}
              className="mt-2 w-full rounded-md border border-white bg-black p-2 text-white"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
