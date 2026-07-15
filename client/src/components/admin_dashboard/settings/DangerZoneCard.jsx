import { FaExclamationTriangle, FaTrashAlt, FaUserSlash } from 'react-icons/fa';

const DangerZoneCard = () => {
  return (
    <section className="group relative overflow-hidden rounded-[2rem] border border-red-500/20 bg-gradient-to-br from-red-950/20 via-[#0b1120] to-[#0b1120] backdrop-blur-xl transition-all duration-300 hover:border-red-500/40">
      {/* Glow */}
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-red-500/10 blur-[120px]" />

      <div className="relative z-10 p-8 lg:p-10">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2">
            <FaExclamationTriangle className="text-red-400" />

            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-300">
              Danger Zone
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-black text-white">
            Delete Account
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            Permanently deleting your account will remove your profile,
            projects, settings and all associated data. This action cannot be
            undone.
          </p>
        </div>

        {/* Warning Card */}
        <div className="mt-10 rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/10">
              <FaUserSlash className="text-2xl text-red-400" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                This action is irreversible
              </h3>

              <p className="mt-2 leading-7 text-slate-400">
                Once your account is deleted, there is no way to recover your
                data. Please make sure you've backed up anything important
                before continuing.
              </p>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h4 className="font-bold text-white">
            Before deleting your account:
          </h4>

          <ul className="mt-5 space-y-3 text-sm text-slate-400">
            <li>• Download or back up any important data.</li>

            <li>• Ensure no active projects depend on this account.</li>

            <li>• You will lose access immediately after deletion.</li>

            <li>• This action cannot be reversed.</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col gap-4 border-t border-slate-800 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-xl text-sm text-slate-500">
            We strongly recommend reviewing the information above before
            proceeding.
          </p>

          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,.35)]"
          >
            <FaTrashAlt />
            Delete My Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default DangerZoneCard;
