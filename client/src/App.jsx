// File: src/App.jsx
import React, { useState } from 'react';
import Home from './components/Home';
import ConceptDetail from './components/ConceptDetail';
import CalculatorView from './components/CalculatorView';
import { designConcepts } from './data/designConcepts';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeCalculator, setActiveCalculator] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {activeSection === 'home' && (
          <Home 
            designConcepts={designConcepts}
            setActiveSection={setActiveSection}
          />
        )}
        
        {activeSection !== 'home' && !activeCalculator && (
          <ConceptDetail 
            conceptId={activeSection}
            designConcepts={designConcepts}
            setActiveSection={setActiveSection}
            setActiveCalculator={setActiveCalculator}
          />
        )}
        
        {activeCalculator && (
          <CalculatorView 
            calculatorType={activeCalculator}
            setActiveCalculator={setActiveCalculator}
          />
        )}
      </div>
    </div>
  );
};

export default App;