// File: src/data/designConcepts.js
import React from 'react';
import { Cog, Layers, Settings, Wrench ,Disc} from 'lucide-react';

export const designConcepts = [
  {
    id: 'shafts',
    title: 'Shaft Design',
    icon: <Cog className="w-6 h-6" />,
    concepts: [
      'Torsional shear stress calculation',
      'Bending moment analysis',
      'Combined stress theory',
      'Shaft material selection',
      'Key and keyway design',
      'Critical speed analysis'
    ]
  },
   {
    id: 'brakes',
    title: 'Brake Analysis',
    icon: <Disc className="w-6 h-6" />,
    concepts: [
      'Energy absorbed during braking',
      'Braking torque and power calculation',
      'Thermal analysis of brake drum/disc',
      'Coefficient of friction and material selection',
      'Actuating force and pedal ratio',
      'Design of band, shoe, and disc brakes'
    ]
  },
  {
    id: 'belts',
    title: 'Belt & Chain Drives',
    icon: <Layers className="w-6 h-6" />,
    concepts: [
      'Velocity ratio calculation',
      'Power transmission capacity',
      'Belt tension analysis',
      'Center distance determination',
      'Belt length calculation',
      'Pulley design principles'
    ]
  },
  {
    id: 'gears',
    title: 'Gear Design',
    icon: <Settings className="w-6 h-6" />,
    concepts: [
      'Module and pitch calculation',
      'Gear ratio determination',
      'Lewis equation for beam strength',
      'Contact stress analysis',
      'Gear tooth profile',
      'Backlash requirements'
    ]
  },
  {
    id: 'bearings',
    title: 'Bearings',
    icon: <Wrench className="w-6 h-6" />,
    concepts: [
      'Load capacity calculation',
      'L10 life determination',
      'Bearing selection criteria',
      'Lubrication requirements',
      'Mounting and fitting',
      'Thermal considerations'
    ]
  }
];