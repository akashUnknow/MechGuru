// File: src/components/Home.jsx
import { CheckCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = ({ designConcepts }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 text-white p-10 rounded-2xl shadow-2xl border-2 border-orange-500/30">
        <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
          <span className="text-orange-400">Machine Design</span> Portal
        </h1>
        <p className="text-blue-100 text-lg">Master mechanical design concepts with interactive tools and calculators</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {designConcepts.map(concept => (
          <div 
            key={concept.id}
            className="bg-white/90 backdrop-blur border-2 border-slate-200 rounded-xl p-6 
              hover:border-orange-500 hover:shadow-2xl hover:-translate-y-1
              transition-all duration-300 cursor-pointer group"
            onClick={() => navigate(`/concept/${concept.id}`)}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-orange-100 p-4 rounded-xl text-blue-700 group-hover:scale-110 transition-transform">
                {concept.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                {concept.title}
              </h3>
            </div>
            
            <ul className="space-y-2 mb-4">
              {concept.concepts.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <button className="mt-4 text-orange-600 font-semibold flex items-center gap-1 group-hover:gap-3 transition-all">
              Explore <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;