import { FC, useState } from 'react';
import { generateCocktail } from '../services/api';
import CocktailCard from './CocktailCard';
import { Cocktail } from '../services/api';

interface CocktailFormProps {
  onCocktailGenerated?: (cocktail: Cocktail) => void;
}

const CocktailForm: FC<CocktailFormProps> = ({ onCocktailGenerated }) => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCocktail, setGeneratedCocktail] = useState<Cocktail | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      setError('Please describe your cocktail preferences');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setIsSubmitted(true);
    
    try {
      const cocktail = await generateCocktail({ user_input: userInput });
      setGeneratedCocktail(cocktail);
      
      if (onCocktailGenerated) {
        onCocktailGenerated(cocktail);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate cocktail');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setUserInput(suggestion);
    setIsSubmitted(false);
    setGeneratedCocktail(null);
  };

  const handleNewCocktail = () => {
    setUserInput('');
    setIsSubmitted(false);
    setGeneratedCocktail(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-50 mb-2">
          Le Mixologue Augmenté
        </h1>
        <p className="text-amber-200/80 text-sm">Your AI-powered cocktail creator</p>
      </div>

      {!isSubmitted || !generatedCocktail ? (
        <div className="bg-gradient-to-b from-amber-950/60 to-gray-900/60 rounded-xl p-5 border border-amber-900/30 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="user_input" className="block text-amber-200 font-medium mb-1.5 text-sm">
                What's your cocktail mood today?
              </label>
              <textarea
                id="user_input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ex: I want something fruity with gin, not too sweet..."
                className="w-full px-3 py-2.5 bg-amber-950/50 border border-amber-900/40 rounded-lg focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600/50 transition min-h-[100px] text-amber-200 placeholder:text-amber-200/50 text-sm"
                disabled={isLoading}
              />
              {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div 
                className="bg-amber-950/50 p-3 rounded-lg border border-amber-900/30 hover:border-amber-600/30 cursor-pointer transition text-center"
                onClick={() => handleSuggestionClick("I want something fruity with gin, not too sweet")}
              >
                <h3 className="font-bold text-amber-200 text-sm mb-1">Fruity & Fresh</h3>
                <p className="text-amber-200/60 text-xs">Try: Gin-based, refreshing</p>
              </div>
              <div 
                className="bg-amber-950/50 p-3 rounded-lg border border-amber-900/30 hover:border-amber-600/30 cursor-pointer transition text-center"
                onClick={() => handleSuggestionClick("A refreshing mocktail for a sunny afternoon")}
              >
                <h3 className="font-bold text-amber-200 text-sm mb-1">Non-Alcoholic</h3>
                <p className="text-amber-200/60 text-xs">Try: Sunny afternoon refresher</p>
              </div>
              <div 
                className="bg-amber-950/50 p-3 rounded-lg border border-amber-900/30 hover:border-amber-600/30 cursor-pointer transition text-center"
                onClick={() => handleSuggestionClick("Signature cocktail for a bachelor party")}
              >
                <h3 className="font-bold text-amber-200 text-sm mb-1">Special Occasion</h3>
                <p className="text-amber-200/60 text-xs">Try: Bachelor party signature</p>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-amber-600 text-gray-900 font-medium py-2.5 px-6 rounded-lg text-base transition transform
                  ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]'}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">✨</span> Generate Cocktail
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-amber-200">Your Custom Cocktail</h2>
            <button
              onClick={handleNewCocktail}
              className="text-amber-300 hover:text-amber-200 text-sm font-medium flex items-center"
            >
              <span className="mr-1.5">←</span> Create Another
            </button>
          </div>
          
          <CocktailCard cocktail={generatedCocktail} showFullDetails={true} />
          
          <div className="bg-gradient-to-b from-amber-950/50 to-gray-900/50 rounded-xl p-4 border border-amber-900/30">
            <h3 className="text-sm font-bold text-amber-200 mb-2.5">Ready to enjoy?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button className="bg-amber-600 text-gray-900 text-sm font-medium py-2 rounded-lg transition hover:shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                <span className="mr-2">📱</span> Save
              </button>
              <button className="bg-amber-950/50 border border-amber-900/40 text-amber-200 text-sm font-medium py-2 rounded-lg transition">
                <span className="mr-2">🖨️</span> Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CocktailForm;