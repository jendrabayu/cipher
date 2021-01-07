// const { det } = require("mathjs");

exports.mod = (n, m) => {
  return ((n % m) + m) % m;
};


// Menguji apakah kode karakter yang ditentukan adalah huruf besar.
exports.isUppercase = (c) => {
  return 65 <= c && c <= 90; // 65 adalah code untuk karakter 'A'. 90 untuk 'Z'.
};

// Menguji apakah kode karakter yang ditentukan adalah huruf kecil.
exports.isLowercase = (c) => {
  return 97 <= c && c <= 122; // 97 adalah code untuk karakter 'a'. 122 untuk 'z'.
};

exports.toLowerCase = (arrayInt) => {
  const output = [];
  arrayInt.forEach((n) => {
    output.push(n + 32);
  });

  return output;
};

exports.textToIntList = (text) => {
  const intList = [];

  for (let i = 0; i < text.length; i++) {
    intList.push(text.charCodeAt(i));
  }

  return intList;
};

/*
 * Returns the list of character from given list of integer.
 */
const intListToCharList = (intList) => {
  const charList = [];

  intList.forEach((integer) => {
    charList.push(String.fromCharCode(integer));
  });

  return charList;
};

exports.intListToText = (intList) => {
  return intListToCharList(intList).join("");
};

exports.gcd = (a, b) => {
  if (!b) {
    return a;
  }
  return this.gcd(b, a % b);
};
