export default function AboutPage() {
  return (
    <main className="min-h-screen bg-green-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/">
            <img
              src="/yazisasa-logo.png"
              alt="YazisaSA Logo"
              className="h-20 w-auto"
            />
          </a>

          <div className="flex gap-4">
            <a
              href="/"
              className="text-green-700 font-bold hover:text-green-900"
            >
              Home
            </a>

            <a
              href="/report"
              className="border border-green-700 text-green-700 px-4 py-2 rounded-lg font-bold hover:bg-green-50"
            >
              Report a Problem
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="uppercase tracking-widest text-green-200 text-sm font-bold">
            About YazisaSA
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Why YazisaSA Was Created
          </h1>

          <p className="text-green-100 text-lg mt-5 max-w-3xl">
            YazisaSA was created to make it easier for residents to report
            municipal problems and track what happens after a report is submitted.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-6 py-12">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            The Problem
          </h2>

          <p className="text-gray-700 mt-4 leading-7">
            Communities experience problems such as water leaks, potholes,
            faulty streetlights, illegal dumping and damaged roads.
            Residents need a simple and clear way to report these problems
            and know whether their report is being attended to.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-6">
          <h2 className="text-2xl font-bold text-gray-900">
            The Solution
          </h2>

          <p className="text-gray-700 mt-4 leading-7">
            YazisaSA provides one simple platform where residents can report
            municipal faults, share the location, add a description and attach
            photographic evidence. After submitting a report, the system gives
            the resident a reference number that can be used to track progress.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-6">
          <h2 className="text-2xl font-bold text-gray-900">
            How YazisaSA Works
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mt-6">

            <div className="bg-green-50 rounded-xl p-5">
              <p className="text-2xl">📍</p>
              <h3 className="font-bold mt-2">1. Report</h3>
              <p className="text-gray-600 mt-2">
                The resident reports the problem and provides the important details.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <p className="text-2xl">🛠️</p>
              <h3 className="font-bold mt-2">2. Manage</h3>
              <p className="text-gray-600 mt-2">
                Municipal staff can view the report and update its progress.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <p className="text-2xl">🔎</p>
              <h3 className="font-bold mt-2">3. Track</h3>
              <p className="text-gray-600 mt-2">
                The resident uses the reference number to track the report.
              </p>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Why It Matters
          </h2>

          <p className="text-gray-700 mt-4 leading-7">
            A municipal fault-reporting system should not only allow a resident
            to send a complaint. It should also improve the flow of information
            between the community and the municipality.
          </p>

          <p className="text-gray-700 mt-4 leading-7">
            YazisaSA was designed around this idea by combining reporting,
            tracking and municipal status updates in one process.
          </p>
        </div>

        <div className="bg-green-800 text-white rounded-2xl p-8 mt-6">
          <h2 className="text-2xl font-bold">
            The Vision
          </h2>

          <p className="text-green-100 mt-4 leading-7">
            The vision for YazisaSA is to provide a simple, accessible and
            organised way for communities and municipalities to communicate
            about service delivery problems.
          </p>

          <p className="text-green-100 mt-4 leading-7">
            The platform can continue to grow by adding features such as
            resident accounts, report history, notifications, stronger municipal
            access control and better integration with municipal departments.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-green-200 p-8 mt-6 text-center">
          <p className="text-green-700 uppercase tracking-widest text-sm font-bold">
            YazisaSA
          </p>

          <h2 className="text-3xl font-bold mt-2">
            See it. Report it. Change it.
          </h2>

          <p className="text-gray-600 mt-3">
            Report Today. A Better Tomorrow.
          </p>
        </div>

      </section>

    </main>
  );
}