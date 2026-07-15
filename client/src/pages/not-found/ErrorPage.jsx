import { FaArrowLeft, FaBug } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex items-center justify-center py-10 px-6">
      {/* Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#646cff]/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-[1000px] w-full">
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-[40px] p-8 md:p-14 text-center shadow-2xl">
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-sm text-slate-300 mb-8">
            ⚠️ Page Not Found
          </div>

          {/* 404 */}
          <h1 className="text-[90px] md:text-[180px] font-black leading-none text-transparent bg-gradient-to-b from-[#646cff] to-[#8b5cf6] bg-clip-text drop-shadow-[0_0_30px_rgba(100,108,255,0.35)]">
            404
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">
            Oops! Lost In Space
          </h2>

          <p className="text-slate-400 mt-6 max-w-[600px] mx-auto leading-8 text-lg">
            The page you're looking for doesn't exist, has been moved, or the
            URL might be incorrect.
          </p>

          {/* Small Info Box */}
          <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-2xl p-5 max-w-[500px] mx-auto">
            <p className="text-slate-300">
              Don't worry. You can return to the homepage or report the issue
              and we'll fix it as soon as possible!
            </p>
          </div>

          {/* btns */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              to="/"
              className="inline-flex text-white items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-[#646cff] hover:bg-[#5563ff] transition-all duration-300 shadow-lg hover:shadow-[#646cff]/40 font-medium"
            >
              <FaArrowLeft />
              Back To Home
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center text-white justify-center gap-2 px-7 py-3 rounded-2xl border border-slate-700 hover:border-[#646cff] hover:bg-slate-800 transition-all duration-300 font-medium"
            >
              <FaBug />
              Report Problem
            </Link>
          </div>

          {/* Footer Text */}
          <p className="mt-10 text-slate-500 text-sm">
            Error Code: 404 • Sifat Tech
          </p>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
