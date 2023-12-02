import bcrypt from "bcryptjs-react";

const salt = "$2a$12$FW0kJmau5PPD6Ix9eHLPFOmYCEsn8Nh.QS2bDCHfan/3Hd5JLs32e";

export const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};
