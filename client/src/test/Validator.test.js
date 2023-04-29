import { isEmail } from "../utils/Validator";

describe("email validation", () => {
  // Given
  it.each([
    ["", false],
    ["ab@gma#il.com", false],
    ["ab@c@gmail.com", false],
    ["email@gmail.comsdas", false],
    ["email@gma-il.csdas", false],
    ["email@gmai&l.comsdas", false],
    ["email@gma5il.comsdas", false],
    ["Email@gma.c", false],
    ["email@abc.com", true],
    ["Email@yahoo.com.vn", true],
    ["atlana@hotmail.com", true],
  ])(`The email: '%s' must return %i grades.`, (sample, expectedResult) => {
    // When
    let actualResult = isEmail(sample);
    // Then
    expect(actualResult).toBe(expectedResult);
  });
});
