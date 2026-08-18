# 💼 Personal Portfolio — Advanced Full-Stack App

An advanced full-stack **personal portfolio platform** with a public site, a **User Dashboard**, and a separate **Admin Dashboard**. Built with **React (Vite)** on the frontend and **Node.js / Express / MongoDB** on the backend — featuring authentication with email verification & OTP password reset, role-based access (user/admin), project & task management, visitor analytics, an activity log, a contact/message inbox, and an AI chat section powered by Google Gemini.

---

## 🌐 Live Demo

- **Frontend (Vercel):** [https://sifatcoder.vercel.app/](https://sifatcoder.vercel.app/)
- **Backend API (Render):** `https://my-app-backend-ncj0.onrender.com/api`

> ⚠️ Backend is on Render's free tier — the first request after inactivity may take **30–60 seconds** (cold start).

---

## 🚀 Tech Stack

### Frontend (client)
- React 19 + Vite
- React Router DOM (routing incl. role-protected routes)
- Zustand (auth / reset-password state)
- TanStack React Query (server state, caching)
- Axios (HTTP client)
- React Hook Form (forms & validation)
- Tailwind CSS
- Framer Motion (animations)
- Lottie React (animated illustrations)
- React Toastify (notifications)
- React Helmet Async (SEO/meta tags)
- NProgress (route loading bar)
- Google Generative AI SDK (Gemini — AI chat section)

### Backend (server)
- Node.js + Express 5
- MongoDB + Mongoose
- JWT (jsonwebtoken) + cookie-based auth (`cookie-parser`)
- bcryptjs — password hashing
- express-validator — request validation
- Multer + streamifier — file upload handling
- Cloudinary — image storage
- Nodemailer (via Brevo SMTP) — emails (verification, OTP, contact)
- ua-parser-js — visitor device/browser detection (for analytics)
- dotenv, cors, cross-env

---

## 📁 Project Structure

```
personal-portfolio/
├── client/                              # React frontend
│   └── src/
│       ├── api/                          # Axios API calls
│       │   ├── admin_api/                # Admin: projects, messages, dashboard, visitors, activity
│       │   ├── user_api/                 # User: tasks
│       │   ├── authApi.js
│       │   └── contactApi.js
│       ├── components/
│       │   ├── admin/                     # Admin navbar/sidebar
│       │   ├── admin_dashboard/           # Admin widgets (stats, tables, charts, settings)
│       │   ├── user/                      # User navbar/sidebar
│       │   ├── user_dashboard/            # User widgets (tasks, stats, profile)
│       │   └── shared/                    # Header, Footer
│       ├── hooks/                          # React Query hooks (auth, admin, user)
│       ├── layout/                        # MainLayout, DashboardLayout, AdminLayout
│       ├── lib/                            # Axios instance, Gemini AI client
│       ├── pages/                          # Public, user-dashboard, admin pages
│       ├── routes/                        # AppRoutes, PrivateRoute, AdminRoute
│       └── store/                          # Zustand stores
│
└── server/                               # Express backend
    └── src/
        ├── config/                         # DB, Cloudinary, cookie, mail transporter config
        ├── controllers/
        │   ├── admin/                       # Dashboard, projects, messages, visitors, activity
        │   ├── users/                       # Profile, settings, password, tasks
        │   ├── auth.controller.js
        │   ├── contact.controller.js
        │   ├── product.controller.js
        │   └── user.controller.js
        ├── middlewares/                    # auth (protect/adminOnly), upload, validation, visitor tracking, error handler
        ├── models/                         # User, Project, Task, Contact, Activity, Visitor, Product
        ├── routes/
        │   ├── admin/                       # Admin-only routes
        │   ├── users/                       # User sub-routes (tasks)
        │   ├── auth.route.js
        │   ├── contact.route.js
        │   ├── product.routes.js
        │   └── user.route.js
        ├── services/                        # Business logic per domain
        ├── utils/                            # JWT, email, OTP, Cloudinary upload, geo/IP helpers
        ├── validators/                       # express-validator rule sets
        └── app.js                            # Express app setup
```

---

## ⚙️ How It Works

### Backend (Express API)
- `server.js` loads env vars based on `NODE_ENV` (`.env.development` / `.env.production`), connects to MongoDB, and starts the server.
- `app.js` wires up global middleware: `express.json`, `cookie-parser` (signed cookies), `cors` (with `credentials: true` for cookie auth), `urlencoded`, and a custom **`trackVisitor`** middleware that logs every request (IP, browser, OS, device, path) for admin analytics.
- **Authentication (`/api/auth`)**: register (with avatar upload) → email verification link → login (JWT set as an HTTP-only cookie, also returned for `Authorization: Bearer` use) → forgot-password flow via **OTP** (sent by email) → reset password.
- **Authorization**: `protect` middleware verifies the JWT (from cookie or `Bearer` header) and attaches `req.user`. `adminOnly` middleware additionally checks `req.user.role === 'admin'`, guarding every route under `/api/admin/*`.
- **Users (`/api/users`)**: manage own profile, avatar, notification settings, and account deletion.
- **Tasks (`/api/tasks`)**: each logged-in user manages their own to-do/task list (CRUD + dashboard summary) — powers the **User Dashboard**.
- **Projects (`/api/admin/projects`)**: admin-only CRUD for portfolio project entries shown on the public site.
- **Messages (`/api/admin/messages`)**: admin inbox for contact-form submissions — list, view, mark as read, delete.
- **Visitors (`/api/admin/visitors`)** & **Activity (`/api/admin/activities`)**: analytics data (traffic, device breakdown) and a chronological activity/audit log, both admin-only.
- **Dashboard (`/api/admin/dashboard`)**: aggregated stats (totals, recent activity, recent projects) for the admin overview screen.
- **Contact (`/api/form/contact`)**: public contact form submission → validated → stored → triggers an admin notification email.
- Images (avatars, project thumbnails) are uploaded via **Multer** (in-memory) then streamed to **Cloudinary** using `streamifier`.
- Centralized `errorHandler` middleware formats all thrown errors into a consistent JSON response.

### Frontend (React + Vite)
- `AppRoutes.jsx` defines three route trees:
  1. **Public site** (`MainLayout`) — Home, About, Service, Contact, Register/Login, email verification, forgot/reset password (OTP flow), Privacy Policy, Terms, and an AI Chat page.
  2. **User Dashboard** (`/user-dashboard`, wrapped in `PrivateRoute` + `DashboardLayout`) — dashboard overview, profile, task list, create/edit task, and task analytics.
  3. **Admin Dashboard** (`/admin-dashboard`, wrapped in `AdminRoute` + `AdminLayout`) — dashboard overview, profile, settings, messages inbox + details, full project CRUD, and visitor analytics.
- **`PrivateRoute`** allows any authenticated user; **`AdminRoute`** additionally checks the user's role before rendering — unauthorized users are redirected.
- `authStore.js` (Zustand) persists the logged-in user & token; `resetPasswordStore.js` holds transient state for the multi-step forgot-password flow (email → OTP → new password).
- `api/` is split into `authApi.js`, `contactApi.js`, `user_api/taskApi.js`, and a full `admin_api/` set (projects, messages, dashboard, visitors, activity) — all built on a shared Axios instance (`lib/axios.js`, base URL from `VITE_API_URL`, `withCredentials: true` for cookie auth).
- React Query hooks (`hooks/auth`, `hooks/user`, `hooks/admin`) wrap each API call for caching, loading, and mutation state.
- `lib/gemini.js` integrates Google's **Gemini** model directly from the client for the **AI Chat** feature (`AiChatSection.jsx`).
- `ProgressBar.jsx` (NProgress) shows a top-of-page loading bar on route transitions; `SEO.jsx` (React Helmet Async) manages per-page meta tags.

---

## 🔗 Backend API Routes

Base URL: `<VITE_API_URL>` → e.g. `https://my-app-backend-ncj0.onrender.com/api`

### 🔑 Auth — `/api/auth`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Register a new user (`avatar` file optional) |
| GET | `/verify-email/:token` | Public | Verify email via emailed link/token |
| POST | `/login` | Public | Log in, receive JWT (cookie + token) |
| POST | `/logout` | Protected | Log out current user |
| POST | `/send-reset-otp` | Public | Send OTP to email for password reset |
| POST | `/verify-reset-otp` | Public | Verify the OTP |
| POST | `/reset-password` | Public | Set a new password after OTP verification |
| GET | `/profile` | Protected | Get current user's profile |
| PUT | `/update-profile` | Protected | Update profile (`avatar` file optional) |

### 👤 Users — `/api/users`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/settings` | Protected | Get account/notification settings |
| PUT | `/profile` | Protected | Update profile (`avatar` file optional) |
| DELETE | `/account` | Protected | Delete own account |
| PATCH | `/notification-settings` | Protected | Update notification preferences |

### ✅ Tasks — `/api/tasks` (User Dashboard)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/dashboard-summary` | Protected | Summary stats for the user dashboard |
| GET | `/` | Protected | Get all of the current user's tasks |
| POST | `/` | Protected | Create a new task |
| PATCH | `/:id` | Protected | Update a task (status, details, etc.) |

### ✉️ Contact — `/api/form`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/contact` | Public | Submit the public contact form |

### 📦 Products — `/api/products`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Public* | Create a product (`productImages`, up to 5) — *route-level auth is currently commented out in code* |

### 🛠️ Admin — Projects `/api/admin/projects` *(admin only)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create a portfolio project |
| GET | `/` | Get all projects |
| GET | `/:id` | Get a single project |
| PUT | `/:id` | Update a project |
| DELETE | `/:id` | Delete a project |

### 🛠️ Admin — Messages `/api/admin/messages` *(admin only)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all contact messages |
| GET | `/:id` | Get a single message |
| PATCH | `/:id/read` | Mark a message as read |
| DELETE | `/:id` | Delete a message |

### 🛠️ Admin — Other *(admin only)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Aggregated admin dashboard stats |
| GET | `/api/admin/activities` | System/activity audit log |
| GET | `/api/admin/visitors` | Visitor/traffic analytics |

> **Protected** routes require a valid JWT — sent automatically as an **HTTP-only cookie** after login, or via `Authorization: Bearer <token>`. **Admin only** routes additionally require `role: "admin"` on the user.

---

## 🖥️ Frontend Routes

### Public site
| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/service` | Services |
| `/contact` | Contact |
| `/register` | Register |
| `/login` | Login |
| `/verify-email-notice` | "Check your email" notice |
| `/verify-email/:token` | Email verification handler |
| `/forgot-password` | Request password reset (OTP) |
| `/verify-reset-otp` | Verify OTP |
| `/reset-password` | Set new password |
| `/privacy-policy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/ai-chat` | AI Chat (Gemini) |

### User Dashboard — `/user-dashboard` *(requires login)*
| Path | Page |
|------|------|
| `/user-dashboard` | Dashboard overview |
| `/user-dashboard/profile` | User profile |
| `/user-dashboard/tasks` | My Tasks |
| `/user-dashboard/tasks/new` | Create task |
| `/user-dashboard/tasks/edit/:id` | Edit task |
| `/user-dashboard/analytics` | Task analytics |

### Admin Dashboard — `/admin-dashboard` *(requires admin role)*
| Path | Page |
|------|------|
| `/admin-dashboard` | Dashboard overview |
| `/admin-dashboard/profile` | Admin profile |
| `/admin-dashboard/settings` | Settings |
| `/admin-dashboard/messages` | All contact messages |
| `/admin-dashboard/messages/:id` | Message details |
| `/admin-dashboard/projects` | Manage projects |
| `/admin-dashboard/projects/create` | Create project |
| `/admin-dashboard/projects/:id` | Project details |
| `/admin-dashboard/projects/edit/:id` | Edit project |
| `/admin-dashboard/analytics` | Visitor analytics |

`*` — any unmatched path renders a 404 **ErrorPage**.

---

## 🔐 Environment Variables

### Server — `.env.development` / `.env.production`
```env
PORT=3000
MONGO_URI=secret...
CLIENT_URL=http://localhost:5173          # set to https://sifatcoder.vercel.app/ in production
NODE_ENV=development

COOKIE_SECRET=your_cookie_secret

JWT_SECRET=jwt_secret
JWT_EXPIRE_REMEMBER=...
JWT_EXPIRE_DEFAULT=...

BREVO_HOST=smtp-relay.brevo.com
BREVO_PORT=587
BREVO_SENDER=my_sender_email
BREVO_USER=my_brevo_smtp_user
BREVO_PASS=my_brevo_smtp_password
BREVO_API_KEY=my_brevo_api_key

ADMIN_EMAIL=admin_notification_email

CLOUDINARY_CLOUD_NAME=my_cloudinary_cloud_name
CLOUDINARY_API_KEY=my_cloudinary_api_key
CLOUDINARY_API_SECRET=my_cloudinary_api_secret
```

### Client — `.env.development`
```env
VITE_API_URL=http://localhost:3000/api
VITE_GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

### Client — `.env.production`
```env
VITE_API_URL=https://my-app-backend-ncj0.onrender.com/api
VITE_GEMINI_API_KEY=secret_gemini_api_key
NODE_ENV=production
```

> ⚠️ **Security note:** don't commit real secrets (JWT secret, SMTP credentials, Cloudinary keys, Gemini API key) to GitHub. Add `.env*` to `.gitignore` and use placeholder values like above in the repo — set the real values only in your hosting dashboard (Render/Vercel) and locally in an untracked `.env` file. I noticed a real-looking Gemini API key in your uploaded `.env` files — **rotate/regenerate that key** in Google AI Studio before pushing this project, so the old one is invalidated.

---

## 🛠️ Installation & Build Commands

### 1. Clone the repository
```bash
git clone https://github.com/sifatshams/personal-portfolio.git
cd personal-portfolio
```

### 2. Backend Setup
```bash
cd server
npm install        # or: yarn

# Development (nodemon, auto env loading)
npm run dev

# Production
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install         # or: yarn

# Development
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint
```

Frontend runs at `http://localhost:5173` by default; backend at `http://localhost:3000` (or your configured `PORT`).

---

## ☁️ Deployment

- **Backend → Render**
  - Build command: `npm install`
  - Start command: `npm start`
  - `NODE_ENV=production` + all server env vars set in Render's dashboard.
- **Frontend → Vercel**
  - Build command: `npm run build`
  - Output directory: `dist`
  - `VITE_API_URL` and `VITE_GEMINI_API_KEY` set in Vercel's Environment Variables.
  - `client/vercel.json` handles SPA rewrites for React Router.

---

## ✨ Key Features
- 🔐 JWT + HTTP-only cookie authentication, with email verification and OTP-based password reset
- 👥 Role-based access control — separate **User** and **Admin** dashboards with route guards
- ✅ Personal task manager for users (CRUD + priority/status + dashboard analytics)
- 🗂️ Admin project management (portfolio projects, CRUD, image uploads via Cloudinary)
- 📬 Contact form → stored in DB + admin email notification + admin inbox (read/unread, delete)
- 📊 Visitor analytics (IP, browser, OS, device, path) and a system activity/audit log
- 🖼️ Avatar & project image uploads (Multer → Cloudinary)
- 🤖 AI Chat section powered by Google Gemini
- 🔔 Notification settings per user
- 🌍 SEO-friendly meta tags (React Helmet Async) and route-transition progress bar

---

## 👤 Author
**Sifat Bin Anwar**

---

## 📄 License
This project is licensed under the ISC License.