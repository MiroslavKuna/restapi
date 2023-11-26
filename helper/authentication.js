import crypto from "crypto";

export const hashPassword = (password) => {
    return crypto.pbkdf2Sync(password, '0x00', 1000, 64, "sha512").toString("hex");
};

export const validatePassword = (password, hash) => {
    return hashPassword(password) === hash;
};