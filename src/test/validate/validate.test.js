import { validateEmail } from "../../public/js/validate.js";
import getValidateData from "./readFile.js";

let [validEmails, invalidEmails] = getValidateData();

describe("Emails are valid", () => {
  it.each(validEmails)(
    `The email: %s must be valid`,
    (email, expectedOutput) => {
      let actualOutput = validateEmail(email);
      expect(actualOutput).toEqual(expectedOutput);
    }
  );
});

describe("Emails are invalid", () => {
  it.each(invalidEmails)(
    `The email: %s must be invalid`,
    (email, expectedOutput) => {
      let actualOutput = validateEmail(email);
      expect(actualOutput).toEqual(expectedOutput);
    }
  );
});
