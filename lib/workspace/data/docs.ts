import type { DocCategory } from "../types"

export const docCategories: DocCategory[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: "Rocket",
    articles: [
      {
        id: "gs1",
        title: "Welcome to Triodev Workspace",
        content: `# Welcome to Triodev Workspace

Your central hub for managing projects, communicating with the team, and tracking progress.

## Quick Start

1. **Overview Dashboard** - Get a snapshot of all active projects and pending items.
2. **Projects** - View detailed project status, team members, and sprint progress.
3. **Tasks** - Manage your Kanban board with drag-and-drop task management.
4. **Messages** - Communicate directly with your development team.

## Need Help?

Visit the Support section or contact your project manager directly through Messages.`,
        categoryId: "getting-started",
        updatedAt: "2025-05-01",
      },
      {
        id: "gs2",
        title: "Navigating the Workspace",
        content: `# Navigating the Workspace

The sidebar provides access to all workspace sections:

- **Overview** - Dashboard with key metrics
- **Projects** - Active, completed, and archived projects
- **Timeline** - Milestones and sprint progress
- **Tasks** - Kanban task board
- **Files** - Document management
- **Meetings** - Schedule and notes
- **Feature Requests** - Submit and track feature ideas
- **Messages** - Team communication
- **Invoices** - Billing and payments`,
        categoryId: "getting-started",
        updatedAt: "2025-05-01",
      },
    ],
  },
  {
    id: "api",
    name: "API Documentation",
    icon: "Code",
    articles: [
      {
        id: "api1",
        title: "Authentication",
        content: `# Authentication

All API requests require authentication via Bearer token.

\`\`\`
Authorization: Bearer <your-api-key>
\`\`\`

## Endpoints

### POST /api/auth/login
Authenticate and receive a session token.

### POST /api/auth/refresh
Refresh an expired session token.

### GET /api/auth/me
Get current user profile.`,
        categoryId: "api",
        updatedAt: "2025-05-10",
      },
      {
        id: "api2",
        title: "Projects API",
        content: `# Projects API

### GET /api/projects
List all projects for the authenticated workspace.

### GET /api/projects/:id
Get detailed project information.

### PATCH /api/projects/:id
Update project settings (requires admin role).`,
        categoryId: "api",
        updatedAt: "2025-05-10",
      },
    ],
  },
  {
    id: "guides",
    name: "Guides",
    icon: "BookOpen",
    articles: [
      {
        id: "g1",
        title: "Submitting Feature Requests",
        content: `# Submitting Feature Requests

1. Navigate to **Feature Requests** in the sidebar
2. Click **Create Request**
3. Fill in the title, description, and priority
4. Submit for review

Your request will be reviewed by the product team within 2 business days.`,
        categoryId: "guides",
        updatedAt: "2025-05-05",
      },
      {
        id: "g2",
        title: "Managing Files",
        content: `# Managing Files

Upload files by dragging them into the upload zone or clicking the Upload button.

Supported formats: PDF, images, videos, documents, and code files.

Files can be shared with team members and have version history tracking.`,
        categoryId: "guides",
        updatedAt: "2025-05-05",
      },
    ],
  },
  {
    id: "deployment",
    name: "Deployment Notes",
    icon: "Server",
    articles: [
      {
        id: "d1",
        title: "Production Deployment Guide",
        content: `# Production Deployment Guide

## Prerequisites
- Access to production environment
- Latest build artifacts from CI/CD

## Steps
1. Run pre-deployment checks
2. Deploy to staging for verification
3. Execute database migrations
4. Deploy to production
5. Run smoke tests
6. Monitor for 30 minutes`,
        categoryId: "deployment",
        updatedAt: "2025-05-15",
      },
    ],
  },
  {
    id: "releases",
    name: "Release Notes",
    icon: "Tag",
    articles: [
      {
        id: "r1",
        title: "v1.2.4-beta",
        content: `# v1.2.4-beta

**Released:** May 15, 2025

## New Features
- AI Assistant integration in workspace
- Enhanced activity feed with real-time updates

## Improvements
- Dashboard performance optimizations
- Mobile responsive improvements

## Bug Fixes
- Fixed login redirect loop on Safari
- Resolved file upload size limit issue`,
        categoryId: "releases",
        updatedAt: "2025-05-15",
      },
      {
        id: "r2",
        title: "v1.2.0",
        content: `# v1.2.0

**Released:** May 1, 2025

## New Features
- Custom dashboard widgets
- Feature request voting system
- Invoice management portal`,
        categoryId: "releases",
        updatedAt: "2025-05-01",
      },
    ],
  },
  {
    id: "faq",
    name: "FAQ",
    icon: "HelpCircle",
    articles: [
      {
        id: "faq1",
        title: "How do I invite team members?",
        content: "Go to Settings > Members and click 'Invite Member'. Enter their email address and select their role.",
        categoryId: "faq",
        updatedAt: "2025-05-01",
      },
      {
        id: "faq2",
        title: "How are invoices generated?",
        content: "Invoices are automatically generated at the end of each sprint based on logged hours and agreed rates.",
        categoryId: "faq",
        updatedAt: "2025-05-01",
      },
      {
        id: "faq3",
        title: "Can I export project data?",
        content: "Yes, project data can be exported from the project detail page. Supported formats include CSV and JSON.",
        categoryId: "faq",
        updatedAt: "2025-05-01",
      },
    ],
  },
]

export function getArticleById(id: string) {
  for (const category of docCategories) {
    const article = category.articles.find((a) => a.id === id)
    if (article) return { article, category }
  }
  return undefined
}
