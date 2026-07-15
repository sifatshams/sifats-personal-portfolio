import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProjectPagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="
        rounded-xl
        border
        border-slate-800
        px-4
        py-2
        disabled:opacity-40
        "
      >
        <FaChevronLeft />
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`
          h-10
          w-10
          rounded-xl
          transition
          ${
            page === i + 1
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-900 border border-slate-800 hover:border-indigo-500'
          }
          `}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="
        rounded-xl
        border
        border-slate-800
        px-4
        py-2
        disabled:opacity-40
        "
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ProjectPagination;
