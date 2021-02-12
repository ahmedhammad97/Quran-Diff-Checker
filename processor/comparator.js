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
  const comparisions = ["hafsVSwarsh", "hafsVSdoori", "hafsVSsosi", "hafsVSqumbul", "hafsVSbazzi"];

  for (let i = 1; i < 115; i++) {
    Promise.all([
      compareFunc(i, "hafs", "warsh"),
      compareFunc(i, "hafs", "aldoori"),
      compareFunc(i, "hafs", "alsosi"),
      compareFunc(i, "hafs", "qumbul"),
      compareFunc(i, "hafs", "albazzi")
    ]).then((results) => {
      let resultObj = { "reference": "hafs", "surah": i }
      for (let k = 0; k < 5; k++) {
        resultObj[comparisions[k]] = {
          "diffCount": getDiffCount(results[k]),
          "diffs": results[k]
        };
      }

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
