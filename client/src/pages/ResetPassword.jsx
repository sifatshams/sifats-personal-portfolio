// @ts-nocheck
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheck, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import {
  IoArrowBack,
  IoLockClosedOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useResetPasswordMutation } from '../hooks/auth/useResetPasswordMutation';
import useResetPasswordStore from '../store/resetPasswordStore';

const ResetPassword = () => {
  const navigate = useNavigate();

  // Get email from zustand store
  const { email } = useResetPasswordStore();

  // Reset password mutation
  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  // Password visibility
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  // Watch password field
  const password = watch('password', '');

  // real time backend rule checker for UI indicators
  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  // Submit handler
  const onSubmit = (data) => {
    resetPassword(
      {
        email,
        newPassword: data.password,
      },
      {
        onSuccess: () => {
          navigate('/login');
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 py-12 relative overflow-hidden selection:bg-[#646cff]/30 selection:text-indigo-200">
      {/* title */}
      <SEO
        title="Reset Password"
        description="Set a new password for your account securely. Choose a strong password to keep your account safe and continue accessing all features."
        keywords="reset password, set new password, change password, account security"
        image="/og-reset-password.png"
        url="https://sifatcoder.vercel.app/reset-password"
      />
      {/* Glow */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#646cff]/10 via-purple-500/5 to-transparent blur-[150px] rounded-full -top-40 -left-20 animate-pulse duration-[10s]" />
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 via-fuchsia-500/5 to-transparent blur-[150px] rounded-full -bottom-20 -right-20 animate-pulse duration-[8s]" />

      {/* Card */}
      <div className="relative w-full max-w-[480px] bg-[#0b1120]/90 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
        {/* Back */}
        <Link
          to="/forgot-password"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#646cff] transition-all duration-300 group mb-6"
        >
          <IoArrowBack
            size={14}
            className="transform group-hover:-translate-x-0.5 transition-transform duration-300"
          />
          <span>Back</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* Pro Icon Badge with Glow */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 bg-[#646cff]/20 blur-xl rounded-full animate-pulse" />
            <div className="relative w-16 h-16 rounded-full bg-slate-900/50 border border-slate-800/80 flex items-center justify-center backdrop-blur-md">
              <IoLockClosedOutline size={26} className="text-[#646cff]" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-3">
            Reset Password
          </h2>
          <div className="w-16 h-[4px] bg-[#646cff] rounded-full mx-auto mb-4"></div>

          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[340px] mx-auto">
            Create a strong password to secure your account.
          </p>

          {email && (
            <span className="mt-4 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-900/50 border border-slate-800/80 text-[#646cff] shadow-sm break-all max-w-full tracking-wide">
              {email}
            </span>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">
              New Password
            </label>

            <div className="relative group">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${errors.password ? 'text-rose-500' : 'text-slate-500 group-focus-within:text-[#646cff]'}`}
              >
                <IoLockClosedOutline size={18} />
              </div>

              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="new-password"
                {...register('password', {
                  required: 'Password is required!',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters!',
                  },
                  validate: {
                    hasUpper: (v) =>
                      /[A-Z]/.test(v) || 'Must contain uppercase!',
                    hasLower: (v) =>
                      /[a-z]/.test(v) || 'Must contain lowercase!',
                    hasNumber: (v) => /[0-9]/.test(v) || 'Must contain number!',
                    hasSpecial: (v) =>
                      /[!@#$%^&*]/.test(v) || 'Must contain special character!',
                  },
                })}
                className={`w-full bg-slate-900/50 border rounded-xl py-3.5 pl-11 pr-12 text-white placeholder-slate-600 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
                  ${
                    errors.password
                      ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/10'
                      : 'border-slate-800/80 focus:border-[#646cff]/80 focus:bg-slate-900/90 focus:ring-4 focus:ring-[#646cff]/10'
                  }`}
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#646cff] transition-colors duration-300"
              >
                {showPass ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>

            {/* Error Message */}
            {errors.password && (
              <p className="mt-2 text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> {errors.password.message}
              </p>
            )}

            {/* Pro Requirement Live Checklist */}
            <div className="mt-3 p-3 bg-slate-900/30 border border-slate-900/60 rounded-xl space-y-1.5 text-[11px] font-medium transition-all duration-300">
              <div className="flex items-center gap-2 text-slate-400">
                {rules.length ? (
                  <FaCheck className="text-emerald-400" />
                ) : (
                  <FaTimes className="text-slate-600" />
                )}
                <span
                  className={
                    rules.length ? 'text-emerald-400/80 line-through' : ''
                  }
                >
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                {rules.uppercase ? (
                  <FaCheck className="text-emerald-400" />
                ) : (
                  <FaTimes className="text-slate-600" />
                )}
                <span
                  className={
                    rules.uppercase ? 'text-emerald-400/80 line-through' : ''
                  }
                >
                  One uppercase letter (A-Z)
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                {rules.lowercase ? (
                  <FaCheck className="text-emerald-400" />
                ) : (
                  <FaTimes className="text-slate-600" />
                )}
                <span
                  className={
                    rules.lowercase ? 'text-emerald-400/80 line-through' : ''
                  }
                >
                  One lowercase letter (a-z)
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                {rules.number ? (
                  <FaCheck className="text-emerald-400" />
                ) : (
                  <FaTimes className="text-slate-600" />
                )}
                <span
                  className={
                    rules.number ? 'text-emerald-400/80 line-through' : ''
                  }
                >
                  One numeric digit (0-9)
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                {rules.special ? (
                  <FaCheck className="text-emerald-400" />
                ) : (
                  <FaTimes className="text-slate-600" />
                )}
                <span
                  className={
                    rules.special ? 'text-emerald-400/80 line-through' : ''
                  }
                >
                  One special character (!@#$%^&*)
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">
              Confirm Password
            </label>

            <div className="relative group">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${errors.confirmPassword ? 'text-rose-500' : 'text-slate-500 group-focus-within:text-[#646cff]'}`}
              >
                <IoShieldCheckmarkOutline size={18} />
              </div>

              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="new-password"
                {...register('confirmPassword', {
                  required: 'Confirm password is required!',
                  validate: (value) =>
                    value === password || 'Passwords do not match!',
                })}
                className={`w-full bg-slate-900/50 border rounded-xl py-3.5 pl-11 pr-12 text-white placeholder-slate-600 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
                  ${
                    errors.confirmPassword
                      ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/10'
                      : 'border-slate-800/80 focus:border-[#646cff]/80 focus:bg-slate-900/90 focus:ring-4 focus:ring-[#646cff]/10'
                  }`}
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#646cff] transition-colors duration-300"
              >
                {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-2 text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full cursor-pointer mt-6 bg-[#646cff] hover:bg-[#5563ff] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 py-3.5 rounded-xl font-bold text-white text-[1rem] tracking-widest shadow-[0_4px_25px_rgba(100,108,255,0.2)] hover:shadow-[0_4px_35px_rgba(100,108,255,0.35)] hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.99]"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M12 2a10 10 0 0110 10h-4a6 6 0 00-6-6V2z"
                  />
                </svg>
                Updating...
              </span>
            ) : (
              'Save New Password'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-slate-800/60 pt-5 text-center">
          <p className="text-[11px] text-slate-500 font-medium">
            Protected by multi-layer end-to-end encryption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
