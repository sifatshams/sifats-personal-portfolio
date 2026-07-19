// @ts-nocheck
import useAuthStore from '../../store/authStore';

const ProfileProgressCard = ({ profile }) => {
  const { user } = useAuthStore();

  return (
    <div className="p-6 rounded-2xl border border-slate-800/80 bg-[#0b1120]/60 flex flex-col justify-between h-full">
      <div className="text-center py-4">
        <div className="relative inline-block p-[3px] rounded-2xl bg-gradient-to-tr from-[#646cff] to-purple-600 shadow-xl shadow-[#646cff]/10">
          {user?.profileImage?.url || profile?.avatar ? (
            <img
              src={user?.profileImage?.url || profile?.avatar}
              alt="User"
              className="w-16 h-16 rounded-[13px] object-cover bg-slate-950"
            />
          ) : (
            <div className="w-16 h-16 rounded-[13px] bg-slate-950 flex items-center justify-center text-white font-black text-xl">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </div>

        <h3 className="text-base font-black text-white mt-4 tracking-wide">
          {user?.name || profile?.name || 'Sifat Bin Anwar'}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5 font-medium truncate">
          {user?.email || profile?.email || 'sifat.coder@gmail.com'}
        </p>
        <span className="inline-block mt-3 px-3 py-1 bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400 rounded-full uppercase tracking-wider">
          {profile?.rank || 'Level 2 Contributor'}
        </span>
      </div>

      <div className="border-t border-slate-800/50 pt-4 mt-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Weekly Performance</span>
          <span className="text-[#646cff]">{profile?.score || '84%'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileProgressCard;
