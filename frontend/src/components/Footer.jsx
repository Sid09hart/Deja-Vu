import React from 'react';
import { Github, Twitter, Heart, Zap, Linkedin } from 'lucide-react';

const FooterLink = ({ href, children }) => (
  <a 
    href={href} 
    className="text-slate-400 hover:text-violet-300 transition-colors text-sm block mb-2"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="relative w-full mt-32 border-t border-white/5 bg-slate-950/80 backdrop-blur-2xl z-20">
      
      {/* ✨ Glowing Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-lg">
                <Zap className="w-4 h-4 text-white fill-current" />
              </div>
              <span className="text-lg font-bold text-white">MemeEa</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The semantic search engine for the internet's culture. Find the vibe, not just the file.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <FooterLink href="#">Features</FooterLink>
            <FooterLink href="#">Vault Security</FooterLink>
            <FooterLink href="#">Integrations</FooterLink>
            <FooterLink href="#">Pricing</FooterLink>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <FooterLink href="#">Documentation</FooterLink>
            <FooterLink href="#">API Reference</FooterLink>
            <FooterLink href="#">Community</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-sm flex items-center gap-1.5">
            <span>© 2024 MemeEa. Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span>by <span className="text-slate-300 font-medium">Siddharth</span>.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-transform hover:scale-110">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-400 transition-transform hover:scale-110">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-transform hover:scale-110">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;