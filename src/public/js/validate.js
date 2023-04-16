let validateEmail = (emailInput) => {
  /* Pattern guide:
   * Local part can contain all characters without @ symbol
   * At least one domain name.
   * TLD: max 4 characters.
   */

  let emailPattern =
    /^([\w+\s\!\#\$\%\&\*\-\"]\.{0,1})+@([a-zA-Z\-\s]+\.){1,}[a-z]{2,4}$/gi;

  //Email too long
  if (emailInput.length > 255) {
    return false;
  }

  if (emailInput.includes(".web")) {
    return false;
  }

  // Email matching with pattern.
  return emailPattern.test(emailInput.trim());
};

let evaluatePassStrength = (passwordInput) => {
  /* Grade : State:
   * grade < 6 : Weak ~ 1 box
   * 6 <= grade < 8 : Medium ~ 2 box
   * grade >= 8 : Strong ~ 3 box
   */
  let grade = 0;

  // pattern for grading.
  let lowerCases = new RegExp(/[a-z]/g);
  let upperCases = new RegExp(/[A-Z]/g);
  let digits = new RegExp(/[0-9]/g);
  let specialChar = new RegExp(/[-#$.%&*@!~/?<>]/g);

  if (passwordInput.length > 9) {
    grade += 3;
  } else if (passwordInput.length > 12) {
    grade += 6;
  }

  if (passwordInput.match(lowerCases)) {
    grade += 2;
  }

  if (passwordInput.match(upperCases)) {
    grade += 2;
  }

  if (passwordInput.match(digits)) {
    grade += 2;
  }

  if (passwordInput.match(specialChar)) {
    grade += 1;
  }

  return grade;
};

let checkPasswordMatched = (enterPass, reEnterPass) => {
  return true ? enterPass === reEnterPass : false;
};

export { validateEmail, evaluatePassStrength, checkPasswordMatched };
