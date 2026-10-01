export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <a href="/">
            <img
              src="/yazisasa-logo.png"
              alt="YazisaSA Logo"
              className="h-20 w-auto"
            />
          </a>

          <div className="flex items-center gap-5">
            <a
              href="/"
              className="font-semibold hover:text-emerald-700"
            >
              Home
            </a>

            <a
              href="/report"
              className="bg-slate-900 text-white px-5 py-3 rounded-md font-bold hover:bg-slate-800"
            >
              Report a Problem
            </a>
          </div>

        </div>
      </header>

      {/* HERO */}
      <section className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-20">

          <p className="uppercase tracking-[0.2em] text-emerald-400 text-sm font-bold">
            About YazisaSA
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Why YazisaSA Was Created
          </h1>

          <p className="text-slate-300 text-lg mt-6 max-w-3xl leading-8">
            YazisaSA was created to make it easier for residents to report
            municipal problems and track what happens after a report is submitted.
          </p>

        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-6">

          {/* PROBLEM */}
          <div className="border border-slate-200 bg-white p-8 rounded-md">
            <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
              The Problem
            </p>

            <h2 className="text-2xl font-bold mt-3">
              Municipal problems affect everyday communities.
            </h2>

            <p className="text-slate-600 mt-5 leading-7">
              Communities experience problems such as water leaks, potholes,
              faulty streetlights, illegal dumping and damaged roads.
              Residents need a simple and clear way to report these problems
              and know whether their report is being attended to.
            </p>
          </div>

          {/* SOLUTION */}
          <div className="border border-slate-200 bg-slate-50 p-8 rounded-md">
            <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
              The Solution
            </p>

            <h2 className="text-2xl font-bold mt-3">
              One simple reporting process.
            </h2>

            <p className="text-slate-600 mt-5 leading-7">
              YazisaSA provides a platform where residents can report municipal
              faults, share the location, add a description and attach photographic
              evidence.
            </p>

            <p className="text-slate-600 mt-4 leading-7">
              After the report is submitted, the resident receives a reference
              number that can be used to track progress.
            </p>
          </div>

        </div>

        {/* HOW IT WORKS */}
        <div className="mt-16">

          <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
            The Process
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            How YazisaSA Works
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mt-8">

            <div className="border border-slate-200 p-7 rounded-md">
              <p className="text-emerald-600 font-bold text-sm">
                STEP 01
              </p>

              <h3 className="text-2xl font-bold mt-3">
                Report
              </h3>

              <p className="text-slate-600 mt-3 leading-7">
                The resident submits the municipal problem and provides
                important details such as the location and evidence.
              </p>
            </div>

            <div className="border border-slate-200 p-7 rounded-md">
              <p className="text-emerald-600 font-bold text-sm">
                STEP 02
              </p>

              <h3 className="text-2xl font-bold mt-3">
                Manage
              </h3>

              <p className="text-slate-600 mt-3 leading-7">
                Municipal staff can view the report and update the progress
                through the municipal dashboard.
              </p>
            </div>

            <div className="border border-slate-200 p-7 rounded-md">
              <p className="text-emerald-600 font-bold text-sm">
                STEP 03
              </p>

              <h3 className="text-2xl font-bold mt-3">
                Track
              </h3>

              <p className="text-slate-600 mt-3 leading-7">
                The resident uses the reference number to check the current
                status of the report.
              </p>
            </div>

          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="grid lg:grid-cols-2 gap-6 mt-16">

          <div className="bg-slate-900 text-white p-9 rounded-md">

            <p className="text-emerald-400 uppercase tracking-widest text-sm font-bold">
              Why It Matters
            </p>

            <h2 className="text-3xl font-bold mt-3">
              Better information flow.
            </h2>

            <p className="text-slate-300 mt-5 leading-7">
              Municipal fault reporting should not only allow residents to
              submit complaints. It should also improve the flow of information
              between the community and the municipality.
            </p>

            <p className="text-slate-300 mt-4 leading-7">
              YazisaSA combines reporting, tracking and municipal status updates
              in one clear process.
            </p>

          </div>

          <div className="border border-slate-200 bg-white p-9 rounded-md">

            <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
              The Vision
            </p>

            <h2 className="text-3xl font-bold mt-3">
              Simple. Accessible. Organised.
            </h2>

            <p className="text-slate-600 mt-5 leading-7">
              The vision for YazisaSA is to provide a simple and organised
              way for communities and municipalities to communicate about
              service delivery problems.
            </p>

            <p className="text-slate-600 mt-4 leading-7">
              Future improvements could include resident accounts, report history,
              notifications, stronger municipal access control and better
              integration with municipal departments.
            </p>

          </div>

        </div>

        {/* FINAL MESSAGE */}
        <div className="border-l-4 border-emerald-600 bg-slate-50 p-8 mt-12">

          <p className="text-emerald-700 uppercase tracking-widest text-sm font-bold">
            YazisaSA
          </p>

          <h2 className="text-3xl font-bold mt-2">
            See it. Report it. Change it.
          </h2>

          <p className="text-slate-600 mt-3">
            Report Today. A Better Tomorrow.
          </p>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between gap-4">

          <p className="font-bold text-white">
            YazisaSA
          </p>

          <p className="text-sm">
            Cleaner Communities. Brighter Tomorrows.
          </p>

        </div>
      </footer>

    </main>
  );
}