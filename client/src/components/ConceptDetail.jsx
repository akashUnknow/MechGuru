// File: src/components/ConceptDetail.jsx
import React from 'react';
import { Book, Calculator, CheckCircle } from 'lucide-react';
import Navbar from './Navbar';

const ConceptDetail = ({ conceptId, designConcepts, setActiveSection, setActiveCalculator }) => {
  const concept = designConcepts.find(c => c.id === conceptId);
  
  return (
    <>
    <Navbar/> 
    <div className="space-y-6 px-10 mt-5">
      
      <button 
        onClick={() => setActiveSection('home')}
        className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
      >
        ← Back to Home
      </button>

      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            {concept.icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{concept.title}</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Book className="w-5 h-5 text-blue-600" />
            Key Concepts
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {concept.concepts.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-gray-50 p-3 rounded">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setActiveCalculator(conceptId)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Open Calculator
        </button>
      </div>
    </div>
    </>
  );
};

export default ConceptDetail;