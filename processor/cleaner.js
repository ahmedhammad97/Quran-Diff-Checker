const spawn = require("child_process").spawn;

const arabicNormChar = {
  "ﻷ": "لا",
  "ؤ": "و",
  "ى": "ی",
  "ي": "ی",
  "ئ": "ی",
  "أ": "ا",
  "إ": "ا",
  "آ": "ا",
  "ٱ": "ا",
  "ٳ": "ا",
  "ء": "",
  "ِ": "",
  "ْ": "",
  "ُ": "",
  "َ": "",
  "ّ": "",
  "ٍ": "",
  "ً": "",
  "ٌ": "",
  "ٓ": "",
  "ٰ": "",
  "ٔ": "",
  "�": "",
  "ے" : "ى"
};

var simplifyArabic = function (str) {
  return str.replace(/[^\u0000-\u007E]/g, function (a) {
    var retval = arabicNormChar[a];
    if (retval == undefined) retval = a;
    return retval;
  }).normalize("NFKD").toLowerCase();
};

const removeTashkil = function (text) {
  text = simplifyArabic(text);
  //remove special characters
  text = text.normalize("NFKD").toLowerCase();
  text = text.replace(
    /([\u0600-\u061F\u064B-\u066F\u0676-\u06C0\u06D6-\u08FF])/g,
    "",
  );

  text = text.replace(/([\u0622-\u0623\u0625\u0627\u0671-\u0673\u0675])/g, "ا");
  text = text.replace(/([\u0620\u0626\u0649\u064A\u06CC-\u06CE\u06D0-\u06D3])/g, "ی");

  //overriding this difference as it could be considered a writing style rather than a difference
  text = text.replace("ی", "ا");

  const pythonProcess = spawn('python3',[__dirname + "/tashkil_remover.py", text]);

  return new Promise((resolve, reject) => {
    pythonProcess.stdout.on('data', (data) => {
      resolve(data.toString().normalize("NFKD").toLowerCase());
    });
  });
};

module.exports = { removeTashkil };
