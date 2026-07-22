// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import {
  FaBars as FaBarsIcon,
  FaBell as FaBellIcon,
  FaChevronDown as FaChevronDownIcon,
  FaSearch as FaSearchIcon,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/authStore';

const AdminNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [search, setSearch] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // global auth state
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);

      // success msg
      toast.success('Admin logged out successfully!');

      // redirect
      navigate('/login');
    } catch (error) {
      console.error('logout failed:', error);
    }
  };

  // close dropdowns on outside click
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

  // current formatted date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0d1117]/90 backdrop-blur-xl shadow-lg shadow-black/20">
      <div className="flex items-center justify-between px-5 lg:px-8 py-4">
        {/* left segment */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden h-11 w-11 rounded-xl border border-slate-700 bg-slate-900 flex items-center justify-center hover:border-[#646cff] duration-300 cursor-pointer"
          >
            <FaBarsIcon />
          </button>

          <div>
            <h2 className="text-2xl font-bold tracking-wide text-white">
              Dashboard
            </h2>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="text-slate-500 text-xs">Home</span>
              <span className="text-slate-600 text-xs">/</span>
              <span className="text-[#646cff] font-semibold text-xs">
                Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* right segment */}
        <div className="flex items-center gap-4">
          <div className="hidden xl:block text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Today
            </p>
            <h4 className="font-semibold text-xs mt-1 text-slate-300">
              {today}
            </h4>
          </div>

          {/* search console */}
          <div className="hidden md:flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/50 px-4 py-3 w-[320px] transition-all duration-300 focus-within:border-[#646cff]/80 focus-within:bg-slate-900">
            <FaSearchIcon className="text-slate-500 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent outline-none text-xs text-white placeholder:text-slate-500"
            />
          </div>

          {/* notifications */}
          <div ref={notificationRef} className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative h-11 w-11 rounded-xl border border-slate-800 bg-slate-900/50 flex items-center justify-center hover:border-[#646cff] duration-300 cursor-pointer"
            >
              <FaBellIcon className="text-slate-300 text-sm" />
              <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-500 ring-4 ring-[#0d1117]" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-3 w-[360px] rounded-[2rem] border border-slate-800 bg-[#0b1120]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
                <div className="px-5 py-4 border-b border-slate-800/60 bg-slate-950/40 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white">
                    Notifications
                  </h3>
                  <button className="text-xs text-[#646cff] font-bold hover:underline cursor-pointer">
                    Mark all as read
                  </button>
                </div>

                <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-800/40">
                  {[
                    {
                      title: 'New Contact Message',
                      text: 'John sent you a new message.',
                      time: '2 min ago',
                    },
                    {
                      title: 'Project Updated',
                      text: 'Portfolio project has been updated.',
                      time: '25 min ago',
                    },
                    {
                      title: 'New Login',
                      text: 'Login detected from Chrome.',
                      time: '1 hour ago',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="px-5 py-4 hover:bg-slate-900/40 cursor-pointer duration-300"
                    >
                      <h4 className="font-bold text-xs text-slate-200">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {item.text}
                      </p>
                      <span className="text-[10px] text-slate-500 mt-2 inline-block font-medium">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 text-center border-t border-slate-800/60 bg-slate-950/20">
                  <button className="text-[#646cff] font-extrabold hover:underline text-xs cursor-pointer tracking-wider uppercase">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* user profile dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-[#0b1120]/60 p-2 pr-4 hover:border-[#646cff]/60 hover:bg-[#0b1120]/90 hover:shadow-[0_0_25px_rgba(100,108,255,0.12)] active:scale-[0.98] transition-all duration-300 group cursor-pointer"
            >
              {/* double border indicator */}
              <div className="relative shrink-0 p-[2px] rounded-xl bg-gradient-to-tr from-slate-800 via-[#646cff]/30 to-slate-800 group-hover:from-[#646cff] group-hover:to-purple-600 transition-all duration-500">
                {user?.profileImage?.url ? (
                  <img
                    src={user.profileImage.url}
                    alt={user?.name || 'Admin'}
                    className="h-9 w-9 rounded-[10px] aspect-square object-cover object-center bg-slate-900"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-[10px] bg-gradient-to-br from-[#646cff] via-[#5563ff] to-purple-600 flex items-center justify-center text-white font-black text-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                )}
                {/* online status indicator */}
                <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-4 border-[#020617] bg-emerald-500 shadow-sm" />
              </div>

              {/* identity details */}
              <div className="hidden md:block text-left select-none">
                <h4 className="text-xs font-black tracking-tight text-white group-hover:text-[#646cff] transition-colors duration-300">
                  {user?.name || 'Sifat Bin Anwar'}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 capitalize tracking-wider mt-0.5">
                  {user?.role || 'Admin'}
                </p>
              </div>

              <FaChevronDownIcon
                className={`hidden md:block text-xs text-slate-500 group-hover:text-slate-300 transition-transform duration-300 ${
                  profileOpen ? 'rotate-180 text-[#646cff]' : ''
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-72 rounded-[2rem] border border-slate-800/80 bg-[#0b1120]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(99,102,241,0.1)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
                {/* card profile details */}
                <div className="p-5 border-b border-slate-800/60 bg-slate-950/40">
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0 p-[2px] rounded-xl bg-gradient-to-tr from-slate-800 to-[#646cff]/40">
                      {user?.profileImage?.url ? (
                        <img
                          src={user.profileImage.url}
                          alt="Profile"
                          className="w-11 h-11 rounded-[10px] aspect-square object-cover object-center bg-slate-900"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-[10px] bg-gradient-to-br from-[#646cff] to-purple-600 flex items-center justify-center text-white font-black text-sm">
                          {user?.name?.charAt(0).toUpperCase() || 'A'}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-extrabold text-white text-sm tracking-wide truncate">
                        {user?.name || 'Sifat Bin Anwar'}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                        {user?.email || 'admin@gmail.com'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* action items list */}
                <div className="p-2 space-y-1">
                  {/* profile link router */}
                  <Link
                    to="/admin-dashboard/profile"
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl text-xs font-bold text-slate-300 hover:text-[#646cff] hover:bg-slate-900/50 transition-all duration-300 group cursor-pointer"
                  >
                    <span className="text-sm transition-transform duration-300 group-hover:scale-110">
                      👤
                    </span>
                    <span className="tracking-wide">My Profile</span>
                  </Link>

                  {/* settings link router */}
                  <Link
                    to="/admin-dashboard/settings"
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl text-xs font-bold text-slate-300 hover:text-[#646cff] hover:bg-slate-900/50 transition-all duration-300 group cursor-pointer"
                  >
                    <span className="text-sm transition-transform duration-300 group-hover:rotate-45">
                      ⚙️
                    </span>
                    <span className="tracking-wide">Settings</span>
                  </Link>
                </div>

                {/* dynamic logout action */}
                <div className="border-t border-slate-800/60 p-2 bg-slate-950/20">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl text-xs font-black text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-300 group cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 text-rose-400 group-hover:text-rose-300 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="tracking-widest uppercase">Logout</span>
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

export default AdminNavbar;
