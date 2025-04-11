import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase"; // Assuming firebase is set up

// Simulated user data
const initialStats = {
  xp: 1200,
  streak: 5,
  challengesCompleted: 8,
  totalChallenges: 15,
  mockInterviews: 3,
  roadmapProgress: 60, // Percentage
};

const roadmapSteps = [
  { title: "Data Structures", week: 1, completed: true },
  { title: "Algorithms", week: 2, completed: true },
  { title: "System Design", week: 3, completed: false },
  { title: "Mock Interviews", week: 4, completed: false },
];

const theme = {
  backgroundGradient: "bg-gray-900",
  cardBackground: "bg-gray-800",
  textColor: "text-white",
  accentColor: "text-teal-400",
  buttonPrimary: "bg-blue-600 hover:bg-blue-700",
  buttonSecondary: "bg-gray-600 hover:bg-gray-500",
  progressBarBackground: "bg-gray-600",
  progressBarFill: "bg-teal-500",
};

export default function Dashboard() {
  const { user } = useUser();
  const [stats, setStats] = useState(initialStats);
  const [resumeName, setResumeName] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [realTimePoints, setRealTimePoints] = useState(0); // State for real-time points

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const users = snapshot.docs.map((doc) => doc.data());
      const sortedUsers = users
        .sort((a, b) => (b.points || 0) - (a.points || 0))
        .slice(0, 3); // Get top 3 performers
      setLeaderboard(sortedUsers);
    };
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    const today = new Date().toDateString();

    if (lastVisit !== today) {
      setStats((prev) => ({
        ...prev,
        streak: prev.streak + 1,
      }));
      localStorage.setItem("lastVisit", today);
    }
  }, []);

  // Fetch real-time points from the database
  useEffect(() => {
    if (user?.id) {
      const unsubscribe = onSnapshot(
        collection(db, "users"),
        (snapshot) => {
          const currentUser = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .find((u) => u.id === user.id);
          if (currentUser) {
            setRealTimePoints(currentUser.points || 0);
          }
        }
      );
      return () => unsubscribe(); // Cleanup listener on unmount
    }
  }, [user]);

  // Handle resume upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
      setStats((prev) => ({ ...prev, xp: prev.xp + 50 })); // Reward XP
      alert(`Uploaded: ${file.name} (+50 XP)`);
    }
  };

  // Simulate challenge completion
  const completeChallenge = () => {
    setStats((prev) => ({
      ...prev,
      challengesCompleted: prev.challengesCompleted + 1,
      xp: prev.xp + 100,
      streak: prev.streak + 1,
    }));
    alert("Challenge completed! +100 XP");
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className={`min-h-screen ${theme.backgroundGradient} ${theme.textColor} p-6 space-y-10`}>
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold"
      >
        Welcome back, <span className="text-cyan-400">{user?.firstName || "Techie"}</span> 👋
      </motion.h1>

      {/* Real-Time Points */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card className={theme.cardBackground}>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">🌟 Points</h2>
            <p className="text-4xl mt-2">{realTimePoints}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Coding Challenge */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className={theme.cardBackground}>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2">
              Today's Challenge: Two Sum
            </h2>
            <p className="text-sm mb-4">
              Given an array of integers, return indices of the two numbers such
              that they add up to a specific target.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => (window.location.href = "/challenge")}
                className={theme.buttonPrimary}
              >
                Solve Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Resume Upload */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className={theme.cardBackground}>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2">Upload Resume</h2>
            <input
              type="file"
              accept="application/pdf"
              className="mt-2 text-sm text-gray-300"
              onChange={handleResumeUpload}
            />
            {resumeName && (
              <p className="mt-2 text-sm">Uploaded: {resumeName}</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Leaderboard */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className={theme.cardBackground}>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">🏆 Leaderboard</h2>
              <Button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className={theme.buttonSecondary}
              >
                {showLeaderboard ? "Hide" : "Show"}
              </Button>
            </div>
            {showLeaderboard && (
              <ul className="space-y-2">
                {leaderboard.map((entry, idx) => (
                  <li key={idx}>
                    {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"} {entry.name || "Anonymous"} —{" "}
                    {entry.points || 0} Points
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Roadmap */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className={theme.cardBackground}>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">📈 Prep Roadmap</h2>
              <Button
                onClick={() => (window.location.href = "/roadmap")}
                className={theme.buttonSecondary}
              >
                Show
              </Button>
            </div>
            {showRoadmap && (
              <div>
                <ol className="list-decimal list-inside text-sm space-y-2">
                  {roadmapSteps.map((step) => (
                    <li
                      key={step.week}
                      className={step.completed ? theme.accentColor : ""}
                    >
                      {step.title} (Week {step.week})
                      {step.completed && " ✅"}
                    </li>
                  ))}
                </ol>
                <div className={`w-full ${theme.progressBarBackground} rounded-full h-2.5 mt-4`}>
                  <div
                    className={`${theme.progressBarFill} h-2.5 rounded-full`}
                    style={{ width: `${stats.roadmapProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}