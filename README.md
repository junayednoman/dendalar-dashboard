# Central Player Dashboard

Admin dashboard for managing the Central Player platform. Built with **Next.js (App Router)**, **TypeScript**, **Redux Toolkit + RTK Query**, and a Tailwind/shadcn UI stack.

## Overview

This project provides admin-facing workflows for:

- Dashboard analytics and summaries
- User management
- Subscription management and subscription plans
- Content moderation (list + details + action panel)
- Notifications
- Profile and password management
- Settings CMS-like rich text editing (Jodit)

The app uses two route groups:

- `src/app/(authLayout)` for auth screens
- `src/app/(generalLayout)` for authenticated dashboard UI with sidebar + header

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 + tw-animate-css
- shadcn/ui + Radix UI + Lucide icons
- Redux Toolkit + RTK Query
- redux-persist
- react-hook-form + zod
- socket.io-client (real-time notifications)
- Jodit editor (loaded via dynamic ESM import)

## Key Features by Module

### Auth (`/auth/*`)

- Login
- Forgot password
- OTP verification
- Set new password
- Form validation with Zod

Note: some auth flows currently use simulated success/loading UX for frontend behavior.

### Dashboard (`/dashboard`)

- Top stats, overview chart, tabbed content, and recent users UI

### User Management (`/dashboard/user-management`)

- User listing/cards
- Filtering and pagination UI
- User details route: `/dashboard/user-management/[id]`

### Subscription Packages (`/dashboard/subscription`)

- Live preview + editor interface
- Role-based package editing (Players/Coaches/Scouts)

### Subscription Plans (`/dashboard/subscription-plans`)

- API-backed plans list
- Create/edit/delete plan modal workflow

### Content Moderation (`/dashboard/content-moderation`)

- Search + category tabs + pagination
- Video cards with play overlay and view metadata
- Reported content details route: `/dashboard/content-moderation/[id]`
- Violation reasons panel with moderation actions

### Notifications (`/dashboard/notifications`)

- Notification center UI
- Header unread indicator
- Real-time invalidation via socket events

### Settings (`/dashboard/settings`)

- Multi-tab rich text editor using Jodit (About/Terms/Privacy/Supports)

## API and State Management

RTK Query base API is configured in `src/redux/api/baseApi.ts`.

- API base URL: `NEXT_PUBLIC_API_BASE_URL`
- Socket URL: `NEXT_PUBLIC_SOCKET_BASE_URL`
- Access token is stored in cookie (`accessToken`) and attached to requests
- 401 responses trigger refresh flow: `/auth/refresh-token`

Available API slices include:

- `authApi`
- `dashboardApi`
- `profileApi`
- `userApi`
- `earningApi`
- `subscriptionPlanApi`
- `notificationApi`
- `contentApi`

## Environment Variables

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
NEXT_PUBLIC_SOCKET_BASE_URL=https://your-socket-domain.com
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm ci
```

### Run development server

```bash
npm run dev
```

Default dev URL:

- `http://localhost:3000`

### Production start

```bash
npm run build
npm run start
```

`start` runs Next.js on port `3010`.

## Scripts

- `npm run dev` - start local dev server (Turbopack)
- `npm run lint` - run ESLint
- `npm run format:check` - check formatting with Prettier
- `npm run build` - production build
- `npm run start` - run production server on `3010`

## CI/CD (GitHub Actions)

Workflow file: `.github/workflows/ci-cd.yml`

### Trigger

- Push to `main`

### Jobs

1. `ci`

- Checkout
- Setup Node 20
- `npm ci`
- `npm run lint`
- `npm run format:check`
- `npm run build`

2. `deploy` (runs only if `ci` passes)

- Configure SSH key from secrets
- SSH into VPS and run:
  - `cd $VPS_APP_DIR`
  - `git fetch origin`
  - `git reset --hard origin/main`
  - `npm ci`
  - `npm run build`
  - `pm2 restart myne-dashboard`
  - `pm2 save`

### Required GitHub Secrets

- `VPS_SSH_KEY`
- `VPS_HOST`
- `VPS_USER`
- `VPS_PORT`
- `VPS_APP_DIR`

## VPS / PM2 Notes

Your VPS should already have:

- Node.js + npm
- git
- pm2
- Cloned repo in `VPS_APP_DIR`
- Existing PM2 app named `myne-dashboard`

Example first-time PM2 start (on VPS):

```bash
pm2 start "npm run start" --name myne-dashboard
pm2 save
```

## Project Structure

```text
src/
  app/
    (authLayout)/
    (generalLayout)/
  components/
    form/
    ui/
    sidebar/
  redux/
    api/
    slice/
  hooks/
  data/
  validations/
```

## Notes

- Middleware currently redirects `/` to `/dashboard`. Auth guard logic exists but is mostly commented in `src/middleware.ts`.
- Several dashboard screens are fully UI-driven with mock/static data while API slices are prepared for backend integration.
