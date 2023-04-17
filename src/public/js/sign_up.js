import {
  evaluatePassStrength,
  validateEmail,
  checkPasswordMatched,
} from "./validate.js";

// Validate username: length only
$(document).ready(() => {
  $("#username").on("keyup", () => {
    let inputValue = $("#username").val().trim();
    validateLength(inputValue, 6, 50, "#username-msg");

    activeButton();
  });
});

// Validate email.
$(document).ready(() => {
  $("#email-signup").on("keyup", () => {
    let inputEmail = $("#email-signup").val().trim();
    let isEmailValid = validateEmail(inputEmail);
    showError(isEmailValid, "Email invalid", "#email-msg");

    activeButton();
  });
});

// Validate Password and evaluate password strength.
$(document).ready(() => {
  $("#enter-password").on("keyup", () => {
    // Validate length
    let passValue = $("#enter-password").val().trim();
    validateLength(passValue, 8, 32, "#enter-password-msg");

    // Display strength
    let grade = evaluatePassStrength(passValue);
    updateStateBar(grade);

    activeButton();
  });
});

// Validate re-enter password is matched.
$(document).ready(() => {
  $("#re-enter-password").on("keyup", () => {
    let enterPass = $("#enter-password").val().trim();
    let reEnterPass = $("#re-enter-password").val().trim();
    let isPasswordMatched = checkPasswordMatched(enterPass, reEnterPass);

    showError(
      isPasswordMatched,
      "Password does not matched",
      "#re-enter-password-msg"
    );

    activeButton();
  });
});

let updateStateBar = (grade) => {
  if (grade < 6) {
    $(".state-bar__box1").addClass("active");
    $(".state-bar__box2").removeClass("active");
    $(".state-bar__box3").removeClass("active");
  } else if (grade < 8) {
    $(".state-bar__box1").addClass("active");
    $(".state-bar__box2").addClass("active");
    $(".state-bar__box3").removeClass("active");
  } else {
    $(".state-bar__box1").addClass("active");
    $(".state-bar__box2").addClass("active");
    $(".state-bar__box3").addClass("active");
  }
};

let validateLength = (input, min, max, elementId) => {
  let inputLength = input.length;
  if (inputLength < min) {
    $(elementId).addClass("active");
    $(elementId).text(`At least ${min} characters.`);
  } else if (inputLength > max) {
    $(elementId).addClass("active");
    $(elementId).text(`Not over ${max} characters.`);
  } else {
    $(elementId).removeClass("active");
  }
};

let showError = (inputState, message, elementId) => {
  if (inputState === false) {
    $(elementId).addClass("active");
    $(elementId).text(message);
  } else {
    $(elementId).removeClass("active");
  }
};

let activeButton = () => {
  if (
    $("#enter-password-msg").hasClass("active") ||
    $("#username-msg").hasClass("active") ||
    $("#re-enter-password-msg").hasClass("active") ||
    $("#email-msg").hasClass("active")
  ) {
    $(".submit-btn.sign-up-type").removeClass("active");
  } else {
    $(".submit-btn.sign-up-type").addClass("active");
  }
};
