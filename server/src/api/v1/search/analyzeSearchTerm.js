import { formatVietnameseToNonAccentNoHyphen } from "../../utils/formatData.js";
import { SEARCH_TYPE } from "../../utils/constVariable.js";

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

const detectSearchByCode = (searchTerm) => {
  const searchTermFormatted = formatVietnameseToNonAccentNoHyphen(searchTerm);

  for (let prefix of PRODUCT_CODE) {
    const pattern = new RegExp(`^${prefix}[0-9]+`);
    if (pattern.test(searchTermFormatted)) return searchTermFormatted;
  }

  return null;
};

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
 * Analyze search terms to find the right search strategy
 * @typedef {Object} SearchTerm
 * @property {string} type The name of strategy
 * @property {string} term The search term formatted
 * @param {string} searchTerm The search term
 * @return {SearchTerm} An object hold result after analyzing
 */
const analyzeSearchTerm = (searchTerm) => {
  let res;

  res = detectSearchByCode(searchTerm);
  if (res) return { type: SEARCH_TYPE.byCode, term: res };

  res = detectSearchByCategory(searchTerm);
  if (res) return { type: SEARCH_TYPE.byCategory, term: res };

  res = searchTerm.toLocaleLowerCase().trim();
  res = res.replace(/(\s+)/g, " ");
  return { type: SEARCH_TYPE.byName, term: res };
};

export default analyzeSearchTerm;
