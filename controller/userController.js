import jsonwebtoken from "jsonwebtoken";
import pkg from 'bcryptjs';
import User from "../models/User.js";

const { compare } = pkg;
const { hash, genSalt } = pkg;

const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

class userController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(409).json({ msg: "Payload is not correct!" });
      }

      const existsUser = await User.findOne({
        email
      });

      console.log(existsUser)

      if (existsUser) {
        return res.status(409).json({ msg: "User exist!" });
      }

      const hashPassword = async (password) => {
        const salt = await genSalt(10);
        return await hash(password, salt);
      }

      const hashedPassword = await hashPassword(password);

      await User.create(
        { name, email, status: 'Active', password: hashedPassword }
      );

      return res.status(200).json({ msg: "User was created!" });

    } catch (err) {
      console.log(err);

      return res.status(500).json({ msg: "Server error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      let existsUser = await User.findOne({ email });

      if (!existsUser) {
        return res.status(400).json({ msg: "User Not Found" });
      }

      const checkUserPassword = async (password, hashedPassword) => {
        try {
          console.log(compare(password, hashedPassword))
          return await compare(password, hashedPassword);
        } catch (error) {
          return false;
        }
      }

      if (await checkUserPassword(password, existsUser.password)) {
        return res.json({
          token: jsonwebtoken.sign({ user: email }, JWT_SECRET),
          name: existsUser.name
        });
      } else {
        res.status(400).json({ msg: "Password or Password -> Uncorrect!" });
      }
    } catch (e) {
      console.log(e);
      return res.status(400).json({ msg: "Login Error" });
    }
  }

  async getAll(req, res) {
    try {
      console.log('started')

      const users = await User.find({});

      console.log(users)

      return res.status(200).json({ data: users });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ msg: "Somthing went wrong!" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const userData = req.body

      if (!id) {
        return res.status(400).json({
          msg: "ID not found!"
        })
      }

      if (!userData) {
        return res.status(409).json({
          msg: "Oops check your payload!"
        })
      }

      const user = await User.findByIdAndUpdate(id, userData)

      if (!user) {
        return res.status(404).json({
          msg: "User not found with this ID!"
        })
      }

      return res.status(200).json({
        data: user
      })
    } catch (err) {
      res.status(500).json({
        msg: "Somthing went wrong on the server side!"
      })
    }
  }

  async updateMany(req, res) {
    try {
      const usersData = req.body

      if (!usersData) {
        return res.status(404).json({
          msg: "Oops check your payload!"
        })
      }

      console.log(usersData)

      for (let i of usersData) {
        if (i.data || i.id) {
          await User.findByIdAndUpdate(i.id, i.data)
        } else {
          return res.status(409).json({
            msg: "Check the payload!"
          })
        }
      }

      return res.status(200).json({
        msg: "Success!"
      })
    } catch (err) {
      res.status(500).json({
        msg: "Somthing went wrong on the server side!"
      })
    }
  }
}

export default new userController();
