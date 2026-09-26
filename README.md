# 💪 FitLog — Workout Library

FitLog is a responsive workout library and planning web application built for the **Programming Hero B14-A6 assignment**.

Users can explore workouts from the FitLog API, view detailed workout information, add workouts to Today's Plan, save workouts for later, and manage their plan from the My Plan page.

---

## 🔧 Technologies Used

* **Next.js 14 (App Router)**
* **React + TypeScript**
* **Tailwind CSS**
* **Context API**
* **useState & useEffect**
* **REST API**
* **lucide-react**
* **localStorage**

---

## ✨ Features

* **Workout Library** — Browse all available workouts fetched from the FitLog API.
* **Workout Details** — View workout information, equipment, difficulty, sets, reps, calories, rating, and instructions.
* **Today's Plan** — Add up to 5 workouts to your daily plan and manage them easily.
* **Saved Workouts** — Save workouts for later and access them from the My Plan page.
* **Search & Sort** — Search workouts by name or muscle group and sort them by duration, calories, or rating.
* **Mark as Done** — Mark completed workouts and keep track of your progress.
* **Local Storage** — Plan, saved workouts, and completed status remain available after refreshing the page.
* **Responsive Design** — Optimized for mobile, tablet, and desktop screens.
* **Loading & Error States** — Provides proper loading feedback and handles API errors gracefully.
* **Custom 404 Page** — Invalid routes and workout IDs show a friendly not-found page.

---

## 🌐 API

FitLog uses the following API for workout data:

**All Workouts**

```text
https://api.abcz.workers.dev/api/fitlog
```

**Single Workout**

```text
https://api.abcz.workers.dev/api/fitlog/:id
```

---

## 📁 Project Structure

```text
fitlog-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── my-plan/
│   │   └── page.tsx
│   └── workouts/
│       └── [id]/
│           ├── page.tsx
│           ├── loading.tsx
│           └── error.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Library.tsx
│   ├── WorkoutCard.tsx
│   ├── PlanWorkoutCard.tsx
│   ├── WorkoutActions.tsx
│   ├── ToastContainer.tsx
│   └── Loader.tsx
│
├── context/
│   └── PlanContext.tsx
│
├── lib/
│   ├── api.ts
│   └── types.ts
│
└── public/
    ├── logo.png
    └── banner.png
```

---

## 🚀 Getting Started

Make sure you have **Node.js 18 or newer** installed.

Check your Node.js version:

```bash
node -v
```

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 3. Create a production build

```bash
npm run build
npm run start
```

---

## ☁️ Deployment

The project is ready to deploy on **Vercel**.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Deploy the project.
4. Test the Home page, Workout Details, My Plan, and direct route reloads after deployment.

---

## 📌 Assignment

**Programming Hero — Batch 14**
**Assignment 6 — FitLog**

Built with React, Next.js, TypeScript, and Tailwind CSS.
