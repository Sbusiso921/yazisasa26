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
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          <a href="/" className="flex items-center">
            <img
              src="/yazisasa-logo.png"
              alt="YazisaSA"
              className="h-20 md:h-24 w-auto"
            />
          </a>

          <a
            href="/"
            className="border border-slate-900 text-slate-900 px-5 py-2 rounded-md font-semibold hover:bg-slate-100"
          >
            Home
          </a>

        </div>
      </header>

      {/* LOGIN AREA */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div>

            <p className="text-emerald-700 font-bold uppercase tracking-[0.2em] text-sm">
              Municipal Staff Portal
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-4">
              Manage Reports.
              <br />
              <span className="text-emerald-600">
                Improve Communities.
              </span>
            </h1>

            <p className="text-slate-600 text-lg mt-6 max-w-xl leading-8">
              Authorised municipal staff can review reported issues, view
              evidence and locations, and update progress from one dashboard.
            </p>

            <div className="grid sm:grid-cols-3 gap-5 mt-10">

              <div className="bg-white border border-slate-200 rounded-md p-5">
                <p className="text-2xl mb-3">
                  📋
                </p>

                <p className="font-bold">
                  Review Reports
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-md p-5">
                <p className="text-2xl mb-3">
                  📍
                </p>

                <p className="font-bold">
                  View Locations
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-md p-5">
                <p className="text-2xl mb-3">
                  ✅
                </p>

                <p className="font-bold">
                  Update Status
                </p>
              </div>

            </div>

          </div>

          {/* LOGIN CARD */}
          <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm">

            <div className="bg-slate-900 text-white px-6 md:px-8 py-7">

              <p className="text-emerald-400 uppercase tracking-widest text-sm font-bold">
                Secure Access
              </p>

              <h2 className="text-2xl font-bold mt-2">
                Municipal Staff Login
              </h2>

              <p className="text-slate-300 mt-2">
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
                  className="w-full border border-slate-300 rounded-md p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
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
                  className="w-full border border-slate-300 rounded-md p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-md font-bold text-lg hover:bg-slate-800 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In →"}
              </button>

              {message && (
                <div className="border-l-4 border-red-500 bg-red-50 p-4 text-red-800 font-semibold">
                  {message}
                </div>
              )}

            </form>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 mt-8">

        <div className="max-w-6xl mx-auto px-6 py-9 flex flex-col md:flex-row justify-between items-center gap-5">

          <div>
            <p className="text-white font-bold text-lg">
              YazisaSA
            </p>

            <p className="text-sm mt-1">
              Municipal Staff Portal
            </p>
          </div>

          <p className="text-sm">
            Cleaner Communities. Brighter Tomorrows.
          </p>

        </div>

      </footer>

    </main>
  );
}