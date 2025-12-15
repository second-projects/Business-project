"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [voucherCode, setVoucherCode] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/voucher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: voucherCode }),
      });

      if (res.ok) {
        localStorage.setItem("voucherCode", voucherCode);
        router.push("/display");
      } else {
        const data = await res.json();
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          placeholder="Enter voucher code"
          className="w-80 rounded-md border border-white bg-black p-2 text-center text-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-shadow duration-300 focus:outline-none focus:shadow-[0_0_20px_rgba(255,255,255,0.8)]"
        />
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-80 rounded-md border border-white bg-black p-2 text-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
        {message && <p className="mt-4 text-white">{message}</p>}
      </div>
    </main>
  );
}
