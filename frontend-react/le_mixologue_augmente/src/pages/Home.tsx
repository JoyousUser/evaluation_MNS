import { FC } from 'react';
import CocktailForm from '../components/CocktailForm';
import { Link } from 'react-router-dom';

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-amber-50">
      {/* Bar ambiance background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-amber-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(212,175,55,0.1),transparent_20%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(212,175,55,0.05),transparent_20%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My50b3AvMS4xL25zL3N2ZyIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIj48cmVjdCB3aWR0aD0iNTAlIiBoZWlnaHQ9IjUwJSIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoNTB2NTBoLTUweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAwNSkiLz48L3N2Zz4=')] opacity-20" />
      </div>

      {/* Ambient lighting effect */}
      <div className="fixed top-0 left-1/4 w-1/2 h-16 bg-gradient-to-b from-amber-500/20 to-transparent blur-3xl z-0" />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero section - transformed into a proper bar */}
        <div className="bg-gradient-to-r from-amber-950/90 to-gray-900/90 py-12 px-6 border-y border-amber-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 inline-block p-3 bg-amber-950/50 rounded-full border border-amber-800/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-50">
              Le Mixologue Augmenté
            </h1>
            <p className="text-xl text-amber-200/80 max-w-2xl mx-auto italic">
              Where artistry meets innovation in every glass
            </p>
          </div>
        </div>

        {/* Cocktail generator - transformed into bar counter */}
        <div className="py-8 px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-b from-amber-950/70 to-gray-900/70 rounded-xl p-6 border border-amber-900/30 backdrop-blur-sm shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <CocktailForm />
          </div>
        </div>

        {/* How it works - transformed into cocktail process */}
        <div className="py-10 px-4 bg-gradient-to-b from-gray-950/50 to-black/70 border-y border-amber-900/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-amber-200 mb-8">
              The Art of Mixology
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-b from-amber-950/40 to-gray-900/40 rounded-xl p-5 border border-amber-900/30 hover:border-amber-600/30 transition-all">
                <div className="w-14 h-14 bg-amber-950/70 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-800/30">
                  <span className="text-xl text-amber-400">1</span>
                </div>
                <h3 className="text-lg font-bold text-amber-200 text-center mb-2">Share Your Palate</h3>
                <p className="text-amber-200/70 text-center text-sm">Describe what you're in the mood for - flavors, ingredients, or occasion</p>
              </div>
              
              <div className="bg-gradient-to-b from-amber-950/40 to-gray-900/40 rounded-xl p-5 border border-amber-900/30 hover:border-amber-600/30 transition-all">
                <div className="w-14 h-14 bg-amber-950/70 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-800/30">
                  <span className="text-xl text-amber-400">2</span>
                </div>
                <h3 className="text-lg font-bold text-amber-200 text-center mb-2">Crafted Creation</h3>
                <p className="text-amber-200/70 text-center text-sm">Our AI mixologist crafts a unique cocktail just for you with all the details</p>
              </div>
              
              <div className="bg-gradient-to-b from-amber-950/40 to-gray-900/40 rounded-xl p-5 border border-amber-900/30 hover:border-amber-600/30 transition-all">
                <div className="w-14 h-14 bg-amber-950/70 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-800/30">
                  <span className="text-xl text-amber-400">3</span>
                </div>
                <h3 className="text-lg font-bold text-amber-200 text-center mb-2">Savor the Moment</h3>
                <p className="text-amber-200/70 text-center text-sm">Our bar staff prepares your custom cocktail, or save it for later enjoyment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured cocktails - transformed into signature drinks display */}
        <div className="py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-amber-200 mb-2">Signature Creations</h2>
              <p className="text-amber-200/70 max-w-xl mx-auto">Discover our latest cocktail masterpieces, meticulously crafted by our AI mixologist</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-b from-amber-950/40 to-gray-900/40 rounded-xl overflow-hidden border border-amber-900/30 hover:border-amber-600/30 transition-all">
                <div className="h-36 bg-gradient-to-br from-amber-900/30 to-orange-900/20 border-b border-amber-900/30" />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-amber-200 mb-2">Golden Hour</h3>
                  <p className="text-amber-200/70 mb-4 line-clamp-2">A bourbon-based cocktail with citrus and maple syrup, perfect for transitioning from day to night.</p>
                  <Link to="/history" className="text-amber-400 hover:text-amber-300 font-medium flex items-center justify-center">
                    Explore <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-b from-amber-950/40 to-gray-900/40 rounded-xl overflow-hidden border border-amber-900/30 hover:border-amber-600/30 transition-all">
                <div className="h-36 bg-gradient-to-br from-rose-900/30 to-pink-900/20 border-b border-amber-900/30" />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-amber-200 mb-2">Berry Bliss</h3>
                  <p className="text-amber-200/70 mb-4 line-clamp-2">A refreshing gin cocktail with fresh raspberries and a hint of mint, perfect for summer afternoons.</p>
                  <Link to="/history" className="text-amber-400 hover:text-amber-300 font-medium flex items-center justify-center">
                    Explore <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-b from-amber-950/40 to-gray-900/40 rounded-xl overflow-hidden border border-amber-900/30 hover:border-amber-600/30 transition-all">
                <div className="h-36 bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border-b border-amber-900/30" />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-amber-200 mb-2">Ocean Breeze</h3>
                  <p className="text-amber-200/70 mb-4 line-clamp-2">A non-alcoholic creation with coconut water, lime, and mint, evoking memories of tropical beaches.</p>
                  <Link to="/history" className="text-amber-400 hover:text-amber-300 font-medium flex items-center justify-center">
                    Explore <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link to="/history" className="inline-block bg-amber-600 text-gray-900 font-medium py-2.5 px-6 rounded-lg transition hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                View All Creations
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer - transformed into bar footer */}
        <footer className="py-6 px-4 bg-gradient-to-b from-gray-950/50 to-black border-t border-amber-900/20">
          <div className="max-w-4xl mx-auto text-center text-amber-200/60">
            <p className="text-sm">Est. 2024 • Metz, France</p>
            <p className="mt-1 text-xs">Crafting the perfect cocktail experience through artistry and innovation</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;