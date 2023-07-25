import searchModel from "./search.model.js";
import analyzeSearchTerm from "./analyzeSearchTerm.js";
import { SEARCH_TYPE } from "../../utils/constVariable.js";
import helperCache from "../helpers/helper.cache.js";

const searchByCategory = async (term) => {
  const key = `cache:category#${term}`;

  let products = await helperCache.getCached(key);
  if (!products) {
    products = await searchModel.findProductByCategory(term);
    await helperCache.cacheData(key, products, 3600);
  }

  return products;
};

const searchByCode = async (term) => {
  return await searchModel.findProductByCode(term);
};

const searchByName = async (term) => {
  return await searchModel.findProductByName(term);
};

const searchStrategies = {
  [SEARCH_TYPE.byName]: searchByName,
  [SEARCH_TYPE.byCode]: searchByCode,
  [SEARCH_TYPE.byCategory]: searchByCategory,
};

/**
 * Find products match the search term
 * @param {string} keyword   Search term
 * @return {Promise<object>} Object with keys are productID and values is its variations
 */
const searchProduct = async (keyword) => {
  const { type, term } = analyzeSearchTerm(keyword);

  return await searchStrategies[type](term);
};

export default { searchProduct: searchProduct };
