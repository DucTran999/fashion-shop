import createHttpError from "http-errors";
import pool from "../helpers/init.postgres.pool.js";

class CartModel {
  findAllBrief = async (id) => {
    const query = `
            SELECT cart_id, variant_id, qty
                FROM cart_variant
                WHERE cart_id=$1 AND qty > 0;`;

    try {
      const res = await pool.query(query, [id]);
      return res.rows;
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };

  findAll = async (id) => {
    const query = `
      SELECT cv.cart_id, p.category_id, p.id as product_id, cv.variant_id,
             p.name, v.image, v.sku, c.value as color, s.value as size,
             v.price, v.in_stock, qty, qty * price as sub_price
        FROM cart_variant as cv
          JOIN variants as v
            ON cv.variant_id = v.id
          JOIN colors as c
            ON c.id = v.color_id
          JOIN sizes as s
            ON v.size_id = s.id
          JOIN products as p
            ON p.id = v.product_id
        WHERE cv.cart_id = $1 AND qty > 0;    
    `;

    try {
      const res = await pool.query(query, [id]);
      return res.rows;
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };

  findById = async (cart_id, variant_id) => {
    const query = `SELECT qty 
        FROM cart_variant 
        WHERE cart_id=$1 AND variant_id=$2;`;

    try {
      const { rows } = await pool.query(query, [cart_id, variant_id]);
      return rows;
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };

  saveOne = async (cart_id, variant_id, qty) => {
    const query = `
      INSERT INTO cart_variant 
        (
          cart_id, variant_id, qty
        ) 
        VALUES ($1, $2, $3)
        ON CONFLICT ON CONSTRAINT cart_variant_pkey 
        DO 
          UPDATE SET qty = $3`;
    try {
      await pool.query(query, [cart_id, variant_id, qty]);
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };

  updateOne = async (cart_id, variant_id, qty) => {
    const query = `
      UPDATE cart_variant 
        SET qty = $3
        WHERE cart_id=$1 AND variant_id=$2;
      `;
    try {
      await pool.query(query, [cart_id, variant_id, qty]);
    } catch (error) {
      console.log(error);
      throw createHttpError.InternalServerError();
    }
  };
}

export default new CartModel();
