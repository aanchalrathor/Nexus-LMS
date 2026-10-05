import React, { useState } from 'react';
import { useApp } from './context/AppContext';

import { Toast } from './components/common/Toast';
import { PublicNavbar } from './components/layout/PublicNavbar';
import { PublicFooter } from './components/layout/PublicFooter';
import { StudentSidebar } from './components/layout/StudentSidebar';
import { StudentTopbar } from './components/layout/StudentTopbar';
import { AdminSidebar } from './components/layout/AdminSidebar';
import { AdminTopbar } from './components/layout/AdminTopbar';
import {
  GraduationCap, ArrowRight, BookOpen, Award, Users, CheckCircle,
  Star, Clock, TrendingUp, ShieldCheck, ChevronRight, Search,
  Filter, MapPin, Phone, Mail, Send, CheckCircle2, Calendar,
  PlayCircle, PauseCircle, RotateCcw, Volume2, FileText, HelpCircle,
  Download, UploadCloud, MessageSquare, ChevronDown, ChevronUp,
  Settings, Lock, Eye, EyeOff, PlusCircle, Trash2, Edit3, DollarSign,
  AlertCircle, Shield, User, Bell, ExternalLink, Printer, Check, X
} from 'lucide-react';
import { motion, MotionConfig } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

const viewportOnce = { once: true, margin: '-80px' };

const homeMetrics = [
  { value: '95.4%', label: 'Placement Success', sub: 'Within 180 days' },
  { value: '$114,000', label: 'Avg Starting Package', sub: '2025-2026 cohorts' },
  { value: '140+', label: 'Hiring Partners', sub: 'Tier-one tech employers' },
  { value: '4.92 / 5', label: 'Faculty Rating', sub: 'From 4,800+ evaluations' }
];

export default function App() {
  const { currentView, userRole } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [adminCreateCourseModal, setAdminCreateCourseModal] = useState(false);

  // Render layouts conditionally based on currentView or userRole
  const isAuthView = ['login', 'signup', 'forgot-password', 'reset-password'].includes(currentView);
  const isStudentView = currentView.startsWith('student-') || ['course-overview', 'course-player', 'explore-courses'].includes(currentView);
  const isAdminView = currentView.startsWith('admin-');

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen flex flex-col bg-ivory-50 text-charcoal-900 font-sans selection:bg-forest-800 selection:text-white">
      <Toast />

      {/* AUTH VIEW LAYOUT */}
      {isAuthView ? (
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-ivory-100 to-ivory-50">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full flex justify-center"
          >
            <AuthRouter view={currentView} />
          </motion.div>
        </main>
      ) : isStudentView ? (
        /* STUDENT PORTAL LAYOUT */
        <div className="flex-1 flex">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <StudentSidebar />
          </div>

          {/* Mobile Drawer */}
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)}></div>
              <div className="relative z-10 w-64">
                <StudentSidebar />
              </div>
            </div>
          )}

          {/* Student Content Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-ivory-50">
            <StudentTopbar onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <StudentRouter view={currentView} />
            </main>
          </div>
        </div>
      ) : isAdminView ? (
        /* ADMIN PORTAL LAYOUT */
        <div className="flex-1 flex">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <AdminSidebar />
          </div>

          {/* Mobile Drawer */}
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)}></div>
              <div className="relative z-10 w-64">
                <AdminSidebar />
              </div>
            </div>
          )}

          {/* Admin Content Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-ivory-50">
            <AdminTopbar 
              onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              onCreateCourseClick={() => setAdminCreateCourseModal(true)}
            />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <AdminRouter 
                view={currentView} 
                createCourseOpen={adminCreateCourseModal} 
                setCreateCourseOpen={setAdminCreateCourseModal} 
              />
            </main>
          </div>
        </div>
      ) : (
        /* PUBLIC SITE LAYOUT */
        <div className="flex-1 flex flex-col">
          <PublicNavbar />
          <motion.main
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex-1"
          >
            <PublicRouter view={currentView} />
          </motion.main>
          <PublicFooter />
        </div>
      )}
    </div>
    </MotionConfig>
  );
}

/* =========================================================================
   PUBLIC ROUTER & PAGES
========================================================================= */
function PublicRouter({ view }) {
  switch (view) {
    case 'about': return <PublicAbout />;
    case 'courses': return <PublicCourses />;
    case 'gallery': return <PublicGallery />;
    case 'placements': return <PublicPlacements />;
    case 'contact': return <PublicContact />;
    case 'home':
    default:
      return <PublicHome />;
  }
}

