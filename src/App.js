import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import SubcategoriesPage from "./pages/SubcategoriesPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="navbar">
          <div className="navbar-logo">MyApp</div>
          <nav>
            <ul className="navbar-links">
              <li><a href="/">Categories</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CategoriesPage />} />
            <Route path="/subcategory/:categoryId" element={<SubcategoriesPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2025 MyApp. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;


