import { useEffect, useRef, useState } from 'react';
import { FaBars, FaBell, FaChevronDown, FaSearch } from 'react-icons/fa';
import useAuthStore from '../../store/authStore';

const DashboardNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [search, setSearch] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // fetch logged-in user context
  const { user } = useAuthStore();

  // click outside handler to close dropdown menus
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

  // format system current date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0d1117]/90 backdrop-blur-xl shadow-lg shadow-black/20">
      <div className="flex items-center justify-between px-5 lg:px-8 py-4">
        {/* left segment - mobile bars and title stack */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden h-11 w-11 rounded-xl border border-slate-700 bg-slate-900 flex items-center justify-center hover:border-[#646cff] duration-300"
          >
            <FaBars />
          </button>

          <div>
            <h2 className="text-2xl font-bold tracking-wide">Dashboard</h2>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="text-slate-500">Home</span>
              <span className="text-slate-600">/</span>
              <span className="text-[#646cff]">Dashboard</span>
            </div>
          </div>
        </div>

        {/* right segment - search input, notifications, user avatar */}
        <div className="flex items-center gap-4">
          <div className="hidden xl:block text-right">
            <p className="text-xs text-slate-500 uppercase tracking-widest">
              Today
            </p>
            <h4 className="font-semibold text-sm mt-1">{today}</h4>
          </div>

          <div className="hidden md:flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 w-[320px] transition-all duration-300 focus-within:border-[#646cff]">
            <FaSearch className="text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent outline-none text-sm placeholder:text-slate-500"
            />
          </div>

          {/* alerts alert system wrapper */}
          <div ref={notificationRef} className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative h-11 w-11 rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center hover:border-[#646cff] duration-300"
            >
              <FaBell />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-3 w-[360px] rounded-2xl border border-slate-800 bg-[#111827] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Notifications</h3>
                  <button className="text-sm text-[#646cff] hover:underline">
                    Mark all as read
                  </button>
                </div>

                <div className="max-h-[350px] overflow-y-auto">
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
                    {
                      title: 'Server Status',
                      text: 'Everything is running smoothly.',
                      time: 'Today',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="px-5 py-4 border-b border-slate-800 hover:bg-slate-800/40 cursor-pointer duration-300"
                    >
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{item.text}</p>
                      <span className="text-xs text-slate-500 mt-2 inline-block">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 text-center">
                  <button className="text-[#646cff] hover:underline text-sm">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* target profile toggle node */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 hover:border-[#646cff] duration-300"
            >
              {/* dynamic avatar engine wrapper */}
              {user?.profileImage?.url ? (
                <img
                  src={user.profileImage.url}
                  alt={user?.name || 'User'}
                  className="h-10 w-10 rounded-full border border-[#646cff] object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-[#646cff] flex items-center justify-center text-white font-bold text-sm border border-[#646cff]">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}

              <div className="hidden md:block text-left">
                <h4 className="font-semibold">
                  {user?.name || 'Nicolas Jackson'}
                </h4>
                <p className="text-xs text-slate-400 capitalize">
                  {user?.role || 'User'}
                </p>
              </div>

              <FaChevronDown
                className={`hidden md:block text-sm text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-slate-800 bg-[#111827] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-5 border-b border-slate-800">
                  <div className="flex items-center gap-4">
                    {user?.profileImage?.url ? (
                      <img
                        src={user.profileImage.url}
                        alt="Profile"
                        className="w-14 h-14 rounded-full border-2 border-[#646cff] object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[#646cff] border-2 border-[#646cff] flex items-center justify-center text-white font-bold text-lg">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}

                    <div>
                      <h3 className="font-bold">
                        {user?.name || 'Nicolas Jackson'}
                      </h3>
                      <p className="text-sm text-slate-400 truncate max-w-[160px]">
                        {user?.email || 'user@gmail.com'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <button className="w-full text-left px-5 py-3 hover:bg-slate-800 duration-300">
                    👤 My Profile
                  </button>
                  <button className="w-full text-left px-5 py-3 hover:bg-slate-800 duration-300">
                    ⚙ Settings
                  </button>
                  <button className="w-full text-left px-5 py-3 hover:bg-slate-800 duration-300">
                    🌙 Dark Mode
                  </button>
                </div>

                <div className="border-t border-slate-800" />
                <button className="w-full text-left px-5 py-4 text-red-400 hover:bg-red-500/10 duration-300">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
