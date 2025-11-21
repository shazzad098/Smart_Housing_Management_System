# Smart Housing Society Management System - Project Specifications

## 1. Folder Structure
A scalable MERN stack structure (Monorepo approach):

```
project-root/
├── client/                 # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages (Dashboard, Bills, etc.)
│   │   ├── store/          # Redux setup (slices, store)
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Helper functions
│   │   ├── App.tsx
│   │   └── index.tsx
│   └── package.json
├── server/                 # Backend (Node/Express)
│   ├── config/             # DB connection, environment vars
│   ├── controllers/        # Route logic
│   ├── middleware/         # Auth, Validation, RBAC
│   ├── models/             # Mongoose Schemas (User, Bill, Visitor, Complaint)
│   ├── routes/             # API Routes
│   ├── utils/              # Helpers (Email, QR generation)
│   └── server.js           # Entry point
└── package.json            # Root scripts
```

## 2. API Endpoints

### Authentication
- `POST /api/auth/register` - Register new resident/admin
- `POST /api/auth/login` - Login and get JWT
- `GET /api/auth/me` - Get current user profile

### Bills
- `GET /api/bills` - Get all bills for logged-in resident
- `POST /api/bills/generate` - (Admin) Generate monthly bills
- `POST /api/bills/pay` - Initiate Stripe payment

### Visitors
- `GET /api/visitors` - Get visitor history
- `POST /api/visitors/pre-authorize` - Create upcoming visitor (QR Code)
- `PUT /api/visitors/:id/exit` - (Security) Mark visitor as exited

### Complaints
- `GET /api/complaints` - List user complaints
- `POST /api/complaints` - Submit new complaint
- `PUT /api/complaints/:id/status` - (Admin) Update status

### Community Chat
- `GET /api/chat/channels` - List channels
- `GET /api/chat/:channelId/messages` - Get history
- `POST /api/chat/message` - Send message (Socket.io handles real-time)

## 3. Development Roadmap

### Phase 1: Setup & Authentication (Week 1)
- Initialize Monorepo.
- Setup MongoDB Atlas and Express server.
- Implement User Model and JWT Authentication.
- Setup React with Tailwind CSS and Redux Toolkit.
- Create Login/Register pages.

### Phase 2: Core Modules (Week 2-3)
- **Dashboard:** Create Admin and Resident dashboard views with charts.
- **Bill Payments:** Implement Bill Model, Stripe integration, and payment history.
- **Visitor Management:** Implement Visitor Model, QR Code generation (frontend), and scanning logic.

### Phase 3: Communication & Support (Week 4)
- **Complaints:** CRUD for complaints with status tracking.
- **Community Chat:** Setup Socket.io for real-time messaging in channels.
- **Notices:** Admin interface to post announcements.

### Phase 4: Polish & Deployment (Week 5)
- **Security Guard View:** Optimize visitor check-in for mobile web.
- **RBAC:** Ensure strict role-based access (Admin vs Resident routes).
- **Deployment:** Deploy frontend to Vercel/Netlify, backend to Heroku/Render.
```