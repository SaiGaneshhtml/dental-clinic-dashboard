# dental-clinic-dashboard

A frontend-only Dental Clinic Management Dashboard built with React, TypeScript, and Vite. Designed as a role-based single-page application where admins (dentists) manage patients and appointments, while patients can view their own records.

---

## Features

### Admin (Dentist)
- View, add, edit, and delete patient records
- Manage appointments and incidents per patient
- Record post-appointment details: treatment cost, status, and file attachments
- Monthly/weekly calendar view of all scheduled appointments
- Dashboard with KPIs — upcoming appointments, total revenue, and treatment status breakdown

### Patient
- View personal profile
- See upcoming appointments
- Access full appointment history including costs and uploaded files

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React (functional components + hooks) |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | React Router |
| State Management | React Context API (`AuthContext`, `DataContext`) |
| Styling | TailwindCSS |
| Persistence | `localStorage` (simulated backend) |

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into the project
cd dental-clinic-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Login Credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@entnt.in` | `admin123` |
| Patient | `sai@entnt.in` | `patient123` |

---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/
│   ├── AuthContext   # Handles login session and role
│   └── DataContext   # CRUD operations and localStorage access
├── pages/            # Route-level page components
├── data/             # Seed/mock data and user definitions
└── main.tsx
```

---

## Architecture Notes

**State Management — Context API over Redux**
The app's state is straightforward: a user session and a set of CRUD operations over patients and incidents. Context API handles this cleanly without the overhead of Redux.

**Data Persistence — localStorage**
`DataContext` abstracts all `localStorage` reads and writes, acting as a lightweight service layer. UI components never interact with storage directly.

**File Uploads**
Files are handled via `URL.createObjectURL`, producing Blob URLs that allow realistic in-browser preview and download without any backend storage.

**Role-Based Access**
Routes and UI elements are conditionally rendered based on the authenticated user's role from `AuthContext`. Patients can only see their own data.

---

## License

This project was built as a technical assignment and is intended for demonstration purposes.
