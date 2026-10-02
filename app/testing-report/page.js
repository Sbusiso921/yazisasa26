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

  // Only reviews with recorded consent are used
  // in the formal user-testing analysis.
  const consentedReviews = reviews.filter(
    (review) => review.consent_given === true
  );

  // Older reviews submitted before consent was added.
  const olderFeedback = reviews.filter(
    (review) => review.consent_given !== true
  );

  function average(field) {
    const valid = consentedReviews.filter(
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
    return consentedReviews.filter(
      (review) => review[field] === value
    ).length;
  }

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

        {/* TITLE */}
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

        {/* TESTING SUMMARY */}
        <div className="mt-8">

          <h2 className="text-2xl font-bold">
            1. Testing Summary
          </h2>

          <p className="text-slate-600 mt-3 leading-7">
            This report summarises feedback submitted during YazisaSA prototype
            testing. Only participants with recorded electronic consent are
            included in the formal user-testing analysis. Older feedback
            submitted before the consent field was introduced is shown
            separately and is not included in the formal testing averages.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

            <div className="border border-slate-300 p-4">

              <p className="text-sm text-slate-500">
                Total Feedback Records
              </p>

              <p className="text-3xl font-bold mt-1">
                {reviews.length}
              </p>

            </div>

            <div className="border border-emerald-300 bg-emerald-50 p-4">

              <p className="text-sm text-slate-500">
                Consented Testers
              </p>

              <p className="text-3xl font-bold text-emerald-700 mt-1">
                {consentedReviews.length}
              </p>

            </div>

            <div className="border border-amber-300 bg-amber-50 p-4">

              <p className="text-sm text-slate-500">
                Older Feedback
              </p>

              <p className="text-3xl font-bold text-amber-700 mt-1">
                {olderFeedback.length}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                No recorded consent
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

          </div>

        </div>

        {/* AVERAGE RATINGS */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            2. Average User Ratings
          </h2>

          <p className="text-slate-600 mt-2">
            These averages include consented testers only.
          </p>

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
            3. Consented Participant Profile
          </h2>

          <p className="text-slate-600 mt-2">
            The information below includes only participants with recorded
            consent.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-5">

            {/* AGE */}
            <div>

              <h3 className="font-bold mb-3">
                Age Groups
              </h3>

              <p>
                Under 18:{" "}
                {countBy("age_group", "Under 18")}
              </p>

              <p>
                18–25:{" "}
                {countBy("age_group", "18-25")}
              </p>

              <p>
                26–40:{" "}
                {countBy("age_group", "26-40")}
              </p>

              <p>
                41–60:{" "}
                {countBy("age_group", "41-60")}
              </p>

              <p>
                60+:{" "}
                {countBy("age_group", "60+")}
              </p>

              <p>
                Prefer not to say:{" "}
                {countBy(
                  "age_group",
                  "Prefer not to say"
                )}
              </p>

            </div>

            {/* DIGITAL EXPERIENCE */}
            <div>

              <h3 className="font-bold mb-3">
                Digital Experience
              </h3>

              <p>
                Low:{" "}
                {countBy(
                  "digital_experience",
                  "Low"
                )}
              </p>

              <p>
                Medium:{" "}
                {countBy(
                  "digital_experience",
                  "Medium"
                )}
              </p>

              <p>
                High:{" "}
                {countBy(
                  "digital_experience",
                  "High"
                )}
              </p>

            </div>

            {/* TESTER TYPE */}
            <div>

              <h3 className="font-bold mb-3">
                Tester Type
              </h3>

              <p>
                Resident:{" "}
                {countBy(
                  "tester_type",
                  "Resident"
                )}
              </p>

              <p>
                Municipal Employee:{" "}
                {countBy(
                  "tester_type",
                  "Municipal Employee"
                )}
              </p>

              <p>
                Other:{" "}
                {countBy(
                  "tester_type",
                  "Other"
                )}
              </p>

            </div>

          </div>

        </div>

        {/* CONSENTED RESULTS */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            4. Consented Participant Results
          </h2>

          <p className="text-slate-600 mt-2">
            Participant names are not included in this report.
          </p>

          {consentedReviews.length === 0 ? (

            <p className="text-slate-600 mt-5">
              No consented testing records are available.
            </p>

          ) : (

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

                  {consentedReviews.map(
                    (review, index) => (

                      <tr key={review.id}>

                        <td className="border border-slate-300 p-2">
                          T
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </td>

                        <td className="border border-slate-300 p-2">
                          {review.age_group ||
                            "Not recorded"}
                        </td>

                        <td className="border border-slate-300 p-2">
                          {review.digital_experience ||
                            "Not recorded"}
                        </td>

                        <td className="border border-slate-300 p-2">
                          {review.tester_type ||
                            "Not recorded"}
                        </td>

                        <td className="border border-slate-300 p-2 font-bold text-emerald-700">
                          Yes
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

                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* OLDER FEEDBACK */}
        {olderFeedback.length > 0 && (

          <div className="mt-10">

            <h2 className="text-2xl font-bold">
              5. Earlier Prototype Feedback
            </h2>

            <div className="border-l-4 border-amber-500 bg-amber-50 p-5 mt-4">

              <p className="font-bold text-amber-900">
                Important Note
              </p>

              <p className="text-slate-700 mt-2 leading-7">
                {olderFeedback.length} earlier feedback record
                {olderFeedback.length !== 1 ? "s were" : " was"} submitted
                before electronic participant consent was added to the
                prototype. These records are retained as earlier prototype
                feedback but are not included in the formal consented
                user-testing averages or participant profile.
              </p>

            </div>

          </div>
        )}

        {/* IMPROVEMENT SUGGESTIONS */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            {olderFeedback.length > 0
              ? "6. Consented User Improvement Suggestions"
              : "5. Consented User Improvement Suggestions"}
          </h2>

          <p className="text-slate-600 mt-2">
            The suggestions below were submitted by participants with recorded
            consent.
          </p>

          <div className="mt-5 space-y-4">

            {consentedReviews.filter(
              (review) =>
                review.improvement &&
                review.improvement.trim() !== ""
            ).length === 0 ? (

              <p className="text-slate-600">
                No improvement suggestions were submitted.
              </p>

            ) : (

              consentedReviews
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

        {/* PARTICIPATION AND CONSENT */}
        <div className="mt-10 border-t border-slate-300 pt-6">

          <h2 className="text-xl font-bold">
            Participation and Consent
          </h2>

          <p className="text-slate-600 mt-3 leading-7">
            Participants included in the formal user-testing analysis were
            informed that the purpose of the testing was to evaluate and
            improve the YazisaSA prototype. Participation was voluntary, and
            the testing form required each participant to confirm consent
            before submitting feedback.
          </p>

          <p className="text-slate-600 mt-3 leading-7">
            Feedback submitted before the electronic consent feature was added
            is identified separately and is not included in the formal
            user-testing results.
          </p>

          <p className="text-sm text-slate-500 mt-6">
            Report generated from YazisaSA prototype testing records.
          </p>

        </div>

      </section>

    </main>
  );
}