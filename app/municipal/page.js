"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function MunicipalPage() {
    const router = useRouter();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [openReportId, setOpenReportId] = useState(null);
const filteredReports = reports.filter((report) => {
  const matchesSearch =
    report.reference_number?.toLowerCase().includes(search.toLowerCase()) ||
    report.problem_type?.toLowerCase().includes(search.toLowerCase()) ||
    report.area?.toLowerCase().includes(search.toLowerCase()) ||
    report.location?.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || report.status === statusFilter;

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
  }

  checkUser();
}, [router]);
async function handleLogout() {
  await supabase.auth.signOut();
  router.push("/municipal-login");
}

  return (
  <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 text-gray-900">

    {/* HEADER */}
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">

        <a href="/" className="flex items-center">
          <img
            src="/yazisasa-logo.png"
            alt="YazisaSA"
            className="h-20 md:h-24 w-auto"
          />
        </a>

        <div className="flex items-center gap-3">

          <a
            href="/"
            className="hidden sm:inline-block text-green-700 font-semibold px-4 py-2 hover:bg-green-50 rounded-lg"
          >
            Home
          </a>

          <button
            onClick={handleLogout}
            className="bg-green-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-800"
          >
            Logout
          </button>

        </div>
      </div>
    </header>

    {/* DASHBOARD HERO */}
    <section className="border-b border-green-100">
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-8">

        <p className="text-green-700 uppercase tracking-widest text-sm font-bold mb-3">
          Municipal Administration
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Municipal{" "}
              <span className="text-green-700">
                Dashboard
              </span>
            </h1>

            <p className="text-gray-600 text-lg mt-3 max-w-2xl">
              Review municipal fault reports, monitor progress and update
              residents on the status of reported issues.
            </p>
          </div>

          <div className="bg-green-800 text-white rounded-2xl px-6 py-4">
            <p className="text-green-200 text-sm">
              Total Reports
            </p>

            <p className="text-3xl font-bold">
              {totalReports}
            </p>
          </div>

        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-6 py-10">

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">
                Total Reports
              </p>

              <p className="text-3xl font-bold mt-2">
                {totalReports}
              </p>
            </div>

            <div className="text-2xl">
              📋
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">
                Submitted
              </p>

              <p className="text-3xl font-bold mt-2">
                {submittedReports}
              </p>
            </div>

            <div className="text-2xl">
              📨
            </div>
          </div>
        </div>

        <div className="bg-white border border-yellow-200 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">
                In Progress
              </p>

              <p className="text-3xl font-bold text-yellow-700 mt-2">
                {inProgressReports}
              </p>
            </div>

            <div className="text-2xl">
              ⏳
            </div>
          </div>
        </div>

        <div className="bg-white border border-green-200 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">
                Resolved
              </p>

              <p className="text-3xl font-bold text-green-700 mt-2">
                {resolvedReports}
              </p>
            </div>

            <div className="text-2xl">
              ✅
            </div>
          </div>
        </div>

      </div>

      {/* SEARCH AND FILTER */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-8">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex-1">

            <label className="block text-sm font-bold mb-2">
              Search Reports
            </label>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search reference, problem, area or location..."
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

          </div>

          <div className="md:w-64">

            <label className="block text-sm font-bold mb-2">
              Filter by Status
            </label>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="All">All Reports</option>
              <option value="Submitted">Submitted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

          </div>
        </div>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="mb-6 bg-green-100 border border-green-200 text-green-900 rounded-xl p-4 font-semibold">
          {message}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
          <p className="text-gray-600 font-semibold">
            Loading municipal reports...
          </p>
        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredReports.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">

          <p className="text-4xl mb-3">
            🔎
          </p>

          <h2 className="text-xl font-bold">
            No Reports Found
          </h2>

          <p className="text-gray-600 mt-2">
            Try changing your search or status filter.
          </p>

        </div>
      )}

      {/* REPORTS */}
      {!loading && filteredReports.length > 0 && (
        <div className="space-y-6">

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Municipal Reports
            </h2>

            <p className="text-gray-500 text-sm">
              Showing {filteredReports.length} report
              {filteredReports.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredReports.map((report) => (
  <div
    key={report.id}
    className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
  >

    {/* COMPACT REPORT ROW */}
    <div className="p-5 grid md:grid-cols-5 gap-4 items-center">

      <div>
        <p className="text-xs text-gray-500">Reference</p>
        <p className="font-bold text-green-800">
          {report.reference_number}
        </p>
      </div>

      <div>
        <p className="text-xs text-gray-500">Problem</p>
        <p className="font-semibold">
          {report.problem_type}
        </p>
      </div>

      <div>
        <p className="text-xs text-gray-500">Area</p>
        <p className="font-semibold">
          {report.area}
        </p>
      </div>

      <div>
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
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

      <button
        type="button"
        onClick={() =>
          setOpenReportId(
            openReportId === report.id ? null : report.id
          )
        }
        className="border border-green-700 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-50"
      >
        {openReportId === report.id
          ? "Hide Details"
          : "View Details"}
      </button>

    </div>

    {/* EXPANDED DETAILS */}
    {openReportId === report.id && (
      <div className="border-t border-gray-200 bg-gray-50 p-6">

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500">
              Municipality
            </p>
            <p className="font-semibold">
              {report.municipality}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Location
            </p>
            <p className="font-semibold">
              {report.location}
            </p>

            {report.location && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  report.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-green-700 font-semibold hover:underline"
              >
                📍 Open in Maps
              </a>
            )}
          </div>

        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Description
          </p>

          <p className="mt-2">
            {report.description}
          </p>
        </div>

        {report.photo_url && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-3">
              Photo Evidence
            </p>

            <img
              src={report.photo_url}
              alt="Reported municipal fault"
              className="w-full max-w-lg rounded-xl border border-gray-200"
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
              updateStatus(report.id, event.target.value)
            }
            className="w-full border border-gray-300 rounded-xl p-3 bg-white text-gray-900"
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

    {/* FOOTER */}
    <footer className="bg-green-900 text-white px-6 py-8 mt-10">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">

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
          Municipal Administration Portal
        </p>

      </div>

    </footer>

  </main>
);
}