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
   * TLD: max 4 characters.
   */
  const regex = /^([\w+!#$%&*\-"]\.{0,1})+@([a-zA-Z\-\s]+\.){1,}[a-z]{2,4}$/gi;
  return input.length <= 255 && regex.test(input);
};

const isLengthValid = (input) => {
  return input.length > 8;
};

export { isName, isEmail, isLengthValid };
