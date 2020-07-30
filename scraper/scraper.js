const fetch = require("node-fetch");
const parser = require("node-html-parser");
const fs = require("fs");
const configs = require("../configs");

const parserOptions = {
  lowerCaseTagName: false,
  script: false,
  style: false,
  pre: false,
  comment: false,
};

const fetchSurah = (reading, surahNum) => {
  return new Promise((resolve, reject) => {
    fetch(`${configs.source}/${reading}/${surahNum}.html`)
      .then((res) => res.text())
      .then((body) => {
        const final = parser.parse(body, parserOptions)
          .querySelector(".quran").childNodes
          .filter((node) => node.nodeType === 3)
          .join("")
          .replace(/(\r\n|\n|\r)/gm, " ")
          .replace(/\s\s+/g, " ")
          .replace(/[0-9]/g, "(")
          .split(new RegExp(["\\\(", "\\\)"].join("|"), "g"))
          .map((ayah) => ayah.trim())
          .filter((ayah) => ayah !== "")
          .filter(isNaN);
        resolve(final);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

function fetchAllReadings(surahNum) {
  Promise.all([
    fetchSurah("", surahNum),
    fetchSurah("warsh", surahNum),
    fetchSurah("aldoori", surahNum),
    fetchSurah("alsosi", surahNum),
    fetchSurah("qumbul", surahNum),
    fetchSurah("albazi", surahNum),
  ]).then((values) => {
    const finalObj = {
      "hafs": values[0],
      "warsh": values[1],
      "aldoori": values[2],
      "alsosi": values[3],
      "qumbul": values[4],
      "albazi": values[5],
      "surah": `${surahNum}`,
    };
    fs.writeFile(
      `../dataset/surahs/${surahNum}.json`,
      JSON.stringify(finalObj),
      (err) => {
        if (err) console.log(err);
      },
    );
  });
}

let counter = 1;
setInterval(() => {
  fetchAllReadings(counter);
  counter++;
}, configs.fetchCoolDown);
