# EduForge3 - Complete School Management Platform

A production-ready school management system built with Next.js, TypeScript, and Supabase, featuring role-based access control, QA gates, lesson workflows, and comprehensive assignment management.

## 🌟 Features

### Core Functionality
- **Role-Based Access Control**: Admin, Teacher, Student, and Parent dashboards with appropriate permissions
- **QA Gate System**: Hard quality assurance before content goes live
- **Lesson Workflows**: Complete lesson planning and delivery system
- **Assignment Management**: Create, distribute, and grade assignments
- **Real-time Analytics**: Performance tracking and reporting

### User Roles & Capabilities

#### 👨‍💼 Admin Dashboard
- Organization management and settings
- User management (create, edit, deactivate users)
- Groups and subjects administration
- System-wide analytics and reports
- QA pipeline monitoring
- Security settings and policies

#### 👩‍🏫 Teacher Dashboard
- Lesson creation and management
- Assignment creation and grading
- Student progress tracking
- Group management
- Subject-specific analytics
- QA submission workflow

#### 👨‍🎓 Student Dashboard
- View assigned lessons and materials
- Submit assignments and quizzes
- Track grades and progress
- Access published content only (QA-approved)
- Personal performance analytics

#### 👨‍👩‍👧‍👦 Parent Dashboard
- Monitor children's progress
- View grades and assignments
- Receive alerts and notifications
- Communication with teachers
- Weekly progress digests

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel/Netlify compatible

### Database Schema
- **Organizations**: Multi-tenant support
- **Users**: Role-based user management
- **Groups**: Class/group organization
- **Subjects**: Academic subject management
- **Lessons**: Content with QA workflow
- **Assignments**: Homework and assessments
- **Submissions**: Student work tracking
- **QA Reports**: Quality assurance pipeline

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eduforge3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   DATABASE_URL=your_supabase_database_url
   DIRECT_URL=your_supabase_direct_url
   ```

4. **Set up the database**
   
   The application includes migration files that will set up the complete schema:
   - Run the migrations in your Supabase dashboard
   - Or use the provided setup script: `node scripts/setup-database.js`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Use the demo accounts to explore different roles

## 👥 Demo Accounts

The application comes with pre-configured demo accounts:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| Admin | admin@school.edu | demo123 | Full system access |
| Teacher | teacher@school.edu | demo123 | Lesson and assignment management |
| Student | student@school.edu | demo123 | Student learning experience |
| Parent | parent@school.edu | demo123 | Parent monitoring dashboard |

## 🔒 Quality Assurance (QA) System

The platform includes a sophisticated QA pipeline that ensures content quality:

### QA Rules
1. **Standards Alignment**: Verifies educational standards are specified
2. **Content Safety**: Checks for inappropriate material
3. **Readability**: Ensures content is age-appropriate
4. **Originality**: Prevents placeholder content

### QA Statuses
- `NOT_RUN`: Initial state
- `RUNNING`: QA in progress
- `PASS`: Content approved for publication
- `FLAG`: Needs review but can be published
- `FAIL`: Must be fixed before publication

### Visibility Rules
- **Students/Parents**: Only see `PUBLISHED` + `PASS` content
- **Teachers/Admins**: Can see all content regardless of status

## 📚 Key Components

### Lesson Management
- **Lesson Plans**: Step-by-step teaching instructions
- **Slide Outlines**: Presentation materials
- **Assessments**: Quizzes and tests with answer keys
- **Standards Alignment**: Educational standards tracking

### Assignment Workflow
1. Teacher creates assignment from lesson
2. Assignment distributed to group
3. Students submit work
4. Teacher grades and provides feedback
5. Grades and feedback visible to students/parents

### Analytics & Reporting
- Student performance tracking
- Grade distribution analysis
- Subject-specific metrics
- Engagement analytics
- QA success rates

## 🎨 UI/UX Features

### Design System
- **Apple-level aesthetics**: Clean, sophisticated interface
- **Responsive design**: Mobile-first approach
- **Accessibility**: WCAG compliant
- **Dark/Light modes**: User preference support

### Interactive Elements
- Hover states and micro-interactions
- Loading states and progress indicators
- Real-time notifications
- Drag-and-drop interfaces

## 🔧 Development

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
├── supabase/            # Database migrations
└── scripts/             # Setup scripts
```

### Key Files
- `lib/auth.ts`: Authentication utilities
- `lib/qa-pipeline.ts`: Quality assurance logic
- `lib/supabase.ts`: Database client
- `components/layout/dashboard-layout.tsx`: Main layout
- `components/lesson-viewer.tsx`: Lesson display component

### API Routes
- `/api/auth/*`: Authentication endpoints
- `/api/lessons/*`: Lesson management
- `/api/assignments/*`: Assignment handling
- `/api/users/*`: User management
- `/api/organizations/*`: Organization settings

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Environment Setup
Ensure all environment variables are configured in your deployment platform:
- Supabase credentials
- Database URLs
- Any additional API keys

### Deployment Platforms
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative deployment option
- **Docker**: Container deployment support

## 🧪 Testing

### Demo Data
The application includes comprehensive demo data:
- Sample organizations and users
- Example lessons with full content
- Mock assignments and submissions
- QA reports and analytics data

### Testing Accounts
Use the provided demo accounts to test different user experiences and role-based access controls.

## 🔐 Security Features

### Authentication
- Supabase Auth integration
- Role-based access control
- Session management
- Password policies

### Data Protection
- Row Level Security (RLS)
- Input validation
- SQL injection prevention
- XSS protection

## 📈 Performance

### Optimization Features
- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Code splitting
- Lazy loading

### Monitoring
- Performance metrics
- Error tracking
- User analytics
- System health monitoring

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use the established component patterns
3. Maintain responsive design principles
4. Write comprehensive tests
5. Document new features

### Code Style
- ESLint configuration included
- Prettier for code formatting
- TypeScript strict mode
- Consistent naming conventions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Documentation
- API documentation available in code comments
- Component documentation via Storybook (if configured)
- Database schema documentation in migration files

### Common Issues
1. **Supabase Connection**: Verify environment variables
2. **Build Errors**: Check TypeScript configuration
3. **Authentication Issues**: Confirm Supabase Auth setup
4. **Permission Errors**: Review RLS policies

### Getting Help
- Check the issues section for common problems
- Review the code comments for implementation details
- Consult the Supabase documentation for database issues

---

**EduForge3** - Empowering education through technology 🎓