"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ReviewPage() {
  const [easeOfUse, setEaseOfUse] = useState("");
  const [reportingClarity, setReportingClarity] = useState("");
  const [trackingUsefulness, setTrackingUsefulness] = useState("");
  const [overallRating, setOverallRating] = useState("");
  const [improvement, setImprovement] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !easeOfUse ||
      !reportingClarity ||
      !trackingUsefulness ||
      !overallRating
    ) {
      setMessage("Please answer all four rating questions.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("reviews").insert([
      {
        ease_of_use: Number(easeOfUse),
        reporting_clarity: Number(reportingClarity),
        tracking_usefulness: Number(trackingUsefulness),
        overall_rating: Number(overallRating),
        improvement,
        reviewer_name: reviewerName,
      },
    ]);

    if (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setMessage("Thank you for your feedback!");
    setEaseOfUse("");
    setReportingClarity("");
    setTrackingUsefulness("");
    setOverallRating("");
    setImprovement("");
    setReviewerName("");
    setLoading(false);
  }

  function RatingButtons({ value, setValue }) {
    return (
      <div className="flex gap-3 flex-wrap mt-3">
        {[1, 2, 3, 4, 5].map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => setValue(String(number))}
            className={`w-12 h-12 rounded-full font-bold border ${
              value === String(number)
                ? "bg-green-700 text-white border-green-700"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    );
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

        <a
          href="/"
          className="border border-green-700 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-50"
        >
          Home
        </a>

      </div>
    </header>

    {/* HERO */}
    <section className="border-b border-green-100">
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-8 text-center">

        <p className="text-green-700 font-bold uppercase tracking-widest text-sm mb-3">
          Prototype Feedback
        </p>

        <h1 className="text-4xl md:text-5xl font-bold">
          Review <span className="text-green-700">YazisaSA</span>
        </h1>

        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
          Your feedback helps us understand what works well and what should
          be improved in the next version.
        </p>

      </div>
    </section>

    <section className="max-w-4xl mx-auto px-6 py-10">

      <div className="grid lg:grid-cols-3 gap-8 items-start">

        {/* LEFT INFO */}
        <div className="space-y-4">

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-2xl mb-2">⭐</p>
            <h2 className="font-bold text-lg">
              Quick Feedback
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Most questions only require a 1 to 5 rating.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <p className="text-2xl mb-2">📊</p>
            <h2 className="font-bold text-lg">
              Improve the Prototype
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Your ratings help identify areas that need improvement.
            </p>
          </div>

          <div className="bg-green-800 text-white rounded-2xl p-5 shadow-sm">
            <p className="text-green-200 text-sm uppercase tracking-widest font-bold">
              YazisaSA
            </p>

            <h2 className="text-2xl font-bold mt-2">
              Report it.
              <br />
              Track it.
              <br />
              Improve it.
            </h2>
          </div>

        </div>

        {/* REVIEW FORM */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

          <div className="bg-green-800 text-white px-6 md:px-8 py-6">

            <h2 className="text-2xl font-bold">
              Tell Us About Your Experience
            </h2>

            <p className="text-green-100 mt-1">
              Rate each question from 1 to 5.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 space-y-8"
          >

            <div>
              <p className="font-bold">
                1. How easy was YazisaSA to use?
              </p>

              <RatingButtons
                value={easeOfUse}
                setValue={setEaseOfUse}
              />
            </div>

            <div>
              <p className="font-bold">
                2. How clear was the reporting process?
              </p>

              <RatingButtons
                value={reportingClarity}
                setValue={setReportingClarity}
              />
            </div>

            <div>
              <p className="font-bold">
                3. How useful was the tracking feature?
              </p>

              <RatingButtons
                value={trackingUsefulness}
                setValue={setTrackingUsefulness}
              />
            </div>

            <div>
              <p className="font-bold">
                4. Overall, how would you rate YazisaSA?
              </p>

              <RatingButtons
                value={overallRating}
                setValue={setOverallRating}
              />
            </div>

            <div className="border-t border-gray-200 pt-7">

              <label className="block font-bold mb-2">
                What would you improve? (optional)
              </label>

              <textarea
                value={improvement}
                onChange={(event) => setImprovement(event.target.value)}
                rows="4"
                placeholder="Write one suggestion..."
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
              />

            </div>

            <div>

              <label className="block font-bold mb-2">
                Your name (optional)
              </label>

              <input
                type="text"
                value={reviewerName}
                onChange={(event) => setReviewerName(event.target.value)}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 disabled:opacity-50 shadow-md"
            >
              {loading ? "Submitting..." : "Submit Review →"}
            </button>

            {message && (
              <div className="rounded-xl bg-green-100 border border-green-200 p-4 text-green-900 font-semibold text-center">
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

        <div className="flex gap-6 text-sm">
          <a href="/">Home</a>
          <a href="/report">Report</a>
          <a href="/track">Track</a>
        </div>

        <p className="text-green-200 text-sm">
          Cleaner Communities. Brighter Tomorrows.
        </p>

      </div>

    </footer>

  </main>
);
}