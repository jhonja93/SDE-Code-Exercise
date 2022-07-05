// const readline = require('readline');
import {
  countConsonants,
  countVowels,
  readDataFile,
  hasCommonFactors,
} from './helpers.js';

const args = process.argv.slice(2);

const addressesFile = args[0];
const driversFile = args[1];

if (!addressesFile) {
  console.error('You need to provide an addresses file');
  process.exit(1);
}

if (!driversFile) {
  console.error('You need to provide a drivers file');
  process.exit(1);
}

let addresses = readDataFile(addressesFile).split('\n');
let drivers = readDataFile(driversFile).split('\n');

if (addresses.length !== drivers.length) {
  console.error(
    'The number of drivers must be the same as the number of addresses.'
  );
  process.exit(1);
}

let scores = [];

addresses.forEach((a) => {
  if (a.length % 2 === 0) {
    // Even case
    let SSByDriver = drivers.map((d) => countVowels(d) * 1.5);
    let driverHasFactors = drivers.map((d) =>
      hasCommonFactors(a.length, d.length)
    );

    SSByDriver = SSByDriver.map((s, index) => {
      if (driverHasFactors[index]) {
        return (s = s * 1.5);
      }
      return s;
    });

    scores.push({ score: SSByDriver, address: a });
  } else {
    // Odd case
    let SSByDriver = drivers.map((d) => countConsonants(d) * 1);
    let driverHasFactors = drivers.map((d) =>
      hasCommonFactors(a.length, d.length)
    );

    SSByDriver = SSByDriver.map((s, index) => {
      if (driverHasFactors[index]) {
        return (s = s * 1.5);
      }
      return s;
    });
    scores.push({ score: SSByDriver, address: a });
  }
});

let results = [];

while (results.length !== drivers.length) {
  let scores_max = scores.map((s) => Math.max(...s.score));
  let max_score = Math.max(...scores_max);
  let index_scores_max = scores_max.indexOf(max_score);
  let index_driver = scores[index_scores_max].score.indexOf(max_score);
  let address = scores[index_scores_max].address;
  let driver = drivers[index_driver];

  results.push({ driver, address, ss: max_score });

  scores.splice(index_scores_max, 1);
  scores.forEach((s) => {
    s.score[index_driver] = 0;
  });
}

console.log(results);
