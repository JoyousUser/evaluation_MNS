import './App.css'
import Home from './pages/Home'
import type { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import HistoryPage from './pages/HistoryPage'
import Login from './pages/Login'

import CocktailDetail from './pages/CocktailDetail'

const App: FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/cocktail/:id" element={<CocktailDetail />} />
        <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
