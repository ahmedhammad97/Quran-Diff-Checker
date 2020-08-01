const fs = require("fs");
const diff = require("diff-match-patch");
const dmp = new diff.diff_match_patch();
const cleaner = require("./cleaner");

let compareWithTashkil = (surahNum, reference, compareTo) => {
  let surah = JSON.parse(
    fs.readFileSync(`./dataset/surahs/${surahNum}.json`).toString(),
  );
  let refReading = surah[reference].join(" ");
  let compToReading = surah[compareTo].join(" ");
  let differences = dmp.diff_main(refReading, compToReading);
  return differences;
};

let compareWithoutTashkil = (surahNum, reference, compareTo) => {
  let surah = JSON.parse(
    fs.readFileSync(`./dataset/surahs/${surahNum}.json`).toString(),
  );
  let refReading = cleaner.removeTashkil(surah[reference].join(" "));
  let compToReading = cleaner.removeTashkil(surah[compareTo].join(" "));
  let differences = dmp.diff_main(refReading, compToReading);
  return differences;
};

let compareAllReadings = (compareFunc, path) => {
  for (let i = 1; i < 115; i++) {
    let hafsVSwarsh = compareFunc(i, "hafs", "warsh");
    let hafsVSdoori = compareFunc(i, "hafs", "aldoori");
    let hafsVSsosi = compareFunc(i, "hafs", "alsosi");
    let hafsVSqumbul = compareFunc(i, "hafs", "qumbul");
    let hafsVSbazzi = compareFunc(i, "hafs", "albazzi");
    let resultObj = {
      "reference": "hafs",
      "surah": i,
      "hafsVSwarsh": {
        "diffCount": getDiffCount(hafsVSwarsh),
        "diffs": hafsVSwarsh,
      },
      "hafsVSdoori": {
        "diffCount": getDiffCount(hafsVSdoori),
        "diffs": hafsVSdoori,
      },
      "hafsVSsosi": {
        "diffCount": getDiffCount(hafsVSsosi),
        "diffs": hafsVSsosi,
      },
      "hafsVSqumbul": {
        "diffCount": getDiffCount(hafsVSqumbul),
        "diffs": hafsVSqumbul,
      },
      "hafsVSbazzi": {
        "diffCount": getDiffCount(hafsVSbazzi),
        "diffs": hafsVSbazzi,
      },
    };
    fs.writeFileSync(
      `./results/${path}/${i}.json`,
      JSON.stringify(resultObj),
      (err) => {
        if (err) console.log(err);
      },
    );
    console.log("Done " + i + " : " + path);
  }

  function getDiffCount(arr) {
    return arr.filter((x) => x[0] !== 0).length;
  }
};

let compareAllReadingsWithTashkil = () => {
  compareAllReadings(compareWithTashkil, "with_tashkil");
};

let compareAllReadingsWithoutTashkil = () => {
  compareAllReadings(compareWithoutTashkil, "without_tashkil");
};

module.exports = {
  compareWithTashkil,
  compareWithoutTashkil,
  compareAllReadingsWithTashkil,
  compareAllReadingsWithoutTashkil,
};
