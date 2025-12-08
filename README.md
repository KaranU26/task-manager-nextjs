# Task Manager

A full-stack task management application built with **Next.js 15** and **TypeScript** as a learning project to explore modern web development practices.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)

## 🎯 About This Project

This project was built as part of my journey learning **Next.js** and **TypeScript**. The goal was to understand:

- React fundamentals (useState, useEffect, props)
- TypeScript interfaces and type safety
- Next.js App Router and API routes
- Database integration with Prisma ORM
- Authentication with NextAuth.js
- Deployment to Vercel

> **Note:** The frontend UI and styling were exclusively generated using AI, while I focused on understanding and implementing the core logic, backend architecture, and database design.

## ✨ Features

- **User Authentication** - GitHub OAuth login with NextAuth.js
- **CRUD Operations** - Create, read, update, and delete tasks
- **User-Specific Data** - Each user only sees their own tasks
- **Progress Tracking** - Visual progress bar showing task completion
- **Responsive Design** - Beautiful glass-morphism UI with animations
- **Real-time Updates** - Optimistic UI updates for smooth interactions

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Authentication | NextAuth.js v5 |
| Styling | Tailwind CSS 4 |
| Deployment | Vercel |

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x
- A PostgreSQL database (I used [Neon](https://neon.tech))
- GitHub OAuth credentials

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/KaranU26/task-manager-nextjs.git
   cd task-manager-nextjs
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   GITHUB_ID="your-github-oauth-client-id"
   GITHUB_SECRET="your-github-oauth-client-secret"
   AUTH_SECRET="your-auth-secret"
   ```

4. Push the database schema
   ```bash
   npx prisma db push
   ```

5. Run the development server
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth.js route
│   │   └── tasks/                  # Task CRUD API routes
│   ├── components/
│   │   ├── AuthButton.tsx          # Sign in/out component
│   │   └── TaskItem.tsx            # Individual task component
│   ├── lib/
│   │   ├── auth.ts                 # NextAuth configuration
│   │   └── prisma.ts               # Prisma client
│   ├── globals.css                 # Global styles & animations
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Main page
│   └── types.ts                    # TypeScript interfaces
├── prisma/
│   └── schema.prisma               # Database schema
└── public/
```

## 📚 What I Learned

- **React Hooks** - Managing state with `useState` and side effects with `useEffect`
- **TypeScript** - Defining interfaces, type annotations, and type-safe props
- **Next.js App Router** - Server/client components, API routes, dynamic routing
- **Prisma** - Database modeling, migrations, and querying
- **NextAuth.js** - OAuth authentication flow and session management
- **API Design** - RESTful endpoints with proper error handling

## 🔮 Future Improvements

- [ ] Add task categories/tags
- [ ] Implement due dates and reminders
- [ ] Add drag-and-drop reordering
- [ ] Dark/light theme toggle
- [ ] Task sharing between users

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ while learning Next.js and TypeScript*
