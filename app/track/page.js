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
    <main className="min-h-screen bg-gray-50">

      <header className="bg-green-700 text-white px-6 py-5">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">
            YazisaSA 🇿🇦
          </a>

          <a
            href="/"
            className="text-sm border border-white px-4 py-2 rounded-lg"
          >
            Home
          </a>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Track My Report
          </h1>

          <p className="text-gray-600 mt-2">
            Enter your YazisaSA reference number to check the status.
          </p>
        </div>

        <form
          onSubmit={handleTrack}
          className="bg-white rounded-xl shadow p-6 space-y-5"
        >
          <div>
            <label className="block font-semibold mb-2">
              Reference Number
            </label>

            <input
              type="text"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder="Example: YSA-963736"
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white font-bold py-4 rounded-lg hover:bg-green-800"
          >
            {loading ? "Searching..." : "Track Report"}
          </button>
        </form>

        {message && (
          <div className="mt-6 rounded-lg bg-yellow-100 p-4 text-yellow-800">
            {message}
          </div>
        )}

        {report && (
          <div className="mt-6 bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Report Details
            </h2>

            <div>
              <p className="text-sm text-gray-500">Reference Number</p>
              <p className="font-semibold">{report.reference_number}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Problem</p>
              <p className="font-semibold">{report.problem_type}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Municipality</p>
              <p className="font-semibold">{report.municipality}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Area</p>
              <p className="font-semibold">{report.area}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold">{report.location}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p>{report.description}</p>
            </div>
            {report.photo_url && (
  <div className="mt-6">
    <p className="text-sm text-gray-500 mb-2">
      Photo
    </p>

    <img
      src={report.photo_url}
      alt="Reported municipal fault"
      className="w-full max-w-md rounded-lg border border-gray-200"
    />
  </div>
)}

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
        )}

      </section>
    </main>
  );
}