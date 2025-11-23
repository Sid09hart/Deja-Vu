import { useState } from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import { fetchMemes } from '@/api/axios';

// Components
import Navbar from '@/components/Navbar';
import UploadModal from '@/components/UploadModal';
import SearchBar from '@/components/SearchBar';
import HowItWorks from '@/components/HowItWorks';
import MemeCard from '@/components/MemeCard';
import FloatingShapes from '@/components/FloatingShapes';
import Footer from '@/components/Footer';

function App() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    setIsSearching(true);
    setHasSearched(true);
    try {
      const data = await fetchMemes(query);
      setResults(data);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Responsive Breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1280: 4,
    1024: 3,
    768: 2,
    500: 1 
  };

  return (
    // ✨ FIXED: Removed 'pb-20' here to eliminate the bottom gap
    <div className="min-h-screen relative selection:bg-violet-500/30 flex flex-col overflow-x-hidden">
      
      <FloatingShapes />
      <Navbar onOpenUpload={() => setIsUploadOpen(true)} />

      <main className="flex-grow pt-28 sm:pt-36 px-4 max-w-7xl mx-auto w-full z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-slate-950/90 blur-3xl -z-20 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl -z-10" />

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 drop-shadow-2xl relative z-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              The Semantic
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400">
              Meme Engine.
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed px-4 font-medium relative z-10">
            Stop manually tagging. Start finding. <br className="hidden sm:block"/>
            Powered by <span className="text-slate-200 font-bold">OpenAI CLIP</span> vector embeddings.
          </p>
        </div>

        {/* Search Interaction */}
        <SearchBar onSearch={handleSearch} isSearching={isSearching} />

        {/* Content Switcher */}
        {!hasSearched ? (
          <div className="relative z-10">
             <HowItWorks />
          </div>
        ) : (
          <div className="mt-16 sm:mt-24 min-h-[60vh] animate-in fade-in duration-700 slide-in-from-bottom-10 relative z-10">
            {results.length > 0 ? (
              <>
                {/* Enhanced Results Header */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-20 flex flex-wrap items-center justify-between mb-8 px-6 py-6 bg-slate-900/80 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 opacity-50" />

                  <div>
                    <h3 className="text-2xl sm:text-3xl text-white font-extrabold flex items-center gap-3 tracking-tight">
                      Found It! 
                      <span className="text-2xl animate-bounce">🎉</span>
                    </h3>
                    <p className="text-slate-300 text-sm mt-2 font-medium">
                      AI successfully identified <span className="text-violet-400 font-bold">{results.length}</span> matches.
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => setIsUploadOpen(true)}
                    className="mt-4 sm:mt-0 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95"
                  >
                    Not the vibe? Upload new.
                  </button>
                </motion.div>

                {/* The Grid */}
                <div className="pb-20"> 
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex w-auto -ml-6"
                    columnClassName="pl-6 bg-clip-padding"
                  >
                    {results.map((meme, index) => (
                      <MemeCard key={meme._id} meme={meme} index={index} />
                    ))}
                  </Masonry>
                </div>
              </>
            ) : (
              /* Empty State */
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center mt-20 bg-slate-900/40 border border-white/5 p-12 rounded-3xl max-w-lg mx-auto backdrop-blur-md shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent pointer-events-none" />
                
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 mb-6 relative z-10 border border-white/10 shadow-inner">
                  <span className="text-4xl filter drop-shadow-lg">🤔</span>
                </div>
                
                <h3 className="text-2xl text-white font-bold mb-3 relative z-10">No matches found.</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-xs mx-auto relative z-10">
                  Our AI scanned the vault but couldn't find that specific vibe. Try searching for objects instead.
                </p>
                
                <button 
                  onClick={() => setIsUploadOpen(true)}
                  className="relative z-10 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-3 rounded-full font-bold text-sm transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5"
                >
                  Upload a New Meme
                </button>
              </motion.div>
            )}
          </div>
        )}

      </main>

      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
      />

      {/* ✨ FIXED: Removed the wrapper div to allow Footer to sit flush at the bottom */}
      <Footer />
    </div>
  );
}

export default App;