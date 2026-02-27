// script.js — Theme toggle (dark / light mode)

// Read saved theme from localStorage (if any)
var saved = localStorage.getItem("theme");

// If the user previously chose dark mode, apply it immediately
if (saved === "dark") {
  document.documentElement.classList.add("dark");
}

// Find the toggle button and set initial label
var btn = document.getElementById("theme-toggle");

if (document.documentElement.classList.contains("dark")) {
  btn.textContent = "[light]";
}

// Toggle between dark and light when the button is clicked
btn.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");

  var isDark = document.documentElement.classList.contains("dark");

  // Update button text to show the opposite action
  btn.textContent = isDark ? "[light]" : "[dark]";

  // Save the choice so it persists across page loads
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
