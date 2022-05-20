import bcrypt from "bcrypt";

export function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
}
