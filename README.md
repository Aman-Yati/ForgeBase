# 🐝 JobHive

A modern, full-stack job application tracking platform that helps job seekers organize every stage of their job search in one place.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Prisma**, **Supabase**, and **Tailwind CSS**, JobHive provides a fast, responsive, and beautifully designed dashboard for tracking applications, interviews, offers, and career progress.

---

# ✨ Features

### Authentication

- 🔐 Secure authentication with Clerk
- 👤 User profile management
- 🔒 Protected dashboard routes

### Job Management

- 💼 Create, update and delete applications
- ⭐ Save jobs to wishlist
- 📎 Store application links
- 📝 Add notes for every application
- 📍 Track company, role, location, salary and work mode
- 🗓 Record application dates
- 🎯 Priority tracking

### Dashboard

- 📊 Analytics dashboard
- 📈 Interactive charts
- 📋 Recent applications
- 📌 Application status overview
- 📉 Progress insights

### Productivity

- 🔍 Search applications
- 🎛 Filter by status
- 📱 Fully responsive
- ⚡ Fast server actions
- 🎨 Smooth Framer Motion animations

---

# 📸 Preview

> Screenshots coming soon.

---

# 🛠 Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React
- shadcn/ui

## Backend

- Next.js Server Actions
- Prisma ORM
- PostgreSQL
- Supabase

## Authentication

- Clerk

## Deployment

- Vercel

---

# 📂 Folder Structure

```text
src
├── app
├── actions
├── components
├── hooks
├── lib
├── prisma
├── providers
├── types
└── utils

public
```

---

# 🚀 Getting Started

Clone the repository.

```bash
git clone https://github.com/yourusername/jobhive.git
```

Move into the project.

```bash
cd jobhive
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
DATABASE_URL=""
DIRECT_URL=""

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"
```

Generate Prisma Client.

```bash
npx prisma generate
```

Run migrations.

```bash
npx prisma migrate dev
```

Start the development server.

```bash
npm run dev
```

Visit

```text
http://localhost:3000
```

---

# 🗄 Database

The application uses PostgreSQL hosted on Supabase.

## Stack

- PostgreSQL
- Prisma ORM
- Supabase

Whenever the schema changes:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

---

# 🚀 Deployment

The project is deployed on Vercel.

Every push to the `main` branch automatically triggers a new production deployment.

---

# 📈 Current Features

- ✅ Authentication
- ✅ Landing Page
- ✅ Dashboard
- ✅ Job CRUD
- ✅ Analytics Dashboard
- ✅ Application Charts
- ✅ Saved Jobs
- ✅ Search
- ✅ Filtering
- ✅ Responsive Design
- ✅ Dark Theme
- ✅ Smooth Animations
- ✅ User Profile

---

# 🛣 Roadmap

- [ ] Drag & Drop Kanban Board
- [ ] Resume Upload & Management
- [ ] Calendar View
- [ ] Email Reminders
- [ ] AI Resume Review
- [ ] AI Cover Letter Generator
- [ ] AI Job Matching
- [ ] Interview Tracker
- [ ] Company Notes
- [ ] Resume Versioning
- [ ] Export Data
- [ ] PWA Support

---

# 💡 Why JobHive?

Instead of managing applications across spreadsheets, bookmarks and notes, JobHive centralizes everything into a single workspace.

Track:

- Applications
- Interviews
- Offers
- Rejections
- Saved Jobs
- Analytics
- Career Progress

All from one clean dashboard.

---

# 🤝 Contributing

Contributions, suggestions and feature requests are always welcome.

Feel free to fork the repository and open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Built with ❤️ using Next.js, React, TypeScript and Prisma.
