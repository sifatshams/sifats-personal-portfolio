// @ts-nocheck
import { useState } from 'react';
import { FaFilter, FaList, FaPlus, FaSearch, FaThLarge } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// যদি আপনার কোনো কাস্টম কোয়েরি হুক থাকে (যেমন: useMyTasksQuery), পরে এখানে ইমপোর্ট করতে পারবেন
// import { useMyTasksQuery } from '../../hooks/user/useMyTasksQuery';

const MyTasksPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // API 
  const dummyTasks = [
    {
      _id: '1',
      title: 'Complete Task Management UI Layout',
      desc: 'Implement all dashboard modules with responsive layout and proper fallback.',
      priority: 'High',
      status: 'In Progress',
      dueDate: 'Tomorrow',
    },
    {
      _id: '2',
      title: 'Fix Global Auth Logout State Bug',
      desc: 'Resolve the local storage token clear issue on fast double clicking logout.',
      priority: 'Medium',
      status: 'Pending',
      dueDate: '22 April 2026',
    },
    {
      _id: '3',
      title: 'Setup Mongoose Schema & Router Api',
      desc: 'Design backend user model, schema rules, regex validation and routes.',
      priority: 'Low',
      status: 'Completed',
      dueDate: 'Completed',
    },
    {
      _id: '4',
      title: 'Integrate Tailwind IntelliSense Fixes',
      desc: 'Fix editor class auto-complete bug inside custom modules.',
      priority: 'Medium',
      status: 'In Progress',
      dueDate: '25 April 2026',
    },
  ];

  const tasks = dummyTasks;

  // search and filtering logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'In Progress':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white tracking-wide">
            My Tasks
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage, filter, and track your daily workloads
          </p>
        </div>

        <button
          onClick={() => navigate('/user-dashboard/tasks/new')}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#646cff] hover:bg-[#535bf2] rounded-xl transition-all duration-300 cursor-pointer active:scale-95 shadow-lg shadow-[#646cff]/20 self-start sm:self-auto"
        >
          <FaPlus /> New Task
        </button>
      </div>

      {/* 2. Controls Section (Search, Filter, View Switcher) */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between p-4 rounded-xl border border-slate-800/60 bg-[#0b1120]/40">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950/60 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 rounded-xl focus:outline-none focus:border-[#646cff]/50 transition-colors"
          />
        </div>

        {/* Filters and Toggle View */}
        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          {/* Status Dropdown */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-slate-500 text-[10px]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950/60 border border-slate-800 text-xs text-slate-300 px-3 py-2 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Grid/List Toggle Buttons */}
          <div className="flex items-center bg-slate-950 border border-slate-800 p-0.5 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-slate-900 text-[#646cff]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-slate-900 text-[#646cff]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Tasks Render Area */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl">
          <p className="text-slate-500 text-xs font-medium">
            No tasks found matching your filters.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Layout Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="p-5 rounded-2xl border border-slate-800/80 bg-[#0b1120]/60 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-black border uppercase tracking-wider ${getStatusStyle(task.status)}`}
                  >
                    {task.status}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold uppercase ${
                      task.priority === 'High'
                        ? 'text-rose-400'
                        : task.priority === 'Medium'
                          ? 'text-amber-400'
                          : 'text-sky-400'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-200 group-hover:text-[#646cff] duration-300 line-clamp-1">
                  {task.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 font-medium leading-relaxed">
                  {task.desc}
                </p>
              </div>

              <div className="border-t border-slate-800/40 pt-4 mt-4 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">
                  ⏰ {task.dueDate}
                </span>
                <button
                  onClick={() => navigate(`/dashboard/tasks/edit/${task._id}`)}
                  className="text-[#646cff] font-bold hover:underline cursor-pointer"
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List Layout Mode */
        <div className="rounded-2xl border border-slate-800/80 bg-[#0b1120]/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/40 bg-slate-950/20 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <th className="px-5 py-3.5">Task</th>
                  <th className="px-5 py-3.5">Priority</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Due Date</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-xs">
                {filteredTasks.map((task) => (
                  <tr
                    key={task._id}
                    className="hover:bg-slate-900/20 transition-colors"
                  >
                    <td className="px-5 py-4 max-w-[240px]">
                      <div className="font-bold text-slate-200 truncate">
                        {task.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {task.desc}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-[10px] font-extrabold uppercase ${
                          task.priority === 'High'
                            ? 'text-rose-400'
                            : task.priority === 'Medium'
                              ? 'text-amber-400'
                              : 'text-sky-400'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-black border uppercase tracking-wider ${getStatusStyle(task.status)}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 font-medium">
                      {task.dueDate}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/tasks/edit/${task._id}`)
                        }
                        className="text-[#646cff] font-bold hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasksPage;
