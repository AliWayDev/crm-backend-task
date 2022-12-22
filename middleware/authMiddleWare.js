const jwt = require("jsonwebtoken");
const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

module.exports = () => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send("Access Denied!");
    } else {
      const tokenBody = token.slice(7);

      jwt.verify(tokenBody, JWT_SECRET, (err) => {
        if (err) {
          console.log(`JWT Error: ${err}`);
          return res.status(401).send("Access Denied!");
        }
        next();
      });
    }
  };
};
