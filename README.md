# 🚀 Role-Based Login & Dashboard System (React + Redux)

This project is a **frontend interview assessment** for FinoBytes.  
It implements a **role-based authentication and dashboard system** using **React, Redux, and React Router**, with **mock authentication** (no real backend).  

---

## 🌐 Live Demo
🔗 [Live Demo](https://role-based-dashboard-eta.vercel.app/)  

---

## 📌 Features
- 🔑 **Role-Based Login & Registration**
  - Admin: Email + Password  
  - Merchant: Store Details + Password  
  - Member: Phone/Email + Password (or OTP simulation)  
- 🔒 **Protected Routes**
  - `/dashboard/admin` → Admin only  
  - `/dashboard/merchant` → Merchant only  
  - `/dashboard/member` → Member only  
- 🗄️ **Redux State Management**
  - Auth state (token + role)  
  - Dummy dashboard data (users, purchases, points, etc.)  
- 🎨 **UI/UX**
  - Clean design using **TailwindCSS / Material-UI**  
  - Simple forms with validation  
  - Dummy loaders where applicable  

---

## 📂 Pages Overview
### Authentication
-  Admin login (Email + Password)  
-  Merchant login (Store Details + Password)  
-  → Member login (Phone/Email + Password or OTP)  

### Dashboards
- `/dashboard/admin` → Manage Users & Merchants (dummy table data)  
- `/dashboard/merchant` →  
  - Approve Purchases (table with approve button)  
  - Lookup Customer (search bar + dummy results)  
  - Set Contribution Rate (form with number input)  
  - Notifications (list of approval requests)  
- `/dashboard/member` → Points Summary (dummy points overview)  

---

## ⚙️ Tech Stack
- **React** – UI library  
- **Redux Toolkit** – State management  
- **React Router v6** – Routing & protected routes  
- **TailwindCSS / Material-UI** – Styling  
- **LocalStorage** – Fake tokens for mock authentication  

---

## 🚦 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/Sifat-Ikram/role-based-dashboard.git
cd role-based-dashboard
npm install
npm run dev
