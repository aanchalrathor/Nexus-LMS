# Nexus LMS — Design & Architecture Specification

## 1. Vision & Overview
Nexus LMS is a modern, professional Learning Management System designed specifically for focused, practical education. It avoids generic AI/SaaS gimmicks, university-bureaucracy clutter, and neon gradients, in favor of a trustworthy, high-end editorial and academic design language.

---

## 2. Visual Direction & Design Tokens

### Color Palette
- **Deep Green (Primary Brand)**
  - Primary Base: `#143D2B` (Rich forest green)
  - Dark Surface / Header: `#0D2A1D`
  - Deep Green Hover: `#1B4F38`
  - Subtle Green Wash: `#F0F5F2`
  - Green Border / Divider: `#D5E2D9`

- **Warm Off-White / Ivory (Surfaces & Backgrounds)**
  - Page Background: `#FAF8F5` (Warm Ivory)
  - Surface / Card: `#FFFFFF`
  - Warm Card Inset: `#F3EFE8`
  - Warm Neutral Border: `#E8E2D5`

- **Charcoal / Dark Text (Legibility & Editorial Contrast)**
  - Primary Text / Headings: `#1A231F` (Charcoal forest-cast)
  - Secondary / Body Text: `#404B45`
  - Muted / Supporting: `#6C7771`
  - Border Subdued: `#E0DCD3`

- **Warm Gold Accents (Prestige & Academic Accents)**
  - Accent Gold: `#C59B27`
  - Warm Gold Hover: `#AF881E`
  - Gold Badge Background: `#FDF9ED`
  - Gold Border: `#EEDBA8`

### Prohibited Visual Elements
- NO electric blues, purples, magentas, or neon colors.
- NO heavy glassmorphism, floating spheres, or generic crypto/AI SaaS gradients.
- NO outdated, dense institutional portal aesthetics.

### Typography
- **Headings**: Editorial serif & geometric humanist sans (`'Plus Jakarta Sans'`, `'Outfit'`, or `'Inter'` with generous weight hierarchy and elegant serif highlights).
- **Body**: Clean, legible humanist sans-serif with 1.6 line height.

---

## 3. Scope & Sitemap

### Public
1. **Home**: Hero with value proposition, featured courses, impact metrics, pedagogy features, testimonial showcase, placement partners, and CTA banner.
2. **About Us**: Institution mission, pedagogical philosophy, leadership team, accreditation, and timeline.
3. **Courses**: Course catalog with search, category filtering (Development, Design, Data, Business), difficulty levels, duration, and price badges.
4. **Gallery**: Campus life, workshops, hackathons, masterclasses, and student showcases with category filters and modal viewer.
5. **Placements**: Career success statistics, hiring partners grid, recent student placement stories, salary statistics, and hiring inquiry CTA.
6. **Contact Us**: Interactive contact form with validation, campus location details, FAQs, and support channels.

### Authentication
1. **Login**: Role toggle (Student Demo / Admin Demo / Custom Login), email/password fields with validation, "Forgot Password" link.
2. **Sign Up**:
   - **Student Registration**: Name, email, phone, interests, password, terms agreement.
   - **Instructor Registration**: Professional bio, expertise domain, portfolio/LinkedIn link, resume submission mock.
3. **Forgot Password**: Password reset request with email verification feedback.
4. **Reset Password**: New password entry with strength indicator and confirmation.

### Student Portal
1. **Dashboard**:
   - Learning Progress summary cards (Active courses, hours learned, completed certificates, streak).
   - Continue Learning quick-resume card with interactive progress bar.
   - Upcoming Live Classes & deadlines widget.
   - Recent Learning Activity feed.
2. **My Courses**:
   - Enrolled courses grid with status filters (In Progress, Completed).
   - **Course Overview**: Syllabus breakdown, instructor bio, course prerequisites, and progress tracker.
   - **Course Player**:
     - Video player with play/pause, time tracker, and speed control.
     - Lesson navigation sidebar with chapter accordion and completion checkboxes.
     - Interactive tabs: *Notes/Resources*, *Quiz*, *Assignment*, and *Discussion forum*.
3. **Explore Courses**: Searchable marketplace to enroll in new programs.
4. **Assignment**: Dedicated assignments manager with submission status, due dates, grade feedback, and file submission simulation.
5. **Certificates**: Verified digital credentials with printable view, credential ID, issue date, and PDF download action.
6. **Messages**: Direct messaging interface with instructors and academic advisors.
7. **Profile & Settings**:
   - Personal Information (Avatar, bio, contact details).
   - Account Settings (Notifications, language, time zone).
   - Security (Password update, two-factor auth toggle).
   - Payment History (Invoices, transaction IDs, receipt download).

### Admin Portal
1. **Dashboard**: Executive metrics (Total Active Students, Total Courses, Gross Revenue, Course Analytics chart, recent enrollments).
2. **Course Management**:
   - All Courses table with status badges and action menus.
   - Create & Edit Course modal/wizard with category, pricing, and curriculum builder.
   - Lessons, Quizzes, and Assignments management.
   - Course Categories taxonomy manager.
3. **Student Management**:
   - Comprehensive student directory with search, filter, and pagination.
   - Student Details modal with enrolled courses and performance stats.
   - Student Progress tracking table.
4. **Instructor Management**:
   - Directory of active instructors with rating and course load.
   - Add Instructor modal with department assignment.
   - Instructor Details view.
5. **Certificates**:
   - Certificate Templates manager.
   - Issued Certificates registry with revoke/reissue actions.
6. **Payment / Revenue**: Detailed ledger of transactions, revenue breakdown, refund requests, and financial export.
7. **Notifications**: System announcements broadcast tool and audit log.
8. **Settings**: Platform configuration, branding tokens, email notification preferences, and maintenance controls.

---

## 4. Architecture & State Management
- **Single Page Application** built with React, Vite, and Lucide icons.
- **Client-Side Hash Routing & Global Store**: Reactive mock state for user sessions, enrolled courses, quiz attempts, assignments submissions, and admin CRUD actions.
- **Role Switching**: An accessible, elegant Demo Bar allowing instantaneous switching between Public Website, Student Portal, and Admin Portal.
