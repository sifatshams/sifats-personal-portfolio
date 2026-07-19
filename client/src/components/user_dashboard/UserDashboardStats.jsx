// @ts-nocheck
import { FaCheckCircle, FaProjectDiagram, FaTasks } from 'react-icons/fa';

const UserDashboardStats = ({ stats }) => {
  // API থেকে ডাটা না আসলে এই ডামি অবজেক্ট ব্যবহার হবে
  const displayStats = {
    totalTasks: stats?.totalTasks ?? 12,
    completedTasks: stats?.completedTasks ?? 8,
    completionRate: stats?.completionRate ?? 66,
    activeProjects: stats?.activeProjects ?? 3,
  };

  const cardData = [
    {
      title: 'Total Tasks',
      value: displayStats.totalTasks,
      desc: 'Assigned to your profile',
      icon: <FaTasks />,
      colorClass: 'group-hover:text-[#646cff]',
      borderClass: 'hover:border-[#646cff]/40',
    },
    {
      title: 'Completed',
      value: displayStats.completedTasks,
      desc: `${displayStats.completionRate}% efficiency score`,
      icon: <FaCheckCircle />,
      colorClass: 'group-hover:text-emerald-400',
      borderClass: 'hover:border-emerald-500/40',
    },
    {
      title: 'Active Projects',
      value: displayStats.activeProjects,
      desc: 'Ongoing work spaces',
      icon: <FaProjectDiagram />,
      colorClass: 'group-hover:text-sky-400',
      borderClass: 'hover:border-sky-500/40',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cardData.map((card, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-2xl border border-slate-800/80 bg-[#0b1120]/60 transition-all duration-300 group ${card.borderClass}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {card.title}
            </span>
            <div
              className={`h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 duration-300 ${card.colorClass}`}
            >
              {card.icon}
            </div>
          </div>
          <h3 className="text-3xl font-black text-white mt-4">{card.value}</h3>
          <p className="text-[11px] text-slate-500 mt-1">{card.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default UserDashboardStats;
