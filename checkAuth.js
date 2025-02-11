import { API_ENDPOINTS } from "./utils/constants.js";
export const checkAuth = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.CHECK_AUTH, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    const logoutButton = document.getElementById("logoutButton");
    //hk
    const currentPath = window.location.pathname;
    const isPublicPage =
      currentPath.includes("sign-in.php") ||
      currentPath.includes("sign-up.php") ||
      currentPath.includes("forgot-password.php") ||
      currentPath.includes("reset-password.php");

    if (data.success) {
      if (isPublicPage) {
        window.location.href = "index.php";
        return;
      }
      // if (
      //   window.location.pathname.includes("sign-in.php") ||
      //   window.location.pathname.includes("sign-up.php")
      // ) {
      //   window.location.href = "index.php";
      // }
      if (logoutButton) {
        logoutButton.classList.remove("d-none");
        logoutButton.classList.add("d-flex");
      }
    } else {
      if (logoutButton) {
        logoutButton.classList.remove("d-flex");
        logoutButton.classList.add("d-none");
      }
      if (!isPublicPage) {
        window.location.href = "sign-in.php";
      }
      // if (!window.location.pathname.includes("sign-in.php")) {
      //   window.location.href = "sign-in.php";
      // }
    }
  } catch (error) {
    // console.error("Auth check failed:", error);
    const currentPath = window.location.pathname;
    const isPublicPage =
      currentPath.includes("sign-in.php") ||
      currentPath.includes("sign-up.php");

    if (!isPublicPage) {
      window.location.href = "sign-in.php";
    }

    // if (!window.location.pathname.includes("sign-in.php")) {
    //   window.location.href = "sign-in.php";
    // }
  }
};

document.addEventListener("DOMContentLoaded", checkAuth);
