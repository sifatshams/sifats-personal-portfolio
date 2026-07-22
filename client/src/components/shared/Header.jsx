// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { FaCube } from 'react-icons/fa';
import { FiLayout, FiLogOut, FiUser } from 'react-icons/fi';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/authStore';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const dropdownRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const profilePath =
    user?.role === 'admin'
      ? '/admin-dashboard/profile'
      : '/user-dashboard/profile';

  const links = [
    { to: '/', text: 'Home' },
    { to: '/about', text: 'About' },
    { to: '/service', text: 'Services' },
    { to: '/ai-chat', text: 'Ai chat' },
    { to: '/contact', text: 'Contact' },
  ];

  const handleLogoClick = () => {
    setOpen(false);
    navigate('/');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };

  const handleLogout = () => {
    // save role before logout clears the user state
    const isAdmin = user?.role === 'admin';

    logout();

    // success msg based on role
    if (isAdmin) {
      toast.success('Admin logged out successfully!');
    } else {
      toast.success('User logged out successfully!');
    }

    // close dropdown
    setDropdown(false);
    setOpen(false);

    // redirect
    navigate('/login');
  };

  const openDropdown = () => {
    clearTimeout(closeTimeoutRef.current);
    setDropdown(true);
  };

  const closeDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDropdown(false);
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[85px]">
          {/* LOGO */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#646cff] to-[#7f5cff] flex items-center justify-center shadow-[0_0_30px_rgba(100,108,255,0.35)] transition group-hover:scale-105 group-hover:rotate-3">
              <FaCube className="text-white text-base sm:text-lg" />
            </div>

            <div className="flex flex-col justify-center leading-tight text-left">
              <h1 className="text-[20px] cursor-pointer sm:text-[24px] font-bold text-white leading-none whitespace-nowrap">
                <span>
                  Sifat <span className="text-[#646cff]">Coder</span>
                </span>
              </h1>
              <p className="text-[9px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] text-slate-400 uppercase mt-[2px] whitespace-nowrap">
                Web App Developer
              </p>
            </div>
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center md:gap-4 lg:gap-7 shrink-0">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-[0.95rem] lg:text-[1rem] font-medium transition-all duration-300 whitespace-nowrap
                  ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}
                  after:absolute after:left-0 after:-bottom-2 after:h-[2px]
                  after:bg-[#646cff] after:transition-all after:duration-300
                  ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
                }
              >
                {link.text}
              </NavLink>
            ))}

            {/* AUTH SECTION */}
            {!user ? (
              <div className="flex items-center md:gap-3 lg:gap-5 ml-2">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `relative text-[0.95rem] lg:text-[1rem] font-medium transition-all duration-300 whitespace-nowrap
                      ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}
                      after:absolute after:left-0 after:-bottom-2 after:h-[2px]
                    after:bg-[#646cff] after:transition-all after:duration-300
                      ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
                  }
                >
                  Login
                </NavLink>

                <Link
                  to="/register"
                  className="px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-[#646cff] to-[#7f5cff] text-[0.95rem] lg:text-[1rem] transition whitespace-nowrap shadow-[0_4px_15px_rgba(100,108,255,0.2)]"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center md:gap-3 lg:gap-5 ml-2">
                <NavLink
                  to={
                    user?.role === 'admin'
                      ? '/admin-dashboard'
                      : '/user-dashboard'
                  }
                  className="text-slate-400 hover:text-white flex items-center gap-2 text-[0.95rem] lg:text-[1rem] transition whitespace-nowrap"
                >
                  <FiLayout />
                  {user?.role === 'admin' ? 'Admin Panel' : 'User Dashboard'}
                </NavLink>

                {/* USER DROPDOWN */}
                <div
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <button
                    onClick={() => setDropdown((p) => !p)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-[#646cff]/50 transition max-w-[150px] cursor-pointer sm:max-w-[200px]"
                  >
                    {/* conditional profile image or letter fallback */}
                    {user?.profileImage?.url ? (
                      <img
                        src={user.profileImage.url}
                        alt={user.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-700"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#646cff] flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {user?.name?.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm text-slate-200 truncate hidden lg:inline">
                      {user?.name}
                    </span>
                    <span className="text-sm text-slate-200 truncate lg:hidden">
                      {user?.name?.split(' ')[0]}
                    </span>
                  </button>

                  {dropdown && (
                    <div
                      className="absolute right-0 mt-3 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden"
                      onMouseEnter={openDropdown}
                      onMouseLeave={closeDropdown}
                    >
                      <Link
                        to={profilePath}
                        onClick={() => setDropdown(false)}
                        className="flex items-center gap-2 px-4 py-3 text-slate-300 hover:bg-slate-800 transition"
                      >
                        <FiUser />
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex cursor-pointer items-center gap-2 px-4 py-3 text-left bg-gradient-to-r from-red-500/10 to-red-600/10 border-t border-slate-800 text-red-400 font-medium hover:bg-red-500/20 transition"
                      >
                        <FiLogOut />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden cursor-pointer text-3xl text-[#646cff] transition"
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden cursor-pointer overflow-hidden transition-all duration-300 ${open ? 'max-h-[600px]' : 'max-h-0'}`}
      >
        <div className="bg-slate-900/95 px-6 py-5 border-t border-slate-800">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-white block py-1"
                >
                  {link.text}
                </NavLink>
              </li>
            ))}

            {user ? (
              <>
                {/* mobile user identification banner */}
                <li className="flex items-center gap-3 py-2 px-1 border-b border-slate-800">
                  {user?.profileImage?.url ? (
                    <img
                      src={user.profileImage.url}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-700"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#646cff] flex items-center justify-center text-white font-bold text-sm">
                      {user?.name?.charAt(0)}
                    </div>
                  )}
                  <span className="text-slate-200 font-medium text-sm truncate">
                    {user?.name}
                  </span>
                </li>

                <li>
                  <NavLink
                    to={
                      user?.role === 'admin'
                        ? '/admin-dashboard'
                        : '/user-dashboard'
                    }
                    onClick={() => setOpen(false)}
                    className="text-slate-400 hover:text-white block py-1"
                  >
                    {user?.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={profilePath}
                    onClick={() => setOpen(false)}
                    className="text-slate-400 hover:text-white block py-1"
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-xl
                    bg-red-500/10 border border-red-500/30
                    text-red-400 font-medium cursor-pointer hover:bg-red-500/20 transition"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* guest users mobile actions */}
                <li>
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="text-slate-400 hover:text-white block py-1"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="text-center block py-2.5 mt-2 rounded-xl bg-gradient-to-r from-[#646cff] to-[#7f5cff] text-white font-medium"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
