import pool from "../helpers/init.postgres.pool.js";
import createHttpError from "http-errors";

class Category {
  /* This class provides methods to interact with categories' tables */
  findAll = async () => {
    const query =
      "SELECT id, name, created_at::TIMESTAMP, updated_at::TIMESTAMP \
    FROM categories WHERE deleted_at IS NULL ORDER BY id;";

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (err) {
      console.log(err);
      throw new createHttpError.InternalServerError();
    }
  };

  findOneById = async (id) => {
    const query = `
    SELECT id, name, created_at::TIMESTAMP, updated_at::TIMESTAMP 
      FROM categories 
      WHERE id = $1 AND deleted_at IS NULL`;
    try {
      const { rows } = await pool.query(query, [id]);
      return rows;
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  finAllProductByCategoryId = async (id) => {
    const query = `
    SELECT p.id, c.name as category, p.name, p.code, p.description 
      FROM products as p 
        LEFT JOIN categories as c 
          ON c.id = p.category_id
      WHERE c.id = $1;
      `;

    try {
      const { rows } = await pool.query(query, [id]);
      return rows;
    } catch (error) {
      throw new createHttpError.InternalServerError();
    }
  };

  findByName = async (category_name) => {
    const query = "SELECT id FROM categories WHERE name = $1;";

    try {
      const { rows } = await pool.query(query, [category_name]);
      if (rows.length) {
        return rows[0].id;
      }
      return 0;
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  save = async ({ category_name }) => {
    const query = "INSERT INTO categories (name) VALUES ($1);";

    try {
      await pool.query(query, [category_name]);
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  updateData = async (id, catName) => {
    const query = `
    UPDATE categories 
      SET name = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1;`;

    try {
      await pool.query(query, [id, catName]);
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  setVisible = async (id) => {
    const query = `
      UPDATE categories 
       SET updated_at = CURRENT_TIMESTAMP, deleted_at = NULL
       WHERE id = $1;`;

    try {
      await pool.query(query, [id]);
    } catch (err) {
      console.log(err);
      throw new createHttpError.InternalServerError();
    }
  };

  delete = async (id) => {
    const query =
      "UPDATE categories SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1";

    try {
      await pool.query(query, [id]);
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };
}

export default new Category();
