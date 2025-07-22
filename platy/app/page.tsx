'use client';
import { useCallback, type CSSProperties } from 'react'
import { useTideCloak } from '@tidecloak/nextjs'

export default function Home() {
  const { login, authenticated } = useTideCloak()

  const onLogin = useCallback(() => {
    login()
  }, [login]);

  return (
    <div
      className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
    >
      <header
        className="text-center"
        style={{
          fontFamily: "'Courier New', monospace",
        }}
      >
        <h1 style={{ fontSize: "80px" }}>Platypus Passwords</h1>
        <p>Secured with the Tide Network</p>
      </header>
      <button
        className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-6 px-16 rounded-3xl shadow-xl text-3xl transition-all duration-200 border border-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 flex items-center justify-center"
        style={{ fontFamily: "'Courier New', monospace", fontSize: "40px", letterSpacing: "2px" }}
        aria-label="Get Started"
        onClick={onLogin}
      >
        Get Started
      </button>
    </div>
  );
}
