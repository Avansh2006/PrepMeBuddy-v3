// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, useUser, RedirectToSignIn } from "@clerk/clerk-react";

import Dashboard from "./pages/Dashboard";
import Challenge from "./pages/Challenge";
import CodingPage from "./pages/CodingPage";
import Leaderboard from "./pages/Leaderboard";
import Roadmap from "./pages/Roadmap";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/profile";
import Logout from "./pages/logout";
import QuizApp from "./pages/Quiz";
import ChatBot from "./pages/chatBot";
import HRChatbot from "./pages/videodetect";
import DSAPlayground from "./pages/DSAPlayground";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function AppNav() {
  const location = useLocation();
  const { isSignedIn, user } = useUser();

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`hover:text-purple-300 transition ${
        location.pathname === to ? "text-purple-400 font-semibold underline" : ""
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="p-4 bg-zinc-800 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-extrabold tracking-tight text-purple-400">PrepMeBuddy</h1>
      <div className="space-x-4 text-sm">
        {navLink("/", "Dashboard")}
        {navLink("/challenge", "Challenge")}
        {navLink("/leaderboard", "Leaderboard")}
        {navLink("/roadmap", "Roadmap")}
        {navLink("/profile", "Profile")}
        {navLink("/quizapp", "Mock-Interview")}
        {navLink("/dsa", "DSA Playground")}
        {isSignedIn && user?.publicMetadata?.role === "admin" && navLink("/admin", "Admin Panel")}
        {isSignedIn && navLink("/logout", "Logout")}
        <SignedOut>
          {navLink("/login", "Login")}
          {navLink("/signup", "Signup")}
        </SignedOut>
      </div>
    </nav>
  );
}

function ProtectedRoute({ children, role }) {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) return null;
  if (!isSignedIn || (role && user?.publicMetadata?.role !== role)) {
    return <RedirectToSignIn />;
  }
  return children;
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => window.history.pushState(null, '', to)}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-950 text-white font-sans">
          <AppNav />
          <Routes>
            <Route path="/" element={<SignedIn><Dashboard /></SignedIn>} />
            <Route path="/challenge" element={<SignedIn><Challenge /></SignedIn>} />
            <Route path="/challenge/:id" element={<SignedIn><CodingPage /></SignedIn>} />
            <Route path="/leaderboard" element={<SignedIn><Leaderboard /></SignedIn>} />
            <Route path="/roadmap" element={<SignedIn><Roadmap /></SignedIn>} />
            <Route path="/dsa" element={<SignedIn>< DSAPlayground /></SignedIn>} />
            <Route path="/quizapp" element={
              
              <SignedIn> 
                <HRChatbot/>
                <ChatBot/>
              </SignedIn>} 
              />
            <Route path="/profile" element={<SignedIn><Profile /></SignedIn>} />
            <Route path="/login" element={<SignedOut><Login /></SignedOut>} />
            <Route path="/signup" element={<SignedOut><Signup /></SignedOut>} />
            <Route path="/logout" element={<SignedIn><Logout /></SignedIn>} />
            <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <AdminPanel />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
