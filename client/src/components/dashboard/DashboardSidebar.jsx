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

  // logout handler
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <>
      {/* mobile drawer trigger button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-[100] bg-slate-900 border border-slate-800 p-3 rounded-xl text-slate-300"
      >
        <FaBars />
      </button>

      {/* backdrop overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* sidebar nav container */}
      <aside
        className={`fixed top-0 left-0 h-screen z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-slate-800 overflow-visible transition-all duration-500 ease-in-out ${collapsed ? 'lg:w-24' : 'lg:w-72'} ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-72 lg:translate-x-0`}
      >
        {/* ambient glow design */}
        <div className="absolute top-20 left-10 w-52 h-52 rounded-full bg-[#646cff]/20 blur-[100px]" />

        {/* collapse desktop panel toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute right-[-20px] cursor-pointer top-7 w-10 h-10 rounded-full bg-gradient-to-br from-[#646cff] to-[#4e5dff] items-center justify-center border border-slate-700 shadow-xl shadow-[#646cff]/30 hover:scale-110 transition-all duration-300 z-[60] text-white"
        >
          {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>

        <div className="relative z-10 flex flex-col h-full">
          {/* logo section */}
          <div
            className={`relative border-b border-slate-800 transition-all duration-500 ${collapsed ? 'px-4 py-6' : 'px-6 py-6'}`}
          >
            <h2
              onClick={() => navigate('/')}
              className={`font-bold cursor-pointer transition-all duration-300 ${
                collapsed ? 'text-2xl flex justify-center' : 'text-3xl'
              }`}
            >
              {collapsed ? (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#646cff] to-[#5563ff] flex items-center justify-center text-white text-xl shadow-lg shadow-[#646cff]/30">
                  SC
                </div>
              ) : (
                <>
                  <span className="text-white">Sifat</span>
                  <span className="text-[#646cff]">Coder</span>
                </>
              )}
            </h2>

            {!collapsed && (
              <p className="text-slate-400 mt-1 text-sm">User Dashboard</p>
            )}

            <button
              onClick={() => navigate('/')}
              className={`mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-[#646cff] cursor-pointer hover:text-white hover:border-[#646cff] transition-all duration-300 py-2 text-sm ${collapsed ? 'px-2' : ''} `}
            >
              <FaHome />
              {!collapsed && 'Back to Home'}
            </button>
          </div>

          {/* links navigation list */}
          <div className="flex-1 px-5 py-8 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
            {!collapsed && (
              <p className="text-slate-500 uppercase text-xs tracking-[3px] mb-5 px-2">
                Main Menu
              </p>
            )}

            <div className="space-y-2">
              {menus.map((menu) => (
                <NavLink
                  key={menu.title}
                  to={menu.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `group relative flex items-center ${collapsed ? 'justify-center px-0' : 'gap-4 px-5'} py-4 rounded-2xl transition-all duration-300 overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-[#646cff] to-[#4e5dff] text-white shadow-lg shadow-[#646cff]/20'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white hover:translate-x-2 hover:border hover:border-[#646cff]/40'
                    }`
                  }
                >
                  <span className="text-xl duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {menu.icon}
                  </span>

                  {!collapsed && (
                    <span className="font-medium whitespace-nowrap">
                      {menu.title}
                    </span>
                  )}

                  {collapsed && (
                    <div className="absolute left-20 opacity-0 group-hover:opacity-100 group-hover:left-24 duration-300 pointer-events-none bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-sm whitespace-nowrap z-50">
                      {menu.title}
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* user profile control footer */}
          <div
            className={`border-t border-slate-800 ${collapsed ? 'p-2' : 'p-4'}`}
          >
            <div
              className={`rounded-3xl bg-slate-900/80 border border-slate-800 transition-all duration-300 ${
                collapsed ? 'p-2' : 'p-4'
              }`}
            >
              {collapsed ? (
                <div className="flex flex-col items-center gap-3">
                  {/* collapsed layout fallback */}
                  {user?.profileImage?.url ? (
                    <img
                      src={user.profileImage.url}
                      alt={user?.name || 'User'}
                      className="w-10 h-10 rounded-full border border-[#646cff] object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#646cff] flex items-center justify-center text-white font-bold text-sm border border-[#646cff]">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-9 h-9 cursor-pointer rounded-xl bg-slate-950 border border-slate-800 hover:bg-red-500/10 hover:border-red-500/30 text-red-400 flex items-center justify-center transition-all duration-300"
                  >
                    <FaSignOutAlt className="text-sm" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    {/* expanded layout fallback */}
                    {user?.profileImage?.url ? (
                      <img
                        src={user.profileImage.url}
                        alt={user?.name || 'User'}
                        className="w-12 h-12 rounded-full border-2 border-[#646cff] object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#646cff] border-2 border-[#646cff] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="font-semibold text-white truncate">
                        {user?.name || 'Sifat Bin Anwar'}
                      </h3>
                      <p className="text-sm text-slate-400 truncate capitalize">
                        {user?.role || 'User'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-[#646cff] hover:bg-[#5563ff] text-white py-3 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#646cff]/30"
                  >
                    <FaSignOutAlt />
                    Logout
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
