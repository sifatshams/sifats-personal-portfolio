import { FaExclamationTriangle } from 'react-icons/fa';

const ProjectDeleteModal = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  project,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      {/* Modal */}
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-red-500/10 animate-in fade-in zoom-in duration-200">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-4xl text-red-500">
          <FaExclamationTriangle />
        </div>

        {/* Title */}
        <h2 className="mt-6 text-center text-2xl font-bold text-white">
          Delete Project
        </h2>

        {/* Description */}
        <p className="mt-4 text-center leading-7 text-slate-400">
          Are you sure you want to permanently delete this project?
        </p>

        {/* Project Name */}
        <p className="mt-3 break-words text-center text-lg font-semibold text-red-400">
          {project?.title || 'Untitled Project'}
        </p>

        {/* Warning */}
        <p className="mt-3 text-center text-sm text-slate-500">
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex-1
              rounded-2xl
              border
              border-slate-700
              py-3
              font-medium
              transition
              hover:bg-slate-800
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              flex-1
              rounded-2xl
              bg-red-600
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-500
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? 'Deleting...' : 'Delete Project'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDeleteModal;
