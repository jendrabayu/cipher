const { mod, isLowercase, isUppercase } = require("../helper");

/*
 * Mengembalikan hasil enkripsi Vigenère pada teks yang diberikan dengan kunci yang diberikan.
 */
exports.encrypt = (plaintext, key) => {
  const output = [];
  let j = 0;

  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];

    if (isLowercase(char)) {
      const p = char - 97;
      const k = key[j % key.length];

      output.push(mod(p + k, 26) + 65); // ditambah 65 untuk membuat chipper text menjadi huruf besar
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

      output.push(mod(c - k, 26) + 97); // ditambah 97 untuk membuat chipper text menjadi huruf besar
      j++;
    }
  }

  return output;
};