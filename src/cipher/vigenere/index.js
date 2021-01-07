const { mod, isLowercase, isUppercase } = require("../helper");


//method vigenere dengan parameter plaintext dan kunci
exports.encrypt = (plaintext, key) => {

  //output hasil enkripsi berupa
  const output = [];
  let j = 0;

  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];

    if (isLowercase(char)) {
      const p = char - 97;
      const k = key[j % key.length];

      output.push(mod(p + k, 26) + 65); // Add 65 to make it upper case
      j++;
    }
  }

  return output;
};

exports.decrypt = (cipher, key) => {
  const output = [];
  let j = 0;

  for (let i = 0; i < cipher.length; i++) {
    const char = cipher[i];

    if (!isUppercase(char)) output.push(char);
    else {
      const c = char - 65;
      const k = key[j % key.length];

      output.push(mod(c - k, 26) + 97); // Add 97 to make it lower case
      j++;
    }
  }

  return output;
};