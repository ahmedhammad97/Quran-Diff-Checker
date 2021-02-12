const fs = require("fs");

const comparisions = ["hafsVSwarsh", "hafsVSdoori", "hafsVSsosi", "hafsVSqumbul", "hafsVSbazzi"];

let stats_with_tashkil = [0, 0, 0, 0, 0]
let stats_without_tashkil = [0, 0, 0, 0, 0]

for (let surahNum = 1; surahNum < 115; surahNum++) {
    const stat = JSON.parse(fs.readFileSync(__dirname + `/../results/with_tashkil/${surahNum}.json`).toString())
    for (let i = 0; i < 5; i++) {
        stats_with_tashkil[i] += stat[comparisions[i]].diffCount;
    }
}

for (let surahNum = 1; surahNum < 115; surahNum++) {
    const stat = JSON.parse(fs.readFileSync(__dirname + `/../results/without_tashkil/${surahNum}.json`).toString())
    for (let i = 0; i < 5; i++) {
        stats_without_tashkil[i] += stat[comparisions[i]].diffCount;
    }
}

for (let i = 0; i < 5; i++) {
    console.log(comparisions[i]);
    console.log("With Tashkil: " + stats_with_tashkil[i]);
    console.log("Without Tashkil: " + stats_without_tashkil[i]);
    console.log("\n");
}