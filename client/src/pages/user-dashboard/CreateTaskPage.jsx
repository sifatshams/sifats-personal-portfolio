// @ts-nocheck
import { useState } from 'react';
import {
  FaAlignLeft,
  FaArrowLeft,
  FaCalendarAlt,
  FaExclamationCircle,
  FaHeading,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ফর্মের স্টেট ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    priority: 'Medium',
    dueDate: '',
  });

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ফর্ম সাবমিট হ্যান্ডলার (API Integration Ready)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // এখানে আপনার ব্যাকএন্ড API কল হবে
      // await axios.post('/api/tasks', formData);

      console.log('Submitting Task Data:', formData);

      // ডামি সাকসেস ডিলে (ফিল পাওয়ার জন্য)
      setTimeout(() => {
        setIsSubmitting(false);
        // টাস্ক তৈরি শেষে আবার টাস্ক লিস্ট পেজে ফেরত যাবে
        navigate('/dashboard/tasks');
      }, 1000);
    } catch (error) {
      console.error('Failed to create task:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/user-dashboard/tasks')}
          className="p-2 rounded-xl border border-slate-800 bg-[#0b1120]/60 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer active:scale-95"
        >
          <FaArrowLeft className="text-xs" />
        </button>
        <div>
          <h1 className="text-xl font-black text-white tracking-wide">
            Create New Task
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Assign a new work item to your dashboard timeline
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="p-6 rounded-2xl border border-slate-800/80 bg-[#0b1120]/40 shadow-xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#646cff]/5 rounded-full blur-2xl" />

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {/* 1. Task Title */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaHeading className="text-slate-600 text-[10px]" /> Task Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., Fix Sidebar Navigation Bug"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 text-xs text-slate-200 placeholder-slate-600 rounded-xl focus:outline-none focus:border-[#646cff]/50 transition-colors"
            />
          </div>

          {/* 2. Task Description */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaAlignLeft className="text-slate-600 text-[10px]" /> Description
            </label>
            <textarea
              name="desc"
              rows="4"
              required
              placeholder="Describe what needs to be done in detail..."
              value={formData.desc}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 text-xs text-slate-200 placeholder-slate-600 rounded-xl focus:outline-none focus:border-[#646cff]/50 transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* 3. Priority & Due Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Priority Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FaExclamationCircle className="text-slate-600 text-[10px]" />{' '}
                Priority Level
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 text-xs text-slate-300 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="Low">🟢 Low Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="High">🔴 High Priority</option>
              </select>
            </div>

            {/* Due Date Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FaCalendarAlt className="text-slate-600 text-[10px]" /> Due
                Date
              </label>
              <input
                type="date"
                name="dueDate"
                required
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 text-xs text-slate-300 rounded-xl focus:outline-none focus:border-[#646cff]/50 transition-colors cursor-pointer"
              />
            </div>
          </div>

          {/* 4. Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/40 mt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard/tasks')}
              className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#646cff] hover:bg-[#535bf2] disabled:bg-[#646cff]/50 disabled:cursor-not-allowed rounded-xl transition-all duration-300 shadow-lg shadow-[#646cff]/10 active:scale-95 cursor-pointer"
            >
              {isSubmitting ? 'Creating...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;
