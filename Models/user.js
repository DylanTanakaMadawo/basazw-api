import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  // userName: String,
  userName: {
    type: String,
    unique: true,
  },
  password: String,
});

const UserModel = mongoose.model("User", userSchema);

// module.exports = UserModel;
export default UserModel;
