import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, X } from 'lucide-react';

const placeholders = [
  "Search for 'sad cat'...",
  "Search for 'futuristic city'...",
  "Search for 'awkward moment'...",
  "Search for 'victory'...",
  "Search for 'confused dog'..."
];

const SearchBar = ({ onSearch, isSearching }) => {
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  
  // ✨ MORE ROBUST TYPEWRITER LOGIC
  useEffect(() => {
    let currentIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentText = placeholders[currentIdx];
      
      if (isDeleting) {
        setPlaceholder(currentText.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setPlaceholder(currentText.substring(0, charIdx + 1));
        charIdx++;
      }

      let typeSpeed = isDeleting ? 40 : 80; // Faster delete, natural typing

      if (!isDeleting && charIdx === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of sentence
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        currentIdx = (currentIdx + 1) % placeholders.length;
        typeSpeed = 500; // Pause before next sentence
      }

      timeoutId = setTimeout(type, typeSpeed);
    };

    type();
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 relative z-20 px-4">
      
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center p-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:border-violet-500/30 transition-all group"
      >
        
        <div className="pl-4 pr-2 text-slate-400 group-focus-within:text-violet-400 transition-colors">
          <Search className="w-5 h-5" />
        </div>

        {/* Input with Dynamic Placeholder */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder} 
          className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-base sm:text-lg py-2 w-full"
        />

        {/* Actions */}
        <div className="flex items-center gap-2 pr-1 shrink-0">
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            disabled={isSearching}
            className="px-4 sm:px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
          </button>
        </div>
      </form>

      <p className="text-center text-slate-500 text-xs mt-4 font-medium tracking-wide opacity-60 hidden sm:block">
        Pro Tip: Describe the <span className="text-violet-400">emotion</span>, not just the file.
      </p>
    </div>
  );
};

export default SearchBar;