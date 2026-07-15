import { FaEnvelope, FaPhoneAlt, FaSave, FaUser } from 'react-icons/fa';

const AccountSettingsCard = () => {
  return (
    <section className="group relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-[#0b1120]/80 backdrop-blur-xl transition-all duration-300 hover:border-[#646cff]/40">
      {/* Glow */}
      <div className="absolute -top-28 -right-24 h-72 w-72 rounded-full bg-[#646cff]/10 blur-[120px]" />

      <div className="relative z-10 p-8 lg:p-10">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2">
              <FaUser className="text-[#646cff] text-xs" />

              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-300">
                Account Information
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-black text-white">
              Personal Details
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-400">
              Keep your personal information up to date. These details will be
              displayed across your dashboard.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Full Name
            </label>

            <div className="flex items-center rounded-2xl border border-slate-800 bg-slate-900/50 px-4 transition-all duration-300 focus-within:border-[#646cff]">
              <FaUser className="text-slate-500" />

              <input
                type="text"
                defaultValue="Sifat Bin Anwar"
                className="h-14 w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Email Address
            </label>

            <div className="flex items-center rounded-2xl border border-slate-800 bg-slate-900/50 px-4">
              <FaEnvelope className="text-slate-500" />

              <input
                type="email"
                defaultValue="admin@gmail.com"
                disabled
                className="h-14 w-full cursor-not-allowed bg-transparent px-3 text-sm text-slate-500 outline-none"
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Your email address cannot be changed.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Phone Number
            </label>

            <div className="flex items-center rounded-2xl border border-slate-800 bg-slate-900/50 px-4 transition-all duration-300 focus-within:border-[#646cff]">
              <FaPhoneAlt className="text-slate-500" />

              <input
                type="text"
                defaultValue="+880 1712-345678"
                className="h-14 w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Account Role
            </label>

            <div className="flex h-14 items-center rounded-2xl border border-slate-800 bg-slate-900/40 px-5">
              <span className="rounded-full bg-[#646cff]/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#646cff]">
                Administrator
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Your account role is managed by the system.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Last updated: <span className="text-slate-300">2 days ago</span>
          </p>

          <button className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#646cff] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#5563ff] hover:shadow-[0_0_30px_rgba(100,108,255,.35)]">
            <FaSave />

            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccountSettingsCard;