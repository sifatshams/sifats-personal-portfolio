import { FaCamera, FaTrashAlt, FaUpload } from 'react-icons/fa';

const ProfilePhotoCard = () => {
  return (
    <section className="group relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-[#0b1120]/80 backdrop-blur-xl transition-all duration-300 hover:border-[#646cff]/40">
      {/* Glow */}
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#646cff]/10 blur-[120px]" />

      <div className="relative z-10 p-8 lg:p-10">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2">
            <FaCamera className="text-xs text-[#646cff]" />

            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-300">
              Profile Photo
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-black text-white">
            Profile Picture
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
            Upload a clear and professional profile photo that represents your
            account across the dashboard.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 grid gap-10 xl:grid-cols-[280px_1fr]">
          {/* Left Side */}
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="relative">
              <div className="rounded-[30px] bg-gradient-to-br from-[#646cff] via-[#5563ff] to-violet-600 p-[3px]">
                <div className="rounded-[28px] bg-[#0b1120] p-2">
                  <img
                    src="https://i.pravatar.cc/400"
                    alt="Profile"
                    className="h-40 w-40 rounded-[24px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              <span className="absolute bottom-3 right-3 h-5 w-5 rounded-full border-4 border-[#0b1120] bg-emerald-500" />
            </div>

            <h3 className="mt-6 text-xl font-bold text-white">
              Current Avatar
            </h3>

            <p className="mt-2 text-center text-sm leading-6 text-slate-400">
              Your current profile picture.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex w-full flex-col gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#646cff] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#5563ff] hover:shadow-[0_0_30px_rgba(100,108,255,.35)]"
              >
                <FaUpload />
                Upload Photo
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-5 py-3 text-sm font-bold text-rose-400 transition-all duration-300 hover:bg-rose-500/20"
              >
                <FaTrashAlt />
                Remove
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div>
            <h3 className="text-xl font-bold text-white">
              Upload a New Profile Photo
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Use a high-quality square image for the best appearance across
              your dashboard and public profile. Supported formats include JPG,
              PNG and WEBP.
            </p>

            {/* Upload Area */}
            <div className="mt-8 rounded-[28px] border-2 border-dashed border-slate-700 bg-slate-900/30 p-8 transition-all duration-300 hover:border-[#646cff]/60 hover:bg-slate-900/50">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#646cff]/10">
                  <FaUpload className="text-3xl text-[#646cff]" />
                </div>

                <h4 className="mt-6 text-xl font-bold text-white">
                  Drag & Drop Your Image
                </h4>

                <p className="mt-3 max-w-lg text-sm leading-7 text-slate-400">
                  Drag your image here, or click the button below to browse
                  files from your device.
                </p>

                <button
                  type="button"
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/70 px-6 py-3 text-sm font-bold text-slate-200 transition-all duration-300 hover:border-[#646cff] hover:text-[#646cff]"
                >
                  <FaUpload />
                  Browse Files
                </button>
              </div>
            </div>

            {/* Upload Requirements */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Maximum Size
                </p>

                <h4 className="mt-2 text-lg font-bold text-white">2 MB</h4>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Recommended Size
                </p>

                <h4 className="mt-2 text-lg font-bold text-white">
                  500 × 500 px
                </h4>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Best Format
                </p>

                <h4 className="mt-2 text-lg font-bold text-white">
                  PNG / WEBP
                </h4>
              </div>
            </div>

            {/* Supported Formats */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-slate-300">
                Supported Formats
              </h4>

              <div className="mt-4 flex flex-wrap gap-3">
                {['PNG', 'JPG', 'JPEG', 'WEBP'].map((format) => (
                  <span
                    key={format}
                    className="rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors duration-300 hover:border-[#646cff] hover:text-[#646cff]"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
            {/* Footer */}
            <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="font-semibold text-emerald-300">
                    Profile Photo Guidelines
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-emerald-200/80">
                    Use a clear, professional image with a square aspect ratio
                    for the best appearance throughout your account.
                  </p>
                </div>

                <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Ready to Upload
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePhotoCard;
