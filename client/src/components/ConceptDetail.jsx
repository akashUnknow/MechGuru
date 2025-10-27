// File: src/components/ConceptDetail.jsx
import React from 'react';
import { Book, Calculator, CheckCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const ConceptDetail = ({ designConcepts }) => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const concept = designConcepts.find(c => c.id === conceptId);
  
  if (!concept) {
    return <div>Concept not found</div>;
  }

  return (
    <div className="space-y-6">
      <button 
        onClick={() => navigate('/')}
        className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2 
          hover:gap-3 transition-all bg-white px-4 py-2 rounded-lg shadow-md"
      >
        ← Back to Home
      </button>

      <div className="bg-white/90 backdrop-blur border-2 border-slate-200 rounded-xl p-8 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-100 to-orange-100 p-4 rounded-xl text-blue-700">
            {concept.icon}
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent">
            {concept.title}
          </h2>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-800">
            <Book className="w-6 h-6 text-orange-500" />
            Key Concepts
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {concept.concepts.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-gradient-to-br from-slate-50 to-blue-50 p-4 rounded-lg 
                border border-slate-200 hover:border-orange-300 transition-colors">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate(`/calculator/${conceptId}`)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl 
            font-semibold hover:from-orange-600 hover:to-orange-700 
            hover:scale-105 hover:shadow-2xl
            transition-all duration-300 flex items-center gap-3 border border-orange-400/30"
        >
          <Calculator className="w-6 h-6" />
          Open Calculator
        </button>
      </div>
    </div>
  );
};

export default ConceptDetail;