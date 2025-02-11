import { API_ENDPOINTS } from "./utils/constants.js";
import { showToast } from "./utils/toast.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(API_ENDPOINTS.LOGOUT, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          showToast("Logged out successfully", "success");
          logoutButton.classList.remove("d-flex");
          logoutButton.classList.add("d-none");
          setTimeout(() => {
            window.location.href = "sign-in.php";
          }, 500);
        } else {
          showToast(data.message || "Failed to logout", "danger");
        }
      } catch (error) {
        showToast(`Logout error: ${error.message}`, "danger");
      }
    });
  }
});
