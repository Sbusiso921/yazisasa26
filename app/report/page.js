"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { municipalitiesByProvince } from "../../lib/municipalities";

export default function ReportPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState("");
  const [province, setProvince] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);

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
        setMessage(
          "Could not get your location. Please allow location access."
        );
      }
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!privacyAcknowledged) {
      setMessage(
        "Please read and acknowledge the Privacy & POPIA Notice before submitting your report."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData(event.target);

    let photoUrl = null;

    // Upload photo if one was selected
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

    // Generate YazisaSA reference number
    const referenceNumber =
      "YSA-" + Math.floor(100000 + Math.random() * 900000);

    // Save report
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
        privacy_acknowledged: privacyAcknowledged,
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

      setLocation("");
      setProvince("");
      setMunicipality("");
      setPhoto(null);
      setPrivacyAcknowledged(false);
    }

    setLoading(false);
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
              href="/track"
              className="hidden sm:inline-block text-slate-800 font-semibold px-4 py-2 hover:text-emerald-700"
            >
              Track Report
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
            Municipal Fault Reporting
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-4">
            Report a Municipal{" "}
            <span className="text-emerald-400">
              Problem
            </span>
          </h1>

          <p className="text-slate-300 text-lg mt-5 max-w-2xl leading-8">
            Tell us what happened, where it happened and attach evidence if
            available. YazisaSA will generate a reference number that you can
            use to track the report.
          </p>

          <div className="flex flex-wrap gap-6 mt-8 text-sm font-semibold text-slate-200">
            <span>📍 Add Location</span>
            <span>📷 Attach Evidence</span>
            <span>🔎 Track Progress</span>
          </div>

        </div>
      </section>

      {/* FORM */}
      <section className="max-w-4xl mx-auto px-6 py-12">

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm"
        >

          {/* FORM HEADING */}
          <div className="border-b border-slate-200 px-6 md:px-8 py-7">

            <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
              Fault Details
            </p>

            <h2 className="text-2xl font-bold mt-2">
              Tell us about the problem
            </h2>

            <p className="text-slate-600 mt-2">
              Complete the information below to submit your report.
            </p>

          </div>

          <div className="p-6 md:p-8 space-y-8">

            {/* PROBLEM TYPE */}
            <div>

              <label className="block font-bold mb-2">
                What is the problem?
              </label>

              <select
                name="problem_type"
                required
                defaultValue=""
                className="w-full border border-slate-300 rounded-md p-3 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
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

            {/* LOCATION DETAILS */}
            <div className="border-t border-slate-200 pt-8">

              <div className="mb-6">

                <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
                  Location Details
                </p>

                <h3 className="text-xl font-bold mt-1">
                  Where is the problem?
                </h3>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* PROVINCE */}
                <div>

                  <label className="block font-bold mb-2">
                    Province
                  </label>

                  <select
                    value={province}
                    required
                    onChange={(event) => {
                      setProvince(event.target.value);
                      setMunicipality("");
                    }}
                    className="w-full border border-slate-300 rounded-md p-3 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="">
                      Select a province
                    </option>

                    {Object.keys(municipalitiesByProvince).map(
                      (provinceName) => (
                        <option
                          key={provinceName}
                          value={provinceName}
                        >
                          {provinceName}
                        </option>
                      )
                    )}
                  </select>

                </div>

                {/* MUNICIPALITY */}
                <div>

                  <label className="block font-bold mb-2">
                    Municipality
                  </label>

                  <select
                    name="municipality"
                    value={municipality}
                    required
                    onChange={(event) =>
                      setMunicipality(event.target.value)
                    }
                    disabled={!province}
                    className="w-full border border-slate-300 rounded-md p-3 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    <option value="">
                      {province
                        ? "Select a municipality"
                        : "Select a province first"}
                    </option>

                    {province &&
                      municipalitiesByProvince[province]?.map(
                        (municipalityName) => (
                          <option
                            key={municipalityName}
                            value={municipalityName}
                          >
                            {municipalityName}
                          </option>
                        )
                      )}
                  </select>

                </div>

                {/* AREA */}
                <div className="md:col-span-2">

                  <label className="block font-bold mb-2">
                    Suburb / Area
                  </label>

                  <input
                    type="text"
                    name="area"
                    required
                    placeholder="Example: Richards Bay Central"
                    className="w-full border border-slate-300 rounded-md p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />

                </div>

              </div>
            </div>

            {/* STREET LOCATION */}
            <div className="bg-slate-50 border-l-4 border-emerald-600 p-6">

              <label className="block font-bold mb-2">
                📍 Street or Location
              </label>

              <input
                type="text"
                name="location"
                value={location}
                required
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                placeholder="Example: Bullion Boulevard"
                className="w-full bg-white border border-slate-300 rounded-md p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />

              <button
                type="button"
                onClick={getCurrentLocation}
                className="mt-4 border border-slate-900 bg-white text-slate-900 px-5 py-3 rounded-md font-bold hover:bg-slate-100"
              >
                📍 Use My Current Location
              </button>

              <p className="text-sm text-slate-600 mt-3">
                Give enough information to help locate the problem.
              </p>

            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="block font-bold mb-2">
                Describe the Problem
              </label>

              <textarea
                name="description"
                rows="5"
                required
                placeholder="Example: There is a large water leak next to the road..."
                className="w-full border border-slate-300 rounded-md p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              ></textarea>

            </div>

            {/* PHOTO */}
            <div className="border border-slate-200 bg-slate-50 p-6 rounded-md">

              <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
                Evidence
              </p>

              <label className="block text-lg font-bold mt-2">
                📷 Add Photo Evidence
              </label>

              <p className="text-slate-600 text-sm mt-2 mb-4">
                A photo can help municipal staff understand the problem faster.
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setPhoto(event.target.files?.[0] || null)
                }
                className="w-full bg-white border border-slate-300 rounded-md p-3 text-slate-900"
              />

              {photo && (
                <p className="text-emerald-700 font-semibold text-sm mt-3">
                  ✓ Photo selected: {photo.name}
                </p>
              )}

            </div>

            {/* REPORTER DETAILS */}
            <div className="border-t border-slate-200 pt-8">

              <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
                Reporter Details
              </p>

              <h3 className="text-xl font-bold mt-1">
                Your Details
              </h3>

              <p className="text-slate-600 text-sm mt-2 mb-6">
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
                    className="w-full border border-slate-300 rounded-md p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
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
                    className="w-full border border-slate-300 rounded-md p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />

                </div>

              </div>
            </div>

            {/* PRIVACY & POPIA NOTICE */}
            <div className="border-l-4 border-emerald-600 bg-slate-50 p-6">

              <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
                Privacy & POPIA Notice
              </p>

              <h3 className="text-lg font-bold mt-2">
                How Your Information Will Be Used
              </h3>

              <p className="text-slate-700 text-sm mt-3 leading-7">
                YazisaSA collects the information you provide to process and
                demonstrate municipal fault reporting. This may include your
                contact details, fault location and an uploaded photograph.
              </p>

              <p className="text-slate-700 text-sm mt-3 leading-7">
                Your information will only be used for the purpose of this
                prototype and should only be accessed by authorised municipal
                staff. Please avoid including unnecessary personal information
                in photographs or descriptions.
              </p>

              <p className="text-slate-600 text-sm mt-3">
                This notice supports the responsible handling of personal
                information in line with the Protection of Personal Information
                Act (POPIA).
              </p>

              <label className="flex items-start gap-3 mt-5 cursor-pointer">

                <input
                  type="checkbox"
                  checked={privacyAcknowledged}
                  onChange={(event) =>
                    setPrivacyAcknowledged(event.target.checked)
                  }
                  className="mt-1 w-5 h-5 accent-emerald-600"
                />

                <span className="font-semibold text-slate-900">
                  I have read the privacy notice and understand how my
                  information will be used.
                </span>

              </label>

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-md text-lg hover:bg-slate-800 disabled:opacity-50"
            >
              {loading
                ? "Submitting Report..."
                : "Submit Municipal Report →"}
            </button>

            {/* MESSAGE */}
            {message && (
              <div className="border-l-4 border-emerald-600 bg-emerald-50 p-5 text-slate-900 font-semibold">
                {message}
              </div>
            )}

          </div>
        </form>

        {/* INFO CARDS */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8">

          <div className="bg-white border border-slate-200 p-5 rounded-md">

            <p className="text-2xl mb-3">
              📝
            </p>

            <p className="font-bold">
              Simple Reporting
            </p>

            <p className="text-slate-600 text-sm mt-2">
              Submit municipal problems from one platform.
            </p>

          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-md">

            <p className="text-2xl mb-3">
              🔎
            </p>

            <p className="font-bold">
              Track Progress
            </p>

            <p className="text-slate-600 text-sm mt-2">
              Use your reference number to check status.
            </p>

          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-md">

            <p className="text-2xl mb-3">
              🌍
            </p>

            <p className="font-bold">
              Better Communities
            </p>

            <p className="text-slate-600 text-sm mt-2">
              Help identify issues that need attention.
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