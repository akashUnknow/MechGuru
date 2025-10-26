// File: src/components/Home.jsx
import React from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';

const Home = ({ designConcepts, setActiveSection }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Machine Design Portal</h1>
        <p className="text-blue-100">Master mechanical design concepts with interactive tools and calculators</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {designConcepts.map(concept => (
          <div 
            key={concept.id}
            className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition cursor-pointer"
            onClick={() => setActiveSection(concept.id)}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                {concept.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{concept.title}</h3>
            </div>
            <ul className="space-y-2">
              {concept.concepts.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="mt-4 text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Explore <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;