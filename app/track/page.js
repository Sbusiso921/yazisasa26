"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function TrackPage() {
  const [reference, setReference] = useState("");
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTrack(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setReport(null);

    const { data, error } = await supabase
      .from("reports")
      .select(
        "reference_number, problem_type, municipality, area, location, description, photo_url, status, created_at"
      )
      .eq("reference_number", reference.trim())
      .maybeSingle();

    if (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } else if (!data) {
      setMessage("No report was found with that reference number.");
    } else {
      setReport(data);
    }

    setLoading(false);
  }

  return (
  <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 text-gray-900">

    {/* HEADER */}
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">

        <a href="/" className="flex items-center">
          <img
            src="/yazisasa-logo.png"
            alt="YazisaSA"
            className="h-20 md:h-24 w-auto"
          />
        </a>

        <div className="flex items-center gap-3">
          <a
            href="/report"
            className="hidden sm:inline-block text-green-700 font-semibold px-4 py-2 hover:bg-green-50 rounded-lg"
          >
            Report a Problem
          </a>

          <a
            href="/"
            className="border border-green-700 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-50"
          >
            Home
          </a>
        </div>

      </div>
    </header>

    {/* HERO */}
    <section className="border-b border-green-100">
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-8">

        <p className="text-green-700 font-bold uppercase tracking-widest text-sm mb-3">
          Report Tracking
        </p>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Track Your{" "}
          <span className="text-green-700">
            Municipal Report
          </span>
        </h1>

        <p className="text-gray-600 text-lg mt-4 max-w-2xl">
          Enter the YazisaSA reference number you received when submitting
          your report to view its latest status and details.
        </p>

        <div className="flex flex-wrap gap-5 mt-7 text-sm font-semibold">
          <span>🔎 Find Your Report</span>
          <span>📋 View Details</span>
          <span>✅ Check Status</span>
        </div>

      </div>
    </section>

    <section className="max-w-4xl mx-auto px-6 py-10">

      {/* SEARCH CARD */}
      <form
        onSubmit={handleTrack}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
      >

        <div className="bg-green-800 text-white px-6 md:px-8 py-6">
          <h2 className="text-2xl font-bold">
            Find Your Report
          </h2>

          <p className="text-green-100 mt-1">
            Enter your reference number below.
          </p>
        </div>

        <div className="p-6 md:p-8">

          <label className="block font-bold mb-2">
            Reference Number
          </label>

          <input
            type="text"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            placeholder="Example: YSA-963736"
            className="w-full border border-gray-300 rounded-xl p-4 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 bg-green-700 text-white font-bold py-4 rounded-xl text-lg hover:bg-green-800 disabled:opacity-50 shadow-md"
          >
            {loading ? "Searching..." : "Track Report →"}
          </button>

        </div>
      </form>

      {/* MESSAGE */}
      {message && (
        <div className="mt-6 rounded-xl bg-yellow-50 border border-yellow-200 p-5 text-yellow-900 font-semibold">
          {message}
        </div>
      )}

      {/* REPORT RESULT */}
      {report && (
        <div className="mt-8 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

          <div className="bg-green-800 text-white px-6 md:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <p className="text-green-200 text-sm uppercase tracking-widest font-bold">
                Report Found
              </p>

              <h2 className="text-2xl font-bold mt-1">
                Report Details
              </h2>
            </div>

            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                report.status === "Resolved"
                  ? "bg-green-100 text-green-800"
                  : report.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {report.status}
            </span>

          </div>

          <div className="p-6 md:p-8 space-y-7">

            {/* Reference */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
              <p className="text-sm text-gray-600">
                Reference Number
              </p>

              <p className="text-xl font-bold text-green-800 mt-1">
                {report.reference_number}
              </p>
            </div>

            {/* DETAILS GRID */}
            <div className="grid sm:grid-cols-2 gap-6">

              <div>
                <p className="text-sm text-gray-500">
                  Problem
                </p>
                <p className="font-bold mt-1">
                  {report.problem_type}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Municipality
                </p>
                <p className="font-bold mt-1">
                  {report.municipality}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Area
                </p>
                <p className="font-bold mt-1">
                  {report.area}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Location
                </p>
                <p className="font-bold mt-1">
                  {report.location}
                </p>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500 mb-2">
                Description
              </p>

              <p className="text-gray-800 leading-relaxed">
                {report.description}
              </p>
            </div>

            {/* PHOTO */}
            {report.photo_url && (
              <div className="border-t border-gray-200 pt-6">

                <p className="text-sm text-gray-500 mb-3">
                  Photo Evidence
                </p>

                <img
                  src={report.photo_url}
                  alt="Reported municipal fault"
                  className="w-full max-w-lg rounded-2xl border border-gray-200 shadow-sm"
                />

              </div>
            )}

            {/* STATUS */}
            <div className="border-t border-gray-200 pt-6">

              <p className="text-sm text-gray-500">
                Current Status
              </p>

              <span
                className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-bold ${
                  report.status === "Resolved"
                    ? "bg-green-100 text-green-800"
                    : report.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {report.status}
              </span>

            </div>

          </div>
        </div>
      )}

      {/* HELP CARDS */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-2xl mb-2">🔎</p>
          <p className="font-bold">Track Anytime</p>
          <p className="text-gray-600 text-sm mt-1">
            Use your reference number whenever you need an update.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-2xl mb-2">📋</p>
          <p className="font-bold">See Your Details</p>
          <p className="text-gray-600 text-sm mt-1">
            Review the issue, location and supporting evidence.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-2xl mb-2">✅</p>
          <p className="font-bold">Follow Progress</p>
          <p className="text-gray-600 text-sm mt-1">
            See whether the report is submitted, in progress or resolved.
          </p>
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