"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ReviewPage() {
  const [reportReference, setReportReference] = useState("");

  const [easeOfUse, setEaseOfUse] = useState("");
  const [reportingClarity, setReportingClarity] = useState("");
  const [trackingUsefulness, setTrackingUsefulness] = useState("");
  const [overallRating, setOverallRating] = useState("");

  const [improvement, setImprovement] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  // User testing evidence
  const [ageGroup, setAgeGroup] = useState("");
  const [digitalExperience, setDigitalExperience] = useState("");
  const [testerType, setTesterType] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanReference = reportReference.trim().toUpperCase();

    // Reference number required
    if (!cleanReference) {
      setMessage(
        "Please enter the YazisaSA reference number you received when you submitted your report."
      );
      return;
    }

    // Ratings required
    if (
      !easeOfUse ||
      !reportingClarity ||
      !trackingUsefulness ||
      !overallRating
    ) {
      setMessage("Please answer all four rating questions.");
      return;
    }

    // Tester information required
    if (!ageGroup || !digitalExperience || !testerType) {
      setMessage("Please complete the testing information.");
      return;
    }

    // Consent required
    if (!consentGiven) {
      setMessage(
        "Please confirm that you agree to take part in the prototype testing."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    // STEP 1:
    // Check if this reference number exists in the reports table
    const { data: reportData, error: reportError } = await supabase
      .from("reports")
      .select("reference_number")
      .eq("reference_number", cleanReference)
      .maybeSingle();

    if (reportError) {
      console.error(reportError);
      setMessage(
        "We could not verify your reference number. Please try again."
      );
      setLoading(false);
      return;
    }

    if (!reportData) {
      setMessage(
        "Reference number not found. Please enter a valid YazisaSA report reference."
      );
      setLoading(false);
      return;
    }

    // STEP 2:
    // Check if this reference has already been used for a review
    const { data: existingReview, error: reviewCheckError } =
      await supabase
        .from("reviews")
        .select("id")
        .eq("report_reference", cleanReference)
        .maybeSingle();

    if (reviewCheckError) {
      console.error(reviewCheckError);
      setMessage(
        "We could not verify whether this reference has already been reviewed. Please try again."
      );
      setLoading(false);
      return;
    }

    if (existingReview) {
      setMessage(
        "This reference number has already been used to submit a review."
      );
      setLoading(false);
      return;
    }

    // STEP 3:
    // Save the review
    const { error } = await supabase.from("reviews").insert([
      {
        report_reference: cleanReference,

        ease_of_use: Number(easeOfUse),
        reporting_clarity: Number(reportingClarity),
        tracking_usefulness: Number(trackingUsefulness),
        overall_rating: Number(overallRating),

        improvement,
        reviewer_name: reviewerName,

        age_group: ageGroup,
        digital_experience: digitalExperience,
        tester_type: testerType,
        consent_given: consentGiven,
      },
    ]);

    if (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setMessage(
      "Thank you. Your feedback has been submitted successfully."
    );

    // Reset form
    setReportReference("");

    setEaseOfUse("");
    setReportingClarity("");
    setTrackingUsefulness("");
    setOverallRating("");

    setImprovement("");
    setReviewerName("");

    setAgeGroup("");
    setDigitalExperience("");
    setTesterType("");
    setConsentGiven(false);

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
            className={`w-12 h-12 rounded-md font-bold border transition ${
              value === String(number)
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-900 border-slate-300 hover:border-emerald-600"
            }`}
          >
            {number}
          </button>

        ))}

      </div>
    );
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

          <a
            href="/"
            className="border border-slate-900 text-slate-900 px-5 py-2 rounded-md font-semibold hover:bg-slate-100"
          >
            Home
          </a>

        </div>

      </header>

      {/* HERO */}
      <section className="bg-slate-900 text-white border-b border-slate-800">

        <div className="max-w-4xl mx-auto px-6 py-16 text-center">

          <p className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-sm">
            Prototype Feedback
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Review{" "}
            <span className="text-emerald-400">
              YazisaSA
            </span>
          </h1>

          <p className="text-slate-300 text-lg mt-5 max-w-2xl mx-auto leading-8">
            Your feedback helps us understand what works well and what can be
            improved in future versions of YazisaSA.
          </p>

        </div>

      </section>

      {/* PAGE CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-4">

            <div className="bg-white border border-slate-200 p-5 rounded-md">

              <p className="text-2xl mb-3">
                ⭐
              </p>

              <h2 className="font-bold text-lg">
                Quick Feedback
              </h2>

              <p className="text-slate-600 text-sm mt-2">
                Most questions only require a rating from 1 to 5.
              </p>

            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-md">

              <p className="text-2xl mb-3">
                🔎
              </p>

              <h2 className="font-bold text-lg">
                Verified Testing
              </h2>

              <p className="text-slate-600 text-sm mt-2">
                A valid YazisaSA report reference is required before feedback
                can be submitted.
              </p>

            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-md">

              <p className="text-2xl mb-3">
                📊
              </p>

              <h2 className="font-bold text-lg">
                Improve the Prototype
              </h2>

              <p className="text-slate-600 text-sm mt-2">
                Your feedback helps identify what works and what still needs
                improvement.
              </p>

            </div>

            <div className="bg-slate-900 text-white p-6 rounded-md">

              <p className="text-emerald-400 text-sm uppercase tracking-widest font-bold">
                YazisaSA
              </p>

              <h2 className="text-2xl font-bold mt-3">
                Report it.
                <br />
                Track it.
                <br />
                <span className="text-emerald-400">
                  Improve it.
                </span>
              </h2>

            </div>

          </div>

          {/* REVIEW FORM */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-md overflow-hidden">

            <div className="border-b border-slate-200 px-6 md:px-8 py-7">

              <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
                User Testing
              </p>

              <h2 className="text-2xl font-bold mt-2">
                Tell Us About Your Experience
              </h2>

              <p className="text-slate-600 mt-2">
                Please enter the reference number from the report you tested,
                then complete the short feedback form.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 space-y-9"
            >

              {/* REPORT VERIFICATION */}
              <div className="border-l-4 border-emerald-600 bg-emerald-50 p-6">

                <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
                  Verify Prototype Use
                </p>

                <h3 className="text-xl font-bold mt-2">
                  Your YazisaSA Reference Number
                </h3>

                <p className="text-slate-600 text-sm mt-2">
                  Enter the reference number you received after submitting a
                  municipal fault report. Each reference number can only be used
                  for one review.
                </p>

                <input
                  type="text"
                  value={reportReference}
                  onChange={(event) =>
                    setReportReference(event.target.value.toUpperCase())
                  }
                  placeholder="Example: YSA-963736"
                  className="w-full mt-5 border border-slate-300 rounded-md p-3 text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />

              </div>

              {/* TESTER DETAILS */}
              <div>

                <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
                  About the Tester
                </p>

                <h3 className="text-xl font-bold mt-2">
                  Testing Information
                </h3>

                <p className="text-slate-600 text-sm mt-2">
                  This information helps evaluate the prototype across
                  different types of users. Exact age is not required.
                </p>

                <div className="grid md:grid-cols-2 gap-5 mt-6">

                  {/* AGE GROUP */}
                  <div>

                    <label className="block font-bold mb-2">
                      Age Group
                    </label>

                    <select
                      value={ageGroup}
                      onChange={(event) =>
                        setAgeGroup(event.target.value)
                      }
                      className="w-full border border-slate-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option value="">
                        Select age group
                      </option>

                      <option value="Under 18">
                        Under 18
                      </option>

                      <option value="18-25">
                        18–25
                      </option>

                      <option value="26-40">
                        26–40
                      </option>

                      <option value="41-60">
                        41–60
                      </option>

                      <option value="60+">
                        60+
                      </option>

                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>

                    </select>

                  </div>

                  {/* DIGITAL EXPERIENCE */}
                  <div>

                    <label className="block font-bold mb-2">
                      Digital Experience
                    </label>

                    <select
                      value={digitalExperience}
                      onChange={(event) =>
                        setDigitalExperience(event.target.value)
                      }
                      className="w-full border border-slate-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option value="">
                        Select level
                      </option>

                      <option value="Low">
                        Low
                      </option>

                      <option value="Medium">
                        Medium
                      </option>

                      <option value="High">
                        High
                      </option>

                    </select>

                  </div>

                  {/* TESTER TYPE */}
                  <div className="md:col-span-2">

                    <label className="block font-bold mb-2">
                      Tester Type
                    </label>

                    <select
                      value={testerType}
                      onChange={(event) =>
                        setTesterType(event.target.value)
                      }
                      className="w-full border border-slate-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option value="">
                        Select tester type
                      </option>

                      <option value="Resident">
                        Resident
                      </option>

                      <option value="Municipal Employee">
                        Municipal Employee
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>

                </div>

              </div>

              {/* CONSENT */}
              <div className="border-l-4 border-emerald-600 bg-slate-50 p-6">

                <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
                  Prototype Testing Consent
                </p>

                <p className="text-slate-700 mt-3 leading-7">
                  I voluntarily agree to test the YazisaSA prototype and allow
                  my feedback to be used for project evaluation and improvement.
                  I understand that participation is voluntary.
                </p>

                <label className="flex items-start gap-3 mt-5 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(event) =>
                      setConsentGiven(event.target.checked)
                    }
                    className="mt-1 w-5 h-5 accent-emerald-600"
                  />

                  <span className="font-bold">
                    I agree to participate in the YazisaSA prototype testing.
                  </span>

                </label>

              </div>

              {/* RATINGS */}
              <div className="border-t border-slate-200 pt-8">

                <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
                  Prototype Ratings
                </p>

                <p className="text-slate-600 mt-2">
                  1 = Very Poor &nbsp;&nbsp; 5 = Excellent
                </p>

              </div>

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

              {/* IMPROVEMENT */}
              <div className="border-t border-slate-200 pt-8">

                <label className="block font-bold mb-2">
                  What would you improve? (Optional)
                </label>

                <textarea
                  value={improvement}
                  onChange={(event) =>
                    setImprovement(event.target.value)
                  }
                  rows="4"
                  placeholder="Write one suggestion..."
                  className="w-full border border-slate-300 rounded-md p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />

              </div>

              {/* NAME */}
              <div>

                <label className="block font-bold mb-2">
                  Your Name (Optional)
                </label>

                <p className="text-sm text-slate-600 mb-3">
                  You may leave this blank if you prefer your feedback to be
                  anonymous.
                </p>

                <input
                  type="text"
                  value={reviewerName}
                  onChange={(event) =>
                    setReviewerName(event.target.value)
                  }
                  placeholder="Enter your name"
                  className="w-full border border-slate-300 rounded-md p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-md font-bold text-lg hover:bg-slate-800 disabled:opacity-50"
              >
                {loading
                  ? "Verifying & Submitting..."
                  : "Submit Review →"}
              </button>

              {/* MESSAGE */}
              {message && (
                <div className="border-l-4 border-emerald-600 bg-emerald-50 p-4 text-slate-900 font-semibold">
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
              Report Today. A Better Tomorrow.
            </p>

          </div>

          <div className="flex gap-6 text-sm">

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

          </div>

        </div>

      </footer>

    </main>
  );
}