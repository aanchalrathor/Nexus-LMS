import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Mail, Phone, MapPin, Award, Shield, CheckCircle } from 'lucide-react';

export const PublicFooter = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-forest-950 text-ivory-100 border-t border-forest-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest-800 text-ivory-50 flex items-center justify-center border border-forest-700">
                <GraduationCap className="w-6 h-6 text-gold-400" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">NEXUS LMS</span>
            </div>
            <p className="text-ivory-300 text-sm leading-relaxed max-w-sm">
              An institution-grade learning management platform dedicated to practical engineering, systematic design architecture, and enterprise technology leadership.
            </p>
            <div className="flex items-center gap-4 text-xs text-gold-400 pt-2">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> ISO 27001 Certified</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> ABET Aligned Standards</span>
            </div>
          </div>

          {/* Academic Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">Programs</h4>
            <ul className="space-y-2 text-sm text-ivory-300">
              <li><button onClick={() => navigateTo('courses')} className="hover:text-white transition-colors">Full-Stack Engineering</button></li>
              <li><button onClick={() => navigateTo('courses')} className="hover:text-white transition-colors">Data Science & ML</button></li>
              <li><button onClick={() => navigateTo('courses')} className="hover:text-white transition-colors">Design Systems & UX</button></li>
              <li><button onClick={() => navigateTo('courses')} className="hover:text-white transition-colors">DevOps & Cloud Cluster</button></li>
              <li><button onClick={() => navigateTo('courses')} className="hover:text-white transition-colors">Product Strategy</button></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">Institution</h4>
            <ul className="space-y-2 text-sm text-ivory-300">
              <li><button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => navigateTo('gallery')} className="hover:text-white transition-colors">Campus Gallery</button></li>
              <li><button onClick={() => navigateTo('placements')} className="hover:text-white transition-colors">Placement Records</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">Contact & Admissions</button></li>
              <li><button onClick={() => navigateTo('login')} className="hover:text-white transition-colors">Student Portal Login</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">Campus Office</h4>
            <ul className="space-y-2 text-sm text-ivory-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>450 Academic Way, Tech Corridor, San Francisco, CA</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>+1 (800) 420-NEXUS</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>admissions@nexuslms.edu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-400 gap-4">
          <p>© {new Date().getFullYear()} Nexus LMS Educational Systems. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-ivory-200 cursor-pointer">Privacy Framework</span>
            <span className="hover:text-ivory-200 cursor-pointer">Academic Honor Code</span>
            <span className="hover:text-ivory-200 cursor-pointer">Accessibility Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
