// script.js — Theme toggle (dark / light mode)
//
// Navigation highlighting is handled by Jinja templates,
// so this file only manages the theme switch.

// Read saved theme from localStorage (if any)
var saved = localStorage.getItem("theme");

// If the user previously chose dark mode, apply it immediately
if (saved === "dark") {
  document.documentElement.classList.add("dark");
}

// Find the toggle button
var btn = document.getElementById("theme-toggle");

// Set the initial button label
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


// =============================================
// Custom confirm modal
// =============================================

var confirmModal = document.getElementById("confirm-modal");
var confirmMessage = document.getElementById("confirm-modal-message");
var confirmYes = document.getElementById("confirm-modal-yes");
var confirmNo = document.getElementById("confirm-modal-no");
var pendingForm = null;

// Attach to all forms with a [data-confirm] submit button
document.querySelectorAll("button[data-confirm]").forEach(function (btn) {
  btn.closest("form").addEventListener("submit", function (e) {
    if (pendingForm === this) return; // already confirmed
    e.preventDefault();
    pendingForm = null;
    confirmMessage.textContent = btn.getAttribute("data-confirm");
    confirmYes.textContent = btn.getAttribute("data-confirm-action") || "Видалити";
    confirmModal.hidden = false;
    confirmNo.focus();

    var form = this;
    confirmYes.onclick = function () {
      confirmModal.hidden = true;
      pendingForm = form;
      form.submit();
    };
    confirmNo.onclick = function () {
      confirmModal.hidden = true;
      pendingForm = null;
    };
  });
});

// Close on overlay click
if (confirmModal) {
  confirmModal.addEventListener("click", function (e) {
    if (e.target === confirmModal) {
      confirmModal.hidden = true;
      pendingForm = null;
    }
  });
}

// Close on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && confirmModal && !confirmModal.hidden) {
    confirmModal.hidden = true;
    pendingForm = null;
  }
});


// =============================================
// Toast notifications
// =============================================

function showToast(message, category) {
  var container = document.getElementById("toast-container");
  if (!container) return;

  var toast = document.createElement("div");
  toast.className = "toast toast-" + (category || "success");
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("toast-hiding");
    setTimeout(function () {
      toast.remove();
    }, 300);
  }, 3000);
}

// Read flash messages on page load
document.querySelectorAll(".flash-data").forEach(function (el) {
  showToast(el.getAttribute("data-message"), el.getAttribute("data-category"));
  el.remove();
});


// =============================================
// Custom form validation
// =============================================

document.querySelectorAll("form[novalidate]").forEach(function (form) {
  form.addEventListener("submit", function (e) {
    // Clear previous errors
    form.querySelectorAll(".field-error").forEach(function (el) { el.remove(); });
    form.querySelectorAll(".invalid").forEach(function (el) { el.classList.remove("invalid"); });

    var firstInvalid = null;

    form.querySelectorAll("[required]").forEach(function (field) {
      if (!field.value.trim()) {
        e.preventDefault();
        field.classList.add("invalid");
        var errorSpan = document.createElement("span");
        errorSpan.className = "field-error";
        errorSpan.textContent = "Це поле обов'язкове";
        field.parentNode.insertBefore(errorSpan, field.nextSibling);
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (firstInvalid) firstInvalid.focus();
  });

  // Clear error on input
  form.addEventListener("input", function (e) {
    var field = e.target;
    if (field.classList.contains("invalid") && field.value.trim()) {
      field.classList.remove("invalid");
      var next = field.nextElementSibling;
      if (next && next.classList.contains("field-error")) {
        next.remove();
      }
    }
  });
});
