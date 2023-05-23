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

export default gradingPasswordStrength;
