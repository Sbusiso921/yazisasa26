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
    <main className="min-h-screen bg-gray-50">

      {/* Top bar */}
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

      {/* Main form */}
      <section className="max-w-3xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Report a Municipal Problem
          </h1>

          <p className="text-gray-600 mt-2">
            Tell us about the problem in your area.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-6">

          {/* Problem type */}
          <div>
            <label className="block font-semibold mb-2">
              What is the problem?
            </label>

            <select
              name="problem_type"
              className="w-full border border-gray-300 rounded-lg p-3"
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

          {/* Municipality */}
          <div>
            <label className="block font-semibold mb-2">
              Municipality
            </label>

            <input
              type="text"
                name="municipality"
              placeholder="Example: City of uMhlathuze"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Area */}
          <div>
            <label className="block font-semibold mb-2">
              Suburb / Area
            </label>

            <input
              type="text"
              name="area"
              placeholder="Example: Richards Bay Central"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-2">
              Street or Location
            </label>

            <input
              type="text"
              name="location"
              value={location}
onChange={(event) => setLocation(event.target.value)}
              placeholder="Example: Bullion Boulevard"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
<button
  type="button"
  onClick={getCurrentLocation}
  className="mt-3 border border-green-700 text-green-700 px-4 py-2 rounded-lg"
>
  Use My Current Location
</button>
            <p className="text-sm text-gray-500 mt-2">
              Give enough information to help locate the problem.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-2">
              Describe the Problem
            </label>

            <textarea
              name="description"
              rows="5"
              placeholder="Example: There is a large water leak next to the road and water has been running since this morning."
              className="w-full border border-gray-300 rounded-lg p-3"
            ></textarea>
          </div>

          {/* Photo */}
          <div>
            <label className="block font-semibold mb-2">
              Add a Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(event) => setPhoto(event.target.files[0])}
              className="w-full border border-gray-300 rounded-lg p-3"
            />

            <p className="text-sm text-gray-500 mt-2">
              A photo can help the municipality understand the problem.
            </p>
          </div>

          {/* Contact */}
          <div>
            <label className="block font-semibold mb-2">
              Your Name
            </label>

            <input
              type="text"
                name="reporter_name"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Email or Phone Number
            </label>

            <input
              type="text"
                name="contact"
              placeholder="Used for updates about your report"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white font-bold py-4 rounded-lg hover:bg-green-800"
          >
            Submit Report
          </button>
          {message && (
  <div className="mt-4 rounded-lg bg-green-100 p-4 text-green-800">
    {message}
  </div>
)}

        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          YazisaSA Prototype — Municipal Fault Reporting System
        </p>

      </section>
    </main>
  );
}