import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false }
});

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [itemSchema]
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lists:    [listSchema] // store lists in user account
});

// Hash before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);

