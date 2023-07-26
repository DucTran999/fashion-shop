import { formatVietnameseToNonAccentNoHyphen } from "../../utils/formatData.js";
import { SEARCH_TYPE } from "../../utils/constVariable.js";

/**
 * Array of category search terms commonly used.
 * @type {Array<string>}
 */
const COMMON_CATEGORY_SEARCH_TERM = [
  // category English
  "blouse",
  "blazer",
  "bikini",
  "croptop",
  "dress",
  "polo",
  "pants",
  "shorts",
  "skirt",

  // category Vietnamese
  "áo kiểu",
  "áo polo",
  "áo blazer",
  "áo croptop",
  "áo thun",
  "đầm",
  "đồ bơi",
  "váy",
  "quần",
  "quần short",
];

/**
 * The dictionary contains pairs of search terms and respective categories.
 * @type {{searchTerm: string, category: string}}
 */
const CATEGORY_TERM_MAP = {
  blouse: "blouse",
  blazer: "blazer",
  bikini: "bikini",
  croptop: "croptop",
  dress: "dress",
  polo: "polo",
  pants: "pants",
  shorts: "shorts",
  skirt: "skirt",

  "ao kieu": "blouse",
  "ao polo": "polo",
  "ao thun": "polo",
  "ao blazer": "blazer",
  "ao croptop": "croptop",
  dam: "dress",
  "do boi": "bikini",
  vay: "skirt",
  quan: "pants",
  "quan short": "shorts",
};

/**
 * Array of product codes.
 * @type {Array<string>}
 */
const PRODUCT_CODE = [
  "biki",
  "pant",
  "blou",
  "polo",
  "crop",
  "dres",
  "shor",
  "skir",
  "blaz",
];

/**
 * Check search terms is the product code.
 * @param {string} searchTerm - The term user input
 * @returns {string | null} The search terms are formatted or null if not satisfied condition.
 */
const detectSearchByCode = (searchTerm) => {
  let searchTermFormatted = formatVietnameseToNonAccentNoHyphen(searchTerm);

  for (let prefix of PRODUCT_CODE) {
    const pattern = new RegExp(`^${prefix}[0-9]+`);
    if (pattern.test(searchTermFormatted)) return searchTermFormatted;
  }

  return null;
};

/**
 * Check search terms is the name of a category.
 * @param {string} searchTerm - The term user input
 * @returns {string | null} The search terms formatted or null if not matched.
 */
const detectSearchByCategory = (searchTerm) => {
  let searchTermFormatted = formatVietnameseToNonAccentNoHyphen(searchTerm);

  // Check term is for searching by category
  let isSearchByCategory = false;
  let completeTerm = "";
  for (let commonTerm of COMMON_CATEGORY_SEARCH_TERM) {
    let commonTermFormatted = formatVietnameseToNonAccentNoHyphen(commonTerm);

    if (commonTermFormatted.startsWith(searchTermFormatted)) {
      isSearchByCategory = true;
      completeTerm = commonTermFormatted;
      break;
    }
  }

  // get the category that matches the term
  return isSearchByCategory ? CATEGORY_TERM_MAP[completeTerm] : null;
};

/**
 * Analyze search terms to find the right search strategy. Because category
 * names and product codes have much in common that will lead to the wrong
 * search strategy.
 * The order of the process should be to check the search term is the
 * product code first. If it does not match check it as a category name else
 * mark it as search by name.
 * @param {string} searchTerm - The search term
 * @returns {{type: string, term: string}} The object holds result after analyzing.
 */
const analyzeSearchTerm = (searchTerm) => {
  let termAnalyzed;

  termAnalyzed = detectSearchByCode(searchTerm);
  if (termAnalyzed) return { type: SEARCH_TYPE.byCode, term: termAnalyzed };

  termAnalyzed = detectSearchByCategory(searchTerm);
  if (termAnalyzed) return { type: SEARCH_TYPE.byCategory, term: termAnalyzed };

  termAnalyzed = searchTerm.toLocaleLowerCase().trim();
  termAnalyzed = termAnalyzed.replace(/(\s+)/g, " ");
  return { type: SEARCH_TYPE.byName, term: termAnalyzed };
};

export default analyzeSearchTerm;
