import { useEffect, useRef, useState } from 'react';
import {
  FaBars,
  FaBell,
  FaChevronDown,
  FaCog,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/authStore';

const DashboardNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/60 bg-[#0a0a0c]/80 backdrop-blur-md shadow-md shadow-black/10">
      <div className="flex items-center justify-between px-5 lg:px-8 py-3.5">
        {/* Left Segment */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden h-10 w-10 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-center hover:border-[#646cff] text-slate-400 hover:text-white duration-300"
          >
            <FaBars className="text-sm" />
          </button>

          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">
              Dashboard
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] font-medium mt-0.5">
              <span
                className="text-slate-500 hover:text-slate-400 cursor-pointer"
                onClick={() => navigate('/')}
              >
                Home
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-[#646cff]">Overview</span>
            </div>
          </div>
        </div>

        {/* Right Segment */}
        <div className="flex items-center gap-4">
          {/* System Date */}
          <div className="hidden xl:block text-right border-r border-slate-800/80 pr-4">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              Today
            </p>
            <h4 className="font-semibold text-xs text-slate-300 mt-0.5">
              {today}
            </h4>
          </div>

          {/* Modern Omnibar Search */}
          <div className="hidden md:flex items-center gap-2.5 rounded-xl border border-slate-800/80 bg-slate-900/40 px-3.5 py-2 w-[260px] transition-all duration-300 focus-within:border-[#646cff]/70 focus-within:bg-slate-900/80">
            <FaSearch className="text-slate-500 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Quick search..."
              className="w-full bg-transparent outline-none text-xs text-slate-200 placeholder:text-slate-500"
            />
          </div>

          {/* Alerts Systems */}
          <div ref={notificationRef} className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative h-10 w-10 cursor-pointer rounded-xl border border-slate-800/80 bg-slate-900/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 duration-300"
            >
              <FaBell className="text-sm" />
              <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-850 bg-[#0f0f12] shadow-2xl border-slate-800/80 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                <div className="px-4 py-3 border-b border-slate-800/60 flex items-center justify-between bg-slate-900/20">
                  <h3 className="font-semibold text-sm text-slate-200">
                    Notifications
                  </h3>
                  <button className="text-xs text-[#646cff] font-medium hover:underline">
                    Clear all
                  </button>
                </div>

                <div className="max-h-[280px] overflow-y-auto divided-y divide-slate-800">
                  {[
                    {
                      title: 'Project Approval',
                      text: 'Your application has been deployed.',
                      time: '5m ago',
                    },
                    {
                      title: 'Security Alert',
                      text: 'Profile password updated successfully.',
                      time: '2h ago',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 border-b border-slate-800/40 hover:bg-slate-900/40 cursor-pointer duration-300"
                    >
                      <h4 className="font-medium text-xs text-slate-300">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.text}
                      </p>
                      <span className="text-[9px] text-slate-600 mt-1 block font-medium">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown Component */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 cursor-pointer rounded-xl border border-slate-800/80 bg-slate-900/40 p-1.5 pr-3 hover:border-slate-700 duration-300 select-none"
            >
              {user?.profileImage?.url ? (
                <img
                  src={user.profileImage.url}
                  alt={user?.name || 'User'}
                  className="h-7 w-7 rounded-lg border border-[#646cff]/40 object-cover"
                />
              ) : (
                <div className="h-7 w-7 rounded-lg bg-[#646cff] flex items-center justify-center text-white font-bold text-xs">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}

              <div className="hidden md:block text-left">
                <h4 className="font-semibold text-xs text-slate-300 leading-none">
                  {user?.name || 'Sifat Coder'}
                </h4>
              </div>

              <FaChevronDown
                className={`hidden md:block text-[10px] text-slate-500 transition-transform duration-300 ${profileOpen ? 'rotate-180 text-slate-300' : ''}`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-850 bg-[#0f0f12] shadow-2xl overflow-hidden border-slate-800/80 animate-in fade-in zoom-in-95 duration-200 z-50">
                <div className="p-4 border-b border-slate-800/60 bg-slate-900/20">
                  <h3 className="font-bold text-xs text-slate-200 truncate">
                    {user?.name || 'Sifat Bin Anwar'}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {user?.email || 'sifat@example.com'}
                  </p>
                </div>

                <div className="p-1.5 space-y-0.5">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate('/dashboard/profile');
                    }}
                    className="w-full flex items-center gap-2.5 text-left text-xs font-medium text-slate-400 px-3 py-2.5 hover:bg-slate-900 hover:text-white rounded-xl duration-200"
                  >
                    <FaUser className="text-slate-500 text-sm" /> My Profile
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate('/dashboard/settings');
                    }}
                    className="w-full flex items-center gap-2.5 text-left text-xs font-medium text-slate-400 px-3 py-2.5 hover:bg-slate-900 hover:text-white rounded-xl duration-200"
                  >
                    <FaCog className="text-slate-500 text-sm" /> Settings
                  </button>
                </div>

                <div className="border-t border-slate-800/60 my-1" />

                <div className="p-1.5">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 text-left text-xs font-semibold text-red-400 px-3 py-2.5 hover:bg-red-500/10 rounded-xl duration-200"
                  >
                    <FaSignOutAlt className="text-sm" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
