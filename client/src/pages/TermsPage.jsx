const TermsPage = () => {
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white px-6 py-20">
      <div className="max-w-[1000px] mx-auto">
        {/* Top */}
        <div className="text-center mb-14">
          <div className="inline-flex px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-300 mb-5">
            Terms & Conditions
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            Terms of
            <span className="text-[#646cff]"> Service</span>
          </h1>

          <p className="text-slate-400 mt-5 max-w-[700px] mx-auto leading-8">
            Please read these terms carefully before using SifatTech services
            and website.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-[35px] p-8 md:p-12 backdrop-blur-xl space-y-10">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>

            <p className="text-slate-400 leading-8">
              By accessing or using this website, you agree to comply with these
              terms and conditions. If you do not agree, please discontinue use
              of the website.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Website Usage</h2>

            <p className="text-slate-400 leading-8">
              Users agree to use this website lawfully and responsibly.
              Unauthorized activity, misuse or attempts to disrupt services are
              prohibited.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              3. Intellectual Property
            </h2>

            <p className="text-slate-400 leading-8">
              All website content including design, text, branding and digital
              materials remains the intellectual property of SifatTech unless
              otherwise stated.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              4. Limitation of Liability
            </h2>

            <p className="text-slate-400 leading-8">
              SifatTech shall not be held responsible for damages or losses
              arising from website use, technical interruptions or third-party
              services.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              5. Updates & Changes
            </h2>

            <p className="text-slate-400 leading-8">
              We reserve the right to update or modify these terms at any time.
              Continued use of the website implies acceptance of updated terms.
            </p>
          </div>

          {/* Footer Note */}
          <div className="pt-6 border-t border-slate-800">
            <p className="text-slate-500 text-sm">
              Last Updated: {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsPage;
