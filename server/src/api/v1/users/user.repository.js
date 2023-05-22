"use strict";
import pool from "../helpers/init.postgres.pool.js";
import createHttpError from "http-errors";

class UserRepository {
  /* This class provides methods to interact with users' tables */
  selectAll = async () => {
    const query =
      "SELECT first_name, last_name, email, gender, phone \
       FROM users WHERE is_admin=$1";
    const value = [false];
    try {
      const { rows } = await pool.query(query, value);
      return rows;
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  isExistEmail = async (email) => {
    const query = "SELECT email FROM users WHERE email=$1";
    const values = [email];

    try {
      const res = await pool.query(query, values);

      return res.rowCount > 0;
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  findUserByEmail = async (email) => {
    const query =
      "SELECT user_id, first_name, email, password, is_admin, is_disabled FROM users WHERE email=$1";
    const values = [email];

    try {
      const res = await pool.query(query, values);

      return res.rows;
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  save = async (user) => {
    const query =
      "INSERT INTO users (first_name, last_name, email, password) \
       VALUES ($1, $2, $3, $4)";
    const values = [user.first_name, user.last_name, user.email, user.password];

    try {
      await pool.query(query, values);
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  saveAdmin = async (user) => {
    const is_admin = true;
    const query =
      "insert into users (first_name, last_name, email, password, gender, date_of_birth, phone, is_admin) \
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    const values = [
      user.first_name,
      user.last_name,
      user.email,
      user.password,
      user.gender,
      user.date_of_birth,
      user.phone,
      is_admin,
    ];

    try {
      await pool.query(query, values);
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };
}

export default new UserRepository();
