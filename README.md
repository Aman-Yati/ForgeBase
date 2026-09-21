# 💼 ForgeBase

A modern, full-stack job application tracking platform that helps job seekers organize every stage of their job search in one place.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Clerk**, **Spring Boot**, and **PostgreSQL**, ForgeBase provides a fast, responsive, and beautifully designed workspace for managing applications, tracking interviews, analyzing progress, and staying organized throughout the job search.


🌐 Live Demo: https://forgebase-gamma.vercel.app/

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

- Spring Boot 3.3.6
- PostgreSQL
- Spring Security with OAuth2
- Spring Data JPA

## Authentication

- Clerk

## Deployment

- Frontend: Vercel
- Backend: Render

---

# 📂 Project Structure

```text
ForgeBase/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/
│   │   ├── actions/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── types/
│   │   └── utils/
│   └── public/
└── backend/           # Spring Boot REST API
    ├── src/
    │   ├── main/
    │   │   ├── java/com/forgebase/
    │   │   └── resources/
    └── pom.xml
```

---

# 🚀 Getting Started

Clone the repository.

```bash
git clone https://github.com/Aman-Yati/ForgeBase.git
```

Navigate into the project.

```bash
cd ForgeBase
```

## Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file with the Clerk keys and backend API URL.

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_API_URL="http://localhost:8080"

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"
```

Start the development server.

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a `.env` file with the database and Clerk configuration.

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/forgebase
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
CLERK_ISSUER_URI=https://your-clerk-instance.clerk.accounts.dev
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
FRONTEND_URL=http://localhost:3000
```

Run the Spring Boot application.

```bash
./mvnw spring-boot:run
```

Or using Maven:

```bash
mvn spring-boot:run
```

The backend API will be available at:

```text
http://localhost:8080
```

---

# 🗄 Database

ForgeBase uses PostgreSQL as the database.

The frontend accesses PostgreSQL through the Spring Boot backend API. The backend uses Spring Data JPA for database operations and Hibernate for ORM.

---

# 🚀 Deployment

ForgeBase uses a dual deployment strategy:

- **Frontend**: Deployed on Vercel. Every push to the `Springboot` branch automatically triggers a new production deployment.
- **Backend**: Deployed on Render. The backend is containerized using Docker and deployed as a web service.

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
- ✅ Calendar View
---

# 🛣 Roadmap

- [ ] Drag & Drop Kanban Board
- [ ] Resume Upload
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

Built with ❤️ using Next.js, React, TypeScript, Clerk, Spring Boot, and PostgreSQL.
-Aman Yati
