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

  findOneByEmail = async (email) => {
    const query = `
      SELECT user_id, first_name, email, password, is_admin, is_disabled
        FROM users 
        WHERE email=$1;
      `;

    try {
      const { rows } = await pool.query(query, [email]);
      return rows;
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  findOneById = async (userId) => {
    const query = `
      SELECT user_id, first_name, last_name, email,
             gender, address, phone, date_of_birth
        FROM users 
        WHERE user_id=$1;`;
    try {
      const res = await pool.query(query, [userId]);
      return res.rows[0];
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  findUserPassword = async (userId) => {
    const query = `SELECT password FROM users WHERE user_id=$1;`;
    try {
      const { rows } = await pool.query(query, [userId]);
      return rows[0];
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  updateOne = async (userId, firstName, lastName, address, phone, gender) => {
    const query = `
      UPDATE users
        SET first_name=$2,last_name=$3, address=$4, phone=$5, gender=$6
        WHERE user_id=$1;    
      `;
    const values = [userId, firstName, lastName, address, phone, gender];

    try {
      await pool.query(query, values);
    } catch (err) {
      throw createHttpError.InternalServerError();
    }
  };

  save = async ({ first_name, last_name, email, password }) => {
    const query = `
      INSERT INTO users 
          (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4);`;
    const values = [first_name, last_name, email, password];

    try {
      await pool.query(query, values);
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };

  saveAdmin = async (user) => {
    const is_admin = true;
    const query = `
      INSERT INTO users 
        (
          first_name, last_name, email,
          password, gender, date_of_birth,
          phone, is_admin
        )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
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

  saveNewPassword = async (userId, newPassword) => {
    const query = "UPDATE users SET password=$1 WHERE user_id=$2;";
    try {
      await pool.query(query, [newPassword, userId]);
    } catch (err) {
      throw new createHttpError.InternalServerError();
    }
  };
}

export default new UserRepository();
