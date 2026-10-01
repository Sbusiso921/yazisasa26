"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function MunicipalPage() {
  const router = useRouter();

  const [reports, setReports] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [dashboardView, setDashboardView] = useState("reports");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openReportId, setOpenReportId] = useState(null);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reference_number
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      report.problem_type
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      report.area
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      report.location
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalReports = reports.length;

  const submittedReports = reports.filter(
    (report) => report.status === "Submitted"
  ).length;

  const inProgressReports = reports.filter(
    (report) => report.status === "In Progress"
  ).length;

  const resolvedReports = reports.filter(
    (report) => report.status === "Resolved"
  ).length;

  async function loadReports() {
    setLoading(true);

    const { data, error } = await supabase
      .from("reports")
      .select(
        "id, reference_number, problem_type, municipality, area, location, description, photo_url, status, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setMessage("Could not load reports.");
    } else {
      setReports(data || []);
    }

    setLoading(false);
  }

  async function loadReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select(
        "id, created_at, overall_rating, reporting_clarity, ease_of_use, tracking_usefulness, improvement, reviewer_name, age_group, digital_experience, tester_type, consent_given"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setReviews(data || []);
  }

  async function updateStatus(id, newStatus) {
    setMessage("");

    const { error } = await supabase
      .from("reports")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error(error);
      setMessage("Could not update the report.");
    } else {
      setMessage("Status updated successfully.");
      loadReports();
    }
  }

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/municipal-login");
        return;
      }

      loadReports();
      loadReviews();
    }

    checkUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/municipal-login");
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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

          <a href="/">
            <img
              src="/yazisasa-logo.png"
              alt="YazisaSA"
              className="h-20 md:h-24 w-auto"
            />
          </a>

          <div className="flex items-center gap-3">

            <a
              href="/"
              className="hidden sm:inline-block font-semibold px-4 py-2 hover:text-emerald-700"
            >
              Home
            </a>

            <button
              onClick={handleLogout}
              className="bg-slate-900 text-white px-5 py-2 rounded-md font-semibold hover:bg-slate-800"
            >
              Logout
            </button>

          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-slate-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <p className="text-emerald-400 uppercase tracking-[0.2em] text-sm font-bold">
            Municipal Administration
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-3">

            <div>

              <h1 className="text-4xl md:text-5xl font-bold">
                Municipal{" "}
                <span className="text-emerald-400">
                  Dashboard
                </span>
              </h1>

              <p className="text-slate-300 text-lg mt-4 max-w-2xl leading-8">
                Review municipal fault reports, monitor progress and update
                residents on the status of reported issues.
              </p>

            </div>

            <div className="border-l-4 border-emerald-500 bg-slate-800 px-6 py-4">

              <p className="text-slate-300 text-sm">
                Total Reports
              </p>

              <p className="text-3xl font-bold mt-1">
                {totalReports}
              </p>

            </div>

          </div>

          {/* DASHBOARD NAV */}
          <div className="flex flex-wrap gap-3 mt-8">

            <button
              type="button"
              onClick={() =>
                setDashboardView("reports")
              }
              className={`px-5 py-3 rounded-md font-bold border ${
                dashboardView === "reports"
                  ? "bg-emerald-500 text-slate-950 border-emerald-500"
                  : "bg-transparent text-white border-slate-600 hover:border-slate-400"
              }`}
            >
              📋 Reports
            </button>

            <button
              type="button"
              onClick={() =>
                setDashboardView("reviews")
              }
              className={`px-5 py-3 rounded-md font-bold border ${
                dashboardView === "reviews"
                  ? "bg-emerald-500 text-slate-950 border-emerald-500"
                  : "bg-transparent text-white border-slate-600 hover:border-slate-400"
              }`}
            >
              ⭐ User Reviews
            </button>

            <a
              href="/testing-report"
              className="px-5 py-3 rounded-md font-bold border border-slate-600 text-white hover:border-emerald-400 hover:text-emerald-400"
            >
              🧾 Testing Report
            </a>

          </div>

        </div>

      </section>

      {/* REPORTS VIEW */}
      {dashboardView === "reports" && (
        <section className="max-w-7xl mx-auto px-6 py-10">

          {/* SUMMARY */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

            <div className="bg-white border border-slate-200 p-5 rounded-md">

              <div className="flex justify-between">

                <div>
                  <p className="text-slate-500 text-sm">
                    Total Reports
                  </p>

                  <p className="text-3xl font-bold mt-2">
                    {totalReports}
                  </p>
                </div>

                <p className="text-2xl">📋</p>

              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-md">

              <div className="flex justify-between">

                <div>
                  <p className="text-slate-500 text-sm">
                    Submitted
                  </p>

                  <p className="text-3xl font-bold mt-2">
                    {submittedReports}
                  </p>
                </div>

                <p className="text-2xl">📨</p>

              </div>
            </div>

            <div className="bg-white border border-amber-200 p-5 rounded-md">

              <div className="flex justify-between">

                <div>
                  <p className="text-slate-500 text-sm">
                    In Progress
                  </p>

                  <p className="text-3xl font-bold text-amber-700 mt-2">
                    {inProgressReports}
                  </p>
                </div>

                <p className="text-2xl">⏳</p>

              </div>
            </div>

            <div className="bg-white border border-emerald-200 p-5 rounded-md">

              <div className="flex justify-between">

                <div>
                  <p className="text-slate-500 text-sm">
                    Resolved
                  </p>

                  <p className="text-3xl font-bold text-emerald-700 mt-2">
                    {resolvedReports}
                  </p>
                </div>

                <p className="text-2xl">✅</p>

              </div>
            </div>

          </div>

          {/* SEARCH / FILTER */}
          <div className="bg-white border border-slate-200 rounded-md p-5 mb-8">

            <div className="flex flex-col md:flex-row gap-4">

              <div className="flex-1">

                <label className="block text-sm font-bold mb-2">
                  Search Reports
                </label>

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search reference, problem, area or location..."
                  className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />

              </div>

              <div className="md:w-64">

                <label className="block text-sm font-bold mb-2">
                  Filter by Status
                </label>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="w-full border border-slate-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="All">
                    All Reports
                  </option>

                  <option value="Submitted">
                    Submitted
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Resolved">
                    Resolved
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* MESSAGE */}
          {message && (
            <div className="mb-6 border-l-4 border-emerald-600 bg-emerald-50 p-4 text-slate-900 font-semibold">
              {message}
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="bg-white border border-slate-200 rounded-md p-10 text-center">

              <p className="text-slate-600 font-semibold">
                Loading municipal reports...
              </p>

            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            filteredReports.length === 0 && (

              <div className="bg-white border border-slate-200 rounded-md p-10 text-center">

                <p className="text-4xl">
                  🔎
                </p>

                <h2 className="text-xl font-bold mt-3">
                  No Reports Found
                </h2>

                <p className="text-slate-600 mt-2">
                  Try changing your search or status filter.
                </p>

              </div>
            )}

          {/* REPORT LIST */}
          {!loading &&
            filteredReports.length > 0 && (

              <div className="space-y-5">

                <div className="flex justify-between items-center">

                  <h2 className="text-2xl font-bold">
                    Municipal Reports
                  </h2>

                  <p className="text-slate-500 text-sm">
                    Showing {filteredReports.length} report
                    {filteredReports.length !== 1
                      ? "s"
                      : ""}
                  </p>

                </div>

                {filteredReports.map((report) => (

                  <div
                    key={report.id}
                    className="bg-white border border-slate-200 rounded-md overflow-hidden"
                  >

                    {/* COMPACT REPORT */}
                    <div className="p-5 grid md:grid-cols-5 gap-4 items-center">

                      <div>

                        <p className="text-xs text-slate-500">
                          Reference
                        </p>

                        <p className="font-bold text-emerald-700">
                          {report.reference_number}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-slate-500">
                          Problem
                        </p>

                        <p className="font-semibold">
                          {report.problem_type}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-slate-500">
                          Area
                        </p>

                        <p className="font-semibold">
                          {report.area}
                        </p>

                      </div>

                      <div>

                        <span
                          className={`inline-block px-3 py-1 rounded-md border text-sm font-bold ${statusClass(
                            report.status
                          )}`}
                        >
                          {report.status}
                        </span>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setOpenReportId(
                            openReportId === report.id
                              ? null
                              : report.id
                          )
                        }
                        className="border border-slate-900 text-slate-900 px-4 py-2 rounded-md font-semibold hover:bg-slate-100"
                      >
                        {openReportId === report.id
                          ? "Hide Details"
                          : "View Details"}
                      </button>

                    </div>

                    {/* EXPANDED REPORT */}
                    {openReportId === report.id && (

                      <div className="border-t border-slate-200 bg-slate-50 p-6">

                        <div className="grid md:grid-cols-2 gap-6">

                          <div>

                            <p className="text-sm text-slate-500">
                              Municipality
                            </p>

                            <p className="font-semibold mt-1">
                              {report.municipality}
                            </p>

                          </div>

                          <div>

                            <p className="text-sm text-slate-500">
                              Location
                            </p>

                            <p className="font-semibold mt-1">
                              {report.location}
                            </p>

                            {report.location && (
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                  report.location
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 text-emerald-700 font-semibold hover:underline"
                              >
                                📍 Open in Maps
                              </a>
                            )}

                          </div>

                        </div>

                        <div className="mt-6">

                          <p className="text-sm text-slate-500">
                            Description
                          </p>

                          <p className="mt-2 leading-7">
                            {report.description}
                          </p>

                        </div>

                        {report.photo_url && (

                          <div className="mt-6">

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

                        <div className="mt-6 max-w-sm">

                          <label className="block font-bold mb-2">
                            Update Status
                          </label>

                          <select
                            value={report.status}
                            onChange={(event) =>
                              updateStatus(
                                report.id,
                                event.target.value
                              )
                            }
                            className="w-full border border-slate-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                          >
                            <option value="Submitted">
                              Submitted
                            </option>

                            <option value="In Progress">
                              In Progress
                            </option>

                            <option value="Resolved">
                              Resolved
                            </option>
                          </select>

                        </div>

                      </div>
                    )}

                  </div>
                ))}

              </div>
            )}

        </section>
      )}

      {/* REVIEWS VIEW */}
      {dashboardView === "reviews" && (

        <section className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">

            <div>

              <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
                Prototype Feedback
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                User Reviews
              </h2>

              <p className="text-slate-600 mt-2">
                Feedback submitted by people who tested YazisaSA.
              </p>

            </div>

            <div className="bg-slate-900 text-white border-l-4 border-emerald-500 px-6 py-4">

              <p className="text-slate-300 text-sm">
                Total Reviews
              </p>

              <p className="text-3xl font-bold">
                {reviews.length}
              </p>

            </div>

          </div>

          {reviews.length === 0 ? (

            <div className="bg-white border border-slate-200 rounded-md p-10 text-center">

              <p className="text-slate-600 font-semibold">
                No reviews have been submitted yet.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {reviews.map((review) => (

                <div
                  key={review.id}
                  className="bg-white border border-slate-200 rounded-md p-6"
                >

                  {/* REVIEW TOP */}
                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="text-sm text-slate-500">
                        Reviewer
                      </p>

                      <p className="font-bold text-lg">
                        {review.reviewer_name ||
                          "Anonymous"}
                      </p>

                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-md px-4 py-2 text-center">

                      <p className="text-xs text-slate-600 font-semibold">
                        Overall
                      </p>

                      <p className="text-xl font-bold text-emerald-800">
                        ⭐ {review.overall_rating}/5
                      </p>

                    </div>

                  </div>

                  {/* RATINGS */}
                  <div className="grid grid-cols-2 gap-3 mt-6">

                    <div className="bg-slate-50 border border-slate-200 p-4">

                      <p className="text-sm text-slate-500">
                        Ease of Use
                      </p>

                      <p className="font-bold mt-1">
                        {review.ease_of_use}/5
                      </p>

                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4">

                      <p className="text-sm text-slate-500">
                        Reporting Clarity
                      </p>

                      <p className="font-bold mt-1">
                        {review.reporting_clarity}/5
                      </p>

                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4">

                      <p className="text-sm text-slate-500">
                        Tracking Usefulness
                      </p>

                      <p className="font-bold mt-1">
                        {review.tracking_usefulness
                          ? `${review.tracking_usefulness}/5`
                          : "Not recorded"}
                      </p>

                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4">

                      <p className="text-sm text-slate-500">
                        Consent
                      </p>

                      <p className="font-bold mt-1">
                        {review.consent_given
                          ? "Yes"
                          : "Not recorded"}
                      </p>

                    </div>

                  </div>

                  {/* TESTER INFO */}
                  <div className="border-t border-slate-200 mt-6 pt-5">

                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                      Tester Information
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4 mt-4">

                      <div>
                        <p className="text-xs text-slate-500">
                          Age Group
                        </p>

                        <p className="font-semibold mt-1">
                          {review.age_group ||
                            "Not recorded"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Digital Experience
                        </p>

                        <p className="font-semibold mt-1">
                          {review.digital_experience ||
                            "Not recorded"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Tester Type
                        </p>

                        <p className="font-semibold mt-1">
                          {review.tester_type ||
                            "Not recorded"}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* IMPROVEMENT */}
                  <div className="border-t border-slate-200 mt-6 pt-5">

                    <p className="text-sm text-slate-500">
                      Suggested Improvement
                    </p>

                    <p className="mt-2 text-slate-800 leading-7">
                      {review.improvement ||
                        "No suggestion provided."}
                    </p>

                  </div>

                  <p className="text-xs text-slate-400 mt-6">
                    Submitted:{" "}
                    {new Date(
                      review.created_at
                    ).toLocaleDateString()}
                  </p>

                </div>
              ))}

            </div>
          )}

        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 mt-10">

        <div className="max-w-7xl mx-auto px-6 py-9 flex flex-col md:flex-row justify-between items-center gap-5">

          <div>

            <p className="text-white font-bold text-lg">
              YazisaSA
            </p>

            <p className="text-sm mt-1">
              Municipal Administration Portal
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

          </div>

        </div>

      </footer>

    </main>
  );
}