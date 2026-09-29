import React from 'react';
import { useApp } from '../../context/AppContext';
import { PlusCircle, Search, ShieldCheck, Eye, LogOut } from 'lucide-react';

export const AdminTopbar = ({ onToggleMobileSidebar, onCreateCourseClick }) => {
  const { currentView, navigateTo, switchRole } = useApp();

  const getPageTitle = () => {
    switch (currentView) {
      case 'admin-dashboard': return 'Executive Dashboard & Platform Analytics';
      case 'admin-courses': return 'Course Catalog & Curriculum Management';
      case 'admin-students': return 'Student Directory & Performance Tracking';
      case 'admin-instructors': return 'Faculty & Instructor Management';
      case 'admin-certificates': return 'Certificates Registry & Verification';
      case 'admin-revenue': return 'Financial Ledger & Revenue Breakdown';
      case 'admin-notifications': return 'System Announcements & Broadcasts';
      case 'admin-settings': return 'Platform Configuration & Security Settings';
      default: return 'Administrative Console';
    }
  };

  return (
    <header className="bg-white border-b border-ivory-200 h-16 px-6 flex items-center justify-between sticky top-7 z-30">
      
      {/* Mobile Menu & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 text-charcoal-700 hover:bg-ivory-100 rounded-lg"
        >
          <span className="sr-only">Toggle Sidebar</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <h2 className="text-sm sm:text-base font-bold text-forest-950">{getPageTitle()}</h2>
          <p className="text-[11px] text-charcoal-500 hidden sm:block">Nexus Academic Infrastructure</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            navigateTo('admin-courses', { openCreateModal: true });
            if (onCreateCourseClick) onCreateCourseClick();
          }}
          className="flex items-center gap-2 bg-forest-800 hover:bg-forest-900 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4 text-gold-400" />
          <span>New Course</span>
        </button>

        <button
          onClick={() => switchRole('student')}
          className="hidden sm:flex items-center gap-1.5 border border-forest-200 text-forest-800 hover:bg-forest-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          title="Preview Student Experience"
        >
          <Eye className="w-3.5 h-3.5 text-forest-700" />
          <span>View as Student</span>
        </button>
      </div>
    </header>
  );
};
