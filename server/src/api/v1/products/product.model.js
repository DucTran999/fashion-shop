import pool from "../helpers/init.postgres.pool.js";
import createHttpError from "http-errors";
import { packingProductVariant } from "../../utils/normalizeData.js";

class ProductModel {
  findAll = async () => {
    const query =
      "SELECT p.id, c.name as category, p.name, p.code, p.description \
      FROM products as p \
      LEFT JOIN categories as c \
      ON c.id = p.category_id;";

    try {
      const { rows } = await pool.query(query);

      return rows;
    } catch (error) {
      throw new createHttpError.InternalServerError();
    }
  };

  findOneById = async (id) => {
    const query = `
    SELECT v.id, cat.id as category_id, v.product_id, v.sku, p.name, p.sold,
           v.image, v.images, p.description, c.value as color, s.value as size,
           v.price, v.in_stock
        FROM variants as v
          JOIN colors as c
            ON c.id = v.color_id
          JOIN sizes as s
            ON s.id = v.size_id
          JOIN products as p
            ON p.id = v.product_id
          JOIN categories as cat
            ON cat.id = p.category_id
        WHERE v.product_id = $1 ORDER BY v.id;
    `;

    try {
      const { rows } = await pool.query(query, [id]);
      return rows;
    } catch (error) {
      throw new createHttpError.InternalServerError();
    }
  };

  findByName = async ({ category_id, name }) => {
    const query =
      "SELECT name FROM products WHERE category_id = $1 AND name = $2;";

    const values = [category_id, name];

    try {
      const { rows } = await pool.query(query, values);
      return rows.length > 0;
    } catch (error) {
      throw new createHttpError.InternalServerError();
    }
  };

  findLatest = async (limit) => {
    const queryFindStartId =
      "SELECT id FROM products ORDER BY id DESC LIMIT $1;";

    const queryProductInfo = `
      SELECT v.id, cat.id as category_id, v.product_id, v.sku, p.name, v.image, 
      c.value as color, s.value as size, v.price
        FROM variants as v
          JOIN colors as c
            ON c.id = v.color_id
          JOIN sizes as s
            ON s.id = v.size_id
          JOIN products as p
            ON p.id = v.product_id
          JOIN categories as cat
            ON cat.id = p.category_id
        WHERE v.size_id = 1 
         AND v.product_id >= $1
        ORDER BY v.product_id, v.id;
      `;

    try {
      const client = await pool.connect();
      // find pivot product
      const res = await client.query(queryFindStartId, [limit]);
      const { id } = res.rows.pop();

      // get all variants of each product
      const { rows } = await client.query(queryProductInfo, [id]);
      client.release();
      return rows;
    } catch (error) {
      throw new createHttpError.InternalServerError();
    }
  };

  findBestSelling = async (limit) => {
    const queryProductIdList =
      "SELECT id FROM products ORDER BY sold DESC LIMIT $1;";

    const queryProductInfo = `
    SELECT v.id, cat.id as category_id, v.product_id, v.sku, p.name, v.image, 
    c.value as color, s.value as size, v.price
      FROM variants as v
        JOIN colors as c
          ON c.id = v.color_id
        JOIN sizes as s
          ON s.id = v.size_id
        JOIN products as p
          ON p.id = v.product_id
        JOIN categories as cat
          ON cat.id = p.category_id
      WHERE v.size_id = 1 AND v.product_id = ANY($1::int[]) 
      ORDER BY v.product_id, v.id;
      ;
    `;

    try {
      const client = await pool.connect();
      // get best selling products id list
      const res = await client.query(queryProductIdList, [limit]);
      const ids = [];
      res.rows.forEach((obj) => parseInt(ids.push(obj.id)));

      // get all variants of each product
      const { rows } = await client.query(queryProductInfo, [ids]);
      client.release();
      return rows;
    } catch (error) {
      console.log(error);
      throw new createHttpError.InternalServerError();
    }
  };

  findAllWithBriefVariant = async (start, end) => {
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
            ON cat.id = p.category_id
        WHERE v.size_id = 1 
         AND v.product_id > $1 AND v.product_id <= $2
        ORDER BY v.product_id, v.id;
      `;

    try {
      const { rows } = await pool.query(query, [start, end]);

      if (rows.length) {
        // format data before send to client
        return packingProductVariant(rows);
      }
      return rows;
    } catch (error) {
      console.log(error);
      throw new createHttpError.InternalServerError();
    }
  };

  findInCategoryWithBriefVariant = async (categoryId) => {
    const query = `
      SELECT v.id, ct.id as category_id, v.product_id, v.sku, p.name, v.image, 
      c.value as color, s.value as size, v.price, v.in_stock
        FROM variants as v
          JOIN colors as c
            ON c.id = v.color_id
          JOIN sizes as s
            ON s.id = v.size_id
          JOIN products as p
            ON p.id = v.product_id
          JOIN categories as ct
            ON p.category_id = ct.id
        WHERE v.size_id = 1 AND ct.id = $1
        ORDER BY v.product_id, v.id;
      `;

    try {
      const { rows } = await pool.query(query, [categoryId]);

      if (rows.length) {
        // format data before send to client
        return packingProductVariant(rows);
      }
      return rows;
    } catch (error) {
      throw new createHttpError.InternalServerError();
    }
  };

  countProducts = async () => {
    const query = "SELECT COUNT(id) as total FROM products;";
    try {
      const { rows } = await pool.query(query);
      return rows[0].total;
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  countProductsInCategory = async (categoryId) => {
    const query =
      "SELECT COUNT(id) as total FROM products WHERE category_id = $1;";
    try {
      const { rows } = await pool.query(query, [categoryId]);
      return rows[0].total;
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  save = async ({ category_id, name, code, description }) => {
    const query =
      "INSERT INTO products(category_id, name, code, description)\
      VALUES ($1, $2, $3, $4);";
    const values = [category_id, name, code, description];

    try {
      await pool.query(query, values);
    } catch (error) {
      throw new createHttpError.InternalServerError();
    }
  };
}

export default new ProductModel();
