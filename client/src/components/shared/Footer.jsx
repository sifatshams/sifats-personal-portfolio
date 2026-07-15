import {
  FaCube,
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-slate-800 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[450px] h-[250px] bg-[#646cff]/10 blur-[120px] rounded-full"></div>

      <div className="relative max-w-[1300px] mx-auto px-6 py-16">
        {/* Top Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
          {/* Logo + About */}
          <div>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#646cff] to-[#7f5cff] flex items-center justify-center shadow-[0_0_30px_rgba(100,108,255,0.35)] transition-all duration-300 group-hover:scale-105">
                <FaCube className="text-white text-lg" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white">
                  Sifat
                  <span className="text-[#646cff]">Coder</span>
                </h1>

                <p className="text-[11px] uppercase tracking-[3px] text-slate-500">
                  WEB WORLD
                </p>
              </div>
            </Link>

            <p className="text-slate-400 mt-5 leading-7 max-w-[320px]">
              Building modern, scalable and user-focused digital products with
              clean design, innovation and cutting-edge technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {[
                { to: '/', text: 'Home' },
                { to: '/about', text: 'About' },
                { to: '/service', text: 'Services' },
                { to: '/contact', text: 'Contact' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-slate-400 hover:text-[#646cff] transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Contact Info
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-400">
                <FaMapMarkerAlt className="text-[#646cff]" />
                <span>Bangladesh</span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <FaEnvelope className="text-[#646cff]" />
                <span>sifatbin.official@gmail.com</span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <FaPhoneAlt className="text-[#646cff]" />
                <span>+880 1778625668</span>
              </div>
            </div>
          </div>

          {/* Social + CTA */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Follow & Connect
            </h3>

            <p className="text-slate-400 leading-7 mb-5">
              Stay connected and follow our journey on social media.
            </p>

            <div className="flex gap-3 flex-wrap">
              <a
                href="https://www.facebook.com/share/18UTpREpR8/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-[#646cff] hover:border-[#646cff] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[#646cff]/30"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://github.com/sifatshams"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-[#646cff] hover:border-[#646cff] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[#646cff]/30"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/sifatshams/"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-[#646cff] hover:border-[#646cff] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[#646cff]/30"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-[#646cff] hover:border-[#646cff] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[#646cff]/30"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-14 pt-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} SifatCoder. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <Link
              to="/privacy-policy"
              className="text-slate-500 hover:text-[#646cff] underline transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-slate-500 hover:text-[#646cff] underline transition"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
