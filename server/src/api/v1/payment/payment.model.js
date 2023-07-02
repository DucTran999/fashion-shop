import createHttpError from "http-errors";
import pool from "../helpers/init.postgres.pool.js";

class PaymentMethodModel {
  findPaymentById = async (id) => {
    const query = "SELECT value FROM payment_methods WHERE id = $1;";

    try {
      const { rows } = await pool.query(query, [id]);
      return rows;
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };
}

export default new PaymentMethodModel();
