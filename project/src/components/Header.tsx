import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-md border-b border-red-500/20' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            JN
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="nav-link" aria-label="Go to Home" tabIndex={0}>Home</button>
            <button onClick={() => scrollToSection('about')} className="nav-link" aria-label="Go to About" tabIndex={0}>About</button>
            <button onClick={() => scrollToSection('skills')} className="nav-link" aria-label="Go to Skills" tabIndex={0}>Skills</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link" aria-label="Go to Contact" tabIndex={0}>Contact</button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              tabIndex={0}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 glass-card rounded-lg p-4" role="menu" aria-label="Mobile Navigation Menu">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className="nav-link text-left" aria-label="Go to Home" tabIndex={0}>Home</button>
              <button onClick={() => scrollToSection('about')} className="nav-link text-left" aria-label="Go to About" tabIndex={0}>About</button>
              <button onClick={() => scrollToSection('skills')} className="nav-link text-left" aria-label="Go to Skills" tabIndex={0}>Skills</button>
              <button onClick={() => scrollToSection('contact')} className="nav-link text-left" aria-label="Go to Contact" tabIndex={0}>Contact</button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="mt-2 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition self-start"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                tabIndex={0}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;