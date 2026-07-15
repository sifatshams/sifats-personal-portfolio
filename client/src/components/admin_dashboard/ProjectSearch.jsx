import { FaSearch } from 'react-icons/fa';

const ProjectSearch = ({ value, onChange }) => {
  return (
    <div className="relative w-full md:w-80">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search project..."
        className="
        w-full
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/70
        py-3
        pl-11
        pr-4
        text-sm
        outline-none
        transition
        focus:border-indigo-500
        "
      />
    </div>
  );
};

export default ProjectSearch;
