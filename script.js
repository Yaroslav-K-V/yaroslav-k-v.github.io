// script.js

// =============================================
// PART 1: Highlight the active navigation link
// =============================================

// Get all navigation links on the page.
const navLinks = document.querySelectorAll("nav a");

// Get the filename of the current page (e.g. "about.html").
// Split the path by "/" and take the last part.
const path = window.location.pathname;
const currentPage = path.substring(path.lastIndexOf("/") + 1) || "index.html";

// Loop through each nav link.
navLinks.forEach(function (link) {
  // Get the filename from the link's href attribute.
  const linkPage = link.getAttribute("href").replace("../", "");

  // If the link points to the current page, mark it as active.
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

// =============================================
// PART 2: Dark / Light theme toggle
// =============================================

// Find the toggle button in the page.
const toggleBtn = document.getElementById("theme-toggle");

// Check localStorage for a previously saved theme preference.
// If the user chose "dark" before, this returns "dark".
// If nothing was saved, it returns null (we default to light).
const savedTheme = localStorage.getItem("theme");

// If the saved theme is "dark", apply dark mode on page load.
if (savedTheme === "dark") {
  // Add the "dark" class to <html>, which activates the dark CSS variables.
  document.documentElement.classList.add("dark");
  // Update the button text to show the available action.
  toggleBtn.textContent = "[light]";
}

// Listen for clicks on the toggle button.
toggleBtn.addEventListener("click", function () {
  // Toggle the "dark" class on <html>.
  // If present, this removes it. If absent, this adds it.
  document.documentElement.classList.toggle("dark");

  // Check whether dark mode is now active.
  const isDark = document.documentElement.classList.contains("dark");

  // Update the button label.
  // In dark mode, button says "[light]" (click to go light).
  // In light mode, button says "[dark]" (click to go dark).
  toggleBtn.textContent = isDark ? "[light]" : "[dark]";

  // Save the choice to localStorage so it persists across pages.
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
