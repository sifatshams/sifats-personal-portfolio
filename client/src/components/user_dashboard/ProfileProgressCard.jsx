import useAuthStore from '../../store/authStore';

const ProfileProgressCard = ({ profile }) => {
  const { user } = useAuthStore();

  const avatar = user?.profileImage?.url || user?.avatar || profile?.avatar;
  const name = user?.name || profile?.name || 'User';
  const email = user?.email || profile?.email || '';
  const rank = user?.rank || profile?.rank || 'Contributor';
  const score = profile?.score ?? '100%';

  return (
    <div className="p-6 rounded-2xl border border-slate-800/80 bg-[#0b1120]/60 flex flex-col justify-between h-full">
      <div className="text-center py-4">
        <div className="relative inline-block p-[3px] rounded-2xl bg-gradient-to-tr from-[#646cff] to-purple-600 shadow-xl shadow-[#646cff]/10">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-[13px] object-cover bg-slate-950"
            />
          ) : (
            <div className="w-16 h-16 rounded-[13px] bg-slate-950 flex items-center justify-center text-white font-black text-xl">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <h3 className="text-base font-black text-white mt-4 tracking-wide">
          {name}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5 font-medium truncate">
          {email}
        </p>
        <span className="inline-block mt-3 px-3 py-1 bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400 rounded-full uppercase tracking-wider">
          {rank}
        </span>
      </div>

      <div className="border-t border-slate-800/50 pt-4 mt-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Weekly Performance</span>
          <span className="text-[#646cff]">{score}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileProgressCard;
