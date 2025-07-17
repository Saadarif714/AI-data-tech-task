"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-5xl mx-auto flex justify-between gap-6">
        {/* Left-side links */}
        <div className="flex gap-6">
          {status === "loading"?null : !session ?(
            <Link href="/" className="hover:underline">Home</Link>
          ):(
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          )}
             
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>

        {/* Right-side conditional links */}
        <div className="flex gap-6">
          {status === "loading" ? null : !session ? (
            <>
              <Link href="/login" className="hover:underline">Login</Link>
              <Link href="/signup" className="hover:underline">SignUp</Link>
            </>
          ) : (
            <>
              
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
