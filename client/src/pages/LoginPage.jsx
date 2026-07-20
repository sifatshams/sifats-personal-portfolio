// @ts-nocheck
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../hooks/auth/useLoginMutation';
import useAuthStore from '../store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  // initialize useForm with default values
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { mutate, isPending } = useLoginMutation();
  const login = useAuthStore((state) => state.login);

  // @ts-ignore
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        // zustand login
        login(res?.user, res?.token);

        // clear form
        reset();
        // role
        const role = res?.user?.role;
        // redirect
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      },
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-white overflow-hidden px-4 py-16 md:px-6 selection:bg-[#646cff]/30 selection:text-indigo-200">
      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#646cff]/10 blur-[130px] rounded-full animate-pulse duration-[10s]"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/5 blur-[130px] rounded-full animate-pulse duration-[8s]"></div>

      <section className="relative max-w-[1300px] mx-auto w-full">
        <div className="relative z-10">
          {/* TOP HERO TEXT */}
          <div className="text-center max-w-[850px] mx-auto mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-slate-950/60 border border-slate-800/80 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-slate-400 mb-6 backdrop-blur-md select-none">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#646cff] opacity-80 scale-[1.3]"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#646cff] shadow-[0_0_10px_rgba(100,108,255,0.8)]"></span>
              </span>
              <span>Welcome Back</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Secure Access To
              <span className="text-[#646cff] block mt-3 bg-gradient-to-r from-[#646cff] to-purple-400 bg-clip-text">
                Your Digital Workspace
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-400 mt-6 text-base md:text-lg leading-relaxed max-w-[645px] mx-auto font-medium">
              Login to continue your journey with Sifat Tech and access a
              modern, secure and seamless digital experience.
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center justify-items-center">
            {/* Left Form */}
            <div className="bg-slate-950/40 backdrop-blur-3xl border border-slate-800/60 rounded-[2.5rem] p-8 md:p-10 shadow-2xl w-full max-w-[540px] mx-auto order-2 lg:order-1 justify-self-center">
              {/* Form Header */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-3">
                  Login Account
                </h2>

                <div className="w-16 h-[4px] bg-[#646cff] rounded-full"></div>

                <p className="text-slate-400 mt-4 text-sm font-medium leading-relaxed">
                  Welcome back! Login securely and continue managing your
                  digital experience.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block"
                  >
                    Password
                  </label>

                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#646cff] transition-colors duration-300">
                      <FaLock size={14} />
                    </div>
                    <input
                      type={showPass ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter your password"
                      autoComplete="off"
                      required
                      {...register('password')}
                      className="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-[#646cff]/80 focus:bg-slate-900/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#646cff] transition-colors duration-300"
                    >
                      {showPass ? (
                        <FaEyeSlash size={16} />
                      ) : (
                        <FaEye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between text-sm flex-wrap gap-3 pt-1">
                  <label className="flex items-center gap-2.5 text-slate-400 text-[14px] font-semibold tracking-wider cursor-pointer select-none hover:text-slate-300 transition-colors duration-200">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="accent-[#646cff] cursor-pointer w-4 h-4 rounded border-slate-800 bg-slate-900"
                    />
                    Remember me
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-[#646cff] text-[14px] font-bold tracking-wider hover:text-[#5563ff] hover:underline transition-all duration-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full cursor-pointer mt-4 bg-[#646cff] hover:bg-[#5563ff] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 py-3.5 rounded-xl font-bold text-[1rem] tracking-widest shadow-[0_4px_25px_rgba(100,108,255,0.2)] hover:shadow-[0_4px_35px_rgba(100,108,255,0.35)] hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.99]"
                >
                  {isPending ? 'Logging in...' : 'Login Now'}
                </button>

                {/* Bottom Text */}
                <p className="text-center text-slate-400 text-sm font-medium pt-3">
                  Don't have an account?
                  <Link
                    to="/register"
                    className="text-[#646cff] ml-2 font-semibold cursor-pointer hover:text-[#5563ff] hover:underline transition-all duration-300"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>

            {/* Right Image (No Glow, Clean & Minimal) */}
            <div className="flex justify-center order-1 lg:order-2 xl:pl-10">
              <img
                className="w-full max-w-[480px] rounded-[32px] object-contain"
                src="/images/login.png"
                alt="login image"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
