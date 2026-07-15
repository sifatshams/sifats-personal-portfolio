import { useState } from 'react';
import {
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaLock,
  FaSave,
  FaShieldAlt,
} from 'react-icons/fa';

const ChangePasswordCard = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const requirements = [
    'At least 8 characters',
    'One uppercase letter',
    'One lowercase letter',
    'One number',
    'One special character',
  ];

  const InputField = ({ label, placeholder, show, setShow, icon: Icon }) => (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </label>

      <div className="flex h-14 items-center rounded-2xl border border-slate-800 bg-slate-900/50 px-4 transition-all duration-300 focus-within:border-[#646cff]">
        <Icon className="text-slate-500" />

        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          className="h-full w-full bg-transparent px-3 text-sm text-white placeholder:text-slate-500 outline-none"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="cursor-pointer text-slate-500 transition hover:text-[#646cff]"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );

  return (
    <section className="group relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-[#0b1120]/80 backdrop-blur-xl transition-all duration-300 hover:border-[#646cff]/40">
      {/* Glow */}
      <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#646cff]/10 blur-[120px]" />

      <div className="relative z-10 p-8 lg:p-10">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2">
            <FaShieldAlt className="text-xs text-[#646cff]" />

            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-300">
              Password & Security
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-black text-white">
            Change Password
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
            Keep your account secure by using a strong password that you don't
            use anywhere else.
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 grid gap-6">
          <InputField
            label="Current Password"
            placeholder="Enter current password"
            show={showCurrent}
            setShow={setShowCurrent}
            icon={FaLock}
          />

          <InputField
            label="New Password"
            placeholder="Enter new password"
            show={showNew}
            setShow={setShowNew}
            icon={FaKey}
          />

          <InputField
            label="Confirm Password"
            placeholder="Confirm new password"
            show={showConfirm}
            setShow={setShowConfirm}
            icon={FaKey}
          />
        </div>

        {/* Password Strength */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">Password Strength</h3>

            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
              Strong
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-4/5 rounded-full bg-emerald-500" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {requirements.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#0d1117]/80 p-3"
              >
                <FaCheckCircle className="text-emerald-400" />

                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            For better security, avoid reusing old passwords.
          </p>

          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#646cff] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#5563ff] hover:shadow-[0_0_30px_rgba(100,108,255,.35)]"
          >
            <FaSave />
            Update Password
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChangePasswordCard;
