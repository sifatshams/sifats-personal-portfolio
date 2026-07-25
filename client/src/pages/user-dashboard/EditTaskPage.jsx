// @ts-nocheck
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaAlignLeft,
  FaArrowLeft,
  FaCalendarAlt,
  FaExclamationCircle,
  FaHeading,
  FaSpinner,
  FaTasks,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useMyTasksQuery, useUpdateTaskMutation } from '../../hooks/user/useTaskQuery';


const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch all tasks or current task details using TanStack Query
  const { data: tasksData, isLoading: isFetching } = useMyTasksQuery();
  const { mutateAsync: updateTask, isPending } = useUpdateTaskMutation();

  // find the target task to edit
  const tasks = Array.isArray(tasksData) ? tasksData : tasksData?.tasks || [];
  const currentTask = tasks.find(
    (task) => (task._id || task.id)?.toString() === id?.toString(),
  );

  // react hook form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Pending',
      dueDate: '',
    },
  });

  // populate form values when task data is available
  useEffect(() => {
    if (currentTask) {
      reset({
        title: currentTask.title || '',
        description: currentTask.description || currentTask.desc || '',
        priority: currentTask.priority || 'Medium',
        status: currentTask.status || 'Pending',
        dueDate: currentTask.dueDate || currentTask.due || '',
      });
    }
  }, [currentTask, reset]);

  // form submission handler
  const onSubmit = async (formData) => {
    try {
      await updateTask({
        id,
        ...formData,
      });
      navigate('/user-dashboard/tasks');
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-[#646cff] items-center justify-center min-h-[400px] space-y-3">
        <FaSpinner className="animate-spin text-2xl" />
        <p className="text-xs text-slate-500 font-medium">
          Fetching task details...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/user-dashboard/tasks')}
          className="p-2.5 rounded-xl border border-slate-800 bg-[#0b1120]/60 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer active:scale-95"
        >
          <FaArrowLeft className="text-xs" />
        </button>
        <div>
          <h1 className="text-xl font-black text-white tracking-wide">
            Edit Task
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify details and track status updates for this task
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-[#0b1120]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#646cff]/5 rounded-full blur-3xl" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 relative z-10"
        >
          {/* Title Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaHeading className="text-slate-600 text-[10px]" /> Task Title
            </label>
            <input
              type="text"
              placeholder="e.g., Update Authentication Schema"
              {...register('title', { required: 'Task title is required' })}
              className={`w-full px-4 py-3 bg-slate-950/60 border text-xs text-slate-200 placeholder-slate-600 rounded-xl focus:outline-none transition-colors ${
                errors.title
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : 'border-slate-800 focus:border-[#646cff]/50'
              }`}
            />
            {errors.title && (
              <p className="text-[10px] text-rose-400 font-medium mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaAlignLeft className="text-slate-600 text-[10px]" /> Description
            </label>
            <textarea
              rows="4"
              placeholder="Provide a detailed description for this task..."
              {...register('description', {
                required: 'Task description is required',
              })}
              className={`w-full px-4 py-3 bg-slate-950/60 border text-xs text-slate-200 placeholder-slate-600 rounded-xl focus:outline-none transition-colors resize-none leading-relaxed ${
                errors.description
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : 'border-slate-800 focus:border-[#646cff]/50'
              }`}
            />
            {errors.description && (
              <p className="text-[10px] text-rose-400 font-medium mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Dynamic Grid: Priority, Status & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Priority Level */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FaExclamationCircle className="text-slate-600 text-[10px]" />{' '}
                Priority
              </label>
              <select
                {...register('priority')}
                className="w-full px-3 py-3 bg-slate-950/60 border border-slate-800 text-xs text-slate-300 rounded-xl focus:outline-none focus:border-[#646cff]/50 cursor-pointer"
              >
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🔴 High</option>
              </select>
            </div>

            {/* Status Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FaTasks className="text-slate-600 text-[10px]" /> Status
              </label>
              <select
                {...register('status')}
                className="w-full px-3 py-3 bg-slate-950/60 border border-slate-800 text-xs text-slate-300 rounded-xl focus:outline-none focus:border-[#646cff]/50 cursor-pointer"
              >
                <option value="Pending">⏳ Pending</option>
                <option value="In Progress">⚡ In Progress</option>
                <option value="Completed">✅ Completed</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FaCalendarAlt className="text-slate-600 text-[10px]" /> Due
                Date
              </label>
              <input
                type="date"
                {...register('dueDate', { required: 'Due date is required' })}
                className={`w-full px-3 py-3 bg-slate-950/60 border text-xs text-slate-300 rounded-xl focus:outline-none transition-colors cursor-pointer ${
                  errors.dueDate
                    ? 'border-rose-500/80 focus:border-rose-500'
                    : 'border-slate-800 focus:border-[#646cff]/50'
                }`}
              />
              {errors.dueDate && (
                <p className="text-[10px] text-rose-400 font-medium mt-1">
                  {errors.dueDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Form Controls */}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-800/40 mt-6">
            <button
              type="button"
              onClick={() => navigate('/user-dashboard/tasks')}
              className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#646cff] hover:bg-[#535bf2] disabled:bg-[#646cff]/50 disabled:cursor-not-allowed rounded-xl transition-all duration-300 shadow-lg shadow-[#646cff]/20 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              {isPending ? (
                <>
                  <FaSpinner className="animate-spin text-xs" /> Updating...
                </>
              ) : (
                'Update Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskPage;
