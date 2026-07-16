// @ts-nocheck
import { useForm } from 'react-hook-form';
import { IoMailOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useSendOtpMutation } from '../hooks/auth/useSendOtpMutation';
import useResetPasswordStore from '../store/resetPasswordStore';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { mutate: sendOtp, isPending } = useSendOtpMutation();
  const { setEmail } = useResetPasswordStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    sendOtp(data, {
      onSuccess: () => {
        // Save email for next pages
        setEmail(data.email);

        // Navigate OTP verification page
        navigate('/verify-reset-otp');
      },
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-white flex items-center justify-center overflow-hidden px-4 selection:bg-[#646cff]/30 selection:text-indigo-200">
      {/* Background Glow Effects */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-[#646cff]/10 blur-[130px] rounded-full animate-pulse duration-[10s]"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/5 blur-[130px] rounded-full animate-pulse duration-[8s]"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[480px] bg-[#0b1120]/90 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Pro Icon Badge with Glow */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 bg-[#646cff]/20 blur-xl rounded-full animate-pulse" />
            <div className="relative w-16 h-16 rounded-full bg-slate-900/50 border border-slate-800/80 flex items-center justify-center backdrop-blur-md">
              <IoMailOutline size={26} className="text-[#646cff]" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-3">
            Forgot Password?
          </h2>
          <div className="w-16 h-[4px] bg-[#646cff] rounded-full mx-auto mb-4"></div>

          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[340px] mx-auto">
            Enter your registered email address and we'll send you a
            <span className="text-[#646cff] font-semibold">
              {' '}
              6-digit verification code
            </span>{' '}
            to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Input Field */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">
              Email Address
            </label>

            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#646cff] transition-colors duration-300">
                <IoMailOutline size={18} />
              </div>

              <input
                type="email"
                placeholder="Enter your registered email"
                autoComplete="off"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
                className="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-[#646cff]/80 focus:bg-slate-900/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] focus:ring-4 focus:ring-[#646cff]/10"
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full cursor-pointer mt-6 bg-[#646cff] hover:bg-[#5563ff] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 py-3.5 rounded-xl font-bold text-[1rem] tracking-widest shadow-[0_4px_25px_rgba(100,108,255,0.2)] hover:shadow-[0_4px_35px_rgba(100,108,255,0.35)] hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.99]"
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
                Sending Code...
              </span>
            ) : (
              'Send Verification Code'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-400 text-sm font-medium pt-2">
            Remember your password?{' '}
            <Link
              to="/login"
              className="text-[#646cff] ml-1 font-semibold cursor-pointer hover:text-[#5563ff] hover:underline transition-all duration-300"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
