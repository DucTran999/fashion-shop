import createHttpError from "http-errors";
import pool from "../helpers/init.postgres.pool.js";

class OrderModel {
  findAll = async () => {
    const query = `
        SELECT id, user_id, items, state_id, created_at, updated_at
            FROM  orders;
        `;
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };

  findAllByIdAndState = async (id, state, start_date, end_date) => {
    const query = `
        SELECT o.id, o.user_id, o.total_price, o.items, 
               s.value as state, o.created_at, o.updated_at
            FROM  orders as o
              JOIN states as s
              ON s.id = o.state_id
            WHERE o.user_id=$1 AND o.state_id=$2
              AND o.created_at >= $3  AND o.created_at < $4 ;
        `;
    try {
      const { rows } = await pool.query(query, [
        id,
        state,
        start_date,
        end_date,
      ]);

      return rows;
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };

  findProductOverStocking = async (cart_id) => {
    const query = `
        SELECT  cv.qty, v.in_stock
            FROM cart_variant as cv 
                JOIN variants as v 
                ON v.id = cv.variant_id
            WHERE cart_id = $1 AND cv.qty > v.in_stock;
    `;
    try {
      const { rows } = await pool.query(query, [cart_id]);
      return rows;
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };

  updateOrderState = async (user_id, order_id, state_id) => {
    const query = `
      UPDATE orders 
        SET state_id=$3, updated_at=CURRENT_TIMESTAMP
        WHERE user_id=$1 AND id=$2;
      `;
    try {
      await pool.query(query, [user_id, order_id, state_id]);
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };

  save = async (user_id, items, total_price, payment_method_id) => {
    const query = `
        INSERT INTO orders 
          (
            user_id, state_id, items, total_price,
            created_at, updated_at, payment_method_id
          ) 
          VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $5)
        `;
    try {
      await pool.query(query, [
        user_id,
        1,
        items,
        total_price,
        payment_method_id,
      ]);
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };
}

export default new OrderModel();
