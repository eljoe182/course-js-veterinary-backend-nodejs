import bcrypt from "bcrypt";

export function encryptPassword(next) {
  const vet = this;
  if (vet.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(vet.password, salt, (err, hash) => {
        vet.password = hash;
        next();
      });
    });
  } else {
    next();
  }
}
