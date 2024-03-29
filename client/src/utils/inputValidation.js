const isName = (input) => {
  /* Name validator
   * The length of the first or last name cannot be empty and only letters allowed
   */
  const regex = /^[a-z\s]+$/i;
  return input.length > 0 && regex.test(input);
};

const isEmail = (input) => {
  /* Email length not over 255 character and match the pattern
   *
   * Pattern guide:
   * Local part can contain all characters without @ symbol
   * At least one domain name.
   * Only allow Gmail
   */
  const regex = /^([a-zA-z0-9]\.{0,1})+@gmail.com$/gi;
  return input.length <= 255 && regex.test(input);
};

const isLengthValid = (input) => {
  return input.length >= 8 && input.length <= 32;
};

const isPasswordStrong = (input) => {
  const containUpperCase = /[A-Z]+/g;
  const containLowerCase = /[a-z]+/g;
  const containNumber = /[0-9]+/g;
  const containSymbols = /[!"#$%&'()*+,-./:<;= ?>@[\]^_`{|}~]+/g;
  const lengthRequire = input.length >= 8 && input.length <= 32;

  return (
    lengthRequire &&
    containSymbols.test(input) &&
    containNumber.test(input) &&
    containUpperCase.test(input) &&
    containLowerCase.test(input)
  );
};

const isNotEmpty = (input) => {
  return input.trim().length > 0;
};

const gradingPasswordStrength = (input) => {
  let passwordLength = input.length;
  let currentPassGrade = 0;
  const containUpperCase = /[A-Z]+/g;
  const containLowerCase = /[a-z]+/g;
  const containNumber = /[0-9]+/g;
  const containSymbols = /[!"#$%&'()*+,-./:<;= ?>@[\]^_`{|}~]+/g;

  if (passwordLength === 0) return currentPassGrade;

  if (passwordLength >= 8) currentPassGrade += 3;

  if (passwordLength >= 12) currentPassGrade += 5;

  if (passwordLength >= 18) currentPassGrade += 5;

  if (containUpperCase.test(input)) currentPassGrade += 2;

  if (containLowerCase.test(input)) currentPassGrade += 2;

  if (containNumber.test(input)) currentPassGrade += 3;

  if (containSymbols.test(input)) currentPassGrade += 4;

  return currentPassGrade;
};

export {
  isName,
  isEmail,
  isNotEmpty,
  isLengthValid,
  isPasswordStrong,
  gradingPasswordStrength,
};