function PublicHome() {
  const { courses, navigateTo, enrollCourse, placements, gallery, userRole } = useApp();
  const featured = courses.slice(0, 3);
  const isAuthenticated = userRole !== 'public';

  return (
    <div>
      {/* Hero */}
      <section data-nav="home" className="relative overflow-hidden pt-14 pb-20 lg:pt-24 lg:pb-28 bg-gradient-to-b from-ivory-100/70 to-ivory-50 border-b border-ivory-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 items-center gap-12 lg:gap-10 ${isAuthenticated ? 'lg:grid-cols-12' : ''}`}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className={`space-y-6 ${isAuthenticated ? 'lg:col-span-7' : 'mx-auto max-w-3xl text-center'}`}
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-forest-600 animate-pulse"></span>
                <span>Fall 2026 Academic Cohorts Now Open</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forest-950 leading-[1.1]">
                Architecting Real-World <span className="italic font-normal text-forest-800">Engineering</span> & Applied Systems.
              </motion.h1>
              <motion.p variants={fadeUp} className={`text-base sm:text-lg text-charcoal-600 leading-relaxed max-w-2xl ${isAuthenticated ? '' : 'mx-auto'}`}>
                Nexus LMS brings together structured institutional curricula, direct industry mentorship, and verified credentials. Built for students committed to software engineering, design systems, and data infrastructure.
              </motion.p>
              <motion.div variants={fadeUp} className={`flex flex-wrap items-center gap-3 pt-2 ${isAuthenticated ? '' : 'justify-center'}`}>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo('courses')}
                  className="px-6 py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-medium text-sm shadow-md transition-colors flex items-center gap-2 group"
                >
                  <span>Explore Academic Programs</span>
                  <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo('signup')}
                  className="px-6 py-3 rounded-xl border border-forest-800/20 bg-white hover:bg-ivory-100 text-forest-900 font-medium text-sm transition-colors"
                >
                  Create Student Account
                </motion.button>
              </motion.div>
              <motion.div variants={fadeUp} className={`pt-5 border-t border-ivory-200/80 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-charcoal-600 font-medium ${isAuthenticated ? '' : 'justify-center'}`}>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-forest-700" /><span>ABET Aligned</span></div>
                <div className="flex items-center gap-2"><Award className="w-4 h-4 text-gold-600" /><span>Verified Credentials</span></div>
                <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-forest-700" /><span>95.4% Placement Rate</span></div>
              </motion.div>
            </motion.div>

            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
                className="lg:col-span-5 relative"
              >
                <div className="relative mx-auto max-w-md rounded-2xl bg-white p-5 sm:p-6 shadow-xl border border-ivory-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-ivory-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-forest-800"></div>
                      <span className="text-xs font-bold text-forest-900 uppercase tracking-wider">Live Learning Cohort</span>
                    </div>
                    <span className="text-[11px] bg-forest-50 text-forest-800 font-semibold px-2 py-0.5 rounded-full border border-forest-200">Active</span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-ivory-200 bg-ivory-50/50">
                    <img
                      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
                      alt="Course Preview"
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider">Software Engineering</span>
                      <h3 className="font-semibold text-sm text-charcoal-900 leading-snug">Full-Stack Web Engineering with React & Node</h3>
                      <div className="flex items-center justify-between text-xs text-charcoal-500 pt-1">
                        <span>Module 2: State Machines</span>
                        <span className="font-medium text-forest-800">68% Complete</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-forest-700 h-full rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-2.5 rounded-xl bg-ivory-50 border border-ivory-200">
                      <p className="text-lg font-bold font-serif text-forest-900">42</p>
                      <p className="text-[11px] text-charcoal-500">Structured Lessons</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-ivory-50 border border-ivory-200">
                      <p className="text-lg font-bold font-serif text-forest-900">1:1</p>
                      <p className="text-[11px] text-charcoal-500">Faculty Mentorship</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigateTo('course-overview', { courseId: 'cs-101' })}
                    className="w-full py-2.5 rounded-lg bg-forest-900 hover:bg-forest-950 text-white font-medium text-xs shadow transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Preview Course Syllabus & Player</span>
                    <ChevronRight className="w-4 h-4 text-gold-400" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {homeMetrics.map((m) => (
            <motion.div
              key={m.label}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-ivory-200 text-center shadow-sm"
            >
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">{m.value}</h3>
              <p className="text-xs sm:text-sm font-semibold text-charcoal-700 uppercase tracking-wide mt-1.5">{m.label}</p>
              <p className="text-[11px] sm:text-xs text-charcoal-500 mt-0.5">{m.sub}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Academic Philosophy */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="border-y border-ivory-200 bg-white py-16 lg:py-24"
        data-nav="about"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div variants={fadeUp} className="space-y-6">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">The Academic Philosophy</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 leading-tight">
              Education Grounded in Systems Architecture, Not Transient Syntax.
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
              Founded by senior engineering leaders and academic researchers, Nexus LMS provides in-depth, production-tested education. We focus on enduring engineering fundamentals: relational databases, distributed microservices, state machines, and accessible design token systems.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-ivory-100/60 border border-ivory-200">
                <h4 className="font-bold text-forest-900 text-sm">Pragmatic Pedagogy</h4>
                <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">Realistic production codebases over superficial tutorials.</p>
              </div>
              <div className="p-4 rounded-xl bg-ivory-100/60 border border-ivory-200">
                <h4 className="font-bold text-forest-900 text-sm">Honors Assessment</h4>
                <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">Detailed rubric evaluations with instructor feedback.</p>
              </div>
            </div>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('about')}
              className="px-5 py-2.5 rounded-xl border border-forest-800/20 bg-white hover:bg-ivory-100 text-forest-900 font-medium text-sm transition-colors flex items-center gap-2 group"
            >
              <span>Learn More About Nexus</span>
              <ArrowRight className="w-4 h-4 text-gold-500 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
          <motion.div variants={fadeUp} className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Nexus Seminar"
              className="rounded-2xl shadow-xl border border-ivory-200 w-full object-cover h-72 sm:h-96"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Courses */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-16 lg:pb-24"
        data-nav="courses"
      >
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">Curriculum Excellence</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 leading-tight">Featured Academic Courses</h2>
            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">Taught directly by senior practitioners with architectural experience.</p>
          </div>
          <button
            onClick={() => navigateTo('courses')}
            className="text-sm font-bold text-forest-800 hover:text-forest-900 flex items-center gap-1 group flex-shrink-0"
          >
            <span>View All Programs ({courses.length})</span>
            <ArrowRight className="w-4 h-4 text-gold-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((course) => (
            <motion.div
              key={course.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-forest-300 transition-[box-shadow,border-color] duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-forest-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="flex items-center gap-1.5 text-ivory-50 text-xs font-semibold bg-forest-900/85 border border-gold-400/30 px-3 py-1.5 rounded-lg translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-3.5 h-3.5 text-gold-400" /> View Course
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 bg-forest-900/90 text-ivory-50 text-[11px] font-semibold px-2 py-0.5 rounded">
                    {course.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 text-charcoal-900 text-xs font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-charcoal-500">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-forest-700" /> {course.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-forest-700" /> {course.lessonsCount} Lessons</span>
                    <span className="px-2 py-0.5 rounded bg-ivory-100 text-charcoal-700 font-medium">{course.level}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-charcoal-900 leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-charcoal-600 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-2.5 pt-3 border-t border-ivory-100">
                    <img src={course.instructor.avatar} alt={course.instructor.name} className="w-8 h-8 rounded-full object-cover border border-ivory-300" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold text-charcoal-900 truncate">{course.instructor.name}</p>
                      <p className="text-[11px] text-charcoal-500 truncate">{course.instructor.title}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6 pt-4 border-t border-ivory-100 flex items-center justify-between gap-3 mt-3">
                <div>
                  <span className="text-[10px] text-charcoal-500 uppercase tracking-wider block">Tuition</span>
                  <span className="font-bold text-base text-forest-900">${course.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('course-overview', { courseId: course.id })}
                    className="px-3 py-1.5 rounded-lg border border-forest-800/20 text-forest-800 hover:bg-forest-50 text-xs font-medium transition-colors"
                  >
                    Syllabus
                  </button>
                  <button
                    onClick={() => enrollCourse(course.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Campus Gallery Preview */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
        data-nav="gallery"
      >
        <motion.div variants={fadeUp} className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">Campus Life</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 leading-tight">Inside the Nexus Community</h2>
          <p className="text-sm sm:text-base text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            From capstone defenses to hackathons and honors ceremonies — a glimpse of scholarly life at Nexus.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gallery.slice(0, 3).map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              onClick={() => navigateTo('gallery')}
              className="group relative rounded-2xl overflow-hidden border border-ivory-200 shadow-sm hover:shadow-lg transition-[box-shadow,border-color] duration-300 cursor-pointer"
            >
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/90 via-forest-950/40 to-transparent p-5 pt-12">
                <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider">{item.category}</span>
                <h3 className="font-serif font-bold text-base text-ivory-50 leading-snug mt-1">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeUp} className="text-center mt-10">
          <button
            onClick={() => navigateTo('gallery')}
            className="px-5 py-2.5 rounded-xl border border-forest-800/20 bg-white hover:bg-ivory-100 text-forest-900 font-medium text-sm transition-colors inline-flex items-center gap-2 group"
          >
            <span>View Campus Gallery</span>
            <ArrowRight className="w-4 h-4 text-gold-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.section>

      {/* Placement Network */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="border-y border-ivory-200 bg-white py-16 lg:py-24"
        data-nav="placements"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <motion.div variants={fadeUp} className="text-center space-y-2">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">Placement Network</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 leading-tight">Where Our Scholars Build</h2>
            <p className="text-sm sm:text-base text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
              Graduates join engineering teams at the world's most rigorous technology institutions.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-ivory-50 border border-ivory-200 text-center">
              <p className="font-serif text-xl sm:text-2xl font-bold text-forest-900">{placements.stats.placementRate}</p>
              <p className="text-[11px] text-charcoal-500 font-semibold uppercase tracking-wide mt-1">Placement Rate</p>
            </div>
            <div className="p-4 rounded-xl bg-ivory-50 border border-ivory-200 text-center">
              <p className="font-serif text-xl sm:text-2xl font-bold text-forest-900">{placements.stats.averagePackage}</p>
              <p className="text-[11px] text-charcoal-500 font-semibold uppercase tracking-wide mt-1">Average Package</p>
            </div>
            <div className="p-4 rounded-xl bg-ivory-50 border border-ivory-200 text-center">
              <p className="font-serif text-xl sm:text-2xl font-bold text-forest-900">{placements.stats.highestPackage}</p>
              <p className="text-[11px] text-charcoal-500 font-semibold uppercase tracking-wide mt-1">Highest Package</p>
            </div>
            <div className="p-4 rounded-xl bg-ivory-50 border border-ivory-200 text-center">
              <p className="font-serif text-xl sm:text-2xl font-bold text-forest-900">{placements.stats.hiringPartnersCount}</p>
              <p className="text-[11px] text-charcoal-500 font-semibold uppercase tracking-wide mt-1">Hiring Partners</p>
            </div>
            <div className="p-4 rounded-xl bg-ivory-50 border border-ivory-200 text-center col-span-2 sm:col-span-1">
              <p className="font-serif text-xl sm:text-2xl font-bold text-forest-900">{placements.stats.placedStudentsCount}</p>
              <p className="text-[11px] text-charcoal-500 font-semibold uppercase tracking-wide mt-1">Placed Students</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 items-center">
            {placements.partners.map((partner) => (
              <motion.div
                key={partner.name}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="p-3.5 rounded-xl bg-ivory-50 border border-ivory-200 text-center hover:border-forest-300 transition-colors shadow-sm"
              >
                <span className="font-semibold text-xs text-charcoal-800 block truncate">{partner.logoText}</span>
                <span className="text-[10px] text-charcoal-400 block truncate mt-0.5">{partner.role}</span>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="text-center">
            <button
              onClick={() => navigateTo('placements')}
              className="px-5 py-2.5 rounded-xl border border-forest-800/20 bg-white hover:bg-ivory-100 text-forest-900 font-medium text-sm transition-colors inline-flex items-center gap-2 group"
            >
              <span>View Placement Records</span>
              <ArrowRight className="w-4 h-4 text-gold-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Admissions CTA */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
        data-nav="contact"
      >
        <div className="rounded-3xl bg-forest-900 border border-forest-800 px-6 py-14 sm:px-12 lg:px-16 text-center space-y-6 shadow-xl">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Admissions Open</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight max-w-3xl mx-auto">
            Begin Your Academic Journey with Nexus LMS
          </h2>
          <p className="text-sm sm:text-base text-ivory-300 leading-relaxed max-w-2xl mx-auto">
            Speak with our admissions desk about cohort timelines, syllabus depth, and tuition assistance — or create your student account today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-sm shadow-md transition-colors"
            >
              Contact Admissions
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('signup')}
              className="px-6 py-3 rounded-xl border border-ivory-200/30 bg-transparent hover:bg-forest-800 text-ivory-100 font-medium text-sm transition-colors"
            >
              Create Student Account
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function PublicAbout() {
  const { instructors } = useApp();

  return (
    <div className="space-y-16 pb-16">
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="bg-forest-900 text-ivory-100 py-16 border-b border-forest-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Our Founding Mandate</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">About Nexus LMS</h1>
          <p className="text-sm sm:text-base text-ivory-300 max-w-2xl mx-auto leading-relaxed">
            Bridging theoretical computer science and high-velocity engineering reality through rigorous, project-driven academic instruction.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">The Academic Philosophy</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
              Education Grounded in Systems Architecture, Not Transient Syntax.
            </h2>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Founded by senior engineering leaders and academic researchers, Nexus LMS provides in-depth, production-tested education. We focus on enduring engineering fundamentals: relational databases, distributed microservices, state machines, and accessible design token systems.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-ivory-100/60 border border-ivory-200">
                <h4 className="font-bold text-forest-900 text-sm">Pragmatic Pedagogy</h4>
                <p className="text-xs text-charcoal-500 mt-1">Realistic production codebases over superficial tutorials.</p>
              </div>
              <div className="p-4 rounded-xl bg-ivory-100/60 border border-ivory-200">
                <h4 className="font-bold text-forest-900 text-sm">Honors Assessment</h4>
                <p className="text-xs text-charcoal-500 mt-1">Detailed rubric evaluations with instructor feedback.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Nexus Seminar"
              className="rounded-2xl shadow-xl border border-ivory-200 w-full object-cover h-88"
            />
          </div>
        </div>
      </motion.section>

      {/* Instructors */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">Distinguished Faculty</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">Learn from World-Class Mentors</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((inst) => (
            <motion.div
              key={inst.id}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-ivory-200 p-5 text-center shadow-sm space-y-3"
            >
              <img src={inst.avatar} alt={inst.name} className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-forest-800" />
              <div>
                <h3 className="font-serif font-bold text-base text-charcoal-900">{inst.name}</h3>
                <p className="text-xs text-gold-600 font-semibold">{inst.title}</p>
                <p className="text-[11px] text-charcoal-500 mt-0.5">{inst.department}</p>
              </div>
              <p className="text-xs text-charcoal-600 line-clamp-3 leading-relaxed pt-1 border-t border-ivory-100">{inst.bio}</p>
              <div className="text-xs text-forest-800 font-medium pt-2">★ {inst.rating} · {inst.studentsTaught.toLocaleString()} Students</div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

function PublicCourses() {
  const { courses, navigateTo, enrollCourse } = useApp();
  const [selectedCat, setSelectedCat] = useState('All');
  const [query, setQuery] = useState('');

  const categories = ['All', 'Development', 'Data Science', 'Design', 'DevOps & Cloud', 'Business'];

  const filtered = courses.filter((c) => {
    const matchCat = selectedCat === 'All' || c.category === selectedCat;
    const matchSearch = c.title.toLowerCase().includes(query.toLowerCase()) || c.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="text-center max-w-2xl mx-auto space-y-2"
      >
        <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">Academic Catalog</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">Explore All Programs</h1>
        <p className="text-xs sm:text-sm text-charcoal-600">
          Rigorous professional curriculums designed to take you from foundational concepts to production-level engineering.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-ivory-200 shadow-sm"
      >
        <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCat === cat ? 'bg-forest-800 text-white font-semibold' : 'text-charcoal-700 hover:bg-ivory-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search programs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
          />
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((course) => (
          <motion.div
            key={course.id}
            variants={fadeUp}
            whileHover={{ y: -5 }}
            className="group bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm hover:shadow-md hover:border-forest-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-forest-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="flex items-center gap-1.5 text-ivory-50 text-xs font-semibold bg-forest-900/85 border border-gold-400/30 px-3 py-1.5 rounded-lg translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-3.5 h-3.5 text-gold-400" /> View Course
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-forest-900/90 text-ivory-50 text-[11px] font-semibold px-2 py-0.5 rounded">{course.category}</div>
                <div className="absolute top-3 right-3 bg-white/95 text-charcoal-900 text-xs font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  <span>{course.rating}</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 text-xs text-charcoal-500">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-forest-700" /> {course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-forest-700" /> {course.lessonsCount} Lessons</span>
                  <span className="px-2 py-0.5 rounded bg-ivory-100 text-charcoal-700 font-medium">{course.level}</span>
                </div>
                <h3 className="font-serif font-bold text-base text-charcoal-900 leading-snug line-clamp-2">{course.title}</h3>
                <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">{course.description}</p>
                <div className="flex items-center gap-2.5 pt-2 border-t border-ivory-100">
                  <img src={course.instructor.avatar} alt={course.instructor.name} className="w-7 h-7 rounded-full object-cover border border-ivory-300" />
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-charcoal-900 truncate">{course.instructor.name}</p>
                    <p className="text-[10px] text-charcoal-500 truncate">{course.instructor.title}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 border-t border-ivory-100 flex items-center justify-between gap-3 mt-3">
              <div>
                <span className="text-[10px] text-charcoal-500 uppercase tracking-wider block">Tuition</span>
                <span className="font-bold text-base text-forest-900">${course.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => navigateTo('course-overview', { courseId: course.id })}
                  whileTap={{ scale: 0.97 }}
                  className="px-3 py-1.5 rounded-lg border border-forest-800/20 text-forest-800 hover:bg-forest-50 text-xs font-medium"
                >
                  Syllabus
                </motion.button>
                <motion.button
                  onClick={() => enrollCourse(course.id)}
                  whileTap={{ scale: 0.97 }}
                  className="px-3.5 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold shadow-sm"
                >
                  Enroll
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function PublicGallery() {
  const { gallery } = useApp();
  const [selectedTag, setSelectedTag] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const tags = ['All', 'Campus Life', 'Hackathons', 'Workshops', 'Graduation', 'Masterclasses'];
  const filtered = selectedTag === 'All' ? gallery : gallery.filter(g => g.category === selectedTag);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="text-center max-w-2xl mx-auto space-y-2"
      >
        <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">Campus & Culture</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">Campus Gallery</h1>
        <p className="text-xs sm:text-sm text-charcoal-600">A visual look into workshops, hackathons, lab critiques, and student showcases.</p>
      </motion.div>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        {tags.map(t => (
          <button
            key={t}
            onClick={() => setSelectedTag(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${selectedTag === t ? 'bg-forest-800 text-white font-semibold' : 'bg-white border border-ivory-200 text-charcoal-700'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map(item => (
          <motion.div
            key={item.id}
            onClick={() => setLightbox(item)}
            variants={fadeUp}
            whileHover={{ y: -5 }}
            className="group cursor-pointer bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm hover:shadow-md hover:border-forest-300 transition-all"
          >
            <div className="relative h-52 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-forest-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="flex items-center gap-1.5 text-ivory-50 text-xs font-semibold bg-forest-900/85 border border-gold-400/30 px-3 py-1.5 rounded-lg translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                  <Eye className="w-3.5 h-3.5 text-gold-400" /> View
                </span>
              </div>
            </div>
            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-gold-600 font-semibold">
                <span>{item.category}</span>
                <span className="text-charcoal-400 font-normal">{item.date}</span>
              </div>
              <h3 className="font-serif font-bold text-sm text-charcoal-900">{item.title}</h3>
              <p className="text-xs text-charcoal-500 line-clamp-2">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-xl w-full shadow-2xl"
          >
            <img src={lightbox.image} alt={lightbox.title} className="w-full h-72 object-cover" />
            <div className="p-6 space-y-2">
              <span className="text-xs text-gold-600 font-bold uppercase">{lightbox.category}</span>
              <h3 className="font-serif text-xl font-bold text-forest-950">{lightbox.title}</h3>
              <p className="text-xs text-charcoal-600">{lightbox.description}</p>
              <div className="pt-3 flex justify-end">
                <button onClick={() => setLightbox(null)} className="px-4 py-1.5 bg-forest-800 text-white text-xs font-semibold rounded-lg">Close</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function PublicPlacements() {
  const { placements, navigateTo } = useApp();

  return (
    <div className="space-y-16 pb-16">
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="bg-forest-950 text-ivory-100 py-16 border-b border-forest-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Career Outcomes</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">Graduate Placement Records</h1>
          <p className="text-sm sm:text-base text-ivory-300 max-w-2xl mx-auto leading-relaxed">
            Nexus alumni join premier software engineering and design teams worldwide.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div variants={fadeUp} whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-white border border-ivory-200 text-center shadow-sm">
            <h3 className="font-serif text-3xl font-bold text-forest-900">{placements.stats.placementRate}</h3>
            <p className="text-xs font-semibold text-charcoal-700 uppercase tracking-wide mt-1">Placement Rate</p>
          </motion.div>
          <motion.div variants={fadeUp} whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-white border border-ivory-200 text-center shadow-sm">
            <h3 className="font-serif text-3xl font-bold text-forest-900">{placements.stats.averagePackage}</h3>
            <p className="text-xs font-semibold text-charcoal-700 uppercase tracking-wide mt-1">Average Starting Base</p>
          </motion.div>
          <motion.div variants={fadeUp} whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-white border border-ivory-200 text-center shadow-sm">
            <h3 className="font-serif text-3xl font-bold text-forest-900">{placements.stats.highestPackage}</h3>
            <p className="text-xs font-semibold text-charcoal-700 uppercase tracking-wide mt-1">Highest Package</p>
          </motion.div>
          <motion.div variants={fadeUp} whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-white border border-ivory-200 text-center shadow-sm">
            <h3 className="font-serif text-3xl font-bold text-forest-900">{placements.stats.hiringPartnersCount}</h3>
            <p className="text-xs font-semibold text-charcoal-700 uppercase tracking-wide mt-1">Hiring Partners</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
      >
        <h2 className="font-serif text-2xl font-bold text-forest-950 text-center">Recent Graduate Placements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placements.stories.map(story => (
            <motion.div
              key={story.id}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-ivory-200 p-6 space-y-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img src={story.avatar} alt={story.name} className="w-12 h-12 rounded-full object-cover border border-forest-800" />
                <div>
                  <h3 className="font-serif font-bold text-base text-charcoal-900">{story.name}</h3>
                  <p className="text-xs font-semibold text-forest-800">{story.company}</p>
                  <p className="text-[11px] text-charcoal-500">{story.role}</p>
                </div>
              </div>
              <div className="p-2.5 bg-ivory-50 rounded-lg border border-ivory-200 text-xs">
                <span className="text-charcoal-400 block text-[10px] uppercase">Compensation</span>
                <span className="font-bold text-forest-900">{story.package}</span>
              </div>
              <p className="text-xs text-charcoal-600 italic leading-relaxed">"{story.quote}"</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

function PublicContact() {
  const { showToast } = useApp();
  const [sent, setSent] = useState(false);
  const [data, setData] = useState({ name: '', email: '', course: '', msg: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.msg) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    setSent(true);
    showToast('Your inquiry has been received. Our admissions desk will follow up.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="text-center max-w-2xl mx-auto space-y-2"
      >
        <span className="text-xs font-bold text-gold-600 uppercase tracking-widest">Connect With Us</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">Admissions & Contact</h1>
        <p className="text-xs sm:text-sm text-charcoal-600">Have questions regarding syllabus depth, cohort timelines, or tuition assistance?</p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        <motion.div variants={fadeUp} className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-ivory-200 shadow-sm space-y-5">
          <h3 className="font-serif text-xl font-bold text-charcoal-900">Send an Inquiry</h3>
          {sent ? (
            <div className="p-6 rounded-xl bg-forest-50 border border-forest-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-forest-700 mx-auto" />
              <h4 className="font-serif font-bold text-lg text-forest-900">Inquiry Received</h4>
              <p className="text-xs text-charcoal-600">Thank you, {data.name}. An admissions advisor has received your message.</p>
              <button onClick={() => setSent(false)} className="mt-2 px-4 py-1.5 bg-forest-800 text-white text-xs font-semibold rounded-lg">Send Another</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Full Name *</label>
                <input required type="text" placeholder="Enter your full name" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Email *</label>
                <input required type="email" placeholder="name@example.com" value={data.email} onChange={e => setData({...data, email: e.target.value})} className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Program</label>
                <select value={data.course} onChange={e => setData({...data, course: e.target.value})} className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900">
                  <option value="">Select a program</option>
                  <option>Full-Stack Web Engineering</option>
                  <option>Applied Data Science & ML</option>
                  <option>Enterprise UX/UI Architecture</option>
                  <option>Cloud Infrastructure & DevOps</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Message *</label>
                <textarea rows="4" required placeholder="Tell us about your background..." value={data.msg} onChange={e => setData({...data, msg: e.target.value})} className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"></textarea>
              </div>
              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 bg-forest-800 hover:bg-forest-900 text-white font-medium text-xs rounded-xl shadow"
              >
                Submit Inquiry
              </motion.button>
            </form>
          )}
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-5 space-y-5">
          <div className="bg-forest-900 text-white p-6 rounded-2xl border border-forest-800 space-y-3">
            <h4 className="font-serif text-lg font-bold text-white">Campus Center</h4>
            <div className="space-y-2 text-xs text-ivory-200">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold-400" /> 450 Academic Way, Tech Corridor, SF, CA</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold-400" /> +1 (800) 420-NEXUS</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold-400" /> admissions@nexuslms.edu</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-ivory-200 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-charcoal-900 text-sm">Admissions Hours</h4>
            <p className="text-charcoal-600">Monday - Friday: 8:00 AM - 6:00 PM PST</p>
            <p className="text-charcoal-600">Saturday: 9:00 AM - 1:00 PM PST (Live Chat Support)</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   AUTHENTICATION ROUTER & PAGES
========================================================================= */
function AuthRouter({ view }) {
  switch (view) {
    case 'signup': return <AuthSignUp />;
    case 'forgot-password': return <AuthForgotPassword />;
    case 'reset-password': return <AuthResetPassword />;
    case 'login':
    default:
      return <AuthLogin />;
  }
}

function AuthLogin() {
  const { navigateTo, switchRole, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      showToast('Please enter both email and password.', 'error');
      return;
    }
    // Navigate to appropriate portal based on role/email
    if (email.toLowerCase().includes('admin')) {
      switchRole('admin');
    } else {
      switchRole('student');
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-2xl border border-ivory-200 shadow-xl p-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-forest-800 text-gold-400 flex items-center justify-center mx-auto shadow-inner">
          <GraduationCap className="w-7 h-7" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-forest-950">Welcome to Nexus LMS</h2>
        <p className="text-xs text-charcoal-500">Sign in to access your course dashboard and studio labs</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900 placeholder:text-charcoal-400"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-charcoal-700">Password</label>
            <button
              type="button"
              onClick={() => navigateTo('forgot-password')}
              className="text-[11px] text-forest-800 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <input
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900 placeholder:text-charcoal-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
        >
          <span>Sign In</span>
          <ArrowRight className="w-4 h-4 text-gold-400" />
        </button>
      </form>

      <div className="text-center text-xs text-charcoal-600">
        Don't have an account?{' '}
        <button onClick={() => navigateTo('signup')} className="font-semibold text-forest-900 hover:underline">
          Register here
        </button>
      </div>
    </div>
  );
}

function AuthSignUp() {
  const { navigateTo, showToast, switchRole, addInstructor } = useApp();
  const [roleTab, setRoleTab] = useState('student'); // 'student' | 'instructor'

  // Student Form
  const [studentForm, setStudentForm] = useState({ name: '', email: '', phone: '', track: '', password: '' });
  // Instructor Form
  const [instForm, setInstForm] = useState({ name: '', email: '', department: '', title: '', bio: '', portfolio: '' });

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.email || !studentForm.password) {
      showToast('Please complete all required fields.', 'error');
      return;
    }
    showToast('Student registration complete! Welcome to Nexus.');
    switchRole('student');
  };

  const handleInstructorSubmit = (e) => {
    e.preventDefault();
    if (!instForm.name || !instForm.email || !instForm.title) {
      showToast('Please provide your name, title and email.', 'error');
      return;
    }
    addInstructor(instForm);
    showToast('Instructor application submitted! Our faculty board will review your credentials within 48h.');
    navigateTo('home');
  };

  return (
    <div className="max-w-xl w-full bg-white rounded-2xl border border-ivory-200 shadow-xl p-8 space-y-6">
      <div className="text-center space-y-1">
        <h2 className="font-serif text-2xl font-bold text-forest-950">Create an Account</h2>
        <p className="text-xs text-charcoal-500">Join the Nexus LMS academic and research community</p>
      </div>

      {/* Role Toggle Tab */}
      <div className="flex rounded-xl bg-ivory-100 p-1 border border-ivory-200">
        <button
          onClick={() => setRoleTab('student')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            roleTab === 'student' ? 'bg-forest-800 text-white shadow-sm' : 'text-charcoal-600 hover:text-charcoal-900'
          }`}
        >
          Student Registration
        </button>
        <button
          onClick={() => setRoleTab('instructor')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            roleTab === 'instructor' ? 'bg-forest-800 text-white shadow-sm' : 'text-charcoal-600 hover:text-charcoal-900'
          }`}
        >
          Instructor Registration
        </button>
      </div>

      {roleTab === 'student' ? (
        <form onSubmit={handleStudentSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={studentForm.name}
                onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">Academic Email *</label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={studentForm.email}
                onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={studentForm.phone}
                onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">Primary Discipline</label>
              <select
                value={studentForm.track}
                onChange={(e) => setStudentForm({ ...studentForm, track: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
              >
                <option value="">Select your course</option>
                <option>Software Engineering</option>
                <option>Data Science & AI</option>
                <option>Design & Systems</option>
                <option>Cloud Infrastructure</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1">Create Password *</label>
            <input
              type="password"
              required
              placeholder="Create password"
              value={studentForm.password}
              onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs rounded-xl shadow transition-colors"
          >
            Complete Student Registration
          </button>
        </form>
      ) : (
        <form onSubmit={handleInstructorSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">Instructor Full Name *</label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={instForm.name}
                onChange={(e) => setInstForm({ ...instForm, name: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">Professional Email *</label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={instForm.email}
                onChange={(e) => setInstForm({ ...instForm, email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">Academic Department</label>
              <select
                value={instForm.department}
                onChange={(e) => setInstForm({ ...instForm, department: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
              >
                <option value="">Select department</option>
                <option>Software Engineering & Systems</option>
                <option>Data Science & Artificial Intelligence</option>
                <option>Design Systems & HCI</option>
                <option>Cloud Infrastructure & DevOps</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">Title / Affiliation *</label>
              <input
                type="text"
                required
                placeholder="Enter your title / affiliation"
                value={instForm.title}
                onChange={(e) => setInstForm({ ...instForm, title: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1">Faculty Bio & Teaching Experience</label>
            <textarea
              rows="3"
              placeholder="Highlight systems engineered, publications, and past teaching..."
              value={instForm.bio}
              onChange={(e) => setInstForm({ ...instForm, bio: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1">Portfolio or GitHub / LinkedIn URL</label>
            <input
              type="url"
              placeholder="https://github.com/username"
              value={instForm.portfolio}
              onChange={(e) => setInstForm({ ...instForm, portfolio: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs rounded-xl shadow transition-colors"
          >
            Submit Faculty Application
          </button>
        </form>
      )}

      <div className="text-center text-xs text-charcoal-600">
        Already registered?{' '}
        <button onClick={() => navigateTo('login')} className="font-semibold text-forest-900 hover:underline">
          Sign In here
        </button>
      </div>
    </div>
  );
}

function AuthForgotPassword() {
  const { navigateTo, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email address.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Reset instructions sent to your email.');
  };

  return (
    <div className="max-w-md w-full bg-white rounded-2xl border border-ivory-200 shadow-xl p-8 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-bold text-forest-950">Forgot Password</h2>
        <p className="text-xs text-charcoal-500">Enter your email and we'll send you a secure link to reset your account password</p>
      </div>

      {submitted ? (
        <div className="p-5 rounded-xl bg-forest-50 border border-forest-200 text-center space-y-3">
          <CheckCircle2 className="w-8 h-8 text-forest-700 mx-auto" />
          <h4 className="font-semibold text-sm text-forest-900">Check Your Inbox</h4>
          <p className="text-xs text-charcoal-600">We sent instructions to <strong>{email}</strong>.</p>
          <button
            onClick={() => navigateTo('reset-password')}
            className="w-full py-2 bg-forest-800 text-white text-xs font-semibold rounded-lg mt-2"
          >
            Proceed to Reset Password Page
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1">Academic Email</label>
            <input
              type="email"
              required
              placeholder="name@nexuslms.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs rounded-xl shadow"
          >
            Send Reset Link
          </button>
        </form>
      )}

      <div className="text-center text-xs text-charcoal-600">
        Remembered password?{' '}
        <button onClick={() => navigateTo('login')} className="font-semibold text-forest-900 hover:underline">
          Return to Login
        </button>
      </div>
    </div>
  );
}

function AuthResetPassword() {
  const { navigateTo, showToast } = useApp();
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass.length < 8) {
      showToast('Password must be at least 8 characters.', 'error');
      return;
    }
    if (pass !== confirmPass) {
      showToast('Passwords do not match.', 'error');
      return;
    }
    showToast('Password successfully reset! Please sign in with your new password.');
    navigateTo('login');
  };

  return (
    <div className="max-w-md w-full bg-white rounded-2xl border border-ivory-200 shadow-xl p-8 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-bold text-forest-950">Set New Password</h2>
        <p className="text-xs text-charcoal-500">Ensure your new password contains a mix of letters, numbers, and symbols</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">New Password</label>
          <input
            type="password"
            required
            placeholder="At least 8 characters"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">Confirm New Password</label>
          <input
            type="password"
            required
            placeholder="Confirm password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs rounded-xl shadow"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

/* =========================================================================
   STUDENT ROUTER & PORTAL PAGES
========================================================================= */
function StudentRouter({ view }) {
  switch (view) {
    case 'student-courses': return <StudentCourses />;
    case 'course-overview': return <CourseOverview />;
    case 'course-player': return <CoursePlayer />;
    case 'explore-courses': return <ExploreCourses />;
    case 'student-assignments': return <StudentAssignments />;
    case 'student-certificates': return <StudentCertificates />;
    case 'student-messages': return <StudentMessages />;
    case 'student-profile': return <StudentProfile />;
    case 'student-dashboard':
    default:
      return <StudentDashboard />;
  }
}

function StudentDashboard() {
  const { student, courses, navigateTo } = useApp();

  return (
    <div className="space-y-8">
      {/* Welcome Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-ivory-200 shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">Academic Term 2026</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">Welcome back, {student.name}</h1>
          <p className="text-xs sm:text-sm text-charcoal-500">You have completed 14 consecutive study days. Keep up the momentum!</p>
        </div>
        <button
          onClick={() => navigateTo('course-player', { courseId: 'cs-101', lessonId: 'l6' })}
          className="px-5 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow self-start sm:self-auto"
        >
          <PlayCircle className="w-4 h-4 text-gold-400" />
          <span>Resume Current Lesson</span>
        </button>
      </div>

      {/* Learning Progress Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-charcoal-500 mb-2">
            <span>Enrolled Courses</span>
            <BookOpen className="w-4 h-4 text-forest-700" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-serif text-forest-900">{student.stats.activeCourses}</p>
          <span className="text-[11px] text-forest-700 font-medium">All active in good standing</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-charcoal-500 mb-2">
            <span>Hours Learned</span>
            <Clock className="w-4 h-4 text-forest-700" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-serif text-forest-900">{student.stats.hoursLearned}</p>
          <span className="text-[11px] text-forest-700 font-medium">+4.5 hrs this week</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-charcoal-500 mb-2">
            <span>Certificates</span>
            <Award className="w-4 h-4 text-gold-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-serif text-forest-900">{student.stats.certificatesEarned}</p>
          <span className="text-[11px] text-gold-600 font-medium">Verified Credentials</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-charcoal-500 mb-2">
            <span>Current Streak</span>
            <TrendingUp className="w-4 h-4 text-forest-700" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-serif text-forest-900">{student.stats.currentStreakDays} Days</p>
          <span className="text-[11px] text-forest-700 font-medium">Personal best record</span>
        </div>
      </div>

      {/* Continue Learning + Upcoming Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Continue Learning Course Cards */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-forest-950">Continue Learning</h2>
            <button onClick={() => navigateTo('student-courses')} className="text-xs text-forest-800 font-semibold hover:underline">
              View All ({student.enrolledCourses.length})
            </button>
          </div>

          <div className="space-y-4">
            {student.enrolledCourses.map((enrolled) => {
              const course = courses.find(c => c.id === enrolled.courseId);
              if (!course) return null;

              return (
                <div key={enrolled.courseId} className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img src={course.thumbnail} alt={course.title} className="w-20 h-20 rounded-xl object-cover border border-ivory-200 flex-shrink-0" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gold-600 uppercase">{course.category}</span>
                      <h3 className="font-serif font-bold text-base text-charcoal-900 leading-snug">{course.title}</h3>
                      <p className="text-xs text-charcoal-500">Current: <span className="font-medium text-forest-900">{enrolled.currentLesson}</span></p>
                      <div className="flex items-center gap-3 pt-1">
                        <div className="w-36 bg-ivory-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-forest-700 h-full rounded-full" style={{ width: `${enrolled.progress}%` }}></div>
                        </div>
                        <span className="text-xs font-semibold text-forest-900">{enrolled.progress}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => navigateTo('course-overview', { courseId: course.id })}
                      className="px-3 py-1.5 rounded-lg border border-forest-800/20 text-forest-800 hover:bg-forest-50 text-xs font-medium"
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => navigateTo('course-player', { courseId: course.id, lessonId: enrolled.currentLessonId })}
                      className="px-4 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
                    >
                      <PlayCircle className="w-3.5 h-3.5 text-gold-400" />
                      <span>Resume</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Classes & Activity */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Classes */}
          <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-forest-950 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-forest-700" /> Upcoming Classes
            </h3>
            <div className="space-y-3">
              {student.upcomingClasses.map((item) => (
                <div key={item.id} className="p-3 bg-ivory-50 rounded-xl border border-ivory-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-gold-600 font-semibold text-[10px] uppercase">
                    <span>{item.type}</span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="font-semibold text-charcoal-900">{item.title}</h4>
                  <p className="text-charcoal-500">{item.instructor} · {item.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm space-y-3">
            <h3 className="font-serif font-bold text-base text-forest-950">Recent Activity</h3>
            <div className="divide-y divide-ivory-100 text-xs">
              {student.recentActivity.map((act) => (
                <div key={act.id} className="py-2.5 first:pt-0 last:pb-0">
                  <p className="font-medium text-charcoal-900">
                    <span className="text-forest-800 font-semibold">{act.action}:</span> {act.target}
                  </p>
                  <p className="text-[11px] text-charcoal-400 mt-0.5">{act.timestamp} {act.score ? `· Score: ${act.score}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentCourses() {
  const { student, courses, navigateTo } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest-950">My Enrolled Courses</h1>
          <p className="text-xs text-charcoal-500">Track your ongoing modules, progress percentages, and lesson completions.</p>
        </div>
        <button
          onClick={() => navigateTo('explore-courses')}
          className="px-4 py-2 bg-forest-800 text-white rounded-xl text-xs font-semibold shadow hover:bg-forest-900"
        >
          Explore More Courses
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {student.enrolledCourses.map((enrolled) => {
          const course = courses.find(c => c.id === enrolled.courseId);
          if (!course) return null;

          return (
            <div key={course.id} className="group bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm hover:shadow-md hover:border-forest-300 transition-all flex flex-col justify-between">
              <div>
                <div className="relative overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-forest-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="flex items-center gap-1.5 text-ivory-50 text-xs font-semibold bg-forest-900/85 border border-gold-400/30 px-3 py-1.5 rounded-lg translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                      <PlayCircle className="w-3.5 h-3.5 text-gold-400" /> Continue Learning
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-bold text-gold-600 uppercase">{course.category}</span>
                  <h3 className="font-serif font-bold text-base text-charcoal-900">{course.title}</h3>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-charcoal-600">
                      <span>Progress</span>
                      <span className="font-bold text-forest-900">{enrolled.progress}%</span>
                    </div>
                    <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-forest-700 h-full rounded-full" style={{ width: `${enrolled.progress}%` }}></div>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-500">Next: <strong className="text-charcoal-800">{enrolled.currentLesson}</strong></p>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-ivory-100 flex items-center justify-between gap-2 mt-3">
                <button
                  onClick={() => navigateTo('course-overview', { courseId: course.id })}
                  className="px-3 py-1.5 rounded-lg border border-forest-800/20 text-forest-800 text-xs font-medium"
                >
                  Overview
                </button>
                <button
                  onClick={() => navigateTo('course-player', { courseId: course.id, lessonId: enrolled.currentLessonId })}
                  className="px-4 py-1.5 rounded-lg bg-forest-800 text-white text-xs font-semibold shadow hover:bg-forest-900"
                >
                  Go to Player
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CourseOverview() {
  const { activeCourseId, courses, navigateTo, enrollCourse, student } = useApp();
  const course = courses.find(c => c.id === activeCourseId) || courses[0];
  const isEnrolled = student.enrolledCourses.some(c => c.courseId === course.id);

  return (
    <div className="space-y-8">
      {/* Course Header Banner */}
      <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-10 border border-forest-800 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-forest-800 text-gold-400 text-xs font-semibold">{course.category}</span>
            <span className="text-xs text-ivory-300">· {course.level}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">{course.title}</h1>
          <p className="text-xs sm:text-sm text-ivory-300 leading-relaxed max-w-2xl">{course.description}</p>
          <div className="flex items-center gap-4 text-xs text-ivory-300 pt-2">
            <span>★ {course.rating} ({course.reviewsCount} reviews)</span>
            <span>· {course.duration}</span>
            <span>· {course.lessonsCount} Lessons</span>
          </div>
          <div className="pt-2 flex items-center gap-3">
            {isEnrolled ? (
              <button
                onClick={() => navigateTo('course-player', { courseId: course.id, lessonId: 'l6' })}
                className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-charcoal-950 font-bold text-xs shadow flex items-center gap-2"
              >
                <PlayCircle className="w-4 h-4" /> Go to Course Player
              </button>
            ) : (
              <button
                onClick={() => enrollCourse(course.id)}
                className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-charcoal-950 font-bold text-xs shadow"
              >
                Enroll in Course (${course.price})
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-4">
          <img src={course.thumbnail} alt={course.title} className="rounded-2xl border border-forest-700 shadow-md w-full object-cover h-52" />
        </div>
      </div>

      {/* Syllabus Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <h2 className="font-serif text-xl font-bold text-forest-950">Curriculum Syllabus</h2>
          <div className="space-y-4">
            {course.syllabus?.map((mod, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm">
                <div className="p-4 bg-ivory-100/60 border-b border-ivory-200 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-sm text-charcoal-900">{mod.title}</h3>
                  <span className="text-xs text-charcoal-500">{mod.duration}</span>
                </div>
                <div className="p-4 space-y-2">
                  {mod.lessons?.map((les) => (
                    <div key={les.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-ivory-50 text-xs">
                      <div className="flex items-center gap-2.5">
                        <PlayCircle className="w-4 h-4 text-forest-700" />
                        <span className="font-medium text-charcoal-800">{les.title}</span>
                      </div>
                      <span className="text-charcoal-400 font-mono text-[11px]">{les.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructor Bio */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-forest-950">Your Instructor</h3>
            <div className="flex items-center gap-3">
              <img src={course.instructor.avatar} alt={course.instructor.name} className="w-14 h-14 rounded-full object-cover border border-forest-800" />
              <div>
                <h4 className="font-serif font-bold text-sm text-charcoal-900">{course.instructor.name}</h4>
                <p className="text-xs text-gold-600 font-semibold">{course.instructor.title}</p>
              </div>
            </div>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Dr. Thorne leads engineering research and mentors students through hands-on architecture teardowns and production reviews.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoursePlayer() {
  const { activeCourseId, activeLessonId, courses, completeLesson, lessonContent, addDiscussionComment, showToast } = useApp();
  const course = courses.find(c => c.id === activeCourseId) || courses[0];
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'quiz' | 'assignment' | 'discussion'
  const [isPlaying, setIsPlaying] = useState(false);
  const [discussionInput, setDiscussionInput] = useState('');

  // Quiz interactive state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const quiz = {
    title: "State Machines & Client Cache Assessment",
    questions: [
      {
        id: 1,
        question: "What is the primary benefit of modeling async UI with Finite State Machines (FSM)?",
        options: [
          "It eliminates invalid simultaneous states like loading and success",
          "It automatically renders CSS animations faster",
          "It stores data in localStorage instead of memory"
        ],
        correct: 0,
        explanation: "FSMs explicitly restrict state transitions, making illegal states mathematically impossible."
      },
      {
        id: 2,
        question: "When applying Stale-While-Revalidate caching, when does the background revalidation trigger?",
        options: [
          "Only when the browser restarts",
          "Immediately after serving the stale cache hit to the caller",
          "After an explicit 24-hour expiry timeout"
        ],
        correct: 1,
        explanation: "Stale-While-Revalidate serves cached content instantaneously while making an asynchronous fetch in the background."
      }
    ]
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    setQuizSubmitted(true);
    showToast('Quiz submitted! Review your score and explanations below.');
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold text-gold-600 uppercase tracking-wider">{course.title}</span>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-forest-950 mt-0.5">{lessonContent.title}</h1>
        </div>
        <button
          onClick={() => completeLesson(course.id, activeLessonId)}
          className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
        >
          <CheckCircle className="w-4 h-4 text-gold-400" />
          <span>Mark Lesson Completed</span>
        </button>
      </div>

      {/* Main Grid: Player + Lesson Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Video Player & Tabs */}
        <div className="lg:col-span-8 space-y-6">
          {/* Simulated Video Player */}
          <div className="relative rounded-2xl overflow-hidden bg-charcoal-950 aspect-video shadow-xl border border-charcoal-800 flex flex-col justify-between p-4">
            <div className="flex items-center justify-between text-xs text-white/80">
              <span className="bg-black/50 px-2 py-0.5 rounded font-mono">1080p HD</span>
              <span>{lessonContent.module}</span>
            </div>

            {/* Play Button Overlay */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-forest-800/90 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              >
                {isPlaying ? <PauseCircle className="w-8 h-8 text-gold-400" /> : <PlayCircle className="w-8 h-8 text-gold-400 ml-0.5" />}
              </button>
            </div>

            {/* Controls Bar */}
            <div className="space-y-2">
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                <div className="bg-gold-500 h-full rounded-full" style={{ width: isPlaying ? '45%' : '20%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px]">{isPlaying ? '14:20' : '05:12'} / {lessonContent.duration}</span>
                  <Volume2 className="w-4 h-4 text-white/70" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded font-mono">1.0x</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Lesson Tabs */}
          <div className="bg-white rounded-2xl border border-ivory-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-ivory-200 bg-ivory-50/60 overflow-x-auto">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'notes' ? 'border-forest-800 text-forest-900 bg-white' : 'border-transparent text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                Notes & Resources
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'quiz' ? 'border-forest-800 text-forest-900 bg-white' : 'border-transparent text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                Lesson Quiz
              </button>
              <button
                onClick={() => setActiveTab('assignment')}
                className={`px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'assignment' ? 'border-forest-800 text-forest-900 bg-white' : 'border-transparent text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                Module Assignment
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'discussion' ? 'border-forest-800 text-forest-900 bg-white' : 'border-transparent text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                Discussion ({lessonContent.discussion.length})
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'notes' && (
                <div className="space-y-5">
                  <div className="prose prose-sm max-w-none text-charcoal-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {lessonContent.notes}
                  </div>

                  <div className="pt-4 border-t border-ivory-200">
                    <h4 className="font-serif font-bold text-sm text-forest-950 mb-3">Downloadable Class Assets</h4>
                    <div className="space-y-2">
                      {lessonContent.resources.map((res, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-ivory-50 border border-ivory-200 text-xs">
                          <div className="flex items-center gap-2.5">
                            <FileText className="w-4 h-4 text-forest-700" />
                            <span className="font-medium text-charcoal-900">{res.name}</span>
                            <span className="text-[10px] text-charcoal-400">({res.size})</span>
                          </div>
                          <button
                            onClick={() => showToast(`Downloaded ${res.name}`)}
                            className="px-3 py-1 bg-white border border-forest-200 text-forest-800 rounded-lg hover:bg-forest-50 text-xs font-medium flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'quiz' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
                    <h3 className="font-serif font-bold text-base text-forest-950">{quiz.title}</h3>
                    <span className="text-xs text-charcoal-500">{quiz.questions.length} Questions</span>
                  </div>

                  <form onSubmit={handleQuizSubmit} className="space-y-6">
                    {quiz.questions.map((q, idx) => (
                      <div key={q.id} className="p-4 rounded-xl bg-ivory-50 border border-ivory-200 space-y-3">
                        <p className="font-semibold text-xs text-charcoal-900">
                          {idx + 1}. {q.question}
                        </p>
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isChosen = selectedAnswers[q.id] === optIdx;
                            const isCorrect = q.correct === optIdx;

                            return (
                              <label
                                key={optIdx}
                                className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                                  quizSubmitted
                                    ? isCorrect
                                      ? 'bg-forest-100 border-forest-400 text-forest-950 font-medium'
                                      : isChosen
                                      ? 'bg-red-50 border-red-300 text-red-900'
                                      : 'bg-white border-ivory-200'
                                    : isChosen
                                    ? 'bg-forest-50 border-forest-600 text-forest-900 font-medium'
                                    : 'bg-white border-ivory-200 hover:bg-ivory-100/50'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`question-${q.id}`}
                                  disabled={quizSubmitted}
                                  checked={isChosen}
                                  onChange={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: optIdx })}
                                  className="text-forest-800 focus:ring-forest-800"
                                />
                                <span>{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                        {quizSubmitted && (
                          <div className="p-2.5 rounded-lg bg-white border border-forest-200 text-xs text-forest-900 mt-2">
                            <strong>Explanation:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    ))}

                    {!quizSubmitted ? (
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold shadow"
                      >
                        Submit Quiz Responses
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setQuizSubmitted(false);
                          setSelectedAnswers({});
                        }}
                        className="px-4 py-2 rounded-xl border border-forest-800 text-forest-800 text-xs font-semibold"
                      >
                        Retake Quiz
                      </button>
                    )}
                  </form>
                </div>
              )}

              {activeTab === 'assignment' && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-base text-forest-950">Module Project Sprint #1</h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    Design and code an end-to-end authentication microservice featuring token rotation, rate limiting, and password hashing.
                  </p>
                  <div className="p-4 rounded-xl bg-ivory-50 border border-ivory-200 text-xs space-y-2">
                    <span className="font-semibold text-charcoal-900">Submission Requirements:</span>
                    <ul className="list-disc pl-5 space-y-1 text-charcoal-600">
                      <li>GitHub repository link with README documentation.</li>
                      <li>Unit test suite coverage reports.</li>
                      <li>Environment configuration schema (.env.example).</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => showToast('Redirecting to dedicated Assignment Submission portal...')}
                    className="px-4 py-2 bg-forest-800 text-white text-xs font-semibold rounded-lg shadow"
                  >
                    Open Assignment Portal
                  </button>
                </div>
              )}

              {activeTab === 'discussion' && (
                <div className="space-y-5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask a technical question to Dr. Thorne and classmates..."
                      value={discussionInput}
                      onChange={(e) => setDiscussionInput(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                    />
                    <button
                      onClick={() => {
                        if (discussionInput.trim()) {
                          addDiscussionComment(discussionInput);
                          setDiscussionInput('');
                        }
                      }}
                      className="px-4 py-2 bg-forest-800 text-white text-xs font-semibold rounded-lg shadow hover:bg-forest-900"
                    >
                      Post Question
                    </button>
                  </div>

                  <div className="space-y-4">
                    {lessonContent.discussion.map((disc) => (
                      <div key={disc.id} className="p-4 rounded-xl bg-ivory-50 border border-ivory-200 space-y-2 text-xs">
                        <div className="flex items-center gap-2.5">
                          <img src={disc.avatar} alt={disc.author} className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-semibold text-charcoal-900">{disc.author}</span>
                          <span className="text-[10px] text-charcoal-400">{disc.date}</span>
                        </div>
                        <p className="text-charcoal-700 pl-8">{disc.text}</p>
                        {disc.replies?.map((rep) => (
                          <div key={rep.id} className="ml-8 mt-2 p-2.5 bg-white rounded-lg border border-forest-200 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-forest-900">{rep.author}</span>
                              <span className="text-[10px] bg-forest-100 text-forest-800 px-1.5 py-0.5 rounded font-bold">Faculty</span>
                            </div>
                            <p className="text-charcoal-600">{rep.text}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Chapter Accordion & Lesson Navigation */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-ivory-200 p-5 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-forest-950">Curriculum Navigation</h3>
            <div className="space-y-3">
              {course.syllabus?.map((mod, idx) => (
                <div key={idx} className="border border-ivory-200 rounded-xl overflow-hidden">
                  <div className="p-3 bg-ivory-100/60 font-serif font-bold text-xs text-charcoal-900 border-b border-ivory-200 flex justify-between items-center">
                    <span>{mod.title}</span>
                    <span className="text-[10px] text-charcoal-500 font-sans">{mod.duration}</span>
                  </div>
                  <div className="divide-y divide-ivory-100">
                    {mod.lessons?.map((les) => {
                      const isCurrent = les.id === activeLessonId;
                      return (
                        <button
                          key={les.id}
                          onClick={() => showToast(`Loaded lesson: ${les.title}`)}
                          className={`w-full text-left p-3 text-xs flex items-center justify-between transition-colors ${
                            isCurrent ? 'bg-forest-50 text-forest-900 font-bold border-l-4 border-forest-800' : 'hover:bg-ivory-50 text-charcoal-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {les.completed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
                            ) : (
                              <PlayCircle className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0" />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] text-charcoal-400 font-mono ml-2">{les.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExploreCourses() {
  const { courses, enrollCourse, navigateTo } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-forest-950">Explore Academic Programs</h1>
        <p className="text-xs text-charcoal-500">Discover new tracks, earn specialized badges, and expand your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="group bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm hover:shadow-md hover:border-forest-300 transition-all flex flex-col justify-between">
            <div>
              <div className="relative overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-forest-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="flex items-center gap-1.5 text-ivory-50 text-xs font-semibold bg-forest-900/85 border border-gold-400/30 px-3 py-1.5 rounded-lg translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-3.5 h-3.5 text-gold-400" /> View Course
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-gold-600 uppercase">{course.category}</span>
                <h3 className="font-serif font-bold text-base text-charcoal-900 leading-snug">{course.title}</h3>
                <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">{course.description}</p>
                <div className="flex items-center justify-between text-xs text-charcoal-500 pt-2 border-t border-ivory-100">
                  <span>{course.duration} · {course.level}</span>
                  <span className="font-bold text-forest-900 text-sm">${course.price}</span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 border-t border-ivory-100 flex items-center justify-between gap-2 mt-3">
              <button
                onClick={() => navigateTo('course-overview', { courseId: course.id })}
                className="px-3 py-1.5 rounded-lg border border-forest-800/20 text-forest-800 text-xs font-medium"
              >
                Syllabus
              </button>
              <button
                onClick={() => enrollCourse(course.id)}
                className="px-4 py-1.5 rounded-lg bg-forest-800 text-white text-xs font-semibold shadow hover:bg-forest-900"
              >
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentAssignments() {
  const { assignments, submitAssignment, showToast } = useApp();
  const [selectedAsg, setSelectedAsg] = useState(null);
  const [fileName, setFileName] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAsg) return;
    submitAssignment(selectedAsg.id, fileName || 'Sprint1_Auth_Service.zip', notes);
    setSelectedAsg(null);
    setFileName('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-forest-950">Academic Assignments & Sprints</h1>
        <p className="text-xs text-charcoal-500">Submit your engineering codebases, view rubric grading, and inspect faculty feedback.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {assignments.map((asg) => (
          <div key={asg.id} className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-gold-600 uppercase">{asg.courseTitle}</span>
                <h3 className="font-serif font-bold text-base text-charcoal-900">{asg.title}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-auto ${
                asg.status === 'Graded'
                  ? 'bg-forest-100 text-forest-900 border border-forest-300'
                  : asg.status === 'Submitted'
                  ? 'bg-gold-100 text-gold-900 border border-gold-300'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {asg.status}: {asg.currentGrade ? `${asg.currentGrade}/100` : asg.dueStatus}
              </span>
            </div>

            <p className="text-xs text-charcoal-600 leading-relaxed">{asg.description}</p>

            {asg.feedback && (
              <div className="p-3.5 rounded-xl bg-forest-50/80 border border-forest-200 text-xs space-y-1">
                <span className="font-semibold text-forest-900">Faculty Feedback:</span>
                <p className="text-charcoal-700 italic">{asg.feedback}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-ivory-100 text-xs">
              <span className="text-charcoal-500">Deadline: <strong>{asg.dueDate}</strong></span>
              {asg.status === 'Pending Submission' && (
                <button
                  onClick={() => setSelectedAsg(asg)}
                  className="px-4 py-1.5 rounded-lg bg-forest-800 text-white text-xs font-semibold shadow hover:bg-forest-900"
                >
                  Upload Submission
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {selectedAsg && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-forest-950">Submit Assignment</h3>
            <p className="text-xs text-charcoal-600">{selectedAsg.title}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Archive File Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sprint1_Submission.zip"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Notes for Reviewer</label>
                <textarea
                  rows="3"
                  placeholder="Explain instructions to run your test suite or live demo URL..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAsg(null)}
                  className="px-4 py-2 border border-ivory-300 rounded-lg text-xs font-medium text-charcoal-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-forest-800 text-white rounded-lg text-xs font-semibold shadow"
                >
                  Confirm Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StudentCertificates() {
  const { certificates, showToast } = useApp();
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-forest-950">Verified Academic Credentials</h1>
        <p className="text-xs text-charcoal-500">Cryptographically verifiable diplomas issued upon passing all capstone rubric audits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-2xl border border-ivory-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-gold-100 text-gold-900 text-[10px] font-bold uppercase tracking-wider">{cert.badge}</span>
                <span className="text-[11px] font-mono text-charcoal-400">{cert.id}</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-charcoal-900">{cert.courseTitle}</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">{cert.description}</p>
              <div className="text-xs text-charcoal-500 space-y-1 pt-2 border-t border-ivory-100">
                <p>Issued to: <strong>{cert.studentName}</strong></p>
                <p>Issue Date: <strong>{cert.issuedDate}</strong> · {cert.hours}</p>
                <p>Faculty Signatory: <strong>{cert.instructor}</strong></p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSelectedCert(cert)}
                className="flex-1 py-2 rounded-lg bg-forest-800 text-white text-xs font-semibold shadow hover:bg-forest-900 flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> View Certificate
              </button>
              <button
                onClick={() => {
                  setSelectedCert(cert);
                  setTimeout(() => window.print(), 300);
                }}
                className="py-2 px-3 rounded-lg border border-forest-800/20 text-forest-800 hover:bg-forest-50 text-xs font-medium flex items-center gap-1"
                title="Print or Save PDF"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 border-4 border-gold-400 shadow-2xl relative space-y-6 text-center" id="printable-certificate">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-900 print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-forest-900 text-gold-400 flex items-center justify-center mx-auto border-2 border-gold-400 shadow-md">
              <GraduationCap className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-serif tracking-widest text-gold-600 font-bold">Nexus Academic Board of Standards</span>
              <h2 className="font-serif text-3xl font-bold text-forest-950">Certificate of Completion</h2>
              <p className="text-xs text-charcoal-500">This credential certifies that</p>
            </div>

            <h3 className="font-serif text-2xl font-bold text-forest-900 underline decoration-gold-400 underline-offset-8">
              {selectedCert.studentName}
            </h3>

            <p className="text-xs text-charcoal-600 max-w-md mx-auto leading-relaxed">
              Has completed the prescribed curriculum and demonstrated mastery in
            </p>

            <h4 className="font-serif text-lg font-bold text-charcoal-900">{selectedCert.courseTitle}</h4>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-ivory-200 text-xs text-charcoal-600 max-w-md mx-auto">
              <div>
                <p className="font-bold text-charcoal-900 font-serif italic text-sm">{selectedCert.instructor}</p>
                <p className="text-[10px] text-charcoal-400 uppercase mt-0.5">Faculty Director</p>
              </div>
              <div>
                <p className="font-bold text-charcoal-900 font-mono">{selectedCert.id}</p>
                <p className="text-[10px] text-charcoal-400 uppercase mt-0.5">Credential ID</p>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3 print:hidden">
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-forest-800 text-white rounded-lg text-xs font-semibold shadow flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StudentMessages() {
  const { messages, sendMessage } = useApp();
  const [activeThreadId, setActiveThreadId] = useState(messages[0]?.id);
  const [replyText, setReplyText] = useState('');

  const activeThread = messages.find(m => m.id === activeThreadId) || messages[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    sendMessage(activeThreadId, replyText);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-forest-950">Faculty & Advisor Communications</h1>
        <p className="text-xs text-charcoal-500">Direct messaging channels with instructors and thesis advisors.</p>
      </div>

      <div className="bg-white rounded-2xl border border-ivory-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
        {/* Thread List */}
        <div className="md:col-span-4 border-r border-ivory-200 divide-y divide-ivory-100">
          {messages.map((thread) => (
            <div
              key={thread.id}
              onClick={() => setActiveThreadId(thread.id)}
              className={`p-4 cursor-pointer transition-colors flex items-center gap-3 ${
                thread.id === activeThreadId ? 'bg-forest-50' : 'hover:bg-ivory-50'
              }`}
            >
              <img src={thread.avatar} alt={thread.sender} className="w-10 h-10 rounded-full object-cover border border-ivory-200" />
              <div className="overflow-hidden flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-xs text-charcoal-900 truncate">{thread.sender}</h4>
                  <span className="text-[10px] text-charcoal-400">{thread.lastTime}</span>
                </div>
                <p className="text-[11px] text-gold-600 font-medium">{thread.role}</p>
                <p className="text-xs text-charcoal-500 truncate mt-0.5">{thread.messages[thread.messages.length - 1]?.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Conversation View */}
        <div className="md:col-span-8 flex flex-col justify-between p-6">
          <div className="flex items-center gap-3 pb-4 border-b border-ivory-100">
            <img src={activeThread.avatar} alt={activeThread.sender} className="w-10 h-10 rounded-full object-cover border border-forest-800" />
            <div>
              <h3 className="font-serif font-bold text-sm text-charcoal-900">{activeThread.sender}</h3>
              <p className="text-xs text-gold-600 font-medium">{activeThread.role}</p>
            </div>
          </div>

          <div className="py-4 space-y-3 flex-1 overflow-y-auto max-h-80">
            {activeThread.messages.map((m) => {
              const isMe = m.senderId === 'std-9021';
              return (
                <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-xl max-w-sm text-xs space-y-1 ${
                    isMe ? 'bg-forest-800 text-white rounded-br-none' : 'bg-ivory-100 text-charcoal-900 rounded-bl-none'
                  }`}>
                    <p>{m.text}</p>
                    <span className={`text-[10px] block text-right ${isMe ? 'text-white/60' : 'text-charcoal-400'}`}>{m.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSend} className="pt-3 border-t border-ivory-100 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-forest-800 text-white rounded-lg text-xs font-semibold shadow hover:bg-forest-900 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function StudentProfile() {
  const { student, setStudent, showToast, adminData } = useApp();
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'account' | 'security' | 'payments'
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    phone: student.phone,
    bio: student.bio,
    location: student.location,
    timeZone: student.timeZone
  });

  const handleSave = (e) => {
    e.preventDefault();
    setStudent(prev => ({
      ...prev,
      ...formData
    }));
    showToast('Profile information successfully updated!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-forest-950">Student Profile & Settings</h1>
        <p className="text-xs text-charcoal-500">Manage your identity credentials, notifications, and tuition payment invoices.</p>
      </div>

      <div className="bg-white rounded-2xl border border-ivory-200 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-ivory-200 bg-ivory-50/60 overflow-x-auto">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-5 py-3 text-xs font-semibold border-b-2 whitespace-nowrap ${
              activeTab === 'personal' ? 'border-forest-800 text-forest-900 bg-white' : 'border-transparent text-charcoal-600'
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`px-5 py-3 text-xs font-semibold border-b-2 whitespace-nowrap ${
              activeTab === 'account' ? 'border-forest-800 text-forest-900 bg-white' : 'border-transparent text-charcoal-600'
            }`}
          >
            Account Settings
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-5 py-3 text-xs font-semibold border-b-2 whitespace-nowrap ${
              activeTab === 'security' ? 'border-forest-800 text-forest-900 bg-white' : 'border-transparent text-charcoal-600'
            }`}
          >
            Security & Login
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-5 py-3 text-xs font-semibold border-b-2 whitespace-nowrap ${
              activeTab === 'payments' ? 'border-forest-800 text-forest-900 bg-white' : 'border-transparent text-charcoal-600'
            }`}
          >
            Payment History ({adminData.transactions.length})
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'personal' && (
            <form onSubmit={handleSave} className="space-y-5 max-w-2xl">
              <div className="flex items-center gap-4">
                <img src={student.avatar} alt={student.name} className="w-16 h-16 rounded-full object-cover border-2 border-forest-800" />
                <button
                  type="button"
                  onClick={() => showToast('Avatar change dialog simulation')}
                  className="px-3.5 py-1.5 border border-forest-800/30 text-forest-800 rounded-lg text-xs font-medium"
                >
                  Change Photo
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Academic Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Academic Bio</label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold shadow"
              >
                Save Profile Changes
              </button>
            </form>
          )}

          {activeTab === 'account' && (
            <div className="space-y-4 max-w-xl text-xs">
              <h3 className="font-serif font-bold text-sm text-forest-950">Notification Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-ivory-50 rounded-xl border border-ivory-200 cursor-pointer">
                  <span>Email notifications for graded assignments</span>
                  <input type="checkbox" defaultChecked className="rounded text-forest-800" />
                </label>
                <label className="flex items-center justify-between p-3 bg-ivory-50 rounded-xl border border-ivory-200 cursor-pointer">
                  <span>Reminders for live faculty office hours</span>
                  <input type="checkbox" defaultChecked className="rounded text-forest-800" />
                </label>
                <label className="flex items-center justify-between p-3 bg-ivory-50 rounded-xl border border-ivory-200 cursor-pointer">
                  <span>Weekly academic progress digests</span>
                  <input type="checkbox" defaultChecked className="rounded text-forest-800" />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-5 max-w-md text-xs">
              <h3 className="font-serif font-bold text-sm text-forest-950">Change Password</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-charcoal-700 mb-1 font-semibold">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900" />
                </div>
                <div>
                  <label className="block text-charcoal-700 mb-1 font-semibold">New Password</label>
                  <input type="password" placeholder="Minimum 8 characters" className="w-full px-3 py-2 bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900" />
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Password updated successfully!')}
                  className="px-4 py-2 bg-forest-800 text-white rounded-lg font-semibold shadow"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-sm text-forest-950">Tuition & Invoice History</h3>
                <button
                  onClick={() => showToast('All invoices downloaded as ZIP archive.')}
                  className="px-3 py-1.5 border border-forest-800/30 text-forest-800 text-xs rounded-lg font-medium"
                >
                  Download All Receipts
                </button>
              </div>

              <div className="overflow-x-auto border border-ivory-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-ivory-100 text-charcoal-700 font-semibold border-b border-ivory-200">
                    <tr>
                      <th className="p-3">Invoice #</th>
                      <th className="p-3">Course</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Payment Method</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ivory-100">
                    {adminData.transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-ivory-50">
                        <td className="p-3 font-mono font-medium text-forest-900">{tx.id}</td>
                        <td className="p-3 font-medium text-charcoal-900">{tx.course}</td>
                        <td className="p-3 text-charcoal-500">{tx.date}</td>
                        <td className="p-3 font-bold text-charcoal-900">${tx.amount}</td>
                        <td className="p-3 text-charcoal-500">{tx.method}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-forest-100 text-forest-900 text-[10px] font-semibold">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ADMIN ROUTER & PORTAL PAGES
========================================================================= */
function AdminRouter({ view, createCourseOpen, setCreateCourseOpen }) {
  switch (view) {
    case 'admin-courses':
      return <AdminCourses createOpen={createCourseOpen} setCreateOpen={setCreateCourseOpen} />;
    case 'admin-students': return <AdminStudents />;
    case 'admin-instructors': return <AdminInstructors />;
    case 'admin-certificates': return <AdminCertificates />;
    case 'admin-revenue': return <AdminRevenue />;
    case 'admin-notifications': return <AdminNotifications />;
    case 'admin-settings': return <AdminSettings />;
    case 'admin-dashboard':
    default:
      return <AdminDashboard onNewCourse={() => setCreateCourseOpen(true)} />;
  }
}

function AdminDashboard({ onNewCourse }) {
  const { adminData, courses, studentsList, navigateTo } = useApp();

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-ivory-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">Executive Overview</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">Academic Administration Console</h1>
          <p className="text-xs sm:text-sm text-charcoal-500">Live platform metrics, student enrollments, and curriculum activity.</p>
        </div>
        <button
          onClick={onNewCourse}
          className="px-4 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-gold-400" />
          <span>Publish New Course</span>
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-charcoal-500 mb-2">
            <span>Total Active Students</span>
            <Users className="w-4 h-4 text-forest-700" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-serif text-forest-900">{adminData.metrics.totalStudents.toLocaleString()}</p>
          <span className="text-[11px] text-forest-700 font-medium">+142 this month</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-charcoal-500 mb-2">
            <span>Published Programs</span>
            <BookOpen className="w-4 h-4 text-forest-700" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-serif text-forest-900">{courses.length}</p>
          <span className="text-[11px] text-forest-700 font-medium">5 Core Disciplines</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-charcoal-500 mb-2">
            <span>Gross Tuition Volume</span>
            <DollarSign className="w-4 h-4 text-gold-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-serif text-forest-900">${adminData.metrics.grossRevenue.toLocaleString()}</p>
          <span className="text-[11px] text-gold-600 font-medium">Fiscal Year 2026</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-charcoal-500 mb-2">
            <span>Completion Rate</span>
            <TrendingUp className="w-4 h-4 text-forest-700" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-serif text-forest-900">{adminData.metrics.completionRate}</p>
          <span className="text-[11px] text-forest-700 font-medium">Industry High</span>
        </div>
      </div>

      {/* Course Analytics & Recent Enrollments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-ivory-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-forest-950">Course Enrollment Analytics</h3>
            <button onClick={() => navigateTo('admin-courses')} className="text-xs text-forest-800 font-semibold hover:underline">
              Manage Courses
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-ivory-50 text-charcoal-600 border-b border-ivory-200">
                <tr>
                  <th className="p-3">Course Title</th>
                  <th className="p-3">Scholars</th>
                  <th className="p-3">Completion %</th>
                  <th className="p-3">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-100">
                {adminData.courseAnalytics.map((item, i) => (
                  <tr key={i} className="hover:bg-ivory-50">
                    <td className="p-3 font-semibold text-charcoal-900">{item.courseTitle}</td>
                    <td className="p-3 font-mono">{item.enrollments.toLocaleString()}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-ivory-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-forest-700 h-full rounded-full" style={{ width: `${item.completion}%` }}></div>
                        </div>
                        <span className="font-mono">{item.completion}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-gold-600 font-bold">★ {item.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-ivory-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-forest-950">Recent Admissions</h3>
          <div className="divide-y divide-ivory-100 text-xs">
            {studentsList.slice(0, 5).map((std) => (
              <div key={std.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-charcoal-900">{std.name}</p>
                  <p className="text-[11px] text-charcoal-500">{std.email}</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-forest-50 text-forest-800 text-[10px] font-semibold">
                  {std.enrolledCourses} Courses
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminCourses({ createOpen, setCreateOpen }) {
  const { courses, addCourse, showToast } = useApp();
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Development');
  const [newPrice, setNewPrice] = useState(499);
  const [newDuration, setNewDuration] = useState('10 Weeks');
  const [newLevel, setNewLevel] = useState('Intermediate');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle) {
      showToast('Please specify course title.', 'error');
      return;
    }
    addCourse({
      title: newTitle,
      category: newCategory,
      price: Number(newPrice),
      duration: newDuration,
      level: newLevel,
      description: newDesc || 'Comprehensive curriculum on systems architecture.',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      instructor: {
        name: 'Dr. Marcus Thorne',
        title: 'Principal Engineer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      }
    });
    setCreateOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest-950">Course Management</h1>
          <p className="text-xs text-charcoal-500">Configure academic courses, modules, lessons, and assignments.</p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow"
        >
          <PlusCircle className="w-4 h-4 text-gold-400" />
          <span>Add Course</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-100 text-charcoal-700 font-semibold border-b border-ivory-200">
              <tr>
                <th className="p-3">Course Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Level</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Tuition</th>
                <th className="p-3">Enrolled</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-100">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-ivory-50">
                  <td className="p-3 font-semibold text-charcoal-900 max-w-xs truncate">{course.title}</td>
                  <td className="p-3 text-gold-700 font-medium">{course.category}</td>
                  <td className="p-3">{course.level}</td>
                  <td className="p-3 text-charcoal-500">{course.duration}</td>
                  <td className="p-3 font-bold text-forest-900">${course.price}</td>
                  <td className="p-3 font-mono">{course.enrolledCount}</td>
                  <td className="p-3">
                    <button
                      onClick={() => showToast(`Edit mode opened for ${course.title}`)}
                      className="text-forest-800 font-semibold hover:underline mr-3"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Course Modal */}
      {createOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-forest-950">Create New Academic Program</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Database Architecture"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                  >
                    <option>Development</option>
                    <option>Data Science</option>
                    <option>Design</option>
                    <option>DevOps & Cloud</option>
                    <option>Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Tuition ($)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Outline core architectural concepts taught in this program..."
                  className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateOpen(false)}
                  className="px-4 py-2 border border-ivory-300 rounded-lg text-xs font-medium text-charcoal-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-forest-800 text-white rounded-lg text-xs font-semibold shadow"
                >
                  Publish Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminStudents() {
  const { studentsList, showToast } = useApp();
  const [search, setSearch] = useState('');

  const filtered = studentsList.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest-950">Student Directory & Academic Progress</h1>
          <p className="text-xs text-charcoal-500">Monitor individual scholar milestone completion and course grades.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-ivory-200 rounded-lg text-charcoal-900"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-100 text-charcoal-700 font-semibold border-b border-ivory-200">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Enrolled Courses</th>
                <th className="p-3">Overall Progress</th>
                <th className="p-3">Status</th>
                <th className="p-3">Joined</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-100">
              {filtered.map((std) => (
                <tr key={std.id} className="hover:bg-ivory-50">
                  <td className="p-3 font-semibold text-charcoal-900">{std.name}</td>
                  <td className="p-3 text-charcoal-500">{std.email}</td>
                  <td className="p-3 font-mono">{std.enrolledCourses}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-forest-700 h-full rounded-full" style={{ width: `${std.progress}%` }}></div>
                      </div>
                      <span className="font-mono">{std.progress}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-forest-50 text-forest-800 text-[10px] font-semibold">
                      {std.status}
                    </span>
                  </td>
                  <td className="p-3 text-charcoal-500">{std.joinDate}</td>
                  <td className="p-3">
                    <button
                      onClick={() => showToast(`Viewing academic transcript for ${std.name}`)}
                      className="text-forest-800 font-semibold hover:underline"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminInstructors() {
  const { instructors, addInstructor, showToast } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [dept, setDept] = useState('');
  const [email, setEmail] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    addInstructor({ name, title, department: dept, email, bio: 'Experienced academic researcher and practitioner.' });
    setModalOpen(false);
    setName('');
    setEmail('');
    setTitle('');
    setDept('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest-950">Faculty & Instructor Directory</h1>
          <p className="text-xs text-charcoal-500">Manage academic departments, instructor assignments, and ratings.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow"
        >
          <PlusCircle className="w-4 h-4 text-gold-400" />
          <span>Add Faculty</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {instructors.map((inst) => (
          <div key={inst.id} className="bg-white rounded-2xl border border-ivory-200 p-5 shadow-sm space-y-3 text-center">
            <img src={inst.avatar} alt={inst.name} className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-forest-800" />
            <div>
              <h3 className="font-serif font-bold text-sm text-charcoal-900">{inst.name}</h3>
              <p className="text-xs text-gold-600 font-semibold">{inst.title}</p>
              <p className="text-[11px] text-charcoal-500">{inst.department}</p>
            </div>
            <div className="p-2.5 bg-ivory-50 rounded-xl border border-ivory-200 text-xs flex justify-around">
              <div>
                <span className="text-[10px] text-charcoal-400 block uppercase">Students</span>
                <span className="font-bold text-forest-900">{inst.studentsTaught.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-400 block uppercase">Rating</span>
                <span className="font-bold text-gold-600">★ {inst.rating}</span>
              </div>
            </div>
            <button
              onClick={() => showToast(`Faculty details for ${inst.name}`)}
              className="w-full py-1.5 border border-forest-800/20 text-forest-800 rounded-lg text-xs font-medium hover:bg-forest-50"
            >
              View Faculty Record
            </button>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-forest-950">Add Faculty Member</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Title</label>
                <input required type="text" placeholder="Principal Architect" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Email</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">Department</label>
                <select required value={dept} onChange={e => setDept(e.target.value)} className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg">
                  <option value="">Select department</option>
                  <option>Software Engineering & Systems</option>
                  <option>Data Science & AI</option>
                  <option>Design Systems & HCI</option>
                  <option>Cloud Infrastructure & DevOps</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded-lg text-xs">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-forest-800 text-white rounded-lg text-xs font-semibold">Save Faculty</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminCertificates() {
  const { certificates, adminData, showToast } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest-950">Certificates & Credentials Registry</h1>
          <p className="text-xs text-charcoal-500">Manage diploma templates and cryptographic verification registries.</p>
        </div>
        <button
          onClick={() => showToast('New Certificate Template Designer opened')}
          className="px-4 py-2 bg-forest-800 text-white rounded-xl text-xs font-semibold shadow"
        >
          Create New Template
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-ivory-200 p-6 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-base text-forest-950">Active Certificate Templates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {adminData.certificateTemplates.map((tpl) => (
            <div key={tpl.id} className="p-4 rounded-xl bg-ivory-50 border border-ivory-200 space-y-2 text-xs">
              <h4 className="font-bold text-charcoal-900">{tpl.name}</h4>
              <p className="text-charcoal-500">Border: {tpl.borderStyle}</p>
              <p className="text-charcoal-500">Typography: {tpl.font}</p>
              <span className="text-[10px] text-forest-800 font-semibold bg-forest-100 px-2 py-0.5 rounded">
                Used in {tpl.activeUsage} programs
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-ivory-200 font-serif font-bold text-sm text-forest-950">
          Recently Issued Student Certificates
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-50 text-charcoal-600 border-b border-ivory-200">
              <tr>
                <th className="p-3">Credential ID</th>
                <th className="p-3">Recipient</th>
                <th className="p-3">Program</th>
                <th className="p-3">Issue Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-100">
              {certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-ivory-50">
                  <td className="p-3 font-mono font-medium text-forest-900">{cert.id}</td>
                  <td className="p-3 font-semibold text-charcoal-900">{cert.studentName}</td>
                  <td className="p-3 text-charcoal-700">{cert.courseTitle}</td>
                  <td className="p-3 text-charcoal-500">{cert.issuedDate}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-forest-100 text-forest-900 text-[10px] font-semibold">
                      Verified & Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminRevenue() {
  const { adminData, showToast } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest-950">Financial Ledger & Revenue Breakdown</h1>
          <p className="text-xs text-charcoal-500">Gross tuition receipts, student enrollment transactions, and fiscal reports.</p>
        </div>
        <button
          onClick={() => showToast('Generated CSV financial report for download.')}
          className="px-4 py-2 bg-forest-800 text-white rounded-xl text-xs font-semibold shadow hover:bg-forest-900 flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Financial CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
          <span className="text-xs text-charcoal-500">Total Fiscal Revenue</span>
          <p className="text-3xl font-serif font-bold text-forest-900 mt-1">${adminData.metrics.grossRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
          <span className="text-xs text-charcoal-500">Average Transaction Size</span>
          <p className="text-3xl font-serif font-bold text-forest-900 mt-1">$489.00</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
          <span className="text-xs text-charcoal-500">Refund Rate</span>
          <p className="text-3xl font-serif font-bold text-forest-900 mt-1">0.4%</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-ivory-200 font-serif font-bold text-sm text-forest-950">
          Transaction Journal
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-100 text-charcoal-700 font-semibold border-b border-ivory-200">
              <tr>
                <th className="p-3">Tx ID</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Course</th>
                <th className="p-3">Date</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Method</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-100">
              {adminData.transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-ivory-50">
                  <td className="p-3 font-mono font-medium text-forest-900">{tx.id}</td>
                  <td className="p-3 font-semibold text-charcoal-900">{tx.student}</td>
                  <td className="p-3 text-charcoal-700">{tx.course}</td>
                  <td className="p-3 text-charcoal-500">{tx.date}</td>
                  <td className="p-3 font-bold text-charcoal-900">${tx.amount}</td>
                  <td className="p-3 text-charcoal-500">{tx.method}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-forest-100 text-forest-900 text-[10px] font-semibold">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminNotifications() {
  const { adminData, showToast } = useApp();
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState('All Students');
  const [msg, setMsg] = useState('');

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!title || !msg) return;
    showToast(`Broadcast "${title}" dispatched to ${audience}!`);
    setTitle('');
    setMsg('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-forest-950">System Announcements & Broadcasts</h1>
        <p className="text-xs text-charcoal-500">Dispatch urgent platform bulletins, schedule maintenance windows, or send cohort alerts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-ivory-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-forest-950">Compose Announcement</h3>
          <form onSubmit={handleBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">Announcement Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Scheduled Platform Maintenance Window"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">Target Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
              >
                <option>All Students</option>
                <option>Faculty Only</option>
                <option>All Users</option>
                <option>Graduating Cohort 2026</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">Message Content</label>
              <textarea
                rows="4"
                required
                placeholder="Detail announcement timeline, impacted services, and instructions..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold shadow"
            >
              Dispatch Broadcast
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-ivory-200 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-forest-950">Broadcast Audit Log</h3>
          <div className="divide-y divide-ivory-100 text-xs">
            {adminData.notifications.map((n) => (
              <div key={n.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                <div className="flex items-center justify-between font-semibold text-charcoal-900">
                  <span>{n.title}</span>
                  <span className="text-[10px] text-charcoal-400 font-normal">{n.date}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-charcoal-500">
                  <span>Audience: <strong>{n.audience}</strong></span>
                  <span>{n.reads} Reads</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminSettings() {
  const { showToast } = useApp();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-serif text-2xl font-bold text-forest-950">Platform Settings & Configuration</h1>
        <p className="text-xs text-charcoal-500">Global academic parameters, branding styles, and security enforcement.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-sm space-y-5 text-xs">
        <div>
          <label className="block text-charcoal-700 mb-1 font-semibold">Institution Name</label>
          <input type="text" defaultValue="Nexus LMS — Modern Learning Management System" className="w-full px-3 py-2 bg-ivory-50 border border-ivory-200 rounded-lg text-charcoal-900" />
        </div>

        <div>
          <label className="block text-charcoal-700 mb-1 font-semibold">Primary Brand Theme</label>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-forest-900 border border-forest-700"></span>
            <span className="w-6 h-6 rounded-full bg-ivory-50 border border-ivory-300"></span>
            <span className="w-6 h-6 rounded-full bg-gold-500 border border-gold-400"></span>
            <span className="text-charcoal-600">Deep Green (#143D2B), Warm Ivory (#FAF8F5), Warm Gold (#D4AF37)</span>
          </div>
        </div>

        <div className="pt-2 border-t border-ivory-200 space-y-3">
          <label className="flex items-center justify-between p-3 bg-ivory-50 rounded-xl border border-ivory-200 cursor-pointer">
            <div>
              <p className="font-semibold text-charcoal-900">Enforce Two-Factor Authentication (2FA)</p>
              <p className="text-[11px] text-charcoal-500">Require all faculty and staff to verify credentials via OTP.</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded text-forest-800" />
          </label>

          <label className="flex items-center justify-between p-3 bg-ivory-50 rounded-xl border border-ivory-200 cursor-pointer">
            <div>
              <p className="font-semibold text-charcoal-900">Maintenance Mode</p>
              <p className="text-[11px] text-charcoal-500">Restrict access to system administrators only.</p>
            </div>
            <input type="checkbox" className="rounded text-forest-800" />
          </label>
        </div>

        <button
          type="button"
          onClick={() => showToast('Platform configuration changes applied.')}
          className="px-5 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl font-semibold shadow"
        >
          Save Platform Changes
        </button>
      </div>
    </div>
  );
}
