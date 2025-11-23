import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, Loader2, CheckCircle, AlertCircle } from 'lucide-react'; // ✨ Added AlertCircle
import { uploadMeme } from '@/api/axios';

const UploadModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('idle'); // idle | uploading | success | duplicate | error

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus('uploading');
    try {
      const response = await uploadMeme(file, desc);
      
      // 🔍 CHECK: Did the backend say it's a duplicate?
      if (response.message === "Meme already exists!") {
        setStatus('duplicate');
        // Close after 2 seconds (give user time to read)
        setTimeout(() => {
          onClose();
          resetModal();
        }, 2500);
      } else {
        // Real Success
        setStatus('success');
        setTimeout(() => {
          onClose();
          resetModal();
          window.location.reload(); 
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const resetModal = () => {
    setStatus('idle');
    setFile(null);
    setDesc('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Upload to Vault</h3>
                <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Drag & Drop Area */}
              <div className="relative border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-950/50 hover:border-violet-500/50 transition-colors group">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {file ? (
                  <div className="text-center">
                    <p className="text-violet-400 font-medium">{file.name}</p>
                    <p className="text-xs text-slate-500 mt-1">Click to change</p>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-slate-800 rounded-full mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6 text-violet-400" />
                    </div>
                    <p className="text-sm text-slate-300 font-medium">Click to upload or drag & drop</p>
                    <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG</p>
                  </>
                )}
              </div>

              {/* Description Input */}
              <div className="mt-4">
                <label className="text-xs font-medium text-slate-400 ml-1">Optional Description</label>
                <input 
                  type="text" 
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="e.g. funny cat jumping"
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-white placeholder-slate-600"
                />
              </div>

              {/* Smart Action Button */}
              <button
                onClick={handleUpload}
                disabled={!file || status === 'uploading'}
                className={`w-full mt-6 font-medium py-2.5 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all
                  ${status === 'duplicate' ? 'bg-yellow-500 text-yellow-950' : 
                    status === 'success' ? 'bg-green-500 text-green-950' : 
                    'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'}`}
              >
                {status === 'uploading' ? (
                  <> <Loader2 className="w-4 h-4 animate-spin" /> Scanning... </>
                ) : status === 'success' ? (
                  <> <CheckCircle className="w-4 h-4" /> Done! </>
                ) : status === 'duplicate' ? (
                  <> <AlertCircle className="w-4 h-4" /> Already in Vault! </>
                ) : (
                  "Upload & Process"
                )}
              </button>

              {status === 'duplicate' && (
                <p className="text-yellow-500 text-xs text-center mt-3">
                  We found a >99% match. No new copy was saved.
                </p>
              )}

              {status === 'error' && (
                <p className="text-red-400 text-xs text-center mt-3">Upload failed. Check server.</p>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UploadModal;