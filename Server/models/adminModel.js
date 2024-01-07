const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

adminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password") || admin.isNew) {
    const hash = await bcrypt.hash(admin.password, 10);
    admin.password = hash;
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
