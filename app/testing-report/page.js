"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function TestingReportPage() {
  const router = useRouter();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/municipal-login");
        return;
      }

      const { data, error } = await supabase
        .from("reviews")
        .select(
          `
          id,
          created_at,
          overall_rating,
          ease_of_use,
          reporting_clarity,
          tracking_usefulness,
          improvement,
          age_group,
          digital_experience,
          tester_type,
          consent_given
          `
        )
        .order("created_at", { ascending: true });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setReviews(data || []);
      setLoading(false);
    }

    loadPage();
  }, [router]);

  function average(field) {
    const valid = reviews.filter(
      (review) =>
        review[field] !== null &&
        review[field] !== undefined
    );

    if (valid.length === 0) return "0.0";

    const total = valid.reduce(
      (sum, review) => sum + Number(review[field]),
      0
    );

    return (total / valid.length).toFixed(1);
  }

  function countBy(field, value) {
    return reviews.filter(
      (review) => review[field] === value
    ).length;
  }

  const consentCount = reviews.filter(
    (review) => review.consent_given === true
  ).length;

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-bold">
          Loading testing report...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 print:bg-white">

      {/* SCREEN HEADER */}
      <header className="bg-slate-900 text-white print:hidden">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest">
              YazisaSA
            </p>

            <h1 className="text-2xl font-bold">
              User Testing Report
            </h1>
          </div>

          <div className="flex gap-3">

            <a
              href="/municipal"
              className="border border-slate-500 px-4 py-2 rounded-md font-bold"
            >
              Dashboard
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="bg-emerald-500 text-slate-950 px-5 py-2 rounded-md font-bold"
            >
              🖨 Print / Save as PDF
            </button>

          </div>
        </div>
      </header>

      {/* REPORT */}
      <section className="max-w-5xl mx-auto bg-white my-10 p-10 border border-slate-200 print:border-0 print:my-0 print:max-w-none">

        {/* REPORT TITLE */}
        <div className="border-b-4 border-emerald-600 pb-6">

          <div className="flex items-start justify-between gap-8">

            <div>
              <p className="text-emerald-700 font-bold uppercase tracking-widest text-sm">
                YazisaSA
              </p>

              <h1 className="text-4xl font-bold mt-2">
                Prototype User Testing Report
              </h1>

              <p className="text-slate-600 mt-3">
                Summary of user participation, consent and prototype feedback.
              </p>
            </div>

            <img
              src="/yazisasa-logo.png"
              alt="YazisaSA"
              className="h-20 w-auto"
            />

          </div>
        </div>

        {/* TEST SUMMARY */}
        <div className="mt-8">

          <h2 className="text-2xl font-bold">
            1. Testing Summary
          </h2>

          <p className="text-slate-600 mt-3 leading-7">
            This report summarises feedback submitted by users who tested
            the YazisaSA prototype. Participants were asked to provide
            basic demographic information, indicate their level of digital
            experience and confirm whether they voluntarily agreed to take
            part in the prototype testing.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

            <div className="border border-slate-300 p-4">
              <p className="text-sm text-slate-500">
                Total Testers
              </p>

              <p className="text-3xl font-bold mt-1">
                {reviews.length}
              </p>
            </div>

            <div className="border border-slate-300 p-4">
              <p className="text-sm text-slate-500">
                Consent Given
              </p>

              <p className="text-3xl font-bold mt-1">
                {consentCount}
              </p>
            </div>

            <div className="border border-slate-300 p-4">
              <p className="text-sm text-slate-500">
                Average Overall
              </p>

              <p className="text-3xl font-bold mt-1">
                {average("overall_rating")}/5
              </p>
            </div>

            <div className="border border-slate-300 p-4">
              <p className="text-sm text-slate-500">
                Ease of Use
              </p>

              <p className="text-3xl font-bold mt-1">
                {average("ease_of_use")}/5
              </p>
            </div>

          </div>
        </div>

        {/* RATING RESULTS */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            2. Average User Ratings
          </h2>

          <table className="w-full border-collapse mt-5">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 p-3 text-left">
                  Measure
                </th>

                <th className="border border-slate-300 p-3 text-left">
                  Average Rating
                </th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td className="border border-slate-300 p-3">
                  Overall Experience
                </td>

                <td className="border border-slate-300 p-3 font-bold">
                  {average("overall_rating")}/5
                </td>
              </tr>

              <tr>
                <td className="border border-slate-300 p-3">
                  Ease of Use
                </td>

                <td className="border border-slate-300 p-3 font-bold">
                  {average("ease_of_use")}/5
                </td>
              </tr>

              <tr>
                <td className="border border-slate-300 p-3">
                  Reporting Clarity
                </td>

                <td className="border border-slate-300 p-3 font-bold">
                  {average("reporting_clarity")}/5
                </td>
              </tr>

              <tr>
                <td className="border border-slate-300 p-3">
                  Tracking Usefulness
                </td>

                <td className="border border-slate-300 p-3 font-bold">
                  {average("tracking_usefulness")}/5
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* PARTICIPANT PROFILE */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            3. Participant Profile
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-5">

            {/* AGE */}
            <div>
              <h3 className="font-bold mb-3">
                Age Groups
              </h3>

              <p>Under 18: {countBy("age_group", "Under 18")}</p>
              <p>18–25: {countBy("age_group", "18-25")}</p>
              <p>26–40: {countBy("age_group", "26-40")}</p>
              <p>41–60: {countBy("age_group", "41-60")}</p>
              <p>60+: {countBy("age_group", "60+")}</p>
            </div>

            {/* DIGITAL EXPERIENCE */}
            <div>
              <h3 className="font-bold mb-3">
                Digital Experience
              </h3>

              <p>
                Low: {countBy("digital_experience", "Low")}
              </p>

              <p>
                Medium: {countBy("digital_experience", "Medium")}
              </p>

              <p>
                High: {countBy("digital_experience", "High")}
              </p>
            </div>

            {/* TESTER TYPE */}
            <div>
              <h3 className="font-bold mb-3">
                Tester Type
              </h3>

              <p>
                Resident: {countBy("tester_type", "Resident")}
              </p>

              <p>
                Municipal Employee:{" "}
                {countBy("tester_type", "Municipal Employee")}
              </p>

              <p>
                Other: {countBy("tester_type", "Other")}
              </p>
            </div>

          </div>
        </div>

        {/* PARTICIPANT RESULTS */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            4. Anonymous Participant Results
          </h2>

          <p className="text-slate-600 mt-2">
            Participant names are not included in this report.
          </p>

          <div className="overflow-x-auto mt-5">

            <table className="w-full border-collapse text-sm">

              <thead>
                <tr className="bg-slate-100">

                  <th className="border border-slate-300 p-2">
                    Tester
                  </th>

                  <th className="border border-slate-300 p-2">
                    Age
                  </th>

                  <th className="border border-slate-300 p-2">
                    Digital Experience
                  </th>

                  <th className="border border-slate-300 p-2">
                    Type
                  </th>

                  <th className="border border-slate-300 p-2">
                    Consent
                  </th>

                  <th className="border border-slate-300 p-2">
                    Overall
                  </th>

                  <th className="border border-slate-300 p-2">
                    Ease
                  </th>

                  <th className="border border-slate-300 p-2">
                    Clarity
                  </th>

                  <th className="border border-slate-300 p-2">
                    Tracking
                  </th>

                </tr>
              </thead>

              <tbody>

                {reviews.map((review, index) => (
                  <tr key={review.id}>

                    <td className="border border-slate-300 p-2">
                      T{String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="border border-slate-300 p-2">
                      {review.age_group || "Not recorded"}
                    </td>

                    <td className="border border-slate-300 p-2">
                      {review.digital_experience || "Not recorded"}
                    </td>

                    <td className="border border-slate-300 p-2">
                      {review.tester_type || "Not recorded"}
                    </td>

                    <td className="border border-slate-300 p-2">
                      {review.consent_given ? "Yes" : "Not recorded"}
                    </td>

                    <td className="border border-slate-300 p-2">
                      {review.overall_rating}/5
                    </td>

                    <td className="border border-slate-300 p-2">
                      {review.ease_of_use}/5
                    </td>

                    <td className="border border-slate-300 p-2">
                      {review.reporting_clarity}/5
                    </td>

                    <td className="border border-slate-300 p-2">
                      {review.tracking_usefulness}/5
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>

          </div>
        </div>

        {/* SUGGESTIONS */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            5. User Improvement Suggestions
          </h2>

          <div className="mt-5 space-y-4">

            {reviews.filter(
              (review) =>
                review.improvement &&
                review.improvement.trim() !== ""
            ).length === 0 ? (
              <p className="text-slate-600">
                No improvement suggestions were submitted.
              </p>
            ) : (
              reviews
                .filter(
                  (review) =>
                    review.improvement &&
                    review.improvement.trim() !== ""
                )
                .map((review, index) => (
                  <div
                    key={review.id}
                    className="border-l-4 border-emerald-600 bg-slate-50 p-4"
                  >
                    <p className="font-bold">
                      Feedback {index + 1}
                    </p>

                    <p className="text-slate-700 mt-2">
                      {review.improvement}
                    </p>
                  </div>
                ))
            )}

          </div>
        </div>

        {/* CONSENT NOTE */}
        <div className="mt-10 border-t border-slate-300 pt-6">

          <h2 className="text-xl font-bold">
            Participation and Consent
          </h2>

          <p className="text-slate-600 mt-3 leading-7">
            Participants were informed that the purpose of the testing was
            to evaluate and improve the YazisaSA prototype. Participation
            was voluntary. The testing form required participants to confirm
            consent before submitting new feedback.
          </p>

          <p className="text-sm text-slate-500 mt-6">
            Report generated from YazisaSA prototype testing records.
          </p>

        </div>

      </section>

    </main>
  );
}