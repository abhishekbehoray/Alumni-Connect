// Theme Toggle
const themeBtn = document.getElementById("themeToggle");
const body = document.body;
const circle = document.getElementById("circleEffect");

if (themeBtn && circle) {
  themeBtn.addEventListener("click", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    circle.style.left = x + "px";
    circle.style.top = y + "px";
    circle.style.opacity = "0.7";
    circle.style.transform = "scale(0)";
    circle.style.transition = "none";

    requestAnimationFrame(() => {
      circle.style.transition = "all 0.8s ease-in-out";
      circle.style.transform = "scale(50)";
      circle.style.opacity = "0";
    });

    setTimeout(() => {
      body.classList.toggle("dark");
      themeBtn.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
    }, 300);
  });
}

// Role Buttons
const roleBtns = document.querySelectorAll(".role-btn");
const loginForm = document.getElementById("loginForm");
const formTitle = document.getElementById("formTitle");
const closeForm = document.getElementById("closeForm");

let selectedRole = null; // store role

if (roleBtns && loginForm && closeForm && formTitle) {
  roleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedRole = btn.dataset.role;
      formTitle.textContent = selectedRole + " Login";
      loginForm.classList.remove("hidden");
    });
  });

  closeForm.addEventListener("click", () => {
    loginForm.classList.add("hidden");
  });

  // Handle Login Submit
  const loginBtn = loginForm.querySelector("form");
  if (loginBtn) {
    loginBtn.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = loginForm.querySelector('input[type="email"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;

      if (email && password) {
        switch (selectedRole) {
          case "Alumni":
            alert("Alumni login successful! Redirecting...");
            window.location.href = "alumni.html";
            break;
          case "Recruiter":
            alert("Recruiter login successful! Redirecting...");
            window.location.href = "recruiter.html";
            break;
          case "Student":
            alert("Student login successful! Redirecting...");
            window.location.href = "student.html";
            break;
          case "Institute":
            alert("Institute login successful! Redirecting...");
            window.location.href = "institute.html";
            break;
          default:
            alert("Please select a role!");
        }
      } else {
        alert("Please fill in all fields!");
      }
    });
  }
}

// Sign Up Popup Logic
const signUpLink = document.getElementById("signUpLink");
const signUpPopups = {
  Recruiter: document.getElementById("signUpRecruiter"),
  Alumni: document.getElementById("signUpAlumni"),
  Student: document.getElementById("signUpStudent"),
  Institute: document.getElementById("signUpInstitute"),
};

function closeSignUp() {
  Object.values(signUpPopups).forEach(popup => {
    popup.classList.add("hidden");
  });
}

if (signUpLink) {
  signUpLink.addEventListener("click", (e) => {
    e.preventDefault();
    closeSignUp();
    if (selectedRole && signUpPopups[selectedRole]) {
      signUpPopups[selectedRole].classList.remove("hidden");
    } else {
      alert("Please select your role first!");
    }
  });
}
// Optional: Close popup when clicking outside
document.addEventListener("click", function (e) {
  Object.values(signUpPopups).forEach(popup => {
    if (!popup.classList.contains("hidden") && !popup.contains(e.target) && e.target !== signUpLink) {
      popup.classList.add("hidden");
    }
  });
});

// Logout Button (works on every page)
document.addEventListener('DOMContentLoaded', function() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // localStorage.clear(); // Uncomment if you use localStorage for session
      window.location.href = 'index.html';
    });
  }
});
// ...existing code...

// Store users in localStorage by role
function saveUser(role, user) {
  const key = `users_${role}`;
  const users = JSON.parse(localStorage.getItem(key)) || [];
  users.push(user);
  localStorage.setItem(key, JSON.stringify(users));
}

// Find user by email and password
function findUser(role, email, password) {
  const key = `users_${role}`;
  const users = JSON.parse(localStorage.getItem(key)) || [];
  return users.find(u => u.email === email && u.password === password);
}

// Handle Sign Up Submit
Object.entries(signUpPopups).forEach(([role, popup]) => {
  if (popup) {
    const form = popup.querySelector("form");
    if (form) {
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        const inputs = form.querySelectorAll("input");
        let user = {};
        inputs.forEach(input => {
          if (input.type === "email") user.email = input.value;
          else if (input.type === "password") user.password = input.value;
          else user[input.placeholder.replace(/\s+/g, '').toLowerCase()] = input.value;
        });
        // Basic validation
        if (!user.email || !user.password) {
          alert("Please fill all required fields.");
          return;
        }
        saveUser(role, user);
        alert("Sign up successful! Please login.");
        closeSignUp();
        loginForm.classList.remove("hidden");
        form.reset();
      });
    }
  }
});

// Update login logic to use stored users
if (roleBtns && loginForm && closeForm && formTitle) {
  roleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedRole = btn.dataset.role;
      formTitle.textContent = selectedRole + " Login";
      loginForm.classList.remove("hidden");
    });
  });

  closeForm.addEventListener("click", () => {
    loginForm.classList.add("hidden");
  });

  // Handle Login Submit
  const loginBtn = loginForm.querySelector("form");
  if (loginBtn) {
    loginBtn.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = loginForm.querySelector('input[type="email"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;

      if (email && password) {
        const user = findUser(selectedRole, email, password);
        if (user) {
          alert(selectedRole + " login successful! Redirecting...");
          window.location.href = selectedRole.toLowerCase() + ".html";
        } else {
          alert("Invalid credentials or user not found.");
        }
      } else {
        alert("Please fill in all fields!");
      }
    });
  }
}
// ...existing code...