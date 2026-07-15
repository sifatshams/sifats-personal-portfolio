import { FaEnvelope, FaEye, FaFolderOpen, FaUsers } from 'react-icons/fa';

const DashboardStats = ({ stats }) => {
  const cards = [
    {
      id: 1,
      title: 'Total Visitors',
      value: stats?.totalVisitors || 0,
      icon: <FaEye />,
      color: 'from-cyan-500 to-blue-500',
      bg: 'bg-cyan-500/10',
    },
    {
      id: 2,
      title: 'Projects',
      value: stats?.totalProjects || 0,
      icon: <FaFolderOpen />,
      color: 'from-violet-500 to-indigo-500',
      bg: 'bg-violet-500/10',
    },
    {
      id: 3,
      title: 'Messages',
      value: stats?.totalMessages || 0,
      icon: <FaEnvelope />,
      color: 'from-emerald-500 to-green-500',
      bg: 'bg-emerald-500/10',
    },
    {
      id: 4,
      title: 'Users',
      value: stats?.totalUsers || 0,
      icon: <FaUsers />,
      color: 'from-orange-500 to-amber-500',
      bg: 'bg-orange-500/10',
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => (
        <div
          key={item.id}
          className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#646cff] hover:shadow-2xl hover:shadow-[#646cff]/20"
        >
          <div
            className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${item.color} opacity-20 blur-3xl`}
          />

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-400">{item.title}</p>

              <h2 className="mt-3 text-4xl font-bold">{item.value}</h2>
            </div>

            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg} text-3xl`}
            >
              <div
                className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default DashboardStats;
