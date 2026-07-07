# 💼 ForgeBase

A modern, full-stack job application tracking platform that helps job seekers organize every stage of their job search in one place.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Prisma**, **Supabase**, **Clerk**, **Motion** and **Tailwind CSS**, ForgeBase provides a fast, responsive, and beautifully designed workspace for managing applications, tracking interviews, analyzing progress, and staying organized throughout the job search.

---

# ✨ Features

## Authentication

- 🔐 Secure authentication with Clerk
- 👤 User profile management
- 🔒 Protected dashboard routes

## Job Management

- 💼 Create, edit, and delete job applications
- 📍 Track company, role, location, salary, work mode, and job type
- 📅 Record application dates
- ⭐ Save jobs to your wishlist
- 📝 Personal notes for every application
- 🎯 Priority management
- 🔗 Store original job posting links

## Dashboard

- 📊 Interactive analytics dashboard
- 🥧 Application status visualization
- 📈 Career insights
- 🕒 Recently applied jobs
- 📌 Overview cards with live statistics

## Productivity

- 🔍 Search applications
- 🎛 Filter by status
- ⚡ Fast Server Actions
- 🎨 Smooth Framer Motion animations
- 📱 Fully responsive design

---

# 🛠 Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui
- Lucide React
- Recharts

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

# 📂 Project Structure

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
git clone https://github.com/yourusername/ForgeBase.git
```

Navigate into the project.

```bash
cd ForgeBase
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

Generate the Prisma Client.

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

Open:

```text
http://localhost:3000
```

---

# 🗄 Database

ForgeBase uses PostgreSQL hosted on Supabase.

Whenever the Prisma schema changes:

```bash
npx prisma migrate dev
```

Generate the client:

```bash
npx prisma generate
```

---

# 🚀 Deployment

ForgeBase is deployed on Vercel.

Every push to the `main` branch automatically triggers a new production deployment.

---

# 📌 Current Features

- ✅ Authentication
- ✅ Landing Page
- ✅ Dashboard
- ✅ Job CRUD
- ✅ Analytics
- ✅ Interactive Charts
- ✅ Search & Filtering
- ✅ Saved Jobs
- ✅ Responsive Design
- ✅ Smooth Animations
- ✅ User Profile

---

# 🛣 Roadmap

- [ ] Drag & Drop Kanban Board
- [ ] Resume Upload
- [ ] Calendar View
- [ ] Email Reminders
- [ ] AI Resume Review
- [ ] AI Cover Letter Generator
- [ ] AI Job Matching
- [ ] Interview Timeline
- [ ] Resume Version Management
- [ ] Export Data
- [ ] PWA Support

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Feel free to fork the repository and submit a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Built with ❤️ using Next.js, React, TypeScript, Prisma, and Supabase.
-Aman Yati
