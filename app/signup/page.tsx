"use client";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    useremail: "",
    userpassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Signup successful!");
      setForm({ username: "", useremail: "", userpassword: "" });
    } else {
      setMessage(data.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center ">
      <div className="bg-gray-800 px-6 py-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center text-white">
          Create a new account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-white mb-1">Full Name</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={form.username}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              name="useremail"
              onChange={handleChange}
              value={form.useremail}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <input
              type="password"
              name="userpassword"
              onChange={handleChange}
              value={form.userpassword}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm text-white mb-1">Confirm Password</label>
            <input
              type="password"
              name="userpassword"
              onChange={handleChange}
              value={form.userpassword}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="text-sm text-white mt-4 text-center">{message}</p>
        )}

        <p className="text-sm text-white mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
