// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoArrowBack, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useSendOtpMutation } from '../hooks/auth/useSendOtpMutation';
import { useVerifyOtpMutation } from '../hooks/auth/useVerifyOtpMutation';
import useResetPasswordStore from '../store/resetPasswordStore';

const VerifyResetOTP = () => {
  const navigate = useNavigate();

  const { email } = useResetPasswordStore();

  const { mutate: verifyOtp, isPending } = useVerifyOtpMutation();

  const { mutate: resendOtp, isPending: resendPending } = useSendOtpMutation();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // Resend State
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Input refs
  const inputRefs = useRef([]);

  // Mask Email
  const maskEmail = (email) => {
    if (!email) return '';

    const [name, domain] = email.split('@');

    return `${name.substring(0, 2)}******@${domain}`;
  };

  // Countdown Timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // Resend OTP
  const handleResend = () => {
    if (!canResend) return;

    resendOtp(
      {
        email,
      },
      {
        onSuccess: () => {
          setCountdown(60);
          setCanResend(false);
        },
      },
    );
  };

  // Handle OTP input
  const handleChange = (value, index) => {
    // Allow only single digit
    if (!/^\d?$/.test(value)) return;

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value;

    // Update state & form
    setOtp(newOtp);
    setValue('otp', newOtp.join(''));

    // Focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle keyboard
  const handleKeyDown = (e, index) => {
    switch (e.key) {
      // Remove digit
      case 'Backspace': {
        e.preventDefault();

        const newOtp = [...otp];

        // Clear current box
        if (newOtp[index] !== '') {
          newOtp[index] = '';
          setOtp(newOtp);
          setValue('otp', newOtp.join(''));
        }
        // Move back & clear
        else if (index > 0) {
          newOtp[index - 1] = '';
          setOtp(newOtp);
          setValue('otp', newOtp.join(''));

          inputRefs.current[index - 1]?.focus();
        }

        break;
      }

      // Delete current digit
      case 'Delete': {
        e.preventDefault();

        const newOtp = [...otp];
        newOtp[index] = '';

        setOtp(newOtp);
        setValue('otp', newOtp.join(''));

        break;
      }

      // Move left
      case 'ArrowLeft':
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;

      // Move right
      case 'ArrowRight':
        if (index < 5) {
          inputRefs.current[index + 1]?.focus();
        }
        break;

      // First input
      case 'Home':
        inputRefs.current[0]?.focus();
        break;

      // Last input
      case 'End':
        inputRefs.current[5]?.focus();
        break;

      default:
        break;
    }
  };

  // Handle Paste
  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (!pasted) return;

    const newOtp = [...otp];

    pasted.split('').forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
    setValue('otp', newOtp.join(''));

    // Focus last filled input
    const lastIndex = Math.min(pasted.length - 1, 5);

    inputRefs.current[lastIndex]?.focus();
  };

  // Verify OTP
  const onSubmit = () => {
    if (otp.join('').length !== 6) return;

    verifyOtp(
      {
        email,
        otp: otp.join(''),
      },
      {
        onSuccess: () => {
          navigate('/reset-password');
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[300px] h-[300px] bg-indigo-600/20 blur-[120px] rounded-full top-20 left-10" />

      <div className="absolute w-[250px] h-[250px] bg-purple-600/20 blur-[120px] rounded-full bottom-10 right-10" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-[#0b1120]/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-[0_0_40px_rgba(99,102,241,.15)]">
        {/* Back Button */}
        <Link
          to="/forgot-password"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors mb-6"
        >
          <IoArrowBack size={18} />
          <span>Back</span>
        </Link>

        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500 flex items-center justify-center mx-auto">
            <IoShieldCheckmarkOutline size={30} className="text-indigo-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mt-5">Verify OTP</h1>

          <p className="text-slate-400 text-sm mt-3">
            We've sent a 6-digit verification code to
          </p>

          <p className="text-indigo-400 font-medium mt-2 break-all">
            {maskEmail(email)}
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          {/* OTP Inputs */}

          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                inputMode="numeric"
                spellCheck={false}
                autoCorrect="off"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-16 rounded-xl bg-[#111827] border border-slate-700 hover:border-indigo-500 text-center text-2xl font-bold text-white outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:scale-105 active:scale-95"
              />
            ))}
          </div>

          {errors.otp && (
            <p className="text-red-400 text-sm text-center mt-3">
              {errors.otp.message}
            </p>
          )}
          {/* Verify Button */}
          <button
            type="submit"
            disabled={otp.join('').length !== 6 || isPending}
            className="
              mt-8
              w-full
              py-3.5
              rounded-xl
              bg-indigo-600
              cursor-pointer
              hover:bg-indigo-500
              disabled:opacity-60
              disabled:cursor-not-allowed
              text-white
              font-semibold
              transition-all
              duration-300
            "
          >
            {isPending ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        {/* Resend */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">Didn't receive the code?</p>

          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend || resendPending}
            className="
              mt-2
              cursor-pointer
              text-indigo-400
              hover:text-indigo-300
              disabled:text-slate-500
              disabled:cursor-not-allowed
              transition-colors
              font-medium
            "
          >
            {resendPending
              ? 'Sending OTP...'
              : canResend
                ? 'Resend Verification Code'
                : `Resend in ${countdown}s`}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-slate-800 pt-5">
          <p className="text-center text-xs text-slate-500">
            Didn't get the email? Check your Spam/Junk folder or request a new
            OTP.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyResetOTP;
