exports.mod = (n, m) => {
  return ((n % m) + m) % m;
};

// Tests whether the specified character code is an uppercase letter.
exports.isUppercase = (c) => {
  return 65 <= c && c <= 90; // 65 is character code for 'A'. 90 is 'Z'.
};

// Tests whether the specified character code is a lowercase letter.
exports.isLowercase = (c) => {
  return 97 <= c && c <= 122; // 97 is character code for 'a'. 122 is 'z'.
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
