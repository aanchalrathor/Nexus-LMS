import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialCourses,
  initialStudentData,
  initialAssignments,
  initialQuizzes,
  initialCertificates,
  initialInstructors,
  initialStudentsList,
  initialGallery,
  initialPlacements,
  initialMessages,
  initialAdminData,
  sampleLessonContent
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & View State
  const [currentView, setCurrentView] = useState('home');
  const [viewParams, setViewParams] = useState({});
  const [userRole, setUserRole] = useState('public'); // 'public', 'student', 'admin'
  const [activeCourseId, setActiveCourseId] = useState('cs-101');
  const [activeLessonId, setActiveLessonId] = useState('l6');
  
  // Data States
  const [courses, setCourses] = useState(initialCourses);
  const [student, setStudent] = useState(initialStudentData);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [instructors, setInstructors] = useState(initialInstructors);
  const [studentsList, setStudentsList] = useState(initialStudentsList);
  const [gallery] = useState(initialGallery);
  const [placements] = useState(initialPlacements);
  const [messages, setMessages] = useState(initialMessages);
  const [adminData, setAdminData] = useState(initialAdminData);
  const [lessonContent, setLessonContent] = useState(sampleLessonContent);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const navigateTo = (view, params = {}) => {
    setCurrentView(view);
    setViewParams(params);
    if (params.courseId) {
      setActiveCourseId(params.courseId);
    }
    if (params.lessonId) {
      setActiveLessonId(params.lessonId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch demo roles seamlessly
  const switchRole = (role) => {
    setUserRole(role);
    if (role === 'student') {
      navigateTo('student-dashboard');
      showToast('Switched to Student Portal view');
    } else if (role === 'admin') {
      navigateTo('admin-dashboard');
      showToast('Switched to Admin Portal view (Demo: Academic Director)');
    } else {
      navigateTo('home');
      showToast('Switched to Public Website view');
    }
  };

  // Course Enrollment
  const enrollCourse = (courseId) => {
    const existing = student.enrolledCourses.find(c => c.courseId === courseId);
    if (existing) {
      showToast('You are already enrolled in this course!', 'info');
      navigateTo('course-overview', { courseId });
      return;
    }
    const targetCourse = courses.find(c => c.id === courseId);
    const newEnrollment = {
      courseId,
      progress: 0,
      lastAccessed: 'Just now',
      currentLesson: targetCourse?.syllabus?.[0]?.lessons?.[0]?.title || 'Lesson 1',
      currentLessonId: targetCourse?.syllabus?.[0]?.lessons?.[0]?.id || 'l1',
      status: 'In Progress'
    };
    setStudent(prev => ({
      ...prev,
      enrolledCourses: [newEnrollment, ...prev.enrolledCourses],
      stats: {
        ...prev.stats,
        activeCourses: prev.stats.activeCourses + 1
      }
    }));
    setUserRole('student');
    showToast(`Successfully enrolled in ${targetCourse?.title || 'course'}!`);
    navigateTo('course-overview', { courseId });
  };

  // Mark Lesson Completed
  const completeLesson = (courseId, lessonId) => {
    setCourses(prev => prev.map(course => {
      if (course.id !== courseId) return course;
      return {
        ...course,
        syllabus: course.syllabus.map(mod => ({
          ...mod,
          lessons: mod.lessons.map(les => les.id === lessonId ? { ...les, completed: true } : les)
        }))
      };
    }));

    // Update student progress percentage
    setStudent(prev => ({
      ...prev,
      enrolledCourses: prev.enrolledCourses.map(c => {
        if (c.courseId === courseId) {
          const nextProgress = Math.min(100, c.progress + 15);
          return { ...c, progress: nextProgress, lastAccessed: 'Just now' };
        }
        return c;
      }),
      recentActivity: [
        {
          id: `act-${Date.now()}`,
          action: 'Completed lesson',
          target: lessonContent.title,
          timestamp: 'Just now',
          score: '100%'
        },
        ...prev.recentActivity
      ]
    }));
    showToast('Lesson marked as completed! Progress updated.');
  };

  // Submit Assignment
  const submitAssignment = (assignmentId, fileDetails, notes) => {
    setAssignments(prev => prev.map(asg => {
      if (asg.id === assignmentId) {
        return {
          ...asg,
          status: 'Submitted',
          dueStatus: 'Submitted on time',
          submissionDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          submittedFile: fileDetails || 'Assignment_Submission_Final.zip',
          studentNotes: notes || ''
        };
      }
      return asg;
    }));

    setStudent(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        assignmentsSubmitted: prev.stats.assignmentsSubmitted + 1
      },
      recentActivity: [
        {
          id: `act-${Date.now()}`,
          action: 'Submitted assignment',
          target: assignments.find(a => a.id === assignmentId)?.title || 'Assignment',
          timestamp: 'Just now',
          status: 'Under Review'
        },
        ...prev.recentActivity
      ]
    }));
    showToast('Assignment submitted successfully for instructor evaluation!');
  };

  // Add Course (Admin)
  const addCourse = (courseData) => {
    const newCourse = {
      id: `cs-${Date.now().toString().slice(-4)}`,
      rating: 5.0,
      reviewsCount: 1,
      enrolledCount: 0,
      featured: false,
      ...courseData,
      syllabus: courseData.syllabus || [
        {
          title: 'Module 1: Orientation & Core Fundamentals',
          duration: '3 hrs',
          lessons: [
            { id: `l-${Date.now()}-1`, title: 'Course Welcome & Tools Setup', duration: '15:00', completed: false, type: 'video' },
            { id: `l-${Date.now()}-2`, title: 'Foundational Concepts & Principles', duration: '25:00', completed: false, type: 'video' }
          ]
        }
      ]
    };
    setCourses(prev => [newCourse, ...prev]);
    setAdminData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        totalCourses: prev.metrics.totalCourses + 1,
        activeCourses: prev.metrics.activeCourses + 1
      }
    }));
    showToast('New course published to catalog successfully!');
  };

  // Add Instructor (Admin)
  const addInstructor = (instructorData) => {
    const newInst = {
      id: `inst-${Date.now().toString().slice(-4)}`,
      rating: 5.0,
      studentsTaught: 0,
      coursesCount: 1,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      ...instructorData
    };
    setInstructors(prev => [newInst, ...prev]);
    showToast(`Instructor ${instructorData.name} added to faculty!`);
  };

  // Post Discussion Comment
  const addDiscussionComment = (text) => {
    const newComment = {
      id: `disc-${Date.now()}`,
      author: student.name,
      avatar: student.avatar,
      date: 'Just now',
      text,
      replies: []
    };
    setLessonContent(prev => ({
      ...prev,
      discussion: [newComment, ...prev.discussion]
    }));
    showToast('Question posted to course discussion board!');
  };

  // Send Direct Message
  const sendMessage = (threadId, text) => {
    setMessages(prev => prev.map(th => {
      if (th.id === threadId) {
        return {
          ...th,
          lastTime: 'Just now',
          messages: [
            ...th.messages,
            {
              id: `m-${Date.now()}`,
              senderId: student.id,
              text,
              time: 'Just now'
            }
          ]
        };
      }
      return th;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        viewParams,
        userRole,
        activeCourseId,
        activeLessonId,
        courses,
        student,
        assignments,
        quizzes,
        certificates,
        instructors,
        studentsList,
        gallery,
        placements,
        messages,
        adminData,
        lessonContent,
        toast,
        navigateTo,
        switchRole,
        setUserRole,
        setStudent,
        setCourses,
        setAdminData,
        enrollCourse,
        completeLesson,
        submitAssignment,
        addCourse,
        addInstructor,
        addDiscussionComment,
        sendMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
