const form = document.querySelector("#contact-me"),
  name = form.querySelector("#name"),
  email = form.querySelector("#email"),
  text = form.querySelector("#text"),
  menuBtn = document.querySelector("#menu-btn"),
  mobMenu = document.querySelector(".sidebar"),
  nav = document.querySelector("nav"),
  cursor = document.querySelector("#cursor"),
  contactForm = document.querySelector("#contact"),
  links = document.querySelectorAll("a"),
  buttons = document.querySelectorAll("button"),
  watcher = document.querySelector(".scroll-watcher");

function openMenu() {
  mobMenu.style.width = "250px";
  mobMenu.style.borderRight = "2px solid rgb(203,213,224)";
  document.querySelector(".wrapper").style.marginLeft = "80px";
}

function closeMenu() {
  mobMenu.style.width = "0";
  mobMenu.style.borderRight = "";
  document.querySelector(".wrapper").style.marginLeft = "0";
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
  inputArray.forEach(input => {
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

function showNav(payload) {
  // console.log(payload);
  console.log(!payload[0].isIntersecting);
  if (!payload[0].isIntersecting) {
    console.log(nav);
    nav.classList.add("opaque");
  } else {
    nav.classList.remove("opaque");
  }
}

[...buttons, ...links].forEach(link => {
  link.addEventListener("mouseover", () => {
    cursor.classList.add("link-mouseover");
  });
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("link-mouseover");
  });
});

form.addEventListener("submit", e => {
  e.preventDefault();
  validateInput([name, email, text]);
  validateLength(name, 3, 25);
  validateLength(text, 20, 1000);
  validateEmail(email);
});

addEventListener("mousemove", e => {
  const x = e.pageX;
  const y = e.pageY;
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
});

const observer = new IntersectionObserver(showNav);

observer.observe(watcher);
