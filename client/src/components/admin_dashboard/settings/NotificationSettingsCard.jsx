import { useState } from 'react';
import { FaBell, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import { MdOutlineMessage } from 'react-icons/md';

const NotificationSettingsCard = () => {
  const [settings, setSettings] = useState({
    email: true,
    contact: true,
    security: true,
    marketing: false,
    updates: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const options = [
    {
      key: 'email',
      title: 'Email Notifications',
      description:
        'Receive important account updates and activity notifications.',
      icon: FaEnvelope,
    },
    {
      key: 'contact',
      title: 'Contact Messages',
      description:
        'Get notified instantly when someone sends a contact message.',
      icon: MdOutlineMessage,
    },
    {
      key: 'security',
      title: 'Security Alerts',
      description:
        'Receive alerts for logins, password changes and security events.',
      icon: FaShieldAlt,
    },
    {
      key: 'marketing',
      title: 'Marketing Emails',
      description:
        'Receive product news, feature announcements and promotional emails.',
      icon: FaBell,
    },
    {
      key: 'updates',
      title: 'Product Updates',
      description:
        'Be notified whenever new features or improvements are released.',
      icon: FaBell,
    },
  ];

  return (
    <section className="group relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-[#0b1120]/80 backdrop-blur-xl transition-all duration-300 hover:border-[#646cff]/40">
      {/* Glow */}
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#646cff]/10 blur-[120px]" />

      <div className="relative z-10 p-8 lg:p-10">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2">
            <FaBell className="text-[#646cff]" />

            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-300">
              Notification Preferences
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-black text-white">Stay Informed</h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
            Choose which notifications you'd like to receive. These preferences
            help you stay informed without unnecessary interruptions.
          </p>
        </div>

        {/* Notification List */}
        <div className="mt-10 space-y-5">
          {options.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.key}
                className="flex flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-300 hover:border-[#646cff]/30 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#646cff]/10">
                    <Icon className="text-xl text-[#646cff]" />
                  </div>

                  <div>
                    <h3 className="font-bold text-white">{item.title}</h3>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => toggleSetting(item.key)}
                  className={`relative h-8 w-16 cursor-pointer rounded-full transition-all duration-300 ${
                    settings[item.key] ? 'bg-[#646cff]' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all duration-300 ${
                      settings[item.key] ? 'left-9' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Your notification preferences will be applied immediately after
            saving.
          </p>

          <button
            type="button"
            className="rounded-2xl cursor-pointer bg-[#646cff] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#5563ff] hover:shadow-[0_0_30px_rgba(100,108,255,.35)]"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotificationSettingsCard;
