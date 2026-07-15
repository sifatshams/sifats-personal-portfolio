const PrivacyPolicy = () => {
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white px-6 py-20">
      <div className="max-w-[1000px] mx-auto">

        {/* Top */}
        <div className="text-center mb-14">

          <div className="inline-flex px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-300 mb-5">
            Privacy & Security
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            Privacy
            <span className="text-[#646cff]"> Policy</span>
          </h1>

          <p className="text-slate-400 mt-5 max-w-[700px] mx-auto leading-8">
            Your privacy matters to us. This policy explains
            how SifatTech collects, uses and protects your
            information.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-[35px] p-8 md:p-12 backdrop-blur-xl space-y-10">

          {/* Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              1. Information We Collect
            </h2>

            <p className="text-slate-400 leading-8">
              We may collect personal information such as
              your name, email address and messages submitted
              through our contact forms or communication channels.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              2. How We Use Information
            </h2>

            <p className="text-slate-400 leading-8">
              Information is used only to improve communication,
              provide services, respond to inquiries and enhance
              user experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              3. Data Protection
            </h2>

            <p className="text-slate-400 leading-8">
              We take appropriate technical and organizational
              measures to protect your information from
              unauthorized access, disclosure or misuse.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              4. Third-Party Services
            </h2>

            <p className="text-slate-400 leading-8">
              Our website may use trusted third-party tools
              or services. These providers may have their own
              privacy practices and policies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              5. Policy Updates
            </h2>

            <p className="text-slate-400 leading-8">
              We may update this privacy policy periodically.
              Changes will be reflected on this page with the
              latest revision date.
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

export default PrivacyPolicy;