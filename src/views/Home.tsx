import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Edit, Zap, Rocket, Award } from "lucide-react";
import { PriceCards } from "../components";
import { stripeBadge } from "../assets/index";

function Home() {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      className="flex-grow min-h-screen relative overflow-hidden">
      <header className="relative pt-24 pb-24 overflow-hidden bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 items-center gap-16">
            <div className="space-y-6 text-left">
              <h1 className="bg-accentBlue/10 inline-block px-4 py-2 rounded-full text-[#3943B7] border border-[#3943B7]/30 text-xs tracking-wide">
                Sign up, get a free one on us! <br />
              </h1>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                <span className="relative inline-block px-4 py-1">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#3943B7] via-purple-500 to-purple-600 transform skew-y-4 scale-105 rounded-2xl blur-sm opacity-50 -z-10"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#3943B7] to-purple-600 transform -skew-x-6 rounded-lg -z-10"></span>
                  <span className="relative text-white font-bold">
                    Tailored Cover Letters.
                  </span>
                </span>{" "}
                <br />
                In Seconds
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Stop spending hours on every application. Get personalised,
                professional cover letters instantly.
              </p>

              <div className="w-xl">
                <Link to="/coverletter">
                  <button className="flex items-center  text-white px-6 py-2 rounded-lg shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 group">
                    <span className="absolute inset-0 bg-gradient-to-r from-[#3943B7] via-purple-500 to-purple-600 transform skew-y-4 scale-105 rounded-2xl blur-sm opacity-50 -z-10"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#3943B7] to-purple-600 transform -skew-x-6 rounded-lg -z-10"></span>
                    <Zap className="mr-2 group-hover:animate-pulse" />
                    Create Cover Letter
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative pt-16 mt-15 md:mt-0 md:block">
              <div className="bg-white/80 rounded-2xl shadow-2xl p-6 mt-3 transform -rotate-3 hover:rotate-0 transition-transform">
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-accentBlue/10 to-white rounded-lg p-3 flex items-center">
                    <p className="text-4xl font-bold text-accentBlue/60 pr-3">
                      1
                    </p>
                    <div className="flex-grow">
                      <p className="font-bold">Upload Resume</p>
                      <p className="text-sm text-gray-600">
                        We will scan this for your experience
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-accentBlue/10 to-white rounded-lg p-3 flex items-center">
                    <p className="text-4xl font-bold text-accentBlue/60 pr-3">
                      2
                    </p>
                    <div className="flex-grow">
                      <p className="font-bold">Paste Job Title</p>
                      <p className="text-sm text-gray-600">
                        The job title you're applying for
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-accentBlue/10 to-white rounded-lg p-3 flex items-center">
                    <p className="text-4xl font-bold text-accentBlue/60 pr-3">
                      3
                    </p>
                    <div className="flex-grow">
                      <p className="font-bold">Paste Job Company</p>
                      <p className="text-sm text-gray-600">
                        The company you're applying for
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-accentBlue/10 to-white rounded-lg p-3 flex items-center">
                    <p className="text-4xl font-bold text-accentBlue/60 pr-3">
                      4
                    </p>
                    <div className="flex-grow">
                      <p className="font-bold">Paste Job Description</p>
                      <p className="text-sm text-gray-600">
                        The full job description you're applying for
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-accentBlue/10 to-white rounded-lg p-3 flex items-center">
                    <p className="text-4xl font-bold text-accentBlue/60 pr-3">
                      5
                    </p>
                    <div className="flex-grow">
                      <p className="font-bold">Get Results</p>
                      <p className="text-sm text-gray-600">
                        Click create and get results in seconds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Streamline Your Application Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Generate, customise, and download impressive cover letters in
              minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Rocket className="w-10 h-auto text-accentBlue" />,
                title: "Rapid Generation",
                description: "Tailored cover letters, generated in seconds",
                effect: "group-hover:scale-105 group-hover:-rotate-6",
              },
              {
                icon: <Edit className="w-10 h-auto text-accentBlue" />,
                title: "Customisation",
                description: "Easily make changes with the editor",
                effect: "group-hover:scale-105 group-hover:rotate-6",
              },
              {
                icon: <Award className="w-10 h-auto text-accentBlue" />,
                title: "Download and Save",
                description: "Save for later, or download and apply!",
                effect: "group-hover:scale-105",
              },
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div
                  className={`
                  absolute inset-0 opacity-50 rounded-2xl blur-lg transition-all group-hover:opacity-80`}
                />
                <div
                  className={`
                  relative bg-white border border-gray-100 rounded-2xl p-3 text-center 
                  shadow transition-all duration-300 ${feature.effect}
                `}>
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold mb-2">Flexible Pricing Plans</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Safe and secure payments
        </p>
        <img
          src={stripeBadge}
          alt="Stripe"
          className="mt-8 mb-10 w-36 mx-auto"
        />
        <PriceCards />
      </section>
    </motion.div>
  );
}

export default Home;
