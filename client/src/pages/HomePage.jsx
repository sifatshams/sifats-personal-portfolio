import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaCheckCircle,
  FaCode,
  FaCodeBranch,
  FaExternalLinkAlt,
  FaHeadset,
  FaLaptopCode,
  FaLightbulb,
  FaMobileAlt,
  FaPalette,
  FaQuoteLeft,
  FaRocket,
  FaServer,
  FaShieldAlt,
  FaUsers,
} from 'react-icons/fa';
import { RiQuestionFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// type animation text
const words = ['Digital Growth', 'AI Solutions', 'Smart Systems'];

const HomePage = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);

  // typing effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(words[index].slice(0, char));
      setChar(char + 1);

      if (char > words[index].length) {
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % words.length);
          setChar(0);
        }, 1000);
      }
    }, 120);

    return () => clearTimeout(timeout);
  }, [char, index]);
  return (
    <div className="bg-[#0a0a0a] mt-15 md:mt-0 text-white overflow-hidden">
      {/* title */}
      <SEO
        title="Home Page"
        description="I am a Full Stack Developer specializing in React, Node.js"
        keywords="portfolio, react developer, sifat web, sifat coder ,web developer"
        image="/og-home.png"
        url="https://sifatcoder.vercel.app/"
      />
      {/* FLOATING GLOWS */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-10 w-72 h-72 bg-[#646cff]/20 blur-[120px] rounded-full"
      />

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full"
      />
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] max-w-[1300px] mx-auto flex items-center px-6">
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-slate-800 px-4 py-2 rounded-full text-sm text-slate-300 mb-6">
              🚀 Future Ready Digital Platform
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-[#646cff]">Sifat's Tech</span>
              <br />
              Smart Solutions For
              <br />
              <span className="text-[#646cff] border-r-2 border-[#646cff] pr-2">
                {text}
              </span>
            </h1>

            <p className="text-slate-400 mt-6 text-lg leading-8 max-w-[600px]">
              We build modern web apps, AI systems and scalable digital products
              for future-ready businesses.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-[#646cff] hover:bg-[#5563ff] text-nowrap transition px-7 py-3 rounded-xl font-medium text-center shadow-lg hover:shadow-[#646cff]/40"
              >
                Get Started
              </Link>

              <Link
                to="/service"
                className="border border-slate-700 text-nowrap hover:border-[#646cff] hover:bg-slate-900 transition px-7 py-3 rounded-xl font-medium text-center"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <motion.img
              src="/images/hero-web.png"
              alt="hero"
              className="w-full max-w-[560px] drop-shadow-[0_0_60px_rgba(100,108,255,0.35)]"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="px-6 pb-20 mt-35 md:mt-20 lg:mt-10">
        <div className="max-w-[1300px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {/* CARD 1 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl hover:border-[#646cff] transition-all easy-in-out hover:-translate-y-2 duration-300 ">
            <FaCode className="text-3xl text-[#646cff] mb-4" />
            <h2 className="text-3xl font-bold">120+</h2>
            <p className="text-slate-400 mt-2">Projects Completed</p>
          </div>

          {/* CARD 2 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl hover:border-[#646cff] transition-all easy-in-out hover:-translate-y-2 duration-300 ">
            <FaUsers className="text-3xl text-[#646cff] mb-4" />
            <h2 className="text-3xl font-bold">85+</h2>
            <p className="text-slate-400 mt-2">Happy Clients</p>
          </div>

          {/* CARD 3 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl hover:border-[#646cff] transition-all easy-in-out hover:-translate-y-2 duration-300 ">
            <FaRocket className="text-3xl text-[#646cff] mb-4" />
            <h2 className="text-3xl font-bold">3+</h2>
            <p className="text-slate-400 mt-2">Years Experience</p>
          </div>

          {/* CARD 4 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl hover:border-[#646cff] transition-all easy-in-out hover:-translate-y-2 duration-300 ">
            <FaShieldAlt className="text-3xl text-[#646cff] mb-4" />
            <h2 className="text-3xl font-bold">24/7</h2>
            <p className="text-slate-400 mt-2">Support & Security</p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="px-6 py-24">
        <div className="max-w-[1300px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold">
              Our <span className="text-[#646cff]">Services</span>
            </h2>

            <p className="text-slate-400 mt-4 max-w-[650px] mx-auto leading-8">
              We provide cutting-edge digital solutions that help startups and
              businesses grow faster in the modern world.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-7 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-14 h-14 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-5">
                <FaLaptopCode className="text-[#646cff] text-2xl" />
              </div>

              <h3 className="text-xl font-semibold mb-3">Web Development</h3>

              <p className="text-slate-400 leading-7">
                Modern responsive websites and scalable web apps using latest
                technologies.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-7 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-5">
                <FaMobileAlt className="text-[#646cff] text-2xl" />
              </div>

              <h3 className="text-xl font-semibold mb-3">App Development</h3>

              <p className="text-slate-400 leading-7">
                Cross-platform mobile experiences built for performance and
                scalability.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-7 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-5">
                <FaServer className="text-[#646cff] text-2xl" />
              </div>

              <h3 className="text-xl font-semibold mb-3">Backend & APIs</h3>

              <p className="text-slate-400 leading-7">
                Secure backend architecture and fast APIs for modern digital
                systems.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-7 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-5">
                <FaPalette className="text-[#646cff] text-2xl" />
              </div>

              <h3 className="text-xl font-semibold mb-3">UI / UX Design</h3>

              <p className="text-slate-400 leading-7">
                Beautiful interfaces with premium user experience and
                conversion-focused design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-6 pb-24">
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src="/images/code-01 (4).jpg"
              alt="why us"
              className="w-full md:max-w-[680px] lg:max-w-[620px] rounded-2xl drop-shadow-[0_0_40px_rgba(100,108,255,0.30)] transition-all duration-500 ease-in-out hover:scale-105"
            />
          </div>

          {/* Right Content */}
          <div>
            <div className="inline-flex px-4 items-center gap-1.5 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-300 mb-5">
              <RiQuestionFill className="text-[#646cff] text-[1rem]" /> Why
              Choose Sifat Tech
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Building Digital Products
              <span className="text-[#646cff] block">With Innovation</span>
            </h2>

            <p className="text-slate-400 mt-6 leading-8">
              We combine strategy, design and technology to create digital
              products that are scalable, secure and future-ready.
            </p>

            {/* Features */}
            <div className="space-y-5 mt-8">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-[#646cff]" />
                <span className="text-slate-300">Modern Technology Stack</span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-[#646cff]" />
                <span className="text-slate-300">Fast Delivery Process</span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-[#646cff]" />
                <span className="text-slate-300">
                  Secure & Scalable Systems
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-[#646cff]" />
                <span className="text-slate-300">Dedicated Client Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK SECTION */}
      <section className="px-6 py-24">
        <div className="max-w-[1300px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-slate-800 px-4 py-2 rounded-full text-sm text-slate-300 mb-5">
              ⚡ Our Workflow
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              How We Turn
              <span className="text-[#646cff] block mt-2">
                Ideas Into Reality
              </span>
            </h2>

            <p className="text-slate-400 mt-5 max-w-[720px] mx-auto leading-8">
              From planning to launch, our streamlined workflow ensures
              high-quality, scalable and future-ready digital products.
            </p>
          </div>

          {/* Process Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="group relative overflow-hidden bg-slate-900/60 border border-slate-800 rounded-3xl p-7 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#646cff]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition"></div>

              <div className="w-14 h-14 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-5">
                <FaLightbulb className="text-[#646cff] text-2xl" />
              </div>

              <span className="text-[#646cff] text-sm font-medium">
                Step 01
              </span>

              <h3 className="text-xl font-semibold mt-2 mb-3">
                Strategy & Planning
              </h3>

              <p className="text-slate-400 leading-7">
                Understanding goals, research and planning the perfect digital
                roadmap.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group relative overflow-hidden bg-slate-900/60 border border-slate-800 rounded-3xl p-7 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#646cff]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition"></div>

              <div className="w-14 h-14 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-5">
                <FaCodeBranch className="text-[#646cff] text-2xl" />
              </div>

              <span className="text-[#646cff] text-sm font-medium">
                Step 02
              </span>

              <h3 className="text-xl font-semibold mt-2 mb-3">
                Design & Development
              </h3>

              <p className="text-slate-400 leading-7">
                Creating premium UI and robust development with modern
                technologies.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group relative overflow-hidden bg-slate-900/60 border border-slate-800 rounded-3xl p-7 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#646cff]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition"></div>

              <div className="w-14 h-14 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-5">
                <FaRocket className="text-[#646cff] text-2xl" />
              </div>

              <span className="text-[#646cff] text-sm font-medium">
                Step 03
              </span>

              <h3 className="text-xl font-semibold mt-2 mb-3">
                Launch & Growth
              </h3>

              <p className="text-slate-400 leading-7">
                Testing, deployment and scaling your digital product for growth.
              </p>
            </div>

            {/* Step 4 */}
            <div className="group relative overflow-hidden bg-slate-900/60 border border-slate-800 rounded-3xl p-7 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#646cff]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition"></div>

              <div className="w-14 h-14 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-5">
                <FaHeadset className="text-[#646cff] text-2xl" />
              </div>

              <span className="text-[#646cff] text-sm font-medium">
                Step 04
              </span>

              <h3 className="text-xl font-semibold mt-2 mb-3">
                Support & Optimization
              </h3>

              <p className="text-slate-400 leading-7">
                Continuous maintenance, updates and support to keep everything
                performing at its best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIGITAL IMPACT SECTION */}
      <section className="px-6 pb-24">
        <div className="max-w-[1300px] mx-auto">
          <div className="relative overflow-hidden rounded-[40px] border border-slate-800 bg-slate-900/70 backdrop-blur-xl">
            {/* Glow Effects */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#646cff]/15 blur-[120px] rounded-full"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-8 md:p-12 lg:p-16">
              {/* LEFT IMAGE */}
              <div className="relative flex justify-center">
                <div className="absolute inset-0 bg-[#646cff]/10 blur-[80px] rounded-full"></div>

                <img
                  src="/images/team-work.jpg"
                  alt="digital impact"
                  className="relative w-full max-w-[560px] rounded-[32px]
            border border-slate-800
            shadow-[0_0_50px_rgba(100,108,255,0.18)]
            transition-all duration-700
            hover:scale-[1.03]"
                />
              </div>

              {/* RIGHT CONTENT */}
              <div>
                <div className="inline-flex items-center gap-2 bg-[#646cff]/10 border border-[#646cff]/20 px-4 py-2 rounded-full text-sm text-slate-300 mb-5">
                  ✨ Digital Excellence
                </div>

                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Turning Vision Into
                  <span className="text-[#646cff] block mt-2">
                    Powerful Experiences
                  </span>
                </h2>

                <p className="text-slate-400 mt-6 leading-8 max-w-[600px]">
                  Every project we build is designed with performance,
                  scalability and long-term growth in mind. We focus on creating
                  experiences that are visually stunning, technically strong and
                  user focused.
                </p>

                {/* Feature Line Items */}
                <div className="mt-8 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 mt-2 rounded-full bg-[#646cff]"></div>

                    <div>
                      <h4 className="font-semibold text-lg">
                        Premium User Experience
                      </h4>
                      <p className="text-slate-400 mt-1">
                        Interfaces designed for engagement and conversion.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 mt-2 rounded-full bg-[#646cff]"></div>

                    <div>
                      <h4 className="font-semibold text-lg">
                        Scalable Technology
                      </h4>
                      <p className="text-slate-400 mt-1">
                        Future-ready architecture built for growth.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 mt-2 rounded-full bg-[#646cff]"></div>

                    <div>
                      <h4 className="font-semibold text-lg">
                        Long-Term Partnership
                      </h4>
                      <p className="text-slate-400 mt-1">
                        Ongoing support and continuous improvement.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 mt-9 px-6 py-3 rounded-2xl
            bg-[#646cff] hover:bg-[#5563ff]
            transition-all duration-300
            shadow-lg hover:shadow-[#646cff]/40"
                >
                  Start Your Journey
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="px-6 py-24">
        <div className="max-w-[1300px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold">
              Featured <span className="text-[#646cff]">Projects</span>
            </h2>

            <p className="text-slate-400 mt-4 max-w-[650px] mx-auto leading-8">
              Some of our recent work built with creativity, performance and
              modern technologies.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {/* Project 1 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <img
                src="../../public/images/ai-dashboard.jpg"
                alt="project"
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">AI Dashboard</h3>

                <p className="text-slate-400 leading-7 mb-5">
                  Smart analytics dashboard with modern UI and real-time
                  insights.
                </p>

                <button className="flex items-center gap-2 text-[#646cff] hover:gap-3 transition-all">
                  View Project
                  <FaExternalLinkAlt />
                </button>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <img
                src="../../public/images/saas-platform.jpg"
                alt="project"
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">SaaS Platform</h3>

                <p className="text-slate-400 leading-7 mb-5">
                  Subscription-based scalable platform for startups and
                  businesses.
                </p>

                <button className="flex items-center gap-2 text-[#646cff] hover:gap-3 transition-all">
                  View Project
                  <FaExternalLinkAlt />
                </button>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <img
                src="../../public/images/business-web.jpg"
                alt="project"
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">
                  Business Website
                </h3>

                <p className="text-slate-400 leading-7 mb-5">
                  High-converting professional company website with premium
                  experience.
                </p>

                <button className="flex items-center gap-2 text-[#646cff] hover:gap-3 transition-all">
                  View Project
                  <FaExternalLinkAlt />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 pb-24">
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold">
              Client <span className="text-[#646cff]">Feedback</span>
            </h2>

            <p className="text-slate-400 mt-4">
              Trusted by businesses worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-slate-900/60 transition-all duration-300 easy-in-out hover:-translate-y-2 border border-slate-800 rounded-3xl p-7 backdrop-blur-xl hover:border-[#646cff]">
              <FaQuoteLeft className="text-[#646cff] text-3xl mb-5" />

              <p className="text-slate-400 leading-8">
                Sifat Tech delivered our platform with amazing quality and
                excellent communication.
              </p>

              <h4 className="mt-6 font-semibold">Sarah Johnson</h4>

              <p className="text-slate-500 text-sm">Startup Founder</p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl transition-all duration-300 easy-in-out hover:-translate-y-2 p-7 backdrop-blur-xl hover:border-[#646cff]">
              <FaQuoteLeft className="text-[#646cff] text-3xl mb-5" />

              <p className="text-slate-400 leading-8">
                Their design and development process was smooth, fast and highly
                professional.
              </p>

              <h4 className="mt-6 font-semibold">Michael Brown</h4>

              <p className="text-slate-500 text-sm">CEO, Tech Firm</p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-7 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 easy-in-out hover:-translate-y-2">
              <FaQuoteLeft className="text-[#646cff] text-3xl mb-5" />

              <p className="text-slate-400 leading-8">
                Highly recommend Sifat Tech for modern web solutions and
                scalable systems.
              </p>

              <h4 className="mt-6 font-semibold">David Wilson</h4>

              <p className="text-slate-500 text-sm">Product Manager</p>
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
                Ready To Build
                <span className="text-[#646cff] block mt-2">
                  Your Next Project?
                </span>
              </h2>

              <p className="text-slate-400 mt-5 max-w-[700px] mx-auto leading-8">
                Let Sifat Tech help you transform ideas into scalable digital
                experiences.
              </p>

              <Link
                to="/contact"
                className="mt-8 cursor-pointer bg-[#646cff] hover:bg-[#5563ff] transition-all duration-300 px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-[#646cff]/40 items-center gap-2 inline-flex"
              >
                Contact Us
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
