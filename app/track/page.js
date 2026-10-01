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

  function statusClass(status) {
    if (status === "Resolved") {
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }

    if (status === "In Progress") {
      return "bg-amber-100 text-amber-800 border-amber-200";
    }

    return "bg-slate-100 text-slate-800 border-slate-200";
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

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
              className="hidden sm:inline-block font-semibold hover:text-emerald-700"
            >
              Report a Problem
            </a>

            <a
              href="/"
              className="border border-slate-900 text-slate-900 px-5 py-2 rounded-md font-semibold hover:bg-slate-100"
            >
              Home
            </a>

          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-16">

          <p className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-sm">
            Report Tracking
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-4">
            Track Your{" "}
            <span className="text-emerald-400">
              Municipal Report
            </span>
          </h1>

          <p className="text-slate-300 text-lg mt-5 max-w-2xl leading-8">
            Enter the YazisaSA reference number you received when submitting
            your report to view its latest status and details.
          </p>

          <div className="flex flex-wrap gap-6 mt-8 text-sm font-semibold text-slate-200">
            <span>🔎 Find Your Report</span>
            <span>📋 View Details</span>
            <span>✅ Check Status</span>
          </div>

        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-12">

        {/* SEARCH */}
        <form
          onSubmit={handleTrack}
          className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm"
        >

          <div className="border-b border-slate-200 px-6 md:px-8 py-7">

            <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
              Find Your Report
            </p>

            <h2 className="text-2xl font-bold mt-2">
              Enter Your Reference Number
            </h2>

            <p className="text-slate-600 mt-2">
              Use the reference number generated when the report was submitted.
            </p>

          </div>

          <div className="p-6 md:p-8">

            <label className="block font-bold mb-2">
              Reference Number
            </label>

            <input
              type="text"
              value={reference}
              onChange={(event) =>
                setReference(event.target.value)
              }
              placeholder="Example: YSA-963736"
              className="w-full border border-slate-300 rounded-md p-4 text-slate-900 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-5 bg-slate-900 text-white font-bold py-4 rounded-md text-lg hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Searching..." : "Track Report →"}
            </button>

          </div>
        </form>

        {/* MESSAGE */}
        {message && (
          <div className="mt-6 border-l-4 border-amber-500 bg-amber-50 p-5 text-amber-900 font-semibold">
            {message}
          </div>
        )}

        {/* REPORT RESULT */}
        {report && (
          <div className="mt-8 bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm">

            {/* RESULT HEADER */}
            <div className="bg-slate-900 text-white px-6 md:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>
                <p className="text-emerald-400 text-sm uppercase tracking-widest font-bold">
                  Report Found
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  Report Details
                </h2>
              </div>

              <span
                className={`inline-block px-4 py-2 rounded-md border text-sm font-bold ${statusClass(
                  report.status
                )}`}
              >
                {report.status}
              </span>

            </div>

            <div className="p-6 md:p-8 space-y-8">

              {/* REFERENCE */}
              <div className="border-l-4 border-emerald-600 bg-slate-50 p-5">

                <p className="text-sm text-slate-500">
                  Reference Number
                </p>

                <p className="text-xl font-bold text-emerald-700 mt-1">
                  {report.reference_number}
                </p>

              </div>

              {/* DETAILS GRID */}
              <div className="grid sm:grid-cols-2 gap-6">

                <div className="border-b border-slate-200 pb-4">
                  <p className="text-sm text-slate-500">
                    Problem
                  </p>

                  <p className="font-bold mt-1">
                    {report.problem_type}
                  </p>
                </div>

                <div className="border-b border-slate-200 pb-4">
                  <p className="text-sm text-slate-500">
                    Municipality
                  </p>

                  <p className="font-bold mt-1">
                    {report.municipality}
                  </p>
                </div>

                <div className="border-b border-slate-200 pb-4">
                  <p className="text-sm text-slate-500">
                    Area
                  </p>

                  <p className="font-bold mt-1">
                    {report.area}
                  </p>
                </div>

                <div className="border-b border-slate-200 pb-4">
                  <p className="text-sm text-slate-500">
                    Location
                  </p>

                  <p className="font-bold mt-1">
                    {report.location}
                  </p>
                </div>

              </div>

              {/* DESCRIPTION */}
              <div>
                <p className="text-sm text-slate-500 mb-2">
                  Description
                </p>

                <p className="text-slate-800 leading-7">
                  {report.description}
                </p>
              </div>

              {/* PHOTO */}
              {report.photo_url && (
                <div className="border-t border-slate-200 pt-6">

                  <p className="text-sm text-slate-500 mb-3">
                    Photo Evidence
                  </p>

                  <img
                    src={report.photo_url}
                    alt="Reported municipal fault"
                    className="w-full max-w-lg rounded-md border border-slate-200"
                  />

                </div>
              )}

              {/* STATUS */}
              <div className="border-t border-slate-200 pt-6">

                <p className="text-sm text-slate-500">
                  Current Status
                </p>

                <span
                  className={`inline-block mt-3 px-4 py-2 rounded-md border text-sm font-bold ${statusClass(
                    report.status
                  )}`}
                >
                  {report.status}
                </span>

              </div>

              {/* SUBMITTED DATE */}
              {report.created_at && (
                <div className="border-t border-slate-200 pt-6">

                  <p className="text-sm text-slate-500">
                    Report Submitted
                  </p>

                  <p className="font-semibold mt-1">
                    {new Date(report.created_at).toLocaleDateString()}
                  </p>

                </div>
              )}

            </div>
          </div>
        )}

        {/* HELP CARDS */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8">

          <div className="bg-white border border-slate-200 p-5 rounded-md">
            <p className="text-2xl mb-3">
              🔎
            </p>

            <p className="font-bold">
              Track Anytime
            </p>

            <p className="text-slate-600 text-sm mt-2">
              Use your reference number whenever you need an update.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-md">
            <p className="text-2xl mb-3">
              📋
            </p>

            <p className="font-bold">
              See Your Details
            </p>

            <p className="text-slate-600 text-sm mt-2">
              Review the issue, location and supporting evidence.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-md">
            <p className="text-2xl mb-3">
              ✅
            </p>

            <p className="font-bold">
              Follow Progress
            </p>

            <p className="text-slate-600 text-sm mt-2">
              See whether the report is submitted, in progress or resolved.
            </p>
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
              Report Today. A Better Tomorrow.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">

            <a
              href="/"
              className="hover:text-white"
            >
              Home
            </a>

            <a
              href="/report"
              className="hover:text-white"
            >
              Report
            </a>

            <a
              href="/track"
              className="hover:text-white"
            >
              Track
            </a>

            <a
              href="/about"
              className="hover:text-white"
            >
              About
            </a>

            <a
              href="/review"
              className="hover:text-white"
            >
              Review
            </a>

          </div>

        </div>

      </footer>

    </main>
  );
}