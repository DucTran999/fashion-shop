import searchModel from "./search.model.js";
import analyzeSearchTerm from "./searchTermAnalyzer.js";
import { SEARCH_TYPE, REDIS_KEY_VAULT } from "../../utils/constVariable.js";
import helperCache from "../helpers/helper.cache.js";

/**
 * Get products list filtered by category name. The result is stable so cached it.
 * @param {string} category - The name of category
 * @returns {Promise<object | {}>} The object contains pairs productId : [variations]
 */
const searchByCategory = async (category) => {
  const key = `${REDIS_KEY_VAULT.cacheCategoryResult}${category}`;

  // Get from cached
  let products = await helperCache.getCached(key);
  if (products) return JSON.parse(products);

  // Retrieving result directly from DB and cache it.
  products = await searchModel.findProductByCategory(category);
  await helperCache.cacheData(key, products, 3600);
  return products;
};

/**
 * Get products list has code matches the term.
 * @param {string} codePattern - The search term is evaluated as part of the product code.
 * @returns {Promise<object | {}>} The object contains pairs productId : [variations]
 */
const searchByCode = async (codePattern) => {
  return await searchModel.findProductByCode(codePattern);
};

/**
 * Get products whose name contains the pattern
 * @param {string} namePattern - The name of product or part of it
 * @returns {Promise<object | {}>} The object contains pairs productId : [variations]
 */
const searchByName = async (namePattern) => {
  return await searchModel.findProductByName(namePattern);
};

/**
 * Search Strategies Map
 * @type {{strategyName: string, strategyImplement: Promise<object | {}>}}
 */
const searchStrategies = {
  [SEARCH_TYPE.byName]: searchByName,
  [SEARCH_TYPE.byCode]: searchByCode,
  [SEARCH_TYPE.byCategory]: searchByCategory,
};

/**
 * Find products match the search term
 * @param {string} keyword   Search term
 * @return {Promise<object | {}>} Object with keys are productID and values is its variations
 */
const searchProduct = async (keyword) => {
  const { type, term } = analyzeSearchTerm(keyword);

  return await searchStrategies[type](term);
};

export default { searchProduct: searchProduct };
