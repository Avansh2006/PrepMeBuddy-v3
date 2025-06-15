# PrepMeBuddy-v3

PrepMeBuddy-v3 is a comprehensive web application designed to assist users in preparing for technical interviews. It offers a suite of tools including AI-powered roadmap generation, a DSA practice playground, mock interviews with an AI HR recruiter and proctoring, coding challenges, and progress tracking features.

## Key Features

*   **AI-Powered Roadmap Generator:** Generates personalized learning roadmaps based on user goals, time availability, and current skill level using the Gemini API.
*   **DSA Playground:** Practice Data Structures and Algorithms questions in an integrated Monaco editor. Features include:
    *   Selection of random LeetCode-style questions.
    *   Timer for practice sessions.
    *   Code execution (powered by Judge0 via the backend).
    *   AI-driven feedback on code logic, time/space complexity, and potential improvements (using Gemini API).
*   **Challenges:** A browsable and searchable list of coding challenges, which can be filtered by category. Users can attempt these challenges in the DSA Playground.
*   **AI Mock Interview (HR Round):**
    *   Engage in an interactive chat session with "Samantha," an AI HR recruiter, powered by the Gemini API.
    *   Webcam-based proctoring utilizing MediaPipe for face detection to monitor user presence and detect multiple faces.
    *   Cheating detection capabilities (monitoring tab focus, preventing developer tools usage).
    *   Text-to-speech for the AI recruiter's responses and speech-to-text for user input.
*   **Leaderboard:** Track and compare progress with other users based on points earned from activities.
*   **User Profiles:** Manage personal information (name, email, social links), view accumulated points, and see a list of solved questions. Data is stored in Firebase Firestore.
*   **Admin Panel:** (For administrators) A dedicated interface to create, read, update, and delete coding challenges stored in Firebase Firestore.
*   **Dashboard:** A central hub providing users with an overview of their statistics, daily login streak, XP points, quick access to daily challenges, resume upload functionality, and previews of the leaderboard and their roadmap.

## Tech Stack

### Frontend

*   **Framework/Library:** React (with Vite)
*   **Language:** JavaScript
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn/ui (Button, Card, Input, Tabs, Pagination, Textarea)
*   **Authentication:** Clerk
*   **Database (Client-side interaction):** Firebase Firestore
*   **Code Editor:** Monaco Editor
*   **Computer Vision:** MediaPipe (for Face Detection in mock interviews)
*   **State Management & Side Effects:** React Hooks, Context API
*   **Animations:** Framer Motion
*   **HTTP Client:** Axios
*   **Routing:** React Router DOM
*   **Notifications:** Sonner / React Hot Toast
*   **Charting:** Recharts

### Backend

*   **Framework:** Node.js with Express.js
*   **Language:** JavaScript
*   **APIs:**
    *   Google Gemini API (for roadmap generation, code feedback, AI HR chatbot)
    *   Judge0 API (for code execution in DSA Playground, accessed via RapidAPI)
*   **Middleware:** CORS
*   **Environment Variables:** Dotenv

## Getting Started

### Prerequisites

*   Node.js (v18.18.2 or compatible, check `.nvmrc`)
*   npm (comes with Node.js)
*   API Keys:
    *   Clerk (Publishable Key)
    *   Firebase (Project Configuration)
    *   Google Gemini API Key
    *   RapidAPI Key (for Judge0)

### Frontend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/avansh2006/prepmebuddy-v3.git
    cd prepmebuddy-v3
    ```

2.  **Install dependencies:**
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Configure Environment Variables:**
    *   Create a `.env` file in the root of the project (`prepmebuddy-v3/`).
    *   Add your Clerk Publishable Key and Gemini API Key:
        ```env
        VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
        VITE_GEMENI_API_KEY=your_gemini_api_key
        ```

4.  **Configure Firebase:**
    *   Update the Firebase configuration in `src/firebase.js` and `src/lib/firebase.js` with your project's Firebase config object.
    *   The file `src/firebase.js` currently has an empty config.
    *   The file `src/lib/firebase.js` has placeholder values.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should be accessible at `http://localhost:5173` (or another port if 5173 is in use).

### Backend Setup

1.  **Navigate to the backend server directory:**
    ```bash
    cd Backend/Server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    *   Create a `.env` file in the `Backend/Server/` directory.
    *   Add your Google Gemini API Key and RapidAPI Key:
        ```env
        GEMINI_API_KEY=your_gemini_api_key
        RAPID_API_KEY=your_rapidapi_key_for_judge0
        PORT=10000
        ```
        (You can change the `PORT` if needed.)

4.  **Start the backend server:**
    ```bash
    node index.js
    ```
    The backend server will run, typically on `http://localhost:10000`.

## Usage / Pages

*   **`/` (Dashboard):** View your progress, daily challenges, and quick stats.
*   **`/roadmap`:** Generate a personalized learning roadmap.
*   **`/dsa`:** Practice DSA questions in the interactive playground.
*   **`/challenge`:** Browse available coding challenges.
*   **`/quizapp` (Mock Interview):** Participate in an AI-driven HR mock interview with webcam proctoring.
*   **`/leaderboard`:** See how you rank against other users.
*   **`/profile`:** Update your personal details and view your solved questions and points.
*   **`/admin`:** (Administrators only) Manage coding challenges for the platform.
*   **`/login`, `/signup`:** Authentication pages.
