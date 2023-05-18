import randomBytes from "randombytes";

const keylength = Math.random() * 128;

const accessTokenKey = randomBytes(keylength).toString("hex");
const refreshTokenKey = randomBytes(keylength).toString("hex");
console.log({ accessTokenKey, refreshTokenKey });
