import { FaCog, FaShieldAlt } from 'react-icons/fa';

const SettingsHeader = () => {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-slate-800/80 bg-[#0b1120]/80 backdrop-blur-xl">
      {/* Background Glow */}
      <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-[#646cff]/15 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative z-10 flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
        {/* Left */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2">
            <FaCog className="text-[#646cff]" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-300">
              Account Settings
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-5xl">
            Manage Your
            <span className="block text-[#646cff]">Account Preferences</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
            Update your personal information, manage security preferences,
            change your password and control account settings from one central
            place.
          </p>
        </div>

        {/* Right Card */}
        <div className="w-full max-w-sm rounded-[28px] border border-slate-800 bg-slate-950/40 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#646cff]/10">
              <FaShieldAlt className="text-2xl text-[#646cff]" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Security Status</h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your account is protected and ready for secure management.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />

              <span className="text-sm font-semibold text-emerald-400">
                All security checks passed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsHeader;
