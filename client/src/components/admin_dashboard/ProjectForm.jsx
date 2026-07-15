import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaArrowLeft,
  FaGithub,
  FaGlobe,
  FaImage,
  FaPlus,
  FaTimes,
} from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useCreateProjectMutation } from '../../hooks/admin/useCreateProjectMutation';
import { useProjectQuery } from '../../hooks/admin/useProjectQuery';
import { useUpdateProjectMutation } from '../../hooks/admin/useUpdateProjectMutation';

const ProjectForm = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = mode === 'edit';

  // Existing Query (Edit Mode)
  const { data: projectData, isLoading: projectLoading } = useProjectQuery(id, {
    enabled: isEdit,
  });

  const createMutation = useCreateProjectMutation();
  const updateMutation = useUpdateProjectMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      thumbnail: '',
      githubUrl: '',
      liveUrl: '',
      progress: 0,
      status: 'pending',
      technologies: [],
    },
  });

  const [techInput, setTechInput] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  // Load Existing Project (All hooks must be defined before any early return)
  useEffect(() => {
    if (!projectData?.data || !isEdit) return;

    const project = projectData.data;

    reset({
      title: project.title,
      description: project.description,
      thumbnail: project.thumbnail,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      status: project.status,
      progress: project.progress,
      technologies: project.technologies,
    });
    setTechnologies(project.technologies || []);
    setThumbnailPreview(project.thumbnail || '');
  }, [projectData, isEdit, reset, setValue]);

  // Loading conditional check is now safely placed after ALL hooks (including useEffect)
  if (isEdit && projectLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-400">Loading project...</p>
      </div>
    );
  }

  // Add Technology
  const addTechnology = () => {
    const value = techInput.trim();

    if (!value) return;

    if (technologies.includes(value)) return;

    const updated = [...technologies, value];

    setTechnologies(updated);

    setValue('technologies', updated);

    setTechInput('');
  };

  // Remove Technology
  const removeTechnology = (tech) => {
    const updated = technologies.filter((item) => item !== tech);

    setTechnologies(updated);

    setValue('technologies', updated);
  };

  // Thumbnail Preview
  const handleThumbnail = (e) => {
    const value = e.target.value;

    setThumbnailPreview(value);

    setValue('thumbnail', value);
  };

  // Submit
  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      technologies,
    };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          id,
          data: payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }

      navigate('/admin-dashboard/projects');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            to="/admin-dashboard/projects"
            className="mb-4 inline-flex items-center gap-2 text-slate-400 transition hover:text-indigo-400"
          >
            <FaArrowLeft />
            Back to Projects
          </Link>

          <h1 className="text-4xl font-bold">
            {isEdit ? 'Update Project' : 'Create Project'}
          </h1>

          <p className="mt-2 text-slate-400">
            {isEdit
              ? 'Update your portfolio project information.'
              : 'Add a new portfolio project.'}
          </p>
        </div>

        <button
          type="submit"
          form="project-form"
          disabled={createMutation.isPending || updateMutation.isPending}
          className="rounded-2xl bg-indigo-600 px-8 py-3 font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {createMutation.isPending || updateMutation.isPending
            ? 'Saving...'
            : isEdit
              ? 'Update Project'
              : 'Create Project'}
        </button>
      </div>

      {/* Form */}
      <form
        id="project-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl"
      >
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Project Title
          </label>

          <input
            {...register('title', {
              required: 'Title is required',
            })}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-indigo-500"
            placeholder="Portfolio Website"
          />

          {errors.title && (
            <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>

          <textarea
            rows={6}
            {...register('description', {
              required: 'Description is required',
            })}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-indigo-500"
          />

          {errors.description && (
            <p className="mt-2 text-sm text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Thumbnail */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Thumbnail URL
            </label>

            <input
              {...register('thumbnail', {
                onChange: handleThumbnail,
              })}
              placeholder="https://..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-950 p-6">
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="preview"
                className="h-52 w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="text-center text-slate-500">
                <FaImage className="mx-auto mb-3 text-5xl" />
                No Preview
              </div>
            )}
          </div>
        </div>

        {/* Github */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2">
              <FaGithub />
              Github URL
            </label>

            <input
              {...register('githubUrl')}
              placeholder="https://github.com/..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2">
              <FaGlobe />
              Live URL
            </label>

            <input
              {...register('liveUrl')}
              placeholder="https://example.com"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Status */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block">Status</label>

            <select
              {...register('status')}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <span>Progress</span>
              <span className="text-indigo-400">{watch('progress')}%</span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              {...register('progress')}
              className="w-full accent-indigo-500"
            />

            <div className="mt-4 h-2 rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all"
                style={{
                  width: `${watch('progress')}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div>
          <label className="mb-2 block text-sm font-medium">Technologies</label>

          <div className="flex gap-3">
            <input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="flex-1 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-indigo-500"
              placeholder="React"
            />

            <button
              type="button"
              onClick={addTechnology}
              className="rounded-2xl bg-indigo-600 px-5 transition hover:bg-indigo-500"
            >
              <FaPlus />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 rounded-full bg-indigo-500/20 px-4 py-2 text-sm text-indigo-300"
              >
                {item}

                <button type="button" onClick={() => removeTechnology(item)}>
                  <FaTimes />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
          className="w-full rounded-2xl bg-indigo-600 py-4 font-semibold transition hover:bg-indigo-500 disabled:opacity-50"
        >
          {mode === 'create' ? 'Create Project' : 'Update Project'}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
