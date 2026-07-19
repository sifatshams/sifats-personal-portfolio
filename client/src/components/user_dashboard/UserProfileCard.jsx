// @ts-nocheck
import { useState } from 'react';
import {
  FaCalendarAlt,
  FaCamera,
  FaEdit,
  FaEnvelope,
  FaShieldAlt,
  FaUser,
} from 'react-icons/fa';
import useAuthStore from '../../store/authStore';

const UserProfileCard = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  const profileData = {
    name: user?.name || 'Sifat Bin Anwar',
    email: user?.email || 'sifat.coder@gmail.com',
    role: user?.role || 'Frontend Developer',
    joinedDate: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : 'April 2026',
    bio:
      user?.bio ||
      'Passionate web developer working with React, Vite, and Tailwind CSS to build clean user interfaces.',
    rank: user?.rank || 'Level 2 Contributor',
  };

  return (
    <div className="space-y-6">
      {/* 1. Profile Hero Card */}
      <div className="relative rounded-2xl border border-slate-800/80 bg-[#0b1120]/60 p-6 md:p-8 overflow-hidden shadow-xl">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-[#646cff]/10 rounded-full blur-3xl" />

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          {/* Avatar Area with Hover Effect */}
          <div className="relative group cursor-pointer">
            <div className="p-[3px] rounded-2xl bg-gradient-to-tr from-[#646cff] to-purple-600 shadow-xl shadow-[#646cff]/5">
              {user?.profileImage?.url ? (
                <img
                  src={user?.profileImage?.url}
                  alt="Profile"
                  className="w-24 h-24 md:w-28 md:h-28 rounded-[13px] object-cover bg-slate-950"
                />
              ) : (
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-[13px] bg-slate-950 flex items-center justify-center text-white font-black text-3xl">
                  {profileData.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {/* Camera Overlay Icon */}
            <div className="absolute inset-0 bg-black/60 rounded-[16px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-[#646cff]/50 m-[3px]">
              <FaCamera className="text-white text-lg" />
            </div>
          </div>

          {/* User Meta Info */}
          <div className="text-center md:text-left space-y-2 flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h2 className="text-xl md:text-2xl font-black text-white tracking-wide">
                {profileData.name}
              </h2>
              <span className="mx-auto md:mx-0 px-2.5 py-0.5 bg-[#646cff]/10 border border-[#646cff]/20 text-[10px] font-bold text-[#646cff] rounded-md uppercase tracking-wider">
                {profileData.rank}
              </span>
            </div>
            <p className="text-sm text-slate-400 font-medium">
              {profileData.role}
            </p>
            <p className="text-xs text-slate-500 max-w-md line-clamp-2">
              {profileData.bio}
            </p>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-200 bg-slate-900 border border-slate-800 rounded-xl hover:text-[#646cff] hover:border-[#646cff]/40 transition-all duration-300 cursor-pointer active:scale-95"
          >
            <FaEdit /> {isEditing ? 'View Profile' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* 2. Detailed Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Account Details */}
        <div className="md:col-span-2 p-6 rounded-2xl border border-slate-800/80 bg-[#0b1120]/40 space-y-6">
          <h3 className="font-bold text-sm text-white tracking-wide border-b border-slate-800/60 pb-3">
            Account Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <FaUser className="text-slate-600" /> Full Name
              </label>
              <div className="p-3 bg-slate-950/40 border border-slate-900 text-xs text-slate-300 font-bold rounded-xl">
                {profileData.name}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <FaEnvelope className="text-slate-600" /> Email Address
              </label>
              <div className="p-3 bg-slate-950/40 border border-slate-900 text-xs text-slate-300 font-bold rounded-xl truncate">
                {profileData.email}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <FaShieldAlt className="text-slate-600" /> Account Role
              </label>
              <div className="p-3 bg-slate-950/40 border border-slate-900 text-xs text-slate-300 font-bold rounded-xl">
                {profileData.role}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <FaCalendarAlt className="text-slate-600" /> Member Since
              </label>
              <div className="p-3 bg-slate-950/40 border border-slate-900 text-xs text-slate-300 font-bold rounded-xl">
                {profileData.joinedDate}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Security Check */}
        <div className="p-6 rounded-2xl border border-slate-800/80 bg-[#0b1120]/60 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-white tracking-wide border-b border-slate-800/60 pb-3 mb-4">
              Security Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-900 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-300">Password</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Last changed 2 months ago
                  </p>
                </div>
                <button className="text-[11px] font-black text-[#646cff] hover:underline cursor-pointer">
                  Update
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-900 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-300">
                    2FA Authentication
                  </h4>
                  <p className="text-[10px] text-rose-400/80 font-bold mt-0.5">
                    Not Enabled
                  </p>
                </div>
                <button className="text-[11px] font-black text-emerald-400 hover:underline cursor-pointer">
                  Setup
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/50 text-center">
            <p className="text-[11px] text-slate-500">
              Need help? Contact{' '}
              <span className="text-slate-400 font-medium">Support Team</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
