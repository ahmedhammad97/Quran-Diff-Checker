const fs = require("fs");
for (let i = 1; i < 115; i++) {
  var surah = JSON.parse(
    fs.readFileSync(`./dataset/surahs/${i}.json`).toString(),
  );
  surah.hafs.forEach((ayah, index, arr) => {
    arr[index] = ayah.replace(
      /([\u0610-\u0617\u06D6-\u06DE\u06E2-\u06ED])/g,
      "",
    );
  });
  surah.warsh.forEach((ayah, index, arr) => {
    arr[index] = ayah.replace(
      /([\u0610-\u0617\u06D6-\u06DE\u06E2-\u06ED])/g,
      "",
    );
  });
  surah.aldoori.forEach((ayah, index, arr) => {
    arr[index] = ayah.replace(
      /([\u0610-\u0617\u06D6-\u06DE\u06E2-\u06ED])/g,
      "",
    );
  });
  surah.alsosi.forEach((ayah, index, arr) => {
    arr[index] = ayah.replace(
      /([\u0610-\u0617\u06D6-\u06DE\u06E2-\u06ED])/g,
      "",
    );
  });
  surah.qumbul.forEach((ayah, index, arr) => {
    arr[index] = ayah.replace(
      /([\u0610-\u0617\u06D6-\u06DE\u06E2-\u06ED])/g,
      "",
    );
  });
  surah.albazzi.forEach((ayah, index, arr) => {
    arr[index] = ayah.replace(
      /([\u0610-\u0617\u06D6-\u06DE\u06E2-\u06ED])/g,
      "",
    );
  });
  fs.writeFile(`./dataset/surahs/${i}.json`, JSON.stringify(surah), (err) => {
    if (err) console.log(err);
  });
}
