import fs from 'fs';
import { resolve, dirname } from 'path';

function readDataFile(file) {
  try {
    return fs.readFileSync(resolve(dirname(''), file), 'utf8');
  } catch (err) {
    console.log(file + ": File not found");
  }
}

function countVowels(value) {
  // find the count of vowels
  const count = value.match(/[aeiou]/gi).length;
  // return number of vowels
  return count;
}

function isConsonant(ch) {
  // To handle lower case
  ch = ch.toUpperCase();

  return (
    !(ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') &&
    ch.match(/[A-Z]/i)
  );
}

function countConsonants(str) {
  var count = 0;
  for (var i = 0; i < str.length; i++)
    // To check is character is Consonant
    if (isConsonant(str[i])) ++count;
  return count;
}

function hasCommonFactors(a, b) {
  let residuosX = [];
  let residuosY = [];

  for (let i = 2; i <= a; i++) {
    if (a % i === 0) {
      residuosX.push(i);
    }
  }

  for (let j = 2; j <= b; j++) {
    if (b % j === 0) {
      residuosY.push(j);
    }
  }

  return residuosX.filter((v) => residuosY.includes(v)).length > 0;
}

export {readDataFile, countVowels, countConsonants, hasCommonFactors}
