import { validationResult } from "express-validator";
import User from "./User.js";
import UserService from "./UserService.js";

class UserController {
  async signup(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Error in sign up", errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User ${username} already exists` });
      }

      const user = new User({ username, password });
      await user.save();
      return res.json({ message: "User signed up successfully" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` });
      }
      const validPassword = user.password;
      if (password !== validPassword) {
        return res.status(400).json({ message: `Wrong password` });
      }
      return res.json({ message: "Successfully logged in!" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new UserController();
