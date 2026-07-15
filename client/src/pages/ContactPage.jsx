// @ts-nocheck
import { useForm } from 'react-hook-form';
import { FaArrowRight, FaEnvelope, FaHeadset, FaSpinner } from 'react-icons/fa';
import { HiOutlineShieldExclamation } from 'react-icons/hi2';
import { useContactMutation } from '../hooks/auth/userContactMutation';
import useAuthStore from '../store/authStore';

const ContactPage = () => {
  // get user details from my auth store
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      userName: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const { mutate, isPending } = useContactMutation();

  // submit handler
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  // If the logged-in user is an admin, show a clean restricted access view
  if (isAdmin) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-[#020617] text-white flex items-center justify-center px-6 selection:bg-[#646cff]/30 selection:text-indigo-200">
        {/* background glow effects */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-[#646cff]/10 blur-[130px]" />

        <div className="relative z-10 w-full max-w-[500px] text-center bg-[#0b1120]/90 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 bg-[#646cff]/20 blur-xl rounded-full animate-pulse" />
            <div className="relative w-16 h-16 rounded-full bg-slate-900/50 border border-slate-800/80 flex items-center justify-center backdrop-blur-md">
              <HiOutlineShieldExclamation
                size={28}
                className="text-[#646cff]"
              />
            </div>
          </div>

          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-3">
            Admin Access Restricted
          </h2>
          <div className="w-16 h-[4px] bg-[#646cff] rounded-full mx-auto mb-4"></div>

          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[340px] mx-auto">
            Hi Admin! This contact page is designed for general users and
            guests. You do not need to send messages from here.
          </p>
        </div>
      </section>
    );
  }

  // General user view
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020617] text-white selection:bg-[#646cff]/30 selection:text-indigo-200">
      {/* background glow effects */}
      <div className="absolute left-10 top-10 h-[450px] w-[450px] rounded-full bg-[#646cff]/10 blur-[130px] animate-pulse duration-[10s]" />
      <div className="absolute bottom-10 right-10 h-[450px] w-[450px] rounded-full bg-purple-500/5 blur-[130px] animate-pulse duration-[8s]" />

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 py-20 lg:py-28">
        {/* hero header */}
        <div className="mx-auto mb-16 max-w-[850px] text-center">
          {/* pill badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/50 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-300">
            <FaHeadset className="text-[#646cff] animate-bounce" />
            Contact Sifat Tech
          </div>

          {/* section title */}
          <h1 className="text-4xl font-black tracking-tight leading-tight md:text-6xl bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Let's Start A
            <span className="mt-2 block text-[#646cff]">
              Meaningful Conversation
            </span>
          </h1>

          {/* separator line */}
          <div className="w-20 h-[4px] bg-[#646cff] rounded-full mx-auto mt-6"></div>

          {/* description */}
          <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-400 font-medium max-w-[650px] mx-auto">
            Whether you have a project idea, business inquiry, or need technical
            guidance, we're here to help transform your vision into modern,
            scalable digital solutions.
          </p>
        </div>

        {/* main grid content */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* left column - support details */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative group w-full max-w-[500px]">
              <div className="absolute inset-0 bg-[#646cff]/5 blur-3xl rounded-full" />
              <img
                src="/images/support.png"
                alt="Customer Support"
                className="relative z-10 w-full drop-shadow-[0_0_50px_rgba(100,108,255,0.25)] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>

            {/* support info card */}
            <div className="relative mt-10 w-full max-w-[500px] rounded-[2rem] border border-slate-800/60 bg-[#0b1120]/40 p-6 backdrop-blur-xl shadow-lg">
              <div className="flex gap-4 items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#646cff]/10 border border-[#646cff]/20 shadow-[0_0_20px_rgba(100,108,255,0.15)]">
                  <FaEnvelope className="text-lg text-[#646cff]" />
                </div>

                <div>
                  <h3 className="font-bold text-white text-base md:text-lg tracking-wide">
                    Fast & Reliable Support
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 font-medium leading-relaxed">
                    We usually reply within 24 hours. Every message is reviewed
                    personally to ensure the best possible assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* right column - premium glassmorphic contact form */}
          <div className="relative z-10 w-full max-w-[580px] mx-auto bg-[#0b1120]/90 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
            {/* card heading */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-3">
                Send Us A Message
              </h2>
              <div className="w-16 h-[4px] bg-[#646cff] rounded-full mb-4"></div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            {/* form container */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              {/* name input */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register('userName', {
                    required: 'Full name is required.',
                    minLength: {
                      value: 2,
                      message: 'Minimum 2 characters required.',
                    },
                  })}
                  className={`w-full bg-slate-900/50 border rounded-xl py-3.5 px-4 text-white placeholder-slate-600 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] ${
                    errors.userName
                      ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/10'
                      : 'border-slate-800/80 focus:border-[#646cff]/80 focus:bg-slate-900/90 focus:ring-4 focus:ring-[#646cff]/10'
                  }`}
                />
                {errors.userName && (
                  <p className="mt-2 text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                    <span>⚠️</span> {errors.userName.message}
                  </p>
                )}
              </div>

              {/* email input */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required.',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Enter a valid email address.',
                    },
                  })}
                  className={`w-full bg-slate-900/50 border rounded-xl py-3.5 px-4 text-white placeholder-slate-600 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] ${
                    errors.email
                      ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/10'
                      : 'border-slate-800/80 focus:border-[#646cff]/80 focus:bg-slate-900/90 focus:ring-4 focus:ring-[#646cff]/10'
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                    <span>⚠️</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* subject input */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Project discussion"
                  {...register('subject', {
                    required: 'Subject is required.',
                    minLength: {
                      value: 3,
                      message: 'Minimum 3 characters required.',
                    },
                  })}
                  className={`w-full bg-slate-900/50 border rounded-xl py-3.5 px-4 text-white placeholder-slate-600 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] ${
                    errors.subject
                      ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/10'
                      : 'border-slate-800/80 focus:border-[#646cff]/80 focus:bg-slate-900/90 focus:ring-4 focus:ring-[#646cff]/10'
                  }`}
                />
                {errors.subject && (
                  <p className="mt-2 text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                    <span>⚠️</span> {errors.subject.message}
                  </p>
                )}
              </div>

              {/* message textarea */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project..."
                  {...register('message', {
                    required: 'Message is required.',
                    minLength: {
                      value: 10,
                      message: 'Minimum 10 characters required.',
                    },
                  })}
                  className={`w-full resize-none bg-slate-900/50 border rounded-xl py-3.5 px-4 text-white placeholder-slate-600 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] ${
                    errors.message
                      ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/10'
                      : 'border-slate-800/80 focus:border-[#646cff]/80 focus:bg-slate-900/90 focus:ring-4 focus:ring-[#646cff]/10'
                  }`}
                />
                {errors.message && (
                  <p className="mt-2 text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                    <span>⚠️</span> {errors.message.message}
                  </p>
                )}
              </div>

              {/* submit button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full cursor-pointer mt-6 bg-[#646cff] hover:bg-[#5563ff] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(100,108,255,0.2)] hover:shadow-[0_4px_35px_rgba(100,108,255,0.35)] hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.99]"
              >
                {isPending ? (
                  <>
                    <FaSpinner className="animate-spin text-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FaArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
