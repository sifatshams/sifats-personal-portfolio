import {
  FaChrome,
  FaDesktop,
  FaGlobe,
  FaLaptopCode,
  FaLock,
  FaShieldAlt,
  FaSignOutAlt,
} from 'react-icons/fa';

const SecurityCard = () => {
  const securityItems = [
    {
      title: 'Last Login',
      value: 'Today • 10:42 AM',
      icon: FaLock,
    },
    {
      title: 'Current Device',
      value: 'Windows 11 Desktop',
      icon: FaDesktop,
    },
    {
      title: 'Browser',
      value: 'Google Chrome 138',
      icon: FaChrome,
    },
    {
      title: 'Operating System',
      value: 'Windows 11 Pro',
      icon: FaLaptopCode,
    },
    {
      title: 'IP Address',
      value: '192.168.xxx.xxx',
      icon: FaGlobe,
    },
    {
      title: 'Session Status',
      value: 'Current Active Session',
      icon: FaShieldAlt,
    },
  ];

  return (
    <section className="group relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-[#0b1120]/80 backdrop-blur-xl transition-all duration-300 hover:border-[#646cff]/40">
      {/* Glow */}
      <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-[#646cff]/10 blur-[120px]" />

      <div className="relative z-10 p-8 lg:p-10">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2">
            <FaShieldAlt className="text-[#646cff]" />

            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-300">
              Security Overview
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-black text-white">
            Security Information
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
            Review your current session details and monitor your account
            security information.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {securityItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-300 hover:border-[#646cff]/30 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#646cff]/10">
                  <Icon className="text-2xl text-[#646cff]" />
                </div>

                <h3 className="mt-5 text-sm font-bold uppercase tracking-widest text-slate-500">
                  {item.title}
                </h3>

                <p className="mt-3 text-lg font-bold text-white">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Security Notice */}
        <div className="mt-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20">
              <FaShieldAlt className="text-xl text-emerald-400" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-emerald-300">
                Your Account Is Secure
              </h3>

              <p className="mt-2 text-sm leading-7 text-emerald-200/80">
                No suspicious activity has been detected. Continue using a
                strong password and enable additional security features for
                maximum protection.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            If you don't recognize this session, log out immediately.
          </p>

          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-6 py-3 text-sm font-bold text-rose-400 transition-all duration-300 hover:bg-rose-500/20"
          >
            <FaSignOutAlt />
            Logout All Devices
          </button>
        </div>
      </div>
    </section>
  );
};

export default SecurityCard;
