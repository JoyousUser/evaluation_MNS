// src/pages/HistoryPage.tsx
import  { useEffect, useState } from 'react';
import type { FC } from 'react';
import { getCocktailHistory } from '../services/api';
import CocktailCard from '../components/CocktailCard';
import type { Cocktail } from '../services/api';

const HistoryPage: FC = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getCocktailHistory();
        setCocktails(history);
      } catch (error) {
        console.error('Failed to fetch cocktail history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleCocktailClick = (cocktail: Cocktail) => {
    setSelectedCocktail(cocktail);
  };

  const handleCloseDetails = () => {
    setSelectedCocktail(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cocktail history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cocktail History</h1>
          <p className="text-gray-600">Browse your previously generated cocktail creations</p>
        </div>

        {cocktails.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🍸</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No cocktails created yet</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first custom cocktail to get started on your mixology journey
            </p>
            <a 
              href="/" 
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-lg transition"
            >
              Create Your First Cocktail
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cocktails.map((cocktail) => (
              <CocktailCard 
                key={cocktail.id} 
                cocktail={cocktail}
                onClick={() => handleCocktailClick(cocktail)}
              />
            ))}
          </div>
        )}

        {selectedCocktail && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-amber-800">{selectedCocktail.name}</h2>
                  <button
                    onClick={handleCloseDetails}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <CocktailCard cocktail={selectedCocktail} showFullDetails={true} />
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={handleCloseDetails}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    className="px-4 py-2 bg-amber-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-amber-700"
                  >
                    Save to Favorites {/* Placeholder for future functionality or maybe not */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;