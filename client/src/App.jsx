// File: src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import ConceptDetail from './components/ConceptDetail';
import CalculatorView from './components/CalculatorView';
import Login from './components/Login';
import GetStarted from './components/GetStarted';
import { designConcepts } from './data/designConcepts';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home designConcepts={designConcepts} />} />
        <Route path="concept/:conceptId" element={<ConceptDetail designConcepts={designConcepts} />} />
        <Route path="calculator/:calculatorType" element={<CalculatorView />} />
        <Route path="login" element={<Login />} />
        <Route path="getStarted" element={<GetStarted />} />
      </Route>
    </Routes>
  );
};

export default App;