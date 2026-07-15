import { useState } from 'react';
import { FaEdit, FaEye, FaImage, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDeleteProjectMutation } from '../../hooks/admin/useDeleteProjectMutation';
import { useProjectsQuery } from '../../hooks/admin/useProjectsQuery';
import ProjectFilter from './ProjectFilter';
import ProjectPagination from './ProjectPagination';
import ProjectSearch from './ProjectSearch';

const ProjectTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  // Projects Query
  const { data, isLoading } = useProjectsQuery({
    page,
    search,
    status,
    limit: 10,
  });

  const deleteMutation = useDeleteProjectMutation();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteMutation.mutate(id);
    }
  };

  const projects = data?.data?.projects || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-2 text-slate-400">Manage all portfolio projects.</p>
        </div>

        <Link
          to="/admin-dashboard/projects/create"
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-medium transition hover:bg-indigo-500"
        >
          <FaPlus />
          Create Project
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ProjectSearch value={search} onChange={setSearch} />
        <ProjectFilter value={status} onChange={setStatus} />
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
        {isLoading ? (
          <div className="space-y-4 p-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-20 animate-pulse rounded-2xl bg-slate-800"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaImage className="mb-4 text-6xl text-slate-600" />
            <h2 className="text-xl font-semibold">No Projects Found</h2>
            <p className="mt-2 text-slate-500">
              Create your first portfolio project.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-slate-800 bg-slate-950/50">
                <tr className="text-left text-sm text-slate-400">
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Technologies</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project._id}
                    className="border-b border-slate-800 transition hover:bg-slate-800/40"
                  >
                    {/* Project Info */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            project.thumbnail ||
                            'https://placehold.co/80x80/0f172a/ffffff?text=IMG'
                          }
                          alt={project.title}
                          className="h-16 w-16 rounded-xl border border-slate-700 object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="mt-1 max-w-xs truncate text-sm text-slate-400">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Technologies */}
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 3 && (
                          <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-300">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-4 py-2 text-xs font-medium ${
                          project.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : project.status === 'pending'
                              ? 'bg-orange-500/10 text-orange-400'
                              : 'bg-indigo-500/10 text-indigo-400'
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-sm text-slate-400">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/admin-dashboard/projects/${project._id}`}
                          className="rounded-xl bg-slate-800 p-3 transition hover:bg-cyan-500"
                        >
                          <FaEye />
                        </Link>

                        <Link
                          to={`/admin-dashboard/projects/edit/${project._id}`}
                          className="rounded-xl bg-slate-800 p-3 transition hover:bg-indigo-500"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(project._id)}
                          disabled={deleteMutation?.isPending}
                          className="rounded-xl bg-slate-800 p-3 transition hover:bg-red-500 disabled:opacity-50"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProjectPagination
        page={page}
        totalPages={pagination?.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ProjectTable;
