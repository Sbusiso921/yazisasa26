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
  <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 text-gray-900">

    {/* HEADER */}
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        <a href="/" className="flex items-center">
          <img
            src="/yazisasa-logo.png"
            alt="YazisaSA"
            className="h-20 md:h-24 w-auto"
          />
        </a>

        <a
          href="/"
          className="border border-green-700 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-50"
        >
          Home
        </a>

      </div>
    </header>

    {/* LOGIN AREA */}
    <section className="max-w-6xl mx-auto px-6 py-16">

      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT MESSAGE */}
        <div>

          <p className="text-green-700 font-bold uppercase tracking-widest text-sm mb-4">
            Municipal Staff Portal
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Manage Reports.
            <br />
            <span className="text-green-700">
              Improve Communities.
            </span>
          </h1>

          <p className="text-gray-600 text-lg mt-6 max-w-xl">
            Authorised municipal staff can review reported issues, view
            evidence and locations, and update progress from one dashboard.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mt-10">

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-2xl mb-2">📋</p>
              <p className="font-bold">Review Reports</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-2xl mb-2">📍</p>
              <p className="font-bold">View Locations</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-2xl mb-2">✅</p>
              <p className="font-bold">Update Status</p>
            </div>

          </div>

        </div>

        {/* LOGIN CARD */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          <div className="bg-green-800 text-white px-6 md:px-8 py-6">
            <h2 className="text-2xl font-bold">
              Municipal Staff Login
            </h2>

            <p className="text-green-100 mt-1">
              Sign in to access the YazisaSA dashboard.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="p-6 md:p-8 space-y-6"
          >

            <div>
              <label className="block font-bold mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your staff email"
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block font-bold mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 disabled:opacity-50 shadow-md"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

            {message && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-800 font-semibold">
                {message}
              </div>
            )}

          </form>

        </div>

      </div>

    </section>

    {/* FOOTER */}
    <footer className="bg-green-900 text-white px-6 py-8 mt-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">

        <img
          src="/yazisasa-logo.png"
          alt="YazisaSA"
          className="h-16 w-auto bg-white rounded-lg px-2"
        />

        <p className="text-green-200 text-sm">
          Municipal Staff Portal
        </p>

        <p className="text-green-200 text-sm">
          Cleaner Communities. Brighter Tomorrows.
        </p>

      </div>
    </footer>

  </main>
);
}