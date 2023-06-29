"use strict";

class User {
  /* Class represent a user in system */
  constructor(
    first_name,
    last_name,
    email,
    password,
    gender,
    date_of_birth,
    phone,
    is_admin,
    create_at,
    update_at,
    is_disabled
  ) {
    this.first_name = first_name.toLowerCase().trim();
    this.last_name = last_name.toLowerCase().trim();
    this.email = email.toLowerCase().trim();
    this.password = password.trim();
    this.gender = gender;
    this.date_of_birth = date_of_birth;
    this.phone = phone;
    this.is_admin = is_admin;
    this.create_at = create_at;
    this.update_at = update_at;
    this.is_disabled = is_disabled;
  }
}

export default User;
