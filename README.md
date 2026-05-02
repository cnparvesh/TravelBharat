# TravelBharat – Explore India State by State 🇮🇳

TravelBharat is a centralized, digital travel encyclopedia of India. It allows users to explore tourist destinations state-wise and city-wise with rich content, stunning UI, search functionality, and a dedicated admin panel for content management.

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth_v5-000000?style=for-the-badge&logo=next.js&logoColor=white)

## ✨ Features

- **Dynamic Homepage**: Animated hero section, popular states, featured destinations, and categories.
- **Deep Exploration**: Dedicated pages for states, cities, and specific tourist places.
- **Advanced Search**: Search across destinations by name, category, or location with debouncing.
- **Admin Dashboard**: Secure, NextAuth-protected `/admin` panel to perform full CRUD operations on states, cities, and places.
- **Premium UI/UX**: Designed with Tailwind CSS, glassmorphism effects, and Framer Motion micro-animations.
- **SEO Optimized**: Dynamic metadata generation for all routes.
- **Responsive**: Flawless experience across desktop, tablet, and mobile.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4, Framer Motion
- **Database**: MongoDB (via Mongoose)
- **Authentication**: NextAuth.js (v5)
- **Icons**: React Icons

## 💻 Getting Started

### Prerequisites

- Node.js 18+ installed
- A MongoDB Atlas cluster (or local MongoDB)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cnparvesh/TravelBharat.git
   cd TravelBharat
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   # MongoDB Connection String
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/travelbharat?retryWrites=true&w=majority

   # NextAuth Configuration
   NEXTAUTH_SECRET=your_super_secret_string_here
   NEXTAUTH_URL=http://localhost:3000

   # Default Admin Credentials (for the seed script)
   ADMIN_EMAIL=admin@travelbharat.com
   ADMIN_PASSWORD=Admin@123
   ```
   *Note: If you face SSL/TLS issues locally on Windows, append `&tls=true&tlsInsecure=true` to your `MONGODB_URI`.*

4. **Seed the Database (Optional but recommended):**
   Start the development server:
   ```bash
   npm run dev
   ```
   Then trigger the seed API to populate the database with initial dummy data:
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```

5. **Run the Application:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🛡️ Admin Access

To access the content management dashboard, navigate to `/admin/login`. 
Use the credentials defined in your environment variables:
- **Email:** `admin@travelbharat.com`
- **Password:** `Admin@123`

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
