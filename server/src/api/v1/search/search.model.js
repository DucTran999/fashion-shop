import createHttpError from "http-errors";

import pool from "../helpers/init.postgres.pool.js";
import { categorizeProductVariations } from "../../utils/normalizeData.js";

/**
 * Execute query to find products by category.
 * @param {string} category - The name of category
 * @return {Promise<object | {}>}
 */
const findProductByCategory = async (category) => {
  const query = `
    SELECT v.id, cat.id as category_id, v.product_id, v.sku, p.name, v.image,
           c.value as color, s.value as size, v.price, v.in_stock
        FROM variants as v
         JOIN colors as c
           ON c.id = v.color_id
         JOIN sizes as s
           ON s.id = v.size_id
         JOIN products as p
           ON p.id = v.product_id
         JOIN categories as cat
           ON p.category_id = cat.id
        WHERE v.size_id = 1 AND cat.name=$1;
    `;
  try {
    const { rows } = await pool.query(query, [category]);
    return rows.length > 0 ? categorizeProductVariations(rows) : {};
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

/**
 * Execute query to find products has code matches the pattern.
 * @param {string} code - The product code or a part of it.
 * @return {Promise<object | {}>}
 */
const findProductByCode = async (code) => {
  const query = `
    SELECT v.id, cat.id as category_id, v.product_id, v.sku, p.name, v.image,
           c.value as color, s.value as size, v.price, v.in_stock
        FROM variants as v
         JOIN colors as c
           ON c.id = v.color_id
         JOIN sizes as s
           ON s.id = v.size_id
         JOIN products as p
           ON p.id = v.product_id
         JOIN categories as cat
           ON p.category_id = cat.id
        WHERE v.size_id = 1 AND p.code LIKE $1;
    `;
  try {
    const { rows } = await pool.query(query, [`${code}%`]);
    return rows.length > 0 ? categorizeProductVariations(rows) : {};
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

/**
 * Execute query to find products has name matches the term
 * @param {string} name - The product name or part of it
 * @return {Promise<object | {}>}
 */
const findProductByName = async (name) => {
  const query = `
    SELECT v.id, cat.id as category_id, v.product_id, v.sku, p.name, v.image,
           c.value as color, s.value as size, v.price, v.in_stock
        FROM variants as v
         JOIN colors as c
           ON c.id = v.color_id
         JOIN sizes as s
           ON s.id = v.size_id
         JOIN products as p
           ON p.id = v.product_id
         JOIN categories as cat
           ON p.category_id = cat.id
        WHERE v.size_id = 1 AND p.name LIKE $1;
    `;
  try {
    const { rows } = await pool.query(query, [`%${name}%`]);
    return rows.length > 0 ? categorizeProductVariations(rows) : {};
  } catch (error) {
    throw createHttpError.InternalServerError();
  }
};

export default {
  findProductByCode: findProductByCode,
  findProductByName: findProductByName,
  findProductByCategory: findProductByCategory,
};
