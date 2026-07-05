```md
# 🐝 ForgeBase

A modern job application tracking platform built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Prisma**, and **Supabase**.

ForgeBase helps job seekers organize and manage their job search by tracking applications, interviews, offers, and saved opportunities through a clean and intuitive dashboard.

---

## ✨ Features

- 🔐 Secure Authentication
- 📊 Interactive Dashboard
- 💼 Job Application Management
- 📋 Kanban Board (Drag & Drop)
- 📈 Analytics & Insights
- ⭐ Save Jobs
- 🔍 Search, Filter & Sort Applications
- 👤 User Profile Management
- 🌙 Dark / Light Mode
- 📱 Fully Responsive Design

---

## 🛠 Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Lucide React
- Recharts

### Backend

- Next.js Server Actions
- Prisma ORM
- PostgreSQL (Supabase)

### Deployment

- Vercel

---

## 📂 Project Structure

```

src
├── app
├── components
├── lib
├── hooks
├── actions
├── providers
├── types
├── utils
└── prisma

public

````

---

## 🚀 Getting Started

Clone the repository.

```bash
git clone https://github.com/yourusername/ForgeBase.git
````

Move into the project.

```bash
cd ForgeBase
```

Install dependencies.

```bash
npm install
```

Create a `.env` file in the project root.

```env
DATABASE_URL="your_database_url"
```

Generate the Prisma client.

```bash
npx prisma generate
```

Run database migrations.

```bash
npx prisma migrate dev
```

Start the development server.

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 🗄 Database

ForgeBase uses:

* PostgreSQL
* Prisma ORM
* Supabase

After updating the Prisma schema, run:

```bash
npx prisma migrate dev
```

Generate the client:

```bash
npx prisma generate
```

---

## 🚀 Deployment

ForgeBase is deployed using **Vercel**.

Every push to the `main` branch automatically triggers a new deployment.

---

## 📌 Roadmap

* [x] Project Setup
* [ ] Landing Page
* [ ] Authentication
* [ ] Dashboard
* [ ] Applications CRUD
* [ ] Kanban Board
* [ ] Saved Jobs
* [ ] Analytics
* [ ] User Profile
* [ ] Notifications
* [ ] Resume Upload
* [ ] Email Reminders
* [ ] AI Resume Review
* [ ] AI Cover Letter Generator

---

## 📸 Screenshots

Coming soon.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ using Next.js and TypeScript.

```
```
