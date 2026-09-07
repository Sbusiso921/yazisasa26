export default function Home() {
  return (
  <main className="min-h-screen bg-gray-50 text-gray-900">

    <section className="bg-green-700 text-white px-6 py-20 text-center">
      <div className="max-w-3xl mx-auto">

        <p className="text-sm uppercase tracking-widest text-green-100 mb-3">
          Municipal Fault Reporting
        </p>

        <h1 className="text-5xl font-bold mb-5">
          YazisaSA ZA
        </h1>

        <p className="text-2xl font-semibold mb-4">
          Report it. Track it. Improve your community.
        </p>

        <p className="max-w-2xl mx-auto mb-8 text-green-100 text-lg">
          A simple platform for South African residents to report municipal
          problems, attach evidence, share a location, and track progress.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <a
            href="/report"
            className="bg-white text-green-700 px-7 py-3 rounded-lg font-bold hover:bg-gray-100"
          >
            Report a Problem
          </a>

          <a
            href="/track"
            className="border border-white px-7 py-3 rounded-lg font-bold hover:bg-green-800"
          >
            Track a Report
          </a>

        </div>
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-6 py-14">

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">
          How YazisaSA Works
        </h2>

        <p className="text-gray-600 mt-2">
          Three simple steps from reporting a problem to following its progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-3xl mb-3">
            1
          </div>

          <h3 className="text-xl font-bold mb-2">
            Report
          </h3>

          <p className="text-gray-600">
            Describe the municipal problem, attach a photo and provide its
            location.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-3xl mb-3">
            2
          </div>

          <h3 className="text-xl font-bold mb-2">
            Receive a Reference
          </h3>

          <p className="text-gray-600">
            YazisaSA generates a reference number that can be used to track
            the report.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-3xl mb-3">
            3
          </div>

          <h3 className="text-xl font-bold mb-2">
            Track Progress
          </h3>

          <p className="text-gray-600">
            Check whether the report is Submitted, In Progress or Resolved.
          </p>
        </div>

      </div>
    </section>

    <section className="bg-white border-t border-gray-200 px-6 py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">

        <div>
          <h2 className="text-xl font-bold">
            Municipal Staff
          </h2>

          <p className="text-gray-600">
            Authorised municipal staff can review and update submitted reports.
          </p>
        </div>

        <a
          href="/municipal-login"
          className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800"
        >
          Municipal Staff Login
        </a>

      </div>
    </section>

    <footer className="text-center text-gray-500 text-sm py-6">
      YazisaSA ZA — Municipal Reporting Prototype
    </footer>

  </main>
  );
}