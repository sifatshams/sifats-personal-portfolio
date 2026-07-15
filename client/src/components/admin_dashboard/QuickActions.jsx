import {
  FaChartLine,
  FaCog,
  FaEnvelope,
  FaPlus,
  FaUpload,
  FaUsers,
} from 'react-icons/fa';

const actions = [
  {
    title: 'New Project',
    desc: 'Create a new project',
    icon: <FaPlus />,
    color: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Upload File',
    desc: 'Upload documents or assets',
    icon: <FaUpload />,
    color: 'from-emerald-500 to-green-500',
  },
  {
    title: 'Send Message',
    desc: 'Contact your team',
    icon: <FaEnvelope />,
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Add User',
    desc: 'Invite new member',
    icon: <FaUsers />,
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Analytics',
    desc: 'View performance data',
    icon: <FaChartLine />,
    color: 'from-cyan-500 to-sky-500',
  },
  {
    title: 'Settings',
    desc: 'Manage system settings',
    icon: <FaCog />,
    color: 'from-slate-500 to-slate-700',
  },
];

const QuickActions = () => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <p className="text-sm text-slate-500">Frequently used shortcuts</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="group relative overflow-hidden p-4 rounded-2xl border border-slate-800 bg-slate-950/40 hover:border-indigo-500 transition-all duration-300"
          >
            {/* Glow Background */}
            <div
              className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${action.color} opacity-20 blur-2xl`}
            />

            {/* Icon */}
            <div className="relative z-10 flex flex-col items-start gap-3">
              <div
                className={`text-xl p-3 rounded-xl bg-gradient-to-r ${action.color} text-white`}
              >
                {action.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="font-semibold text-sm group-hover:text-indigo-400 transition">
                  {action.title}
                </h3>
                <p className="text-xs text-slate-500">{action.desc}</p>
              </div>
            </div>

            {/* Hover line effect */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-500 group-hover:w-full transition-all duration-300" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
