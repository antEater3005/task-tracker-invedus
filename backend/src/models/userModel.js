import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpires: { type: Date },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret._v;
        delete ret.resetToken;
        delete ret.resetTokenExpires;
      },
    },
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
