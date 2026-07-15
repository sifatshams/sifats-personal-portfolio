const ProjectFilter = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/70
        px-4
        py-3
        text-sm
        outline-none
        focus:border-indigo-500
        "
    >
      <option value="">All Status</option>

      <option value="completed">Completed</option>

      <option value="in progress">In Progress</option>

      <option value="pending">Pending</option>
    </select>
  );
};

export default ProjectFilter;
