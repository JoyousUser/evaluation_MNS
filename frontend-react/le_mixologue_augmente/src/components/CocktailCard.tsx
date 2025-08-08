import type { FC } from 'react';
import type { Cocktail } from '../services/api';

interface CocktailCardProps {
  cocktail: Cocktail;
  onClick?: () => void;
  showFullDetails?: boolean;
}

const CocktailCard: FC<CocktailCardProps> = ({ cocktail, onClick, showFullDetails = false }) => {
  const ingredients = cocktail.ingredients.split('\n').filter(ing => ing.trim() !== '');
  
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border border-amber-900/30 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer
        ${showFullDetails 
          ? 'bg-gradient-to-b from-amber-950/80 to-gray-900/80 backdrop-blur-sm shadow-[0_0_25px_rgba(212,175,55,0.15)]' 
          : 'bg-gradient-to-b from-amber-950/50 to-gray-900/50 hover:bg-gradient-to-b hover:from-amber-950/60 hover:to-gray-900/60'}`}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/5 to-transparent" />
      </div>
      
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-amber-900/10 rounded-bl-full -z-10" />
      
      <div className="p-4">
        {/* Cocktail Name */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-amber-200">{cocktail.name}</h2>
          <span className="bg-amber-950/70 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-medium border border-amber-900/30">
            {new Date(cocktail.created_at).toLocaleDateString()}
          </span>
        </div>
        
        {/* Glass icon */}
        <div className="flex items-center mb-3 text-amber-400/80">
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 4a1 1 0 012 0v10.557a3.998 3.998 0 01-2 0V4zm2 13.443a4 4 0 01-4-4.443h8a4 4 0 01-4 4.443z" clipRule="evenodd" />
            </svg>
          </span>
          <span className="text-amber-200/60 text-sm">Signature creation</span>
        </div>
        
        {/* Ingredients */}
        <div className="mb-3">
          <h3 className="font-bold text-amber-300 mb-1.5 flex items-center">
            <span className="mr-1.5 text-xs">🍸</span> Ingredients
          </h3>
          <ul className="list-disc pl-4 space-y-0.5 text-amber-200/80 text-sm">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1 h-1 bg-amber-400 rounded-full mr-1.5"></span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Description */}
        {showFullDetails ? (
          <div className="mb-4">
            <h3 className="font-bold text-amber-300 mb-1.5">Description</h3>
            <p className="text-amber-200/80 text-sm leading-relaxed">{cocktail.description}</p>
          </div>
        ) : (
          <p className="text-amber-200/70 text-sm line-clamp-2 mb-3">{cocktail.description}</p>
        )}
        
        {/* Music Ambiance */}
        <div className="flex items-center text-amber-200/60 text-sm mb-3">
          <span className="mr-1.5 text-amber-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </span>
          <span className="text-xs">{cocktail.music_ambiance}</span>
        </div>
        
        {/* Call to action */}
        {showFullDetails ? (
          <div className="pt-3 border-t border-amber-900/30">
            <div className="flex justify-between items-center">
              <button 
                className="bg-amber-600 text-gray-900 text-sm font-medium py-1.5 px-3.5 rounded-lg transition hover:shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                onClick={(e) => {
                  e.stopPropagation();
                  window.print();
                }}
              >
                <span className="mr-1.5">🖨️</span> Print Recipe
              </button>
              <a 
                href="https://open.spotify.com/search" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 text-sm font-medium flex items-center"
              >
                Listen <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="text-right">
            <span className="text-amber-300 text-sm font-medium hover:text-amber-200">
              View details →
            </span>
          </div>
        )}
      </div>
      
      {/* Decorative bottom */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />
    </div>
  );
};

export default CocktailCard;