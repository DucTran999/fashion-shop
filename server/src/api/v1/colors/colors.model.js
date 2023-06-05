import pool from "../helpers/init.postgres.pool.js";
import createHttpError from "http-errors";

class ColorModel {
  findAll = async () => {
    const query = "SELECT id, value FROM colors;";

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  findByValue = async (colorVal) => {
    const query = "SELECT id, value FROM colors WHERE value = $1;";

    try {
      const { rows } = await pool.query(query, [colorVal]);
      return rows.length > 0;
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  findOneById = async (id) => {
    const query = "SELECT id, value FROM colors WHERE id = $1;";

    try {
      const { rows } = await pool.query(query, [id]);
      return rows;
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  save = async (colorVal) => {
    const query = "INSERT INTO colors (value) VALUES ($1);";

    try {
      await pool.query(query, [colorVal]);
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  updateColor = async (id, colorVal) => {
    const query =
      "UPDATE colors \
        SET value = $2, updated_at=CURRENT_TIMESTAMP \
        WHERE id = $1;";

    try {
      await pool.query(query, [id, colorVal]);
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };
}

export default new ColorModel();
