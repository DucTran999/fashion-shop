import gradingPassStrength from "../utils/PasswordStrengthMeter";

describe("grading pass strength function", () => {
  // Given
  it.each([
    ["", 0],
    ["pass", 2],
    ["password", 5],
    ["Password", 7],
    ["P@ssword", 11],
    ["P@ssw0rd", 14],
    ["P@ssword12345", 19],
    ["P@ssword6595495998985as", 24],
  ])(
    `Sample password: '%s' must return %i grades.`,
    (sample, expectedResult) => {
      // When
      let actualResult = gradingPassStrength(sample);
      // Then
      expect(actualResult).toBe(expectedResult);
    }
  );
});
