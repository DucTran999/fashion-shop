import pool from "../helpers/init.postgres.pool.js";
import createHttpError from "http-errors";

class SizeModel {
  findAll = async () => {
    const query = "SELECT id, value FROM sizes ORDER BY id;";

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  findByValue = async (sizeVal) => {
    const query = "SELECT id, value FROM sizes WHERE value = $1;";

    try {
      const { rows } = await pool.query(query, [sizeVal]);
      return rows.length > 0;
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  save = async (sizeVal) => {
    const query = "INSERT INTO sizes (value) VALUES ($1);";

    try {
      await pool.query(query, [sizeVal]);
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  update = async (id, size) => {
    const query = ` 
      UPDATE sizes 
        SET value = $2, updated_at=CURRENT_TIMESTAMP 
        WHERE id = $1;
    `;

    try {
      await pool.query(query, [id, size]);
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };
}

export default new SizeModel();
