import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Menu, X, ArrowRight } from 'lucide-react';

export const PublicNavbar = () => {
  const { currentView, navigateTo } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'About Us', view: 'about' },
    { label: 'Courses', view: 'courses' },
    { label: 'Gallery', view: 'gallery' },
    { label: 'Placements', view: 'placements' },
    { label: 'Contact Us', view: 'contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-ivory-200 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-lg bg-forest-800 text-ivory-50 flex items-center justify-center shadow-md group-hover:bg-forest-900 transition-colors">
              <GraduationCap className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xl tracking-tight text-forest-950">NEXUS</span>
                <span className="text-xs uppercase font-semibold tracking-widest text-gold-600 bg-gold-50 px-1.5 py-0.5 rounded border border-gold-200">LMS</span>
              </div>
              <p className="text-[11px] text-charcoal-500 font-medium tracking-wide">Applied Engineering & Systems</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => navigateTo(link.view)}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-forest-800 bg-forest-50 font-semibold'
                      : 'text-charcoal-700 hover:text-forest-900 hover:bg-ivory-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => navigateTo('login')}
              className="text-sm font-medium text-forest-800 hover:text-forest-900 px-3.5 py-2 rounded-md hover:bg-forest-50 transition-colors"
            >
              Sign In
            </button>

            <button
              onClick={() => navigateTo('signup')}
              className="bg-forest-800 hover:bg-forest-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              Register Now
              <ArrowRight className="w-4 h-4 text-gold-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal-700 hover:text-forest-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-ivory-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => {
                navigateTo(link.view);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${
                currentView === link.view
                  ? 'bg-forest-50 text-forest-900 font-semibold'
                  : 'text-charcoal-700 hover:bg-ivory-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-ivory-200 flex flex-col gap-2">
            <button
              onClick={() => {
                navigateTo('login');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 rounded-lg border border-forest-800 text-forest-800 font-medium"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                navigateTo('signup');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 rounded-lg bg-forest-800 text-white font-medium shadow-sm"
            >
              Register Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
