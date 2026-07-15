import {
  FaArrowRight,
  FaCheckCircle,
  FaCode,
  FaGlobe,
  FaHandshake,
  FaHeadset,
  FaLaptopCode,
  FaLightbulb,
  FaMobileAlt,
  FaPalette,
  FaRocket,
  FaServer,
  FaUsers,
} from 'react-icons/fa';
import { RiQuestionFill } from 'react-icons/ri';

const ServicePage = () => {
  return (
    <div className="relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#646cff]/15 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full"></div>

      {/* HERO */}
      <section className="relative px-6 pt-20 pb-16">
        <div className="max-w-[1300px] mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-slate-800 px-4 py-2 rounded-full text-sm text-slate-300 mb-6">
            <FaRocket className="text-[#646cff]" />
            Premium Digital Services
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Innovative Services
            <span className="text-[#646cff] block mt-2">
              Designed For Growth
            </span>
          </h1>

          {/* Desc */}
          <p className="text-slate-400 mt-6 text-lg leading-8 max-w-[760px] mx-auto">
            We craft scalable digital products, modern experiences and secure
            technology solutions that help startups and businesses grow faster
            in a competitive world.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 pb-24">
        <div className="max-w-[1300px] mx-auto">
          {/* Top Heading */}
          <div className="text-center mb-14">
            <div className="inline-flex px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-300 mb-5">
              What We Offer
            </div>

            <h2 className="text-4xl md:text-5xl font-bold">
              Our Core
              <span className="text-[#646cff]"> Services</span>
            </h2>

            <p className="text-slate-400 mt-5 max-w-[700px] mx-auto leading-8">
              We combine creativity, engineering and innovation to deliver
              premium digital solutions built for modern businesses.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group bg-slate-900/60 border border-slate-800 rounded-[30px] p-7 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <FaLaptopCode className="text-[#646cff] text-2xl" />
              </div>

              <h3 className="text-xl font-semibold mb-3">Web Development</h3>

              <p className="text-slate-400 leading-7 mb-5">
                Responsive websites and scalable web apps using modern
                technologies and clean architecture.
              </p>

              <div className="flex items-center gap-2 text-[#646cff] text-sm">
                Learn More
                <FaArrowRight />
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-slate-900/60 border border-slate-800 rounded-[30px] p-7 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <FaMobileAlt className="text-[#646cff] text-2xl" />
              </div>

              <h3 className="text-xl font-semibold mb-3">App Development</h3>

              <p className="text-slate-400 leading-7 mb-5">
                Cross-platform mobile solutions built with performance and user
                experience in mind.
              </p>

              <div className="flex items-center gap-2 text-[#646cff] text-sm">
                Learn More
                <FaArrowRight />
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-slate-900/60 border border-slate-800 rounded-[30px] p-7 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <FaServer className="text-[#646cff] text-2xl" />
              </div>

              <h3 className="text-xl font-semibold mb-3">Backend & APIs</h3>

              <p className="text-slate-400 leading-7 mb-5">
                Secure APIs and backend systems engineered for speed,
                scalability and reliability.
              </p>

              <div className="flex items-center gap-2 text-[#646cff] text-sm">
                Learn More
                <FaArrowRight />
              </div>
            </div>

            {/* Card 4 */}
            <div className="group bg-slate-900/60 border border-slate-800 rounded-[30px] p-7 backdrop-blur-xl hover:border-[#646cff] transition-all duration-300 hover:-translate-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#646cff]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <FaPalette className="text-[#646cff] text-2xl" />
              </div>

              <h3 className="text-xl font-semibold mb-3">UI / UX Design</h3>

              <p className="text-slate-400 leading-7 mb-5">
                Beautiful interfaces and premium user experiences focused on
                engagement and conversion.
              </p>

              <div className="flex items-center gap-2 text-[#646cff] text-sm">
                Learn More
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="px-6 pb-24">
        <div className="max-w-[1300px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-14">
            <div className="inline-flex px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-300 mb-5">
              Our Process
            </div>

            <h2 className="text-4xl md:text-5xl font-bold">
              How We
              <span className="text-[#646cff]"> Work</span>
            </h2>

            <p className="text-slate-400 mt-5 max-w-[700px] mx-auto leading-8">
              Our workflow is designed to transform ideas into scalable and
              impactful digital products through strategy, collaboration and
              innovation.
            </p>
          </div>

          {/* Process Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-[30px] p-7 hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <div className="text-[#646cff] text-5xl font-bold opacity-30 mb-4">
                01
              </div>

              <FaLightbulb className="text-[#646cff] text-3xl mb-5" />

              <h3 className="text-xl font-semibold mb-3">Discovery</h3>

              <p className="text-slate-400 leading-7">
                Understanding your business goals and project requirements
                through research and strategy.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-[30px] p-7 hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <div className="text-[#646cff] text-5xl font-bold opacity-30 mb-4">
                02
              </div>

              <FaPalette className="text-[#646cff] text-3xl mb-5" />

              <h3 className="text-xl font-semibold mb-3">Design</h3>

              <p className="text-slate-400 leading-7">
                Creating modern and intuitive experiences with premium UI and
                user-centered thinking.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-[30px] p-7 hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <div className="text-[#646cff] text-5xl font-bold opacity-30 mb-4">
                03
              </div>

              <FaCode className="text-[#646cff] text-3xl mb-5" />

              <h3 className="text-xl font-semibold mb-3">Development</h3>

              <p className="text-slate-400 leading-7">
                Building secure, scalable and optimized digital systems with
                modern technologies.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-[30px] p-7 hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <div className="text-[#646cff] text-5xl font-bold opacity-30 mb-4">
                04
              </div>

              <FaHandshake className="text-[#646cff] text-3xl mb-5" />

              <h3 className="text-xl font-semibold mb-3">Launch & Support</h3>

              <p className="text-slate-400 leading-7">
                Deploying and maintaining reliable products with continuous
                support and improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANCED WHY CHOOSE US */}
      <section className="px-6 pb-28">
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
            <div className="inline-flex px-4 py-2 items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-300 mb-5">
              <RiQuestionFill className="text-[#646cff] text-[1rem]" /> Why
              Choose Sifat Tech
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Digital Excellence
              <span className="text-[#646cff] block">With Real Impact</span>
            </h2>

            <p className="text-slate-400 mt-6 leading-8">
              We deliver more than technology. Our focus is on creating digital
              products that combine performance, security and business value.
            </p>

            {/* Features */}
            <div className="space-y-5 mt-8">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-[#646cff]" />
                <span className="text-slate-300">Modern Technology Stack</span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-[#646cff]" />
                <span className="text-slate-300">Agile & Fast Delivery</span>
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

      {/* STATS SECTION */}
      <section className="px-6 pb-24">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-[30px] p-8 text-center hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <FaLaptopCode className="text-[#646cff] text-3xl mx-auto mb-4" />
              <h3 className="text-4xl font-bold">120+</h3>
              <p className="text-slate-400 mt-2">Projects Delivered</p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-[30px] p-8 text-center hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <FaUsers className="text-[#646cff] text-3xl mx-auto mb-4" />
              <h3 className="text-4xl font-bold">80+</h3>
              <p className="text-slate-400 mt-2">Happy Clients</p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-[30px] p-8 text-center hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <FaRocket className="text-[#646cff] text-3xl mx-auto mb-4" />
              <h3 className="text-4xl font-bold">3+</h3>
              <p className="text-slate-400 mt-2">Years Experience</p>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-[30px] p-8 text-center hover:border-[#646cff] transition-all duration-300 hover:-translate-y-2">
              <FaHeadset className="text-[#646cff] text-3xl mx-auto mb-4" />
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="text-slate-400 mt-2">Support Available</p>
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
              <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-sm text-slate-300 mb-6">
                <FaGlobe className="text-[#646cff]" />
                Ready To Grow?
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Let's Build Your
                <span className="text-[#646cff] block mt-2">
                  Next Digital Product
                </span>
              </h2>

              <p className="text-slate-400 mt-6 max-w-[720px] mx-auto leading-8">
                Whether you need a modern website, scalable application or
                premium digital experience, Sifat Tech is ready to turn your
                ideas into reality.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button className="inline-flex items-center gap-2 cursor-pointer bg-[#646cff] hover:bg-[#5563ff] transition-all duration-300 px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-[#646cff]/40">
                  Start Project
                  <FaArrowRight />
                </button>

                <button className="inline-flex items-center cursor-pointer gap-2 border border-slate-700 bg-slate-900 hover:border-[#646cff] transition-all duration-300 px-8 py-4 rounded-xl font-medium">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
