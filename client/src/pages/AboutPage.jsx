import {
  FaArrowRight,
  FaBullseye,
  FaCheckCircle,
  FaCode,
  FaEnvelope,
  FaEye,
  FaGithub,
  FaLightbulb,
  FaLinkedin,
  FaRocket,
  FaShieldAlt,
  FaUsers,
} from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { RiQuestionFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-[#0a0a0a] text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[75vh] md:mt-20 xl:mt-0 flex items-center px-6">
        {/* Glow */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#646cff]/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full"></div>

        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-14 items-center relative z-10">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-slate-800 px-4 py-2 rounded-full text-sm text-slate-300 mb-6">
              <FaRocket className="text-[#646cff]" />
              About Sifat Tech
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Empowering Digital
              <span className="text-[#646cff] block mt-2">
                Innovation & Growth
              </span>
            </h1>

            <p className="text-slate-400 mt-6 text-lg leading-8 max-w-[620px]">
              Sifat Tech is committed to creating modern digital experiences
              through innovative design, scalable engineering and future-ready
              technology solutions.
            </p>

            <button className="mt-8 inline-flex items-center gap-2 bg-[#646cff] hover:bg-[#5563ff] transition-all duration-300 px-7 py-3 cursor-pointer rounded-xl font-medium shadow-lg hover:shadow-[#646cff]/40">
              Explore More
              <FaArrowRight />
            </button>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src="/images/about-me.jpg"
              alt="about"
              loading="lazy"
              className="w-full md:max-w-[680px] lg:max-w-[620px] rounded-2xl drop-shadow-[0_0_40px_rgba(100,108,255,0.30)] transition-all duration-500 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="px-6 py-24">
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src="/images/story-saas.jpg"
              alt="story"
              loading="lazy"
              className="w-full max-w-[520px] rounded-3xl border border-slate-800 drop-shadow-[0_0_40px_rgba(100,108,255,0.30)] transition-all duration-500 ease-in-out hover:scale-105"
            />
          </div>

          {/* Right Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-sm text-slate-300 mb-5">
              <FaLightbulb className="text-[#646cff]" />
              Our Story
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Building Meaningful
              <span className="text-[#646cff] block">Digital Experiences</span>
            </h2>

            <p className="text-slate-400 mt-6 leading-8">
              Sifat Tech began with a vision to build digital products that
              combine creativity, technology and real business impact.
            </p>

            <p className="text-slate-400 mt-5 leading-8">
              From modern websites to scalable applications, we focus on
              delivering secure, high-quality and user-focused solutions
              designed for long-term growth.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="px-6 py-24">
        <div className="max-w-[1300px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold">
              Mission & <span className="text-[#646cff]">Vision</span>
            </h2>

            <p className="text-slate-400 mt-4 max-w-[700px] mx-auto leading-8">
              Our mission is to help businesses grow through modern technology
              while shaping a future driven by innovation and digital
              excellence.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-7">
            {/* Mission */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-6">
                <FaBullseye className="text-[#646cff] text-3xl" />
              </div>

              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>

              <p className="text-slate-400 leading-8">
                To design and develop secure, scalable and impactful digital
                solutions that empower businesses and create meaningful user
                experiences.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-6">
                <FaEye className="text-[#646cff] text-3xl" />
              </div>

              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>

              <p className="text-slate-400 leading-8">
                To become a trusted technology partner known for innovation,
                quality engineering and long-term digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-6 pb-24">
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-300 mb-5">
              <RiQuestionFill className="text-[#646cff] text-[1rem]" /> Why
              Choose Us
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Technology With
              <span className="text-[#646cff] block">Purpose & Precision</span>
            </h2>

            <p className="text-slate-400 mt-6 leading-8">
              At Sifat Tech we focus on more than development. We create digital
              systems built around performance, security and long-term business
              value.
            </p>

            {/* Features */}
            <div className="space-y-5 mt-8">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-[#646cff]" />
                <span className="text-slate-300">Modern Development Stack</span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-[#646cff]" />
                <span className="text-slate-300">Scalable Architecture</span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-[#646cff]" />
                <span className="text-slate-300">
                  Premium UI / UX Experience
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-[#646cff]" />
                <span className="text-slate-300">Reliable Client Support</span>
              </div>
            </div>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-5">
            {/* Card 1 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-7 hover:border-[#646cff] transition-all easy-in-out duration-300 hover:scale-105">
              <FaCode className="text-[#646cff] text-3xl mb-4" />
              <h3 className="text-3xl font-bold">120+</h3>
              <p className="text-slate-400 mt-2">Projects Completed</p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-7 hover:border-[#646cff] transition-all easy-in-out duration-300 hover:scale-105">
              <FaUsers className="text-[#646cff] text-3xl mb-4" />
              <h3 className="text-3xl font-bold">80+</h3>
              <p className="text-slate-400 mt-2">Happy Clients</p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-7 hover:border-[#646cff] transition-all easy-in-out duration-300 hover:scale-105">
              <FaRocket className="text-[#646cff] text-3xl mb-4" />
              <h3 className="text-3xl font-bold">3+</h3>
              <p className="text-slate-400 mt-2">Years Experience</p>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-7 hover:border-[#646cff] transition-all easy-in-out duration-300 hover:scale-105">
              <FaShieldAlt className="text-[#646cff] text-3xl mb-4" />
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-slate-400 mt-2">Support & Security</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="px-6 py-24">
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-[#646cff]/20 blur-[80px] rounded-full"></div>

              <img
                src="/images/founder-me.png"
                alt="founder"
                loading="lazy"
                className="relative w-full max-w-[420px] drop-shadow-[0_0_40px_rgba(100,108,255,0.30)] transition-all duration-500 ease-in-out hover:scale-105"
              />
            </div>
          </div>

          {/* Right Content */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-sm text-slate-300 mb-5">
              <MdAdminPanelSettings className="text-[#646cff] text-[1rem]" />{' '}
              Founder & Vision
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Meet The Mind Behind
              <span className="text-[#646cff] block">Sifat Tech</span>
            </h2>

            <p className="text-slate-400 mt-6 leading-8">
              Sifat Bin Anwar is a passionate software developer focused on
              modern web technologies, scalable systems and creating digital
              products with real-world impact.
            </p>

            <p className="text-slate-400 mt-5 leading-8">
              Driven by continuous learning and innovation, Sifat Tech aims to
              deliver premium digital experiences that combine performance,
              clean engineering and business-focused solutions.
            </p>

            {/* Social */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://www.linkedin.com/in/sifatshams/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl border border-slate-800 bg-slate-900 hover:border-[#646cff] transition-all duration-300 easy-in-out hover:-translate-y-1 flex items-center justify-center"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://github.com/sifatshams"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl border border-slate-800 bg-slate-900 hover:border-[#646cff] transition-all duration-300 easy-in-out hover:-translate-y-1 flex items-center justify-center"
              >
                <FaGithub />
              </a>

              <a
                href="mailto:sifatbin.official@gmail.com?subject=Contact%20from%20Website&body=Hello%20friends"
                className="w-12 h-12 rounded-xl border border-slate-800 bg-slate-900 hover:border-[#646cff] transition-all duration-300 easy-in-out hover:-translate-y-1 flex items-center justify-center"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-28">
        <div className="max-w-[1300px] mx-auto">
          <div className="relative overflow-hidden rounded-[40px] border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-10 md:p-16 text-center">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#646cff]/20 blur-[120px] rounded-full"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Let's Build Something
                <span className="text-[#646cff] block mt-2">
                  Extraordinary Together
                </span>
              </h2>

              <p className="text-slate-400 mt-5 max-w-[700px] mx-auto leading-8">
                Whether you're launching a startup or scaling a business, Sifat
                Tech is ready to transform your ideas into powerful digital
                experiences.
              </p>

              <div className="flex justify-center mt-8">
                <Link
                  to="/contact"
                  className="inline-flex cursor-pointer items-center gap-2 bg-[#646cff] hover:bg-[#5563ff] transition-all duration-300 px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-[#646cff]/40"
                >
                  Contact Us
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
