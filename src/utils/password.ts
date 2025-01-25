/** Salt and hash function for password storing */
import * as crypto from "crypto";

function generateSalt(length: number = 16): string {
  return crypto.randomBytes(length).toString("hex");
}

function hashPassword(password: string, salt: string): string {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512");
  return hash.toString("hex");
}

export function saltAndHashPassword(password: string): { salt: string; hash: string } {
  const salt = generateSalt();
  const hash = hashPassword(password, salt);
  return { salt, hash };
}

// export function verifyPassword(password: string, salt: string, hash: string): boolean {
//   const hashToVerify = hashPassword(password, salt);
//   return hash === hashToVerify;
// }

// Example usage:
// const password = 'your_secure_password';
// const { salt, hash } = generateSaltedHash(password);

// console.log('Salt:', salt);
// console.log('Hash:', hash);

// // Verification
// const isPasswordCorrect = verifyPassword(password, salt, hash);
// console.log('Password is correct:', isPasswordCorrect);
