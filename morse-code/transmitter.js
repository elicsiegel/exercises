const transmitter = (options = {}, callback) => {
  let words = options.message.split(" ");
  let binaryCode = convertWordsToBinary(words, options.codes);
  console.log("full sentence " + binaryCode);

};

const convertWordsToBinary = (words, codes) => {
  let binaryCodes = "";

  for (var i = 0; i < words.length; i++) {
    binaryCodes += convertWordtoBinary(words[i], codes);
    if (i < (words.length)) {
      // binaryCodes += "0000000";
    }
  }
  return binaryCodes;
};

const convertWordtoBinary = (word, codes) => {
  let letters = word.split("");
  let numbers = "";

  for (var i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const letterInBinary = letterToBinary(letter, codes);

    numbers += letterInBinary;
    if (letters.length > 1 && i < (letters.length - 1)) {
      numbers += "000";
    }
  }
  return numbers
};

const letterToBinary = (letter, codes) => {
  const morseVersion = codes[letter];
  let nums = "";

  for (var i = 0; i < morseVersion.length; i++) {

    if (morseVersion[i] === ".") {
      nums += "1"
    } else {
      nums += "111"
    }

    if (i !== morseVersion.length - 1) {
      nums += "0"
    }
  }
  console.log("letter " + morseVersion);
  console.log("letter in nums " + nums);
  return nums;
};



module.exports = transmitter;
