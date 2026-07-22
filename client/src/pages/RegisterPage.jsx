// @ts-nocheck
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaCheck,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import { IoLockClosedOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useRegisterMutation } from '../hooks/auth/useRegisterMutation';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const { mutate, isPending } = useRegisterMutation();

  // Watch password field for real-time validation checklist
  const password = watch('password', '');

  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        reset();
        navigate('/verify-email-notice', {
          state: {
            email: data.email,
            message: res?.message,
          },
        });
      },
      onError: (err) => {
        console.log('REGISTER ERROR:', err?.response?.data);
      },
    });
  };

  return (
    <section className="relative min-h-screen w-full bg-[#020617] text-white overflow-hidden px-4 py-16 md:px-6 selection:bg-[#646cff]/30 selection:text-indigo-200">
      {/* title */}
      <SEO
        title="Register"
        description="Create a free account to unlock personalized features, save your progress, and get access to exclusive tools and content."
        keywords="register, sign up, create account, new user registration"
        image="/og-register.png"
        url="https://sifatcoder.vercel.app/register"
      />
      {/* Background Glow Effects */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#646cff]/10 blur-[130px] rounded-full animate-pulse duration-[10s]"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/5 blur-[130px] rounded-full animate-pulse duration-[8s]"></div>

      <div className="relative z-10 max-w-[1300px] mx-auto">
        {/* TOP HERO TEXT */}
        <div className="text-center max-w-[850px] mx-auto mb-16">
          {/* animated badge */}
          <div className="inline-flex items-center gap-2.5 bg-slate-950/60 border border-slate-800/80 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-slate-400 mb-6 backdrop-blur-md select-none">
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#646cff] opacity-80 scale-[1.3]"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#646cff] shadow-[0_0_10px_rgba(100,108,255,0.8)]"></span>
            </span>
            <span>Join Sifat Tech</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Start Your
            <span className="text-[#646cff] block mt-3 bg-gradient-to-r from-[#646cff] to-purple-400 bg-clip-text ">
              Digital Journey Today
            </span>
          </h1>

          {/* Description */}
          <p className="text-slate-400 mt-6 text-base md:text-lg leading-relaxed max-w-[645px] mx-auto font-medium">
            Create your account and become part of a modern digital ecosystem
            designed for innovation, growth and seamless experiences.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {/* Left Image */}
          <div className="flex justify-center xl:pr-10">
            <img
              className="w-full max-w-[480px] rounded-[32px] object-contain"
              src="/images/register.png"
              alt="register img"
            />
          </div>

          {/* Right Form */}
          <div className="bg-slate-950/40 backdrop-blur-3xl border border-slate-800/60 rounded-[2.5rem] p-8 md:p-10 shadow-2xl w-full max-w-[540px] justify-self-center">
            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-3">
                Registration Form
              </h2>
              <div className="w-16 h-[4px] bg-[#646cff] rounded-full"></div>
              <p className="text-slate-400 mt-4 text-sm font-medium leading-relaxed">
                Create your secure account and unlock access to modern digital
                experiences with Sifat Tech.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block"
                >
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#646cff] transition-colors duration-300">
                    <FaUser size={14} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    autoComplete="off"
                    required
                    {...register('name')}
                    className="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-[#646cff]/80 focus:bg-slate-900/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#646cff] transition-colors duration-300">
                    <FaEnvelope size={14} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    required
                    {...register('email')}
                    className="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-[#646cff]/80 focus:bg-slate-900/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block"
                >
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#646cff] transition-colors duration-300">
                    <FaPhone size={14} />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    autoComplete="off"
                    required
                    {...register('phone')}
                    className="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-[#646cff]/80 focus:bg-slate-900/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block"
                >
                  Password
                </label>
                <div className="relative group">
                  <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${errors.password ? 'text-rose-500' : 'text-slate-500 group-focus-within:text-[#646cff]'}`}
                  >
                    <IoLockClosedOutline size={16} />
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
                    autoComplete="off"
                    required
                    {...register('password', {
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters!',
                      },
                      validate: {
                        hasUpper: (v) =>
                          /[A-Z]/.test(v) || 'Must contain uppercase!',
                        hasLower: (v) =>
                          /[a-z]/.test(v) || 'Must contain lowercase!',
                        hasNumber: (v) =>
                          /[0-9]/.test(v) || 'Must contain number!',
                        hasSpecial: (v) =>
                          /[!@#$%^&*]/.test(v) ||
                          'Must contain special character!',
                      },
                    })}
                    className={`w-full bg-slate-900/50 border rounded-xl py-3.5 pl-11 pr-12 text-white placeholder-slate-600 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
                      ${
                        errors.password
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-slate-800/80 focus:border-[#646cff]/80 focus:bg-slate-900/90'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#646cff] transition-colors duration-300"
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

                {/* Real-time Requirement Live Checklist */}
                <div className="mt-3 p-3 bg-slate-900/30 border border-slate-900/60 rounded-xl space-y-1.5 text-[11px] font-medium transition-all duration-300">
                  <div className="flex items-center gap-2 text-slate-400">
                    {rules.length ? (
                      <FaCheck className="text-emerald-400" />
                    ) : (
                      <FaTimes className="text-slate-600" />
                    )}
                    <span
                      className={
                        rules.length
                          ? 'text-emerald-400/80 line-through transition-all'
                          : ''
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
                        rules.uppercase
                          ? 'text-emerald-400/80 line-through transition-all'
                          : ''
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
                        rules.lowercase
                          ? 'text-emerald-400/80 line-through transition-all'
                          : ''
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
                        rules.number
                          ? 'text-emerald-400/80 line-through transition-all'
                          : ''
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
                        rules.special
                          ? 'text-emerald-400/80 line-through transition-all'
                          : ''
                      }
                    >
                      One special character (!@#$%^&*)
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full cursor-pointer mt-6 bg-[#646cff] hover:bg-[#5563ff] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 py-3.5 rounded-xl font-bold text-[1rem] tracking-widest shadow-[0_4px_25px_rgba(100,108,255,0.2)] hover:shadow-[0_4px_35px_rgba(100,108,255,0.35)] hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.99]"
              >
                {isPending ? 'Creating Account...' : 'Create Account'}
              </button>

              {/* Bottom Text */}
              <p className="text-center text-slate-400 text-sm font-medium pt-3">
                Already have an account?
                <Link
                  to="/login"
                  className="text-[#646cff] ml-2 font-semibold cursor-pointer hover:text-[#5563ff] hover:underline transition-all duration-300"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
