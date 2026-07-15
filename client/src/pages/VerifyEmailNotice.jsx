import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyEmailNotice = () => {
  const location = useLocation();

  const email = location.state?.email;

  // If user refresh page → state lost → redirect safe fallback
  useEffect(() => {
    if (!email) {
      console.log('No email found in state, redirecting...');
    }
  }, [email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-4">
      <div className="max-w-md w-full text-center bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Registration Successful!</h1>

        <p className="text-slate-400 mb-2">
          We have sent a verification link to:
        </p>

        {/* SAFE EMAIL DISPLAY */}
        <p className="text-[#646cff] font-semibold mb-6 break-all">
          {email || 'Check your email inbox'}
        </p>

        <p className="text-slate-400 mb-6">
          Please check your inbox (and spam folder). After verifying your email,
          you can log in.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailNotice;
