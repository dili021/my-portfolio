const form = document.querySelector("#contact-me");
const name = form.querySelector("#name");
const email = form.querySelector("#email");
const text = form.querySelector("#text");
const menuBtn = document.querySelector("#menu-btn");
const mobMenu = document.querySelector(".m-nav");
const nav = document.querySelector("nav");

function changeMenuIcon() {
  menuBtn.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
    </svg>
    `;
}

function showMenu() {
  nav.insertAdjacentElement("afterend", mobMenu);
  mobMenu.classList.toggle("open");
}

function showError(input, msg) {
  const formControl = input.parentElement;
  formControl.classList.add("error");
  const errorEl = formControl.querySelector("small");
  errorEl.innerText = msg;
}

function showSuccess(input) {
  input.parentElement.classList.add("success");
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateInput(inputArray) {
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    }
    showSuccess(input);
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
  }
  showSuccess(email);
}

menuBtn.addEventListener("click", showMenu);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput([name, email, text]);
  validateLength(name, 3, 25);
  validateLength(text, 20, 1000);
  validateEmail(email);
});
