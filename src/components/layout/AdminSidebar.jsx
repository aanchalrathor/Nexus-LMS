import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpenCheck,
  Users,
  Briefcase,
  Award,
  CircleDollarSign,
  BellRing,
  Settings,
  GraduationCap,
  LogOut,
  ShieldCheck,
  PlusCircle
} from 'lucide-react';

export const AdminSidebar = () => {
  const { currentView, navigateTo, switchRole } = useApp();

  const adminNav = [
    { name: 'Dashboard', view: 'admin-dashboard', icon: LayoutDashboard },
    { name: 'Course Management', view: 'admin-courses', icon: BookOpenCheck },
    { name: 'Student Management', view: 'admin-students', icon: Users },
    { name: 'Instructor Management', view: 'admin-instructors', icon: Briefcase },
    { name: 'Certificates Registry', view: 'admin-certificates', icon: Award },
    { name: 'Payment / Revenue', view: 'admin-revenue', icon: CircleDollarSign },
    { name: 'Broadcast Notifications', view: 'admin-notifications', icon: BellRing },
    { name: 'System Settings', view: 'admin-settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-forest-950 text-ivory-100 min-h-screen flex flex-col justify-between border-r border-forest-900 flex-shrink-0">
      <div>
        {/* Brand Header */}
        <div 
          onClick={() => navigateTo('home')} 
          className="p-5 border-b border-forest-900 flex items-center gap-3 cursor-pointer hover:bg-forest-900/60 transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-forest-800 text-gold-400 flex items-center justify-center border border-forest-700 shadow-md">
            <ShieldCheck className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-base tracking-wide text-white">NEXUS LMS</h1>
            <p className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold">Administration</p>
          </div>
        </div>

        {/* Admin Badge */}
        <div className="p-3 mx-3 my-4 rounded-xl bg-forest-900/60 border border-forest-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-forest-800 border border-gold-500/50 flex items-center justify-center text-gold-300 font-bold text-sm">
            AD
          </div>
          <div className="overflow-hidden">
            <h3 className="text-xs font-semibold text-white">Academic Director</h3>
            <p className="text-[10px] text-ivory-400">admin@nexuslms.edu</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;

            return (
              <button
                key={item.name}
                onClick={() => navigateTo(item.view)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-forest-800 text-white shadow-sm border-l-4 border-gold-400 font-semibold'
                    : 'text-ivory-300 hover:text-white hover:bg-forest-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-ivory-400'}`} />
                  <span className="text-xs sm:text-sm">{item.name}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Switchers */}
      <div className="p-4 border-t border-forest-900 space-y-3">
        <div className="p-2.5 rounded-lg bg-forest-900/40 border border-forest-800 text-[11px] text-ivory-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> System Active
          </span>
          <span className="text-gold-400 font-mono text-[10px]">v2.4 LTS</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => switchRole('student')}
            className="flex-1 py-1.5 px-2 rounded-lg text-xs font-medium text-gold-300 hover:text-white hover:bg-forest-900 border border-forest-800 transition-colors"
          >
            Student View
          </button>
          <button
            onClick={() => switchRole('public')}
            className="flex-1 py-1.5 px-2 rounded-lg text-xs font-medium text-ivory-300 hover:text-white hover:bg-forest-900 border border-forest-800 transition-colors"
          >
            Public Site
          </button>
        </div>
      </div>
    </aside>
  );
};
