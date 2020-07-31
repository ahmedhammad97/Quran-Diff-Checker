const removeTashkil = function (text) {
  //remove special characters
  text = text.replace(
    /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g,
    "",
  );

  //normalize Arabic
  text = text.replace(/(آ|إ|أ)/g, "ا");
  text = text.replace(/(ة)/g, "ه");
  text = text.replace(/(ئ|ؤ)/g, "ء");
  text = text.replace(/(ى)/g, "ي");

  return text;
};

module.exports = { removeTashkil };
