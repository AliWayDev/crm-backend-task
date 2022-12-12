import jsonwebtoken from "jsonwebtoken";

export const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

class authController {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (username !== "admin") {
        return res.send(400).json({ msg: "User Not Found" });
      }

      if (username === "admin" && password === "1234567") {
        return res.json({
          token: jsonwebtoken.sign({ user: "admin" }, JWT_SECRET),
        });
      } else {
        res.send(400).json({ msg: "Password or Username -> Uncorrect!" });
      }
    } catch (e) {
      console.log(e);
      res.send(400).json({ msg: "Login Error" });
    }
  }
}

export default new authController();
