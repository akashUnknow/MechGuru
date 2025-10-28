// File: src/components/Home.jsx
import { CheckCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = ({ designConcepts }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 text-white px-6 py-10 sm:px-10 sm:py-12 md:py-16 rounded-2xl shadow-2xl border-2 border-orange-500/30 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 flex flex-col md:flex-row items-center justify-center md:justify-start gap-3">
          <span className="text-orange-400 drop-shadow-md">Machine Design</span>
          <span className="text-white">Portal</span>
        </h1>
        <p className="text-blue-100 text-base sm:text-lg md:text-xl max-w-3xl mx-auto md:mx-0 leading-relaxed">
          Master mechanical design concepts with interactive tools, calculators,
          and visual simulations to boost your engineering skills.
        </p>
      </section>

      {/* Concepts Grid */}
      <section className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {designConcepts.map((concept) => (
          <div
            key={concept.id}
            onClick={() => navigate(`/concept/${concept.id}`)}
            className="bg-white/90 backdrop-blur-md border-2 border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-orange-500 hover:shadow-2xl hover:-translate-y-1.5 
              transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-orange-100 p-4 sm:p-5 rounded-xl text-blue-700 group-hover:scale-110 transition-transform duration-300">
                {concept.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
                {concept.title}
              </h3>
            </div>

            {/* Concept List */}
            <ul className="space-y-2 mb-4">
              {concept.concepts.slice(0, 3).map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm sm:text-base text-slate-600"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Explore Button */}
            <button className="mt-auto text-orange-600 font-semibold flex items-center gap-1 group-hover:gap-3 transition-all text-sm sm:text-base">
              Explore <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
