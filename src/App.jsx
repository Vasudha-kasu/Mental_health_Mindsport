import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Games from "./pages/Games"
import GameDetail from "./pages/GameDetail"
import Settings from "./pages/Settings"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

        <Navbar />

        <main className="min-h-screen text-gray-900 dark:text-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:gameId" element={<GameDetail />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  )
}

export default App