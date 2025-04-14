import React, { useState } from 'react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scheduleItems = [
    { time: '08:00', activity: 'Matemática' },
    { time: '10:00', activity: 'História' },
    { time: '12:00', activity: 'Almoço' },
    { time: '14:00', activity: 'Ciências' },
    { time: '16:00', activity: 'Inglês' },
  ];

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">StudyMind</span>
            </div>
            <div className="hidden md:flex space-x-4 items-center">
              <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Sobre</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Contato</a>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                type="button"
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900">Sobre</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900">Contato</a>
            </div>
          </div>
        )}
      </nav>

      {/* Cronograma de Estudos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-4">Cronograma de Estudos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scheduleItems.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold">{item.time}</h3>
              <p className="text-gray-600">{item.activity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
