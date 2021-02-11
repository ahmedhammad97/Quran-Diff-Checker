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

  return new Promise((resolve, reject) => {
    Promise.all([
      cleaner.removeTashkil(surah[reference].join(" ")),
      cleaner.removeTashkil(surah[compareTo].join(" "))
    ]).then(([refResult, compResult]) => {
      resolve(dmp.diff_main(refResult, compResult))
    }).catch(err => {
      reject(err);
    })
  });
};

let compareAllReadings = async (compareFunc, path) => {
  for (let i = 1; i < 115; i++) {
    Promise.all([
      compareFunc(i, "hafs", "warsh"),
      compareFunc(i, "hafs", "aldoori"),
      compareFunc(i, "hafs", "alsosi"),
      compareFunc(i, "hafs", "qumbul"),
      compareFunc(i, "hafs", "albazzi")
    ]).then((results) => {
      let resultObj = {
        "reference": "hafs",
        "surah": i,
        "hafsVSwarsh": {
          "diffCount": getDiffCount(results[0]),
          "diffs": results[0],
        },
        "hafsVSdoori": {
          "diffCount": getDiffCount(results[1]),
          "diffs": results[1],
        },
        "hafsVSsosi": {
          "diffCount": getDiffCount(results[2]),
          "diffs": results[2],
        },
        "hafsVSqumbul": {
          "diffCount": getDiffCount(results[3]),
          "diffs": results[3],
        },
        "hafsVSbazzi": {
          "diffCount": getDiffCount(results[4]),
          "diffs": results[4],
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
    });
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
