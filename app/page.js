"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const issues = [
    {
      icon: "💧",
      title: "Water Leak",
      description: "Report leaking pipes, burst pipes or water wastage.",
    },
    {
      icon: "🚧",
      title: "Pothole",
      description: "Report potholes or damaged road surfaces.",
    },
    {
      icon: "💡",
      title: "Streetlight",
      description: "Report faulty or damaged streetlights.",
    },
    {
      icon: "🗑️",
      title: "Illegal Dumping",
      description: "Report illegal dumping or waste problems.",
    },
    {
      icon: "🛣️",
      title: "Damaged Road",
      description: "Report damaged municipal roads or infrastructure.",
    },
    {
      icon: "📍",
      title: "Other Fault",
      description: "Report another municipal problem in your area.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <a href="/">
            <img
              src="/yazisasa-logo.png"
              alt="YazisaSA Logo"
              className="h-20 w-auto"
            />
          </a>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <a
              href="/"
              className="text-emerald-700"
            >
              Home
            </a>

            <a
              href="/report"
              className="hover:text-emerald-700 transition"
            >
              Report a Problem
            </a>

            <a
              href="/track"
              className="hover:text-emerald-700 transition"
            >
              Track Report
            </a>

            <a
              href="/about"
              className="hover:text-emerald-700 transition"
            >
              About
            </a>

            <a
              href="/municipal-login"
              className="hover:text-emerald-700 transition"
            >
              Municipal Staff
            </a>

            <a
              href="/review"
              className="bg-slate-900 text-white px-5 py-3 rounded-md hover:bg-slate-800 transition"
            >
              ★ Leave a Review
            </a>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden border border-slate-900 px-4 py-2 rounded-md font-bold"
          >
            ☰ Menu
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-6 py-5 flex flex-col gap-4 font-semibold">

              <a href="/" className="text-emerald-700">
                Home
              </a>

              <a href="/report">
                Report a Problem
              </a>

              <a href="/track">
                Track Report
              </a>

              <a href="/about">
                About
              </a>

              <a href="/municipal-login">
                Municipal Staff
              </a>

              <a
                href="/review"
                className="bg-slate-900 text-white px-4 py-3 rounded-md text-center"
              >
                ★ Leave a Review
              </a>

            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <p className="text-emerald-700 uppercase tracking-[0.2em] text-sm font-bold">
              Cleaner Communities. Brighter Tomorrows.
            </p>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-5">
              Your Community
              <span className="block text-emerald-600">
                Matters.
              </span>
            </h1>

            <p className="text-slate-600 text-lg mt-6 max-w-xl leading-8">
              Report municipal issues, attach evidence, share the location
              and track progress from one simple platform.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/report"
                className="bg-slate-900 text-white px-7 py-4 rounded-md font-bold hover:bg-slate-800 transition"
              >
                Report a Problem →
              </a>

              <a
                href="/track"
                className="border border-slate-900 text-slate-900 px-7 py-4 rounded-md font-bold hover:bg-slate-100 transition"
              >
                🔎 Track Report
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 text-sm">

              <div className="border-l-4 border-emerald-600 pl-4">
                <p className="font-bold">
                  Cleaner Communities
                </p>
              </div>

              <div className="border-l-4 border-emerald-600 pl-4">
                <p className="font-bold">
                  Safer Neighbourhoods
                </p>
              </div>

              <div className="border-l-4 border-emerald-600 pl-4">
                <p className="font-bold">
                  Responsive Municipalities
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-slate-900 text-white p-10 md:p-12 rounded-md shadow-xl">

            <p className="text-emerald-400 uppercase tracking-widest text-sm font-bold">
              YazisaSA
            </p>

            <h2 className="text-5xl font-bold leading-tight mt-5">
              See it.
              <br />
              Report it.
              <br />
              <span className="text-emerald-400">
                Change it.
              </span>
            </h2>

            <div className="w-20 h-1 bg-emerald-400 mt-8"></div>

            <p className="text-slate-300 text-lg mt-8 leading-8">
              Helping residents and municipalities communicate about
              service delivery problems through one clear reporting process.
            </p>

            <div className="border border-slate-700 bg-slate-800 p-5 mt-8 rounded-md">
              <p className="font-bold">
                🌍 A cleaner South Africa is in our hands.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* REPORT TYPES */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-widest text-emerald-700 text-sm font-bold">
            Report Municipal Problems
          </p>

          <h2 className="text-4xl font-bold mt-3">
            What would you like to report?
          </h2>

          <p className="text-slate-600 mt-4">
            Select a municipal problem and submit the important information.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">

          {issues.map((issue) => (
            <a
              key={issue.title}
              href="/report"
              className="group bg-white border border-slate-200 p-6 rounded-md hover:border-emerald-600 hover:shadow-lg transition"
            >
              <div className="text-3xl">
                {issue.icon}
              </div>

              <h3 className="text-xl font-bold mt-4 group-hover:text-emerald-700">
                {issue.title}
              </h3>

              <p className="text-slate-600 mt-2 leading-6">
                {issue.description}
              </p>

              <p className="text-emerald-700 font-bold mt-5">
                Report issue →
              </p>
            </a>
          ))}

        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="max-w-2xl">
            <p className="text-emerald-400 uppercase tracking-widest text-sm font-bold">
              Simple Process
            </p>

            <h2 className="text-4xl font-bold mt-3">
              Report. Manage. Track.
            </h2>

            <p className="text-slate-300 mt-4">
              YazisaSA keeps the municipal reporting process simple.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <div className="border border-slate-700 p-7 rounded-md">
              <p className="text-emerald-400 font-bold text-sm">
                STEP 01
              </p>

              <h3 className="text-2xl font-bold mt-3">
                Report
              </h3>

              <p className="text-slate-300 mt-3 leading-7">
                Submit the fault, location, description and supporting
                photographic evidence.
              </p>
            </div>

            <div className="border border-slate-700 p-7 rounded-md">
              <p className="text-emerald-400 font-bold text-sm">
                STEP 02
              </p>

              <h3 className="text-2xl font-bold mt-3">
                Manage
              </h3>

              <p className="text-slate-300 mt-3 leading-7">
                Municipal staff can view the submitted report and update
                its progress.
              </p>
            </div>

            <div className="border border-slate-700 p-7 rounded-md">
              <p className="text-emerald-400 font-bold text-sm">
                STEP 03
              </p>

              <h3 className="text-2xl font-bold mt-3">
                Track
              </h3>

              <p className="text-slate-300 mt-3 leading-7">
                Residents use their reference number to check the current
                report status.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="border border-slate-200 bg-slate-50 p-10 md:p-14 rounded-md flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          <div>
            <p className="text-emerald-700 font-bold uppercase tracking-widest text-sm">
              Your Community Matters
            </p>

            <h2 className="text-3xl font-bold mt-3">
              See a municipal problem?
            </h2>

            <p className="text-slate-600 mt-3">
              Report it and keep your reference number to track the progress.
            </p>
          </div>

          <a
            href="/report"
            className="bg-slate-900 text-white px-7 py-4 rounded-md font-bold text-center hover:bg-slate-800 transition"
          >
            Report a Problem
          </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6">

          <div>
            <p className="text-white font-bold text-lg">
              YazisaSA
            </p>

            <p className="text-sm mt-2">
              Report Today. A Better Tomorrow.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <a href="/report" className="hover:text-white">
              Report
            </a>

            <a href="/track" className="hover:text-white">
              Track
            </a>

            <a href="/about" className="hover:text-white">
              About
            </a>

            <a href="/review" className="hover:text-white">
              Reviews
            </a>
          </div>

        </div>
      </footer>

    </main>
  );
}