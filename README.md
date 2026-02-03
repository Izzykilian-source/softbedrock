# Soft Bedrock - LMS Admin Dashboard

![Dashboard Preview](public/dashboard-preview.png)
A high-fidelity, production-ready Admin Dashboard designed for Learning Management Systems (LMS). Built to simulate a real-world application environment with advanced data visualization, interactive state management, and professional UX patterns.


---

## ✨ Key Features
* **📈 Interactive Dashboard:** Real-time data visualization using **Recharts**, featuring interactive time-period toggles (Weekly/Monthly) and realistic data simulation.
* **⚡️ Advanced UX Patterns:**
    * **Skeleton Loading:** Shimmer effects for data fetching simulation to enhance perceived performance.
    * **Natural Notifications:** Custom-styled Toast notifications (Broadcasts, Reports) using **React Hot Toast**.
    * **Modal Dialogs:** Custom confirmation modals for critical actions (Delete) to prevent accidental data loss.
* **📚 Course Management (CRUD):**
    * Full Create, Read, Delete functionality.
    * **Dynamic Detail Pages:** Dedicated routing (`/courses/:id`) with tabbed navigation (Analytics, Curriculum, Students, Settings).
    * **Rich Content Management:** Curriculum builder interface with module/lesson organization.
* **👥 User Management:** Searchable and filterable student database with active status indicators.
* **🔐 Authentication Flow:** Simulated secure login/logout system with protected route guards (React Router).

## 🛠 Tech Stack
* **Core:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM v6
* **Icons:** Lucide React
* **Charts:** Recharts
* **Feedback:** React Hot Toast
* **Deployment:** Vercel

## 🚀 Getting Started

Follow these steps to run the project locally:
1.  **Clone the repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/soft-bedrock-dashboard.git](https://github.com/YOUR_USERNAME/soft-bedrock-dashboard.git)
    ```
2.  **Install dependencies**
    ```bash
    cd soft-bedrock-dashboard
    npm install
    ```
3.  **Run the development server**
    ```bash
    npm run dev
    ```
4.  **Open the app**
    Visit `http://localhost:5173` in your browser.

## 📂 Project Structure

```bash
src/
├── components/    # Reusable UI (Skeleton, Modals, Cards)
├── layouts/       # Main Layout (Sidebar + Header)
├── pages/         # Views (Overview, Courses, Detail, etc.)
├── App.jsx        # Routing & Auth Logic
└── main.jsx       # Entry Point

🔮 Future Roadmap
[ ] Dark Mode Toggle
[ ] Backend Integration (Supabase/Firebase)
[ ] Drag-and-drop Curriculum Builder
[ ] Multi-language Support (i18n)

🤝 Contact
Created by izzy.
Check out my portfolio or connect with me on LinkedIn.
