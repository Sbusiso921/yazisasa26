"use client";
import { useState } from "react";
export default function Home() {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const issues = [
    {
      icon: "💧",
      title: "Water Leaks",
      description: "Report burst pipes, leaks and water issues",
    },
    {
      icon: "💡",
      title: "Streetlights",
      description: "Report faulty or damaged streetlights",
    },
    {
      icon: "🛣️",
      title: "Potholes",
      description: "Report potholes and damaged roads",
    },
    {
      icon: "🗑️",
      title: "Illegal Dumping",
      description: "Report illegal waste dumping",
    },
    {
      icon: "⚠️",
      title: "Damaged Roads",
      description: "Report damaged roads and infrastructure",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* NAVIGATION */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

<a href="/" className="flex items-center">
  <img
    src="/yazisasa-logo.png"
    alt="YazisaSA"
    className="h-25 w-auto"
  />
</a>
          <nav className="hidden md:flex items-center gap-8 font-semibold">
            <a href="/" className="text-green-700">
              Home
            </a>

            <a href="/report" className="hover:text-green-700">
              Report a Problem
            </a>

            <a href="/track" className="hover:text-green-700">
              Track Report
            </a>

            <a href="/municipal-login" className="hover:text-green-700">
              Municipal Staff
            </a>
          </nav>

          <a
            href="/review"
           className="hidden md:inline-block bg-green-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-800"
          >
            ★ Leave a Review
          </a>
<button
  type="button"
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden border border-green-700 text-green-700 px-4 py-2 rounded-lg font-bold"
>
  ☰ Menu
</button>
        </div>
        {menuOpen && (
  <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4">
    <div className="flex flex-col gap-4 font-semibold">

      <a href="/" className="hover:text-green-700">
        Home
      </a>

      <a href="/report" className="hover:text-green-700">
        Report a Problem
      </a>

      <a href="/track" className="hover:text-green-700">
        Track Report
      </a>

      <a href="/municipal-login" className="hover:text-green-700">
        Municipal Staff
      </a>

      <a
        href="/review"
        className="bg-green-700 text-white px-4 py-3 rounded-lg text-center"
      >
        ★ Leave a Review
      </a>

    </div>
  </div>
)}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-green-200 rounded-full opacity-40" />
        <div className="absolute right-24 bottom-0 w-72 h-72 bg-green-300 rounded-full opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="uppercase tracking-widest text-green-700 font-bold text-sm mb-4">
              Cleaner Communities. Brighter Tomorrows.
            </p>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Your Community{" "}
              <span className="text-green-700">
                Matters
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-xl mb-8">
              Report municipal issues easily, attach evidence, share a
              location and track progress from one simple platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/report"
                className="bg-green-700 text-white px-7 py-4 rounded-xl font-bold text-center hover:bg-green-800 shadow"
              >
                Report a Problem →
              </a>

              <a
                href="/track"
                className="bg-white border-2 border-green-700 text-green-700 px-7 py-4 rounded-xl font-bold text-center hover:bg-green-50"
              >
                🔎 Track Report
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10 text-sm">
              <div>
                <p className="text-2xl">👥</p>
                <p className="font-semibold mt-1">Cleaner Communities</p>
              </div>

              <div>
                <p className="text-2xl">🛡️</p>
                <p className="font-semibold mt-1">Safer Neighbourhoods</p>
              </div>

              <div>
                <p className="text-2xl">🌱</p>
                <p className="font-semibold mt-1">Responsive Municipalities</p>
              </div>
            </div>
          </div>

          <div className="bg-green-800 text-white rounded-3xl p-10 shadow-xl">
            <p className="text-green-200 uppercase tracking-widest text-sm font-bold mb-4">
              YazisaSA
            </p>

            <h3 className="text-5xl font-bold leading-tight">
              See it.
              <br />
              Report it.
              <br />
              <span className="text-green-300">Change it.</span>
            </h3>

            <div className="w-20 h-1 bg-green-300 my-6" />

            <p className="text-xl text-green-50">
              Together for cleaner, safer and stronger communities.
            </p>

            <div className="mt-10 bg-white/10 rounded-2xl p-5">
              <p className="font-semibold">
                🌍 A cleaner South Africa is in our hands.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ISSUE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-14">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">
            Report a Municipal Issue
          </h2>

          <p className="text-gray-600 mt-2">
            Select the type of issue you want to report.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {issues.map((issue) => (
            <a
              key={issue.title}
              href="/report"
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-3xl mb-4">
                {issue.icon}
              </div>

              <h3 className="font-bold text-lg">
                {issue.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                {issue.description}
              </p>

              <p className="text-green-700 font-bold mt-4">
                Report →
              </p>
            </a>
          ))}
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="bg-green-50 border-y border-green-100">
        <div className="max-w-6xl mx-auto px-6 py-14">

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">
              How It Works
            </h2>

            <p className="text-gray-600 mt-2">
              Reporting is quick and easy.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">

            <div>
              <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-lg">Submit</h3>
              <p className="text-gray-600 mt-1">
                Provide the details, location and photo evidence.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-bold text-lg">Receive</h3>
              <p className="text-gray-600 mt-1">
                Get your unique YazisaSA reference number.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-bold text-lg">Track</h3>
              <p className="text-gray-600 mt-1">
                Check whether the issue is submitted, in progress or resolved.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold mb-4">
                4
              </div>
              <h3 className="font-bold text-lg">Make a Difference</h3>
              <p className="text-gray-600 mt-1">
                Help build cleaner and safer communities.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* REVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl shadow p-7 flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <h2 className="text-2xl font-bold text-green-800">
              Help Us Improve YazisaSA
            </h2>

            <p className="text-gray-600 mt-1">
              Tested the prototype? Share your experience and suggestions.
            </p>
          </div>

          <a
            href="/review"
            className="bg-green-700 text-white px-7 py-3 rounded-lg font-bold hover:bg-green-800"
          >
            ★ Leave a Review
          </a>

        </div>
      </section>

      {/* MUNICIPAL STAFF */}
      <section className="bg-gray-100 px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">

          <div>
            <h2 className="text-xl font-bold">
              Municipal Staff
            </h2>

            <p className="text-gray-600">
              Authorised staff can review reports and update their status.
            </p>
          </div>

          <a
            href="/municipal-login"
            className="border-2 border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50"
          >
            Municipal Staff Login
          </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-900 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">

          <div>
            <p className="text-2xl font-bold">
              YazisaSA
            </p>
            <p className="text-green-200 text-sm">
              Report Today. A Better Tomorrow.
            </p>
          </div>

          <div className="flex gap-6 text-sm">
            <a href="/">Home</a>
            <a href="/report">Report</a>
            <a href="/track">Track</a>
            <a href="/review">Review</a>
          </div>

          <p className="text-green-200 text-sm">
            Cleaner Communities. Brighter Tomorrows.
          </p>

        </div>
      </footer>

    </main>
  );
}