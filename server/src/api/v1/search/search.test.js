import { SEARCH_TYPE } from "../../utils/constVariable.js";
import analyzeSearchTerm from "./analyzeSearchTerm.js";

describe("Test AnalyzeSearchTerm", () => {
  describe("test detect term is for searching product by category", () => {
    // Given
    it.each([
      ["bi", { type: SEARCH_TYPE.byCategory, term: "bikini" }],
      ["đầm", { type: SEARCH_TYPE.byCategory, term: "dress" }],
      ["váy", { type: SEARCH_TYPE.byCategory, term: "skirt" }],
      ["quần", { type: SEARCH_TYPE.byCategory, term: "pants" }],
      ["biki", { type: SEARCH_TYPE.byCategory, term: "bikini" }],
      ["áo polo", { type: SEARCH_TYPE.byCategory, term: "polo" }],
      ["va", { type: SEARCH_TYPE.byCategory, term: "skirt" }],
      ["đồ b", { type: SEARCH_TYPE.byCategory, term: "bikini" }],
      ["bikini", { type: SEARCH_TYPE.byCategory, term: "bikini" }],
      ["áo kiể", { type: SEARCH_TYPE.byCategory, term: "blouse" }],
      ["ao kieu", { type: SEARCH_TYPE.byCategory, term: "blouse" }],
      ["ao thun", { type: SEARCH_TYPE.byCategory, term: "polo" }],
      ["áo kiểu", { type: SEARCH_TYPE.byCategory, term: "blouse" }],
      ["áo blazer", { type: SEARCH_TYPE.byCategory, term: "blazer" }],
    ])(`The term: '%s' must return %s .`, (sample, expectedResult) => {
      // When
      let actualResult = analyzeSearchTerm(sample);

      // Then
      expect(actualResult.type).toBe(expectedResult.type);
      expect(actualResult.term).toBe(expectedResult.term);
    });
  });

  describe("test detect term is for searching product by code", () => {
    // Given
    it.each([
      ["BiKi0", { type: SEARCH_TYPE.byCode, term: "biki0" }],
      ["Polo0", { type: SEARCH_TYPE.byCode, term: "polo0" }],
      ["BLAZ0", { type: SEARCH_TYPE.byCode, term: "blaz0" }],
      ["skir0", { type: SEARCH_TYPE.byCode, term: "skir0" }],
      ["dres0", { type: SEARCH_TYPE.byCode, term: "dres0" }],
      ["SHOr0", { type: SEARCH_TYPE.byCode, term: "shor0" }],
      ["pAnt0", { type: SEARCH_TYPE.byCode, term: "pant0" }],
    ])(`The term: '%s' must return %s .`, (sample, expectedResult) => {
      // When
      let actualResult = analyzeSearchTerm(sample);

      // Then
      expect(actualResult.type).toBe(expectedResult.type);
      expect(actualResult.term).toBe(expectedResult.term);
    });
  });

  describe("test detect term is for searching product name", () => {
    // Given
    it.each([
      ["Bikini hoa bi", { type: SEARCH_TYPE.byName, term: "bikini hoa bi" }],
      [" Chấm  hoa bi", { type: SEARCH_TYPE.byName, term: "chấm hoa bi" }],
      ["Váy Mini", { type: SEARCH_TYPE.byName, term: "váy mini" }],
      ["Váy Demin", { type: SEARCH_TYPE.byName, term: "váy demin" }],
      ["Áo blazer crop", { type: SEARCH_TYPE.byName, term: "áo blazer crop" }],
      ["tay dài", { type: SEARCH_TYPE.byName, term: "tay dài" }],
    ])(`The term: '%s' must return %s .`, (sample, expectedResult) => {
      // When
      let actualResult = analyzeSearchTerm(sample);

      // Then
      expect(actualResult.type).toBe(expectedResult.type);
      expect(actualResult.term).toBe(expectedResult.term);
    });
  });
});
