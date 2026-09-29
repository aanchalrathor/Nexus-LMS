import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, PlayCircle, ChevronDown, CheckCircle, Shield, User, LogOut } from 'lucide-react';

export const StudentTopbar = ({ onToggleMobileSidebar }) => {
  const { student, navigateTo, switchRole } = useApp();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="bg-white border-b border-ivory-200 h-16 px-6 flex items-center justify-between sticky top-7 z-30">
      
      {/* Left: Mobile Toggle & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 text-charcoal-700 hover:bg-ivory-100 rounded-lg"
        >
          <span className="sr-only">Toggle Sidebar</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search enrolled courses, modules, or notes..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg focus:bg-white transition-all text-charcoal-900 placeholder:text-charcoal-400"
          />
        </div>
      </div>

      {/* Right: Resume button, Notifications, User */}
      <div className="flex items-center gap-4">
        
        {/* Continue Learning CTA */}
        <button
          onClick={() => navigateTo('course-player', { courseId: 'cs-101', lessonId: 'l6' })}
          className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-forest-50 hover:bg-forest-100 text-forest-800 border border-forest-200 rounded-lg text-xs font-medium transition-all"
        >
          <PlayCircle className="w-4 h-4 text-forest-700" />
          <span>Resume: <strong className="font-semibold">State Machines</strong></span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 text-charcoal-600 hover:text-forest-900 hover:bg-ivory-100 rounded-lg relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 bg-gold-500 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white"></span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-ivory-200 rounded-xl shadow-xl py-2 z-50 animate-fade-in text-xs">
              <div className="px-4 py-2 border-b border-ivory-100 flex items-center justify-between font-semibold text-charcoal-900">
                <span>Notifications</span>
                <span className="text-[10px] text-forest-700 bg-forest-50 px-2 py-0.5 rounded-full">2 New</span>
              </div>
              <div className="divide-y divide-ivory-100 max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-ivory-50 cursor-pointer">
                  <p className="font-medium text-charcoal-900">Assignment Graded: UX Design Audit</p>
                  <p className="text-[11px] text-charcoal-500 mt-0.5">Scored 96/100 · Sarah Jenkins left feedback</p>
                  <span className="text-[10px] text-charcoal-400 mt-1 block">2 hours ago</span>
                </div>
                <div className="p-3 hover:bg-ivory-50 cursor-pointer">
                  <p className="font-medium text-charcoal-900">Live Workshop Tomorrow</p>
                  <p className="text-[11px] text-charcoal-500 mt-0.5">Microservices & Dockerized APIs at 4:00 PM EST</p>
                  <span className="text-[10px] text-charcoal-400 mt-1 block">Yesterday</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-ivory-100 transition-colors"
          >
            <img
              src={student.avatar}
              alt={student.name}
              className="w-8 h-8 rounded-full border border-gold-400 object-cover"
            />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-charcoal-900 leading-none">{student.name}</p>
              <p className="text-[10px] text-charcoal-500 leading-tight mt-0.5">Scholar</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-charcoal-500" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-ivory-200 rounded-xl shadow-xl py-2 z-50 text-xs animate-fade-in">
              <div className="px-4 py-2 border-b border-ivory-100">
                <p className="font-semibold text-charcoal-900">{student.name}</p>
                <p className="text-[11px] text-charcoal-500 truncate">{student.email}</p>
              </div>
              <button
                onClick={() => {
                  navigateTo('student-profile');
                  setProfileDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-ivory-50 flex items-center gap-2 text-charcoal-700"
              >
                <User className="w-4 h-4 text-forest-700" /> My Profile & Settings
              </button>
              <button
                onClick={() => {
                  switchRole('admin');
                  setProfileDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-ivory-50 flex items-center gap-2 text-charcoal-700"
              >
                <Shield className="w-4 h-4 text-gold-600" /> Switch to Admin Demo
              </button>
              <div className="border-t border-ivory-100 my-1"></div>
              <button
                onClick={() => {
                  switchRole('public');
                  setProfileDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-ivory-50 flex items-center gap-2 text-red-700"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
