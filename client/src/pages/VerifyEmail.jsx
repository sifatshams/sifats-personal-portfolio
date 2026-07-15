import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVerifyEmailMutation } from '../hooks/auth/useVerifyEmailMutation';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const called = useRef(false);

  const { mutateAsync } = useVerifyEmailMutation();

  useEffect(() => {
    const verify = async () => {
      if (!token || called.current) return;

      called.current = true;

      try {
        await mutateAsync(token);

        // success → login
        navigate('/login', { replace: true });
      } catch (error) {
        // error → login
        navigate('/login', { replace: true });
      }
    };

    verify();
  }, [token, mutateAsync, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <div className="text-center">
        <div className="text-xl mb-2">🔄 Verifying your email...</div>

        <p className="text-slate-400">
          Please wait while we confirm your account!
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
