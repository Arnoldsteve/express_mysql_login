const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password: Npassword } = req.body;
  if (!email || !Npassword)
    return res.json({
      status: "error",
      error: "Please enter your email and password",
    });
  else {
    db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        // you can do if ...else to confirm other fields
        if (err) throw err;
        if (result[0])
          return res.json({
            status: "error",
            error: "Email has alredy been a registered",
          });
        else {
          const password = await bcrypt.hash(Npassword, 8);
          db.query(
            "INSERT INTO users SET ?",
            { email: email, password: password },
            (error, results) => {
              if (error) throw error;
              return res.json({
                status: "success",
                success: "User has been registered successfully",
              });
            }
          );
        }
      }
    );
  }
};

module.exports = register;
