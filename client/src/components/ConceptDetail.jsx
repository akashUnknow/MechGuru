import React, { useEffect } from 'react';
import { Book, Calculator, CheckCircle, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const ConceptDetail = ({ designConcepts }) => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const concept = designConcepts.find((c) => c.id === conceptId);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [conceptId]);

  // ✅ Error Fallback
  if (!concept) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-4">
          Concept not found
        </h2>
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg 
          font-semibold hover:from-orange-600 hover:to-orange-700 hover:scale-105 transition-all"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div
      className="space-y-4 sm:space-y-4 lg:space-y-4 px-4 sm:px-6 md:px-8 
      max-w-6xl mx-auto animate-fadeIn"
    >
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate('/')}
        className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2 
        hover:gap-3 transition-all bg-white px-2 py-2 rounded-lg shadow-md 
        border border-orange-100"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      {/* 🧠 Concept Header */}
      <div
        className="bg-white/90 backdrop-blur border-2 border-slate-200 
        rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl 
        hover:shadow-orange-200/50 transition-all"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-100 to-orange-100 p-4 rounded-xl text-blue-700">
            {concept.icon}
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold 
            bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent"
          >
            {concept.title}
          </h2>
        </div>

        {/* 📘 Key Concepts Section */}
        <div className="mb-10">
          <h3
            className="text-xl sm:text-2xl font-semibold mb-5 flex items-center gap-2 
            text-slate-800"
          >
            <Book className="w-6 h-6 text-orange-500" />
            Key Concepts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {concept.concepts.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-gradient-to-br from-slate-50 to-blue-50 
                p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-orange-300 
                transition-all duration-300 hover:shadow-md"
              >
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 font-medium text-sm sm:text-base">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 🧮 Calculator Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate(`/calculator/${conceptId}`)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white 
            px-8 sm:px-10 py-4 sm:py-5 rounded-2xl 
            font-semibold text-lg hover:from-orange-600 hover:to-orange-700 
            hover:scale-105 hover:shadow-2xl active:scale-95
            transition-all duration-300 flex items-center gap-3 
            border border-orange-400/30 w-full sm:w-auto justify-center"
          >
            <Calculator className="w-6 h-6" />
            Open Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetail;
