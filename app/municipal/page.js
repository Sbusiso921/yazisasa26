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
    <main className="min-h-screen bg-gray-50">

      <header className="bg-green-700 text-white px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              YazisaSA Municipal Dashboard
            </h1>
            <p className="text-green-100 text-sm">
              Manage reported municipal faults
            </p>
          </div>

          <a
            href="/"
            className="border border-white px-4 py-2 rounded-lg"
          >
            Home
          </a>
          <button
  onClick={handleLogout}
  className="border border-white px-4 py-2 rounded-lg"
>
  Logout
</button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Reported Problems
          </h2>

          <p className="text-gray-600 mt-2">
            View and update municipal fault reports.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-sm text-gray-500">
      Total Reports
    </p>

    <p className="text-3xl font-bold mt-2">
      {totalReports}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-sm text-gray-500">
      Submitted
    </p>

    <p className="text-3xl font-bold mt-2">
      {submittedReports}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-sm text-gray-500">
      In Progress
    </p>

    <p className="text-3xl font-bold mt-2">
      {inProgressReports}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-sm text-gray-500">
      Resolved
    </p>

    <p className="text-3xl font-bold mt-2">
      {resolvedReports}
    </p>
  </div>

</div>
<div className="bg-white rounded-xl shadow p-5 mb-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    <div>
      <label className="block font-semibold mb-2">
        Search Reports
      </label>

      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by reference, problem, area or location"
        className="w-full border border-gray-300 rounded-lg p-3"
      />
    </div>

    <div>
      <label className="block font-semibold mb-2">
        Filter by Status
      </label>

      <select
        value={statusFilter}
        onChange={(event) => setStatusFilter(event.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3"
      >
        <option value="All">All Reports</option>
        <option value="Submitted">Submitted</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
    </div>

  </div>
</div>
        {message && (
          <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-800">
            {message}
          </div>
        )}

        {loading ? (
          <p>Loading reports...</p>
        ) : filteredReports.length === 0 ? (
          <p>No reports match the current filters.</p>
        ) : (
          <div className="space-y-6">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      Reference Number
                    </p>

                    <p className="font-bold text-lg">
                      {report.reference_number}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Current Status
                    </p>

                    <p className="font-bold text-green-700">
                      {report.status}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                  <div>
                    <p className="text-sm text-gray-500">
                      Problem
                    </p>
                    <p className="font-semibold">
                      {report.problem_type}
                    </p>
                  </div>

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
                      Area
                    </p>
                    <p className="font-semibold">
                      {report.area}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Location
                    </p>
                    <p className="font-semibold">
                      {report.location}
                    </p>
                    <a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(report.location)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block mt-2 text-green-700 font-semibold hover:underline"
>
  Open in Maps
</a>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Description
                  </p>
                  <p>{report.description}</p>
                </div>
{report.photo_url && (
  <div className="mt-4">
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
                <div className="mt-6 border-t pt-5">
                  <label className="block font-semibold mb-2">
                    Update Status
                  </label>

                  <select
                    value={report.status}
                    onChange={(event) =>
                      updateStatus(report.id, event.target.value)
                    }
                    className="w-full md:w-64 border border-gray-300 rounded-lg p-3"
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
            ))}
          </div>
        )}

      </section>
    </main>
  );
}