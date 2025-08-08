import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLogin } from '../services/api';

const Login: FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await apiLogin(password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-b from-amber-950/70 to-gray-900/70 rounded-xl p-6 border border-amber-900/30 backdrop-blur-sm">
        <div className="text-center mb-6">
          <div className="mb-4 inline-block p-3 bg-amber-950/50 rounded-full border border-amber-800/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-50">
            Admin Login
          </h1>
          <p className="text-amber-200/80 text-sm mt-1">Enter password to access admin panel</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-amber-200 font-medium mb-1.5 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-amber-950/50 border border-amber-900/40 rounded-lg focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600/50 transition text-amber-200 text-sm"
              disabled={isLoading}
            />
            {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-amber-600 text-gray-900 font-medium py-2.5 rounded-lg text-base transition
              ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]'}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;