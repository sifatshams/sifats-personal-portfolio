// @ts-nocheck
import { useNavigate } from 'react-router-dom';

const RecentTasks = ({ tasks }) => {
  const navigate = useNavigate();

  // ফলব্যাক ডামি ডাটা অ্যারে
  const dummyTasks = [
    {
      _id: '1',
      title: 'Complete Task Management UI Layout',
      priority: 'High',
      status: 'In Progress',
    },
    {
      _id: '2',
      title: 'Fix Global Auth Logout State Bug',
      priority: 'Medium',
      status: 'Pending',
    },
    {
      _id: '3',
      title: 'Setup Mongoose Schema & Router Api',
      priority: 'Low',
      status: 'Completed',
    },
  ];

  const displayTasks = tasks && tasks.length > 0 ? tasks : dummyTasks;

  const getStatusBadge = (status) => {
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
    <div className="rounded-2xl border border-slate-800/80 bg-[#0b1120]/40 overflow-hidden shadow-xl">
      <div className="px-6 py-5 border-b border-slate-800/60 flex items-center justify-between bg-slate-950/20">
        <div>
          <h3 className="font-bold text-sm text-white tracking-wide">
            Recent Tasks
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Your latest updated work items
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard/tasks')}
          className="text-xs font-bold text-[#646cff] hover:underline cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/40 bg-slate-900/20 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <th className="px-6 py-4">Task Title</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40 text-xs">
            {displayTasks.slice(0, 4).map((task) => (
              <tr
                key={task._id}
                className="hover:bg-slate-900/30 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-bold text-slate-200 truncate max-w-[200px]">
                  {task.title}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-[10px] font-extrabold tracking-wider uppercase ${
                      task.priority === 'High'
                        ? 'text-rose-400'
                        : task.priority === 'Medium'
                          ? 'text-amber-400'
                          : 'text-sky-400'
                    }`}
                  >
                    {task.priority || 'Medium'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-black border uppercase tracking-wider ${getStatusBadge(task.status)}`}
                  >
                    {task.status || 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTasks;
