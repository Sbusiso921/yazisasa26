"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function MunicipalLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Login failed. Please check your email and password.");
    } else {
      router.push("/municipal");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <header className="bg-green-700 text-white px-6 py-5">
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">
            YazisaSA
          </a>

          <a
            href="/"
            className="border border-white px-4 py-2 rounded-lg"
          >
            Home
          </a>
        </div>
      </header>

      <section className="max-w-xl mx-auto px-6 py-12">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Municipal Staff Login
          </h1>

          <p className="text-gray-600 mt-2">
            Sign in to manage municipal fault reports.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-xl shadow p-6 space-y-6"
        >
          <div>
            <label className="block font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter municipal staff email"
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white font-bold py-4 rounded-lg hover:bg-green-800"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {message && (
            <div className="rounded-lg bg-red-100 p-4 text-red-800">
              {message}
            </div>
          )}
        </form>

      </section>
    </main>
  );
}