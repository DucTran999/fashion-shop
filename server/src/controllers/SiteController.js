import pool from "../configs/connectDB.js";

class SiteController {
  /**
   *
   */

  // [GET] sign Up page
  signUp(req, res) {
    // Business logic
    res.render("sign_up.ejs");
  }

  // [POST] sign Up page
  async createNewUser(req, res) {
    // await pool.connect();
    console.log(req.body);
    let { username, email, password } = req.body;
    const query = {
      text: "INSERT INTO user_account(username, password, email) \
      VALUES($1, $2, $3)",
      values: [username, email, password],
    };
    await pool.query(query);

    return res.send("call post create new user");
  }

  // [GET] sign in page
  login(req, res) {
    // Business logic
    res.render("sign_in.ejs");
  }

  // [GET] home page
  async home(req, res) {
    res.render("index.ejs");
  }
}

export default new SiteController();
