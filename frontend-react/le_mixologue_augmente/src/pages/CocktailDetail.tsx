import {  useEffect, useState } from 'react';
import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import CocktailCard from '../components/CocktailCard';
import { getCocktailById } from '../services/api';
import type{ Cocktail } from '../services/api';

const CocktailDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        setIsLoading(true);
        const data = await getCocktailById(parseInt(id || '0'));
        setCocktail(data);
      } catch (err) {
        setError('Failed to load cocktail details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCocktail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-200/70">Loading cocktail details...</p>
        </div>
      </div>
    );
  }

  if (error || !cocktail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center bg-amber-950/50 p-6 rounded-xl border border-amber-900/30 max-w-md">
          <h2 className="text-xl font-bold text-amber-200 mb-2">Error</h2>
          <p className="text-amber-200/70 mb-4">{error || 'Cocktail not found'}</p>
          <a 
            href="/" 
            className="text-amber-400 hover:text-amber-300 font-medium"
          >
            ← Back to Generator
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-amber-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <a 
          href="/" 
          className="text-amber-400 hover:text-amber-300 font-medium flex items-center mb-6"
        >
          <span className="mr-2">←</span> Back to Generator
        </a>
        
        <CocktailCard cocktail={cocktail} showFullDetails={true} />
        
        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-amber-600 text-gray-900 font-medium py-2.5 px-5 rounded-lg transition hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <span className="mr-2">📱</span> Save for Later
          </button>
          <button 
            className="bg-amber-950/50 border border-amber-900/40 text-amber-200 font-medium py-2.5 px-5 rounded-lg transition"
            onClick={() => window.print()}
          >
            <span className="mr-2">🖨️</span> Print Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;