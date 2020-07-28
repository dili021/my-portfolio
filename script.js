const form = document.querySelector("#contact-me");
const name = form.querySelector("#name");
const email = form.querySelector("#email");
const text = form.querySelector("#text");
const menuBtn = document.querySelector("#menu-btn");
const mobMenu = document.querySelector(".sidebar");
const nav = document.querySelector("nav");

function openMenu() {
  mobMenu.style.width = "250px";
  document.querySelector(".m-wrap").style.marginLeft = "250px";
}

function closeMenu() {
  mobMenu.style.width = "0";
  document.querySelector(".m-wrap").style.marginLeft = "0";
}

function showError(input, msg) {
  const formControl = input.parentElement;
  input.classList.add("border-2", "border-red-700");
  formControl.classList.add("text-red-700");
  const errorEl = formControl.querySelector("small");
  errorEl.innerText = msg;
}

function showSuccess(input) {
  input.classList.add("border-2", "border-green-500");
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateInput(inputArray) {
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function validateLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} needs to be at least ${min} characters long`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} can't be longer than ${max} characters long`
    );
    showSuccess(input);
  }
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.value)) {
    showError(email, "Email is not valid");
  } else {
    showSuccess(email);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput([name, email, text]);
  validateLength(name, 3, 25);
  validateLength(text, 20, 1000);
  validateEmail(email);
});

function suggestRefresh() {
  if (window.innerWidth <= 768 && document.location === "index.html") {
    alert("refresh your browser to load the mobile version");
  }
}

onresize = suggestRefresh;
