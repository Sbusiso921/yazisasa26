"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ReportPage() {
      const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState("");

  function getCurrentLocation() {
  if (!navigator.geolocation) {
    setMessage("Location is not supported on this device.");
    return;
  }

  setMessage("Getting your location...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setLocation(`${latitude}, ${longitude}`);
      setMessage("Location captured successfully.");
    },
    () => {
      setMessage("Could not get your location. Please allow location access.");
    }
  );
}

  async function handleSubmit(event) {
  event.preventDefault();

  setLoading(true);
  setMessage("");

  const formData = new FormData(event.target);

  let photoUrl = null;

if (photo) {
  const fileName = `${Date.now()}-${photo.name}`;

  const { error: uploadError } = await supabase.storage
    .from("report-photos")
    .upload(fileName, photo);

  if (uploadError) {
    console.error(uploadError);
    setMessage("Photo upload failed.");
    setLoading(false);
    return;
  }

  const { data } = supabase.storage
    .from("report-photos")
    .getPublicUrl(fileName);

  photoUrl = data.publicUrl;
}

  const referenceNumber =
    "YSA-" + Math.floor(100000 + Math.random() * 900000);

  const { error } = await supabase.from("reports").insert([
    {
      reference_number: referenceNumber,
      problem_type: formData.get("problem_type"),
      municipality: formData.get("municipality"),
      area: formData.get("area"),
      location: formData.get("location"),
      description: formData.get("description"),
      reporter_name: formData.get("reporter_name"),
      contact: formData.get("contact"),
      status: "Submitted",
      photo_url: photoUrl,
    },
  ]);

  if (error) {
    console.error(error);
    setMessage("Something went wrong. Please try again.");
  } else {
    setMessage(
      "Report submitted successfully. Your reference number is " +
        referenceNumber
    );

    event.target.reset();
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
            href="/track"
            className="hidden sm:inline-block text-green-700 font-semibold px-4 py-2 hover:bg-green-50 rounded-lg"
          >
            Track Report
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
          Municipal Fault Reporting
        </p>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Report a Municipal{" "}
          <span className="text-green-700">Problem</span>
        </h1>

        <p className="text-gray-600 text-lg mt-4 max-w-2xl">
          Tell us what happened, where it happened and attach evidence if
          available. YazisaSA will generate a reference number for tracking.
        </p>

        <div className="flex flex-wrap gap-5 mt-7 text-sm font-semibold">
          <span>📍 Add Location</span>
          <span>📷 Attach Evidence</span>
          <span>🔎 Track Progress</span>
        </div>

      </div>
    </section>

    {/* FORM */}
    <section className="max-w-4xl mx-auto px-6 py-10">

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
      >

        {/* FORM HEADING */}
        <div className="bg-green-800 text-white px-6 md:px-8 py-6">
          <h2 className="text-2xl font-bold">
            Fault Details
          </h2>

          <p className="text-green-100 mt-1">
            Complete the information below to submit your report.
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-7">

          {/* Problem type */}
          <div>
            <label className="block font-bold mb-2">
              What is the problem?
            </label>

            <select
              name="problem_type"
              className="w-full border border-gray-300 rounded-xl p-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
              defaultValue=""
            >
              <option value="" disabled>
                Select a problem
              </option>

              <option>Water Leak</option>
              <option>Broken Streetlight</option>
              <option>Pothole</option>
              <option>Illegal Dumping</option>
              <option>Damaged Road</option>
              <option>Other Municipal Fault</option>
            </select>
          </div>

          {/* Municipality + Area */}
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block font-bold mb-2">
                Municipality
              </label>

              <input
                type="text"
                name="municipality"
                placeholder="Example: City of uMhlathuze"
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">
                Suburb / Area
              </label>

              <input
                type="text"
                name="area"
                placeholder="Example: Richards Bay Central"
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

          </div>

          {/* Location */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-5">

            <label className="block font-bold mb-2">
              📍 Street or Location
            </label>

            <input
              type="text"
              name="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Example: Bullion Boulevard"
              className="w-full bg-white border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <button
              type="button"
              onClick={getCurrentLocation}
              className="mt-3 bg-white border-2 border-green-700 text-green-700 px-5 py-2 rounded-lg font-semibold hover:bg-green-100"
            >
              📍 Use My Current Location
            </button>

            <p className="text-sm text-gray-600 mt-3">
              Give enough information to help locate the problem.
            </p>

          </div>

          {/* Description */}
          <div>
            <label className="block font-bold mb-2">
              Describe the Problem
            </label>

            <textarea
              name="description"
              rows="5"
              placeholder="Example: There is a large water leak next to the road..."
              className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>
          </div>

          {/* Photo */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">

            <label className="block font-bold mb-2">
              📷 Add Photo Evidence
            </label>

            <p className="text-gray-600 text-sm mb-4">
              A photo can help municipal staff understand the problem faster.
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(event) => setPhoto(event.target.files[0])}
              className="w-full bg-white border border-gray-300 rounded-xl p-3 text-gray-900"
            />

            {photo && (
              <p className="text-green-700 font-semibold text-sm mt-3">
                ✓ Photo selected: {photo.name}
              </p>
            )}

          </div>

          {/* Reporter Details */}
          <div className="border-t border-gray-200 pt-7">

            <h3 className="text-xl font-bold mb-1">
              Your Details
            </h3>

            <p className="text-gray-600 text-sm mb-5">
              These details can be used for communication about your report.
            </p>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block font-bold mb-2">
                  Your Name
                </label>

                <input
                  type="text"
                  name="reporter_name"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">
                  Email or Phone Number
                </label>

                <input
                  type="text"
                  name="contact"
                  placeholder="Used for updates about your report"
                  className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white font-bold py-4 rounded-xl text-lg hover:bg-green-800 disabled:opacity-50 shadow-md"
          >
            {loading ? "Submitting Report..." : "Submit Municipal Report →"}
          </button>

          {/* Message */}
          {message && (
            <div className="rounded-xl bg-green-100 border border-green-200 p-5 text-green-900 font-semibold">
              {message}
            </div>
          )}

        </div>
      </form>

      {/* INFO CARDS */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-2xl mb-2">🔐</p>
          <p className="font-bold">Simple Reporting</p>
          <p className="text-gray-600 text-sm mt-1">
            Submit municipal problems from one platform.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-2xl mb-2">🔎</p>
          <p className="font-bold">Track Progress</p>
          <p className="text-gray-600 text-sm mt-1">
            Use your reference number to check status.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
         <p className="text-2xl mb-2">🌍</p>
          <p className="font-bold">Better Communities</p>
          <p className="text-gray-600 text-sm mt-1">
            Help identify issues that need attention.
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