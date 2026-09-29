import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  FileCheck2,
  Award,
  MessageSquare,
  UserCircle,
  GraduationCap,
  LogOut,
  Flame,
  Clock
} from 'lucide-react';

export const StudentSidebar = () => {
  const { currentView, navigateTo, student, switchRole } = useApp();

  const navigation = [
    { name: 'Dashboard', view: 'student-dashboard', icon: LayoutDashboard },
    { name: 'My Courses', view: 'student-courses', icon: BookOpen },
    { name: 'Explore Courses', view: 'explore-courses', icon: Compass },
    { name: 'Assignments', view: 'student-assignments', icon: FileCheck2, badge: '1 Due' },
    { name: 'Certificates', view: 'student-certificates', icon: Award },
    { name: 'Messages', view: 'student-messages', icon: MessageSquare, badge: '1' },
    { name: 'Profile & Settings', view: 'student-profile', icon: UserCircle },
  ];

  return (
    <aside className="w-64 bg-forest-900 text-ivory-100 min-h-screen flex flex-col justify-between border-r border-forest-800 flex-shrink-0">
      <div>
        {/* Brand Header */}
        <div 
          onClick={() => navigateTo('home')} 
          className="p-5 border-b border-forest-800 flex items-center gap-3 cursor-pointer hover:bg-forest-800/40 transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-forest-800 text-gold-400 flex items-center justify-center border border-forest-700 shadow-inner">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-base tracking-wide text-white">NEXUS LMS</h1>
            <p className="text-[10px] text-gold-400/90 uppercase tracking-widest font-semibold">Student Portal</p>
          </div>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-4 rounded-xl bg-forest-950/60 border border-forest-800/70 flex items-center gap-3">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-10 h-10 rounded-full border border-gold-400/40 object-cover"
          />
          <div className="overflow-hidden">
            <h3 className="text-sm font-semibold text-white truncate">{student.name}</h3>
            <p className="text-[11px] text-ivory-300 truncate">Select your course</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view || 
              (item.view === 'student-courses' && (currentView === 'course-overview' || currentView === 'course-player'));

            return (
              <button
                key={item.name}
                onClick={() => navigateTo(item.view)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-forest-800 text-white shadow-sm border-l-4 border-gold-400 font-semibold'
                    : 'text-ivory-300 hover:text-white hover:bg-forest-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-ivory-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-gold-500 text-charcoal-950' : 'bg-forest-800 text-gold-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Metrics & Actions */}
      <div className="p-4 border-t border-forest-800 space-y-3">
        {/* Streak Counter */}
        <div className="p-3 rounded-lg bg-forest-950/80 border border-forest-800 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-ivory-300">
              <Flame className="w-3.5 h-3.5 text-gold-400" /> Study Streak
            </span>
            <span className="font-bold text-gold-400">{student.stats.currentStreakDays} Days</span>
          </div>
          <div className="flex items-center justify-between text-ivory-300">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-forest-400" /> Learning Time
            </span>
            <span className="font-medium text-white">{student.stats.hoursLearned} hrs</span>
          </div>
        </div>

        {/* Exit & Role Switch */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => switchRole('public')}
            className="flex-1 py-2 px-3 rounded-lg text-xs font-medium text-ivory-300 hover:text-white hover:bg-forest-800 transition-colors flex items-center justify-center gap-1.5 border border-forest-800"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </button>
          <button
            onClick={() => switchRole('admin')}
            className="py-2 px-3 rounded-lg text-xs font-medium text-gold-400 hover:text-gold-300 hover:bg-forest-800 transition-colors border border-forest-800"
            title="Switch to Admin Portal"
          >
            Admin Demo
          </button>
        </div>
      </div>
    </aside>
  );
};
