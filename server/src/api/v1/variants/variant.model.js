import createHttpError from "http-errors";
import pool from "../helpers/init.postgres.pool.js";

class VariantModel {
  findAll = async () => {
    const query =
      "SELECT id, sku, color_id, size_id,image, images price, in_stock \
      FROM variants";

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.log(error);
      throw createHttpError.InternalServerError();
    }
  };

  findBySku = async ({ sku }) => {
    const query =
      "SELECT sku \
        FROM variants\
        WHERE sku = $1;";

    try {
      const { rows } = await pool.query(query, [sku]);
      return rows.length > 0;
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };

  save = async ({
    product_id,
    color_id,
    size_id,
    sku,
    image,
    images,
    price,
    in_stock,
  }) => {
    const query =
      "INSERT INTO \
      variants(product_id, color_id, size_id, sku, image, images, price, in_stock)\
      VALUES ($1,$2, $3 ,$4 ,$5 ,$6, $7 ,$8);";

    const values = [
      product_id,
      color_id,
      size_id,
      sku,
      image,
      images,
      price,
      in_stock,
    ];

    try {
      await pool.query(query, values);
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };

  override = async ({
    product_id,
    color_id,
    size_id,
    sku,
    image,
    images,
    price,
    in_stock,
  }) => {
    const query = `UPDATE variants
        SET product_id = $1,
            color_id = $2,
            size_id = $3,
            sku = $4,
            image = $5,
            images = $6,
            price = $7,
            in_stock = $8

      WHERE sku = $4;
      `;

    const values = [
      product_id,
      color_id,
      size_id,
      sku,
      image,
      images,
      price,
      in_stock,
    ];

    try {
      await pool.query(query, values);
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  };

  // TODO: finish later
  updateVariant = async () => {};
}

export default new VariantModel();
