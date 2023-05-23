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
    ["email@abc.com", false],
    ["Email@yahoo.com.vn", false],
    ["atlana@hotmail.com", false],
    ["atla na@gmail.com", false],
    ["atlana@gmail.com", true],
    ["atlana99@gmail.com", true],
    ["atlana.99.shop@gmail.com", true],
  ])(`The email: '%s' must return %s .`, (sample, expectedResult) => {
    // When
    let actualResult = isEmail(sample);
    // Then
    expect(actualResult).toBe(expectedResult);
  });
});
