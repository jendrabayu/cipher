exports.mod = (n, m) => {
  return ((n % m) + m) % m;
};

// Apakah kode karakter adalah huruf besar.
exports.isUppercase = (c) => {
  // 65 adalah code untuk karakter 'A'. 90 untuk 'Z' (ASCII).
  return 65 <= c && c <= 90;
};

// Apakah kode karakter adalah huruf kecil.
exports.isLowercase = (c) => {
  // 97 adalah code untuk karakter 'a'. 122 untuk 'z'.
  return 97 <= c && c <= 122;
};

//Mengubah code karakter (ASCII) menjadi huruf kecil.
exports.toLowerCase = (arrayInt) => {
  const output = [];
  arrayInt.forEach((n) => {
    output.push(n + 32);
  });

  return output;
};

//mengubah karakter biasa menjadi code ASCII & disimpan dalam array.
exports.textToIntList = (text) => {
  const intList = [];

  for (let i = 0; i < text.length; i++) {
    intList.push(text.charCodeAt(i));
  }

  return intList;
};

//mengubah code ASCII menjadi karakter biasa & disimpan dalam array.
const intListToCharList = (intList) => {
  const charList = [];

  intList.forEach((integer) => {
    charList.push(String.fromCharCode(integer));
  });

  return charList;
};

//mengubah array (berisi code ASCII) menjadi satu text "string"
exports.intListToText = (intList) => {
  return intListToCharList(intList).join("");
};

exports.gcd = (a, b) => {
  if (!b) {
    return a;
  }
  return this.gcd(b, a % b);
};
