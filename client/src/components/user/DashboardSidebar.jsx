import {
  FaAngleLeft,
  FaAngleRight,
  FaBars,
  FaChartLine,
  FaCog,
  FaEnvelope,
  FaFolderOpen,
  FaHome,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/authStore'; // path to your auth store

const DashboardSidebar = ({
  collapsed,
  setCollapsed,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  // Pure user-focused menus
  const menus = [
    {
      title: 'Dashboard',
      icon: <FaHome />,
      path: '/dashboard',
    },
    {
      title: 'My Profile',
      icon: <FaUser />,
      path: '/dashboard/profile',
    },
    {
      title: 'Projects',
      icon: <FaFolderOpen />,
      path: '/dashboard/projects',
    },
    {
      title: 'Messages',
      icon: <FaEnvelope />,
      path: '/dashboard/messages',
    },
    {
      title: 'Analytics',
      icon: <FaChartLine />,
      path: '/dashboard/analytics',
    },
    {
      title: 'Settings',
      icon: <FaCog />,
      path: '/dashboard/settings',
    },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Drawer Trigger */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-[100] bg-slate-950 border border-slate-800 p-3 rounded-xl text-slate-300 shadow-lg shadow-black/40 hover:text-white transition-colors duration-300"
      >
        <FaBars />
      </button>

      {/* Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-screen z-50 bg-[#0a0a0c]/95 backdrop-blur-xl border-r border-slate-800/80 overflow-visible transition-all duration-500 ease-in-out ${
          collapsed ? 'lg:w-24' : 'lg:w-72'
        } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-72 lg:translate-x-0`}
      >
        {/* Futuristic Ambient Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#646cff]/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-36 h-36 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

        {/* Desktop Panel Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute right-[-18px] cursor-pointer top-7 w-9 h-9 rounded-full bg-gradient-to-br from-[#646cff] to-[#4e5dff] items-center justify-center border border-slate-700/50 shadow-lg shadow-[#646cff]/20 hover:scale-110 active:scale-95 transition-all duration-300 z-[60] text-white"
        >
          {collapsed ? (
            <FaAngleRight className="text-sm" />
          ) : (
            <FaAngleLeft className="text-sm" />
          )}
        </button>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo Brand Header */}
          <div
            className={`relative border-b border-slate-800/60 transition-all duration-500 ${collapsed ? 'px-4 py-6' : 'px-6 py-6'}`}
          >
            <h2
              onClick={() => navigate('/')}
              className={`font-bold cursor-pointer transition-all duration-300 ${
                collapsed ? 'text-2xl flex justify-center' : 'text-2xl'
              }`}
            >
              {collapsed ? (
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#646cff] to-[#5563ff] flex items-center justify-center text-white text-base font-black shadow-md shadow-[#646cff]/20 hover:rotate-6 duration-300">
                  SC
                </div>
              ) : (
                <div className="tracking-tight hover:opacity-90 duration-300">
                  <span className="text-white font-extrabold">Sifat</span>
                  <span className="text-[#646cff] font-black">Coder</span>
                </div>
              )}
            </h2>

            {!collapsed && (
              <p className="text-slate-500 font-medium mt-0.5 text-xs tracking-wide">
                User Dashboard
              </p>
            )}

            {/* Back to Home Button */}
            <button
              onClick={() => navigate('/')}
              className={`mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:bg-[#646cff] cursor-pointer hover:text-white hover:border-[#646cff] hover:shadow-md hover:shadow-[#646cff]/10 transition-all duration-300 py-2.5 text-xs font-semibold ${
                collapsed ? 'px-2' : 'px-4'
              }`}
            >
              <FaHome className="text-sm shrink-0" />
              {!collapsed && <span>Back to Home</span>}
            </button>
          </div>

          {/* Navigation Items Menu */}
          <div className="flex-1 px-4 py-6 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb]:rounded-full">
            {!collapsed && (
              <p className="text-slate-600 uppercase text-[10px] font-bold tracking-[3px] mb-4 px-3">
                Main Menu
              </p>
            )}

            <div className="space-y-1.5">
              {menus.map((menu) => (
                <NavLink
                  key={menu.title}
                  to={menu.path}
                  end={menu.path === '/dashboard'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `group relative flex items-center ${
                      collapsed ? 'justify-center px-0' : 'gap-3.5 px-4'
                    } py-3.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#646cff] to-[#4e5dff] text-white shadow-md shadow-[#646cff]/15'
                        : 'text-slate-400 hover:bg-slate-900/70 hover:text-white hover:translate-x-1.5 border border-transparent hover:border-slate-800'
                    }`
                  }
                >
                  <span className="text-lg duration-300 group-hover:scale-110">
                    {menu.icon}
                  </span>

                  {!collapsed && (
                    <span className="whitespace-nowrap transition-colors duration-300">
                      {menu.title}
                    </span>
                  )}

                  {/* Desktop Tooltip for Collapsed State */}
                  {collapsed && (
                    <div className="absolute left-20 opacity-0 group-hover:opacity-100 group-hover:left-[88px] duration-300 pointer-events-none bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 shadow-xl whitespace-nowrap z-50">
                      {menu.title}
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* User Profile Footer Actions */}
          <div
            className={`border-t border-slate-800/60 ${collapsed ? 'p-3' : 'p-4'}`}
          >
            <div
              className={`rounded-2xl bg-slate-900/40 border border-slate-800/80 transition-all duration-300 ${collapsed ? 'p-1.5' : 'p-3.5'}`}
            >
              {collapsed ? (
                <div className="flex flex-col items-center gap-3">
                  {user?.profileImage?.url ? (
                    <img
                      src={user.profileImage.url}
                      alt={user?.name || 'User'}
                      className="w-9 h-9 rounded-full border border-[#646cff]/60 object-cover shrink-0 shadow-inner"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#646cff] to-[#4e5dff] flex items-center justify-center text-white font-bold text-xs shadow-inner shrink-0">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-8 h-8 cursor-pointer rounded-lg bg-slate-950 border border-slate-850 hover:bg-red-500/10 hover:border-red-500/20 text-red-400 flex items-center justify-center transition-all duration-300 shadow-sm"
                    title="Logout"
                  >
                    <FaSignOutAlt className="text-xs" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    {user?.profileImage?.url ? (
                      <img
                        src={user.profileImage.url}
                        alt={user?.name || 'User'}
                        className="w-10 h-10 rounded-full border border-[#646cff]/80 object-cover shrink-0 shadow-md"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#646cff] to-[#4e5dff] flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-xs text-slate-200 truncate">
                        {user?.name || 'Sifat Bin Anwar'}
                      </h3>
                      <p className="text-[11px] font-medium text-slate-500 truncate capitalize mt-0.5">
                        {user?.role || 'Premium User'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="mt-3 w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-red-500/10 border border-slate-850 hover:border-red-500/20 text-slate-400 hover:text-red-400 py-2.5 text-xs font-semibold transition-all duration-300 active:scale-[0.98]"
                  >
                    <FaSignOutAlt className="text-xs" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
