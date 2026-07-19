// @ts-nocheck
import { useNavigate } from 'react-router-dom';

const UserQuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { label: '➕ New Task', path: '/dashboard/tasks/new' },
    { label: '⚙️ Account Settings', path: '/dashboard/settings' },
    { label: '👤 View Profile', path: '/dashboard/profile' },
  ];

  return (
    <div className="p-6 rounded-2xl border border-slate-800/80 bg-[#0b1120]/40">
      <h3 className="font-bold text-sm text-white tracking-wide mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {actions.map((act, index) => (
          <button
            key={index}
            onClick={() => navigate(act.path)}
            className="px-4 py-3 text-xs font-bold text-slate-300 bg-slate-900/50 border border-slate-800/80 rounded-xl text-center hover:text-[#646cff] hover:border-[#646cff]/40 hover:bg-slate-900 transition-all duration-300 cursor-pointer active:scale-[0.98]"
          >
            {act.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserQuickActions;
