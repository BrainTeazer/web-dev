const email = /^([a-z\d\.-]+)(@)([a-z\d-]+)(\.[a-z]{2,8})(\.[a-z]{2,8})?$/;
const nonDigits = /[\d]/;

const inputs = document.querySelector("#email");

inputs.addEventListener("keyup", (e) => {
  if (email.test(inputs.value)) {
    e.target.className = "box-form valid";
  } else if (!email.test(inputs.value) && inputs.value != "") {
    e.target.className = "box-form invalid";
  } else {
    e.target.className = "box-form";
  }
});

const ageInput = document
  .querySelector("#number")
  .addEventListener("keypress", (e) => {
    let validValue = nonDigits.test(e.key);
    validValue || e.preventDefault();
  });
