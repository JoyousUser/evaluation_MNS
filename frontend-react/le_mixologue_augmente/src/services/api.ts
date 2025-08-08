// here we make a simple service that fetches from the backend API's endpoints, we define the base url as will be useful when built with npl build
const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface Cocktail {
  id: number;
  name: string;
  ingredients: string;
  description: string;
  music_ambiance: string;
  image_prompt: string;
  user_input: string;
  created_at: string;
}

export interface GenerateCocktailRequest {
  user_input: string;
}

{/* Generate a cocktail based on user input */}
export const generateCocktail = async (request: GenerateCocktailRequest): Promise<Cocktail> => {
  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
    credentials: 'include',
  });
  // Check if the response is ok, if not throw an error
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate cocktail');
  }

  return response.json();
};

// Fetch cocktail history
export const getCocktailHistory = async (): Promise<Cocktail[]> => {
  const response = await fetch(`${API_BASE_URL}/api/history`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cocktail history');
  }

  const data = await response.json();
  return data.cocktails;
};
// Fetch a specific cocktail by ID
export const getCocktailById = async (id: number): Promise<Cocktail> => {
  const response = await fetch(`${API_BASE_URL}/api/cocktails/${id}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Cocktail not found');
  }

  return response.json();
};

export const apiLogin = async (password: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }
}