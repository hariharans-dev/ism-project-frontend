const crypto = require("crypto");
const fs = require("fs");
function readfile(pemFilePath) {
  try {
    const pemData = fs.readFileSync(pemFilePath, "utf8");
    return pemData;
  } catch (error) {
    console.error("Error reading PEM file:", error);
    throw error;
  }
}

function generateDigitalSignature(data, privateKeypath) {
  const privateKey = readfile(privateKeypath);
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(data);
  return sign.sign(privateKey, "base64");
}

function digitalkey(regno) {
  return generateDigitalSignature(regno, "key_authority/key/private.pem");
}

module.exports = { digitalkey };
