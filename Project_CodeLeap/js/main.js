const signupModal = document.querySelector(".signup-modal");
const mainScreen = document.getElementById("main-screen");

const usernameInput = document.getElementById("username");
const enterBtn = document.getElementById("enter-btn");

mainScreen.style.display = "none";
signupModal.style.display = "flex";

function enterApp() {
  const username = usernameInput.value.trim();
  if (username !== "") {
    localStorage.setItem("username", username);
    signupModal.style.display = "none";
    mainScreen.style.display = "block";
  }
}

enterBtn.addEventListener("click", enterApp);

usernameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    enterApp();
  }
});
