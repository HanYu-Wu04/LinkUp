"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // Importing icons from lucide-react

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark"); // Apply dark mode to the <html> element
      localStorage.setItem("theme", "dark"); // Save the theme preference in localStorage
    } else {
      document.documentElement.classList.remove("dark"); // Remove dark mode from the <html> element
      localStorage.setItem("theme", "light"); // Save the theme preference in localStorage
    }
  };

  // Check for saved theme preference on page load
  useEffect(() => {
    const userPrefersDark = localStorage.getItem("theme") === "dark";
    if (userPrefersDark) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center space-x-2 rounded bg-gray-200 p-2 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    >
      {/* Show sun icon when in dark mode, moon icon when in light mode */}
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="text-sm">{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
};

export default DarkModeToggle;
