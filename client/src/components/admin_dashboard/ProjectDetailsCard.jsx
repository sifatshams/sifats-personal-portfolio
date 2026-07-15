import { useState } from 'react';
import {
  FaArrowLeft,
  FaEdit,
  FaGithub,
  FaGlobe,
  FaTrash,
} from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useDeleteProjectMutation } from '../../hooks/admin/useDeleteProjectMutation';
import { useProjectQuery } from '../../hooks/admin/useProjectQuery';
import ProjectDeleteModal from './ProjectDeleteModal';

const statusColor = {
  pending: 'bg-orange-500/20 text-orange-400',
  in_progress: 'bg-blue-500/20 text-blue-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

const ProjectDetailsCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openDelete, setOpenDelete] = useState(false);

  const { data, isLoading } = useProjectQuery(id);
  const deleteMutation = useDeleteProjectMutation();

  const project = data?.data;

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-slate-400 animate-pulse">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-red-400">Project not found.</p>
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(project._id);
      navigate('/admin-dashboard/projects');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ProjectDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
        project={project}
      />

      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              to="/admin-dashboard/projects"
              className="mb-5 inline-flex items-center gap-2 text-slate-400 transition hover:text-indigo-400"
            >
              <FaArrowLeft />
              Back to Projects
            </Link>

            <h1 className="text-4xl font-bold tracking-tight text-white">
              {project.title}
            </h1>

            <p className="mt-3 max-w-3xl leading-7 text-slate-400">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/admin-dashboard/projects/edit/${project._id}`}
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500"
            >
              <FaEdit />
              Edit Project
            </Link>

            <button
              onClick={() => setOpenDelete(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-500"
            >
              <FaTrash />
              Delete
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl">
          {/* Thumbnail */}
          <div className="relative">
            <img
              src={
                project.thumbnail ||
                'https://placehold.co/1400x700/0f172a/ffffff?text=No+Image'
              }
              alt={project.title}
              className="h-[420px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            <div className="absolute bottom-8 left-8 flex flex-wrap items-center gap-4">
              <span
                className={`rounded-full px-5 py-2 text-sm font-semibold ${
                  statusColor[project.status] ||
                  'bg-slate-500/20 text-slate-400'
                }`}
              >
                {project.status ? project.status.replace('_', ' ') : 'Unknown'}
              </span>

              <span className="rounded-full bg-slate-900/80 px-5 py-2 text-sm text-white backdrop-blur">
                {project.progress || 0}% Completed
              </span>
            </div>
          </div>

          <div className="grid gap-8 p-8 lg:grid-cols-3">
            {/* Left */}
            <div className="space-y-8 lg:col-span-2">
              {/* Progress */}
              <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    Project Progress
                  </h3>
                  <span className="font-bold text-indigo-400">
                    {project.progress || 0}%
                  </span>
                </div>

                <div className="h-4 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 transition-all duration-700"
                    style={{
                      width: `${project.progress || 0}%`,
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-6">
                <h3 className="mb-4 text-xl font-semibold text-white">
                  Project Description
                </h3>
                <p className="leading-8 text-slate-300">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-6">
                <h3 className="mb-5 text-xl font-semibold text-white">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-6">
                <h3 className="mb-6 text-xl font-semibold text-white">
                  Project Information
                </h3>

                <div className="space-y-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Created</span>
                    <span>
                      {project.createdAt
                        ? new Date(project.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Updated</span>
                    <span>
                      {project.updatedAt
                        ? new Date(project.updatedAt).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Status</span>
                    <span className="capitalize">
                      {project.status
                        ? project.status.replace('_', ' ')
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="rounded-3xl border border-slate-800 bg-slate-950/40 p-6">
                <h3 className="mb-6 text-xl font-semibold text-white">
                  Project Links
                </h3>

                <div className="space-y-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 rounded-2xl bg-slate-800 px-5 py-4 text-white transition hover:bg-slate-700"
                    >
                      <FaGithub />
                      Github Repository
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-5 py-4 text-white transition hover:bg-indigo-500"
                    >
                      <FaGlobe />
                      Live Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsCard;
