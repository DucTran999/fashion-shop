import createHttpError from "http-errors";
import pool from "../helpers/init.postgres.pool.js";

class StateModel {
  isStateExisted = async (id) => {
    const query = `
            SELECT value FROM states WHERE id=$1;
        `;
    try {
      const { rows } = await pool.query(query, [id]);
      return rows.length > 0;
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };
}

export default new StateModel();
