import User from "./User.js";

class UserService {
  async signup(user) {
    const createdUser = await User.create(user);
    return createdUser;
  }

  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  async getUser(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const user = await User.findById(id);
    return user;
  }

  async update(user) {
    if (!user._id) {
      throw new Error("не указан ID");
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });
    return updatedUser;
  }

  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const user = await User.findByIdAndDelete(id);
    return user;
  }
}

export default new UserService();
