import { FaClock, FaFolderOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'bg-emerald-500/10 text-emerald-400';

    case 'in progress':
      return 'bg-blue-500/10 text-blue-400';

    case 'pending':
      return 'bg-orange-500/10 text-orange-400';

    default:
      return 'bg-slate-500/10 text-slate-400';
  }
};

const RecentProject = ({ projects = [] }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
      {/* header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <FaFolderOpen className="text-indigo-400" />
            Recent Projects
          </h2>

          <p className="text-sm text-slate-500">
            Latest projects from database
          </p>
        </div>

        <Link
          to="/admin-dashboard/projects"
          className="text-sm text-indigo-400 hover:text-indigo-300"
        >
          View All
        </Link>
      </div>

      {/* empty */}

      {!projects.length && (
        <div className="py-16 text-center text-slate-500">
          No projects found.
        </div>
      )}

      {/* list */}

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 transition hover:border-indigo-500"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-white">{project.title}</h3>

                <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                  {project.description}
                </p>

                {/* technologies */}

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs ${getStatusStyle(
                  project.status,
                )}`}
              >
                {project.status}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <FaClock />

              {new Date(project.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProject;
