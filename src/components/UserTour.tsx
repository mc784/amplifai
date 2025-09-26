'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface TourStep {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="search"]',
    title: 'Smart Search',
    content: 'Ask questions in natural language like "How did teams reduce customer support tickets?" Our AI will find relevant lessons.',
    position: 'bottom'
  },
  {
    target: '[data-tour="share"]',
    title: 'Share Your Success',
    content: 'Upload documents or type your story directly. Our AI will extract the key lessons and format them for easy discovery.',
    position: 'bottom'
  },
  {
    target: '[data-tour="lessons"]',
    title: 'Discover Lessons',
    content: 'Browse real AI implementation stories from Amazon teams. Each lesson shows the problem, solution, and measurable impact.',
    position: 'top'
  }
];

export default function UserTour() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  useEffect(() => {
    const tourSeen = localStorage.getItem('amplifai-tour-seen');
    if (!tourSeen) {
      setTimeout(() => setIsActive(true), 1000);
    } else {
      setHasSeenTour(true);
    }
  }, []);

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTour = () => {
    setIsActive(false);
    setHasSeenTour(true);
    localStorage.setItem('amplifai-tour-seen', 'true');
  };

  const restartTour = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  if (!isActive && hasSeenTour) {
    return (
      <button
        onClick={restartTour}
        className="fixed bottom-4 right-4 bg-amazon-orange text-white px-4 py-2 rounded-lg shadow-lg hover:bg-orange-600 transition-colors text-sm z-40"
      >
        Take Tour
      </button>
    );
  }

  if (!isActive) return null;

  const step = tourSteps[currentStep];
  const targetElement = document.querySelector(step.target);
  
  if (!targetElement) return null;

  const rect = targetElement.getBoundingClientRect();
  const positionStyles = {
    top: { top: rect.top - 10, left: rect.left + rect.width / 2, transform: 'translate(-50%, -100%)' },
    bottom: { top: rect.bottom + 10, left: rect.left + rect.width / 2, transform: 'translate(-50%, 0)' },
    left: { top: rect.top + rect.height / 2, left: rect.left - 10, transform: 'translate(-100%, -50%)' },
    right: { top: rect.top + rect.height / 2, left: rect.right + 10, transform: 'translate(0, -50%)' }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      
      {/* Highlight */}
      <div
        className="fixed border-2 border-amazon-orange rounded-lg z-50 pointer-events-none"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8
        }}
      />
      
      {/* Tour popup */}
      <div
        className="fixed bg-white rounded-lg shadow-xl p-6 max-w-sm z-50"
        style={positionStyles[step.position]}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-gray-900">{step.title}</h3>
          <button
            onClick={completeTour}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">{step.content}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-amazon-orange' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex space-x-2">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>
            )}
            <button
              onClick={nextStep}
              className="flex items-center px-4 py-2 bg-amazon-orange text-white rounded hover:bg-orange-600"
            >
              {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
              {currentStep < tourSteps.length - 1 && <ArrowRight className="w-4 h-4 ml-1" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}