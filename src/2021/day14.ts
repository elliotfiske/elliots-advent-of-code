import _ = require("lodash");
import { Md5 } from "ts-md5";

function part1(lines: Array<string>) {
  let currP = "PBFNVFFPCPCPFPHKBONB";

  for (let j = 0; j < 10; j++) {
    for (let i = 2; i < lines.length; i++) {
      const line = lines[i];

      const [m, n] = line.split(" -> ");

      // console.log(`Replacing ${m} with ${m[0] + n.toLowerCase() + m[1]}`);

      while (currP.includes(m)) {
        currP = currP.replace(m, m[0] + n.toLowerCase() + m[1]);
      }
    }

    currP = currP.toUpperCase();
  }

  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  let highestCount = 0;
  let lowestCount = 909999999999;
  let highletter = "";
  let lowletter = "";

  for (let i = 0; i < alphabet.length; i++) {
    const c = alphabet[i];
    const count = (currP.match(new RegExp(c, "g")) || []).length;

    if (count === 0) continue;
    if (count > highestCount) {
      highestCount = count;
      highletter = c;
    }

    if (count < lowestCount) {
      lowestCount = count;
      lowletter = c;
    }
  }

  return highestCount - lowestCount;
}

type LetterCount = Record<string, number>;

function letterCountFromString(input: string) {
  return [...input].reduce((acc, curr) => {
    if (acc[curr] === undefined) {
      acc[curr] = 1;
    } else {
      acc[curr]++;
    }
    return acc;
  }, {} as Record<string, number>);
}

function addLetterCounts(a: LetterCount, b: LetterCount) {
  return _.mergeWith({ ...a }, { ...b }, (objValue, srcValue) => {
    return (objValue ?? 0) + (srcValue ?? 0);
  });
}

function part2(lines: Array<string>) {
  console.log(Md5.hashStr("hello there you foul creature"));

  let patternCountMap: Record<string, LetterCount> = {};
  const rules: Record<string, string> = {};

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    const [matched, newletter] = line.split(" -> ");

    rules[matched] = newletter;

    // What is the letter count if you do 1 step on this pair?
    patternCountMap[matched] = letterCountFromString(matched + newletter);
  }

  let nextPatternCountMap: Record<string, LetterCount> = {};
  for (let i = 0; i < 999; i++) {
    // What is the letter count if you run i steps on this pair?
    for (let i1 = 0; i1 < Object.entries(rules).length; i1++) {
      const [pattern, newletter] = Object.entries(rules)[i1];
      const firstPair = pattern[0] + newletter;
      const secondPair = newletter + pattern[1];

      nextPatternCountMap[pattern] = addLetterCounts(
        patternCountMap[firstPair] ?? letterCountFromString(firstPair),
        patternCountMap[secondPair] ?? letterCountFromString(secondPair)
      );

      nextPatternCountMap[pattern][newletter]--;
    }
    patternCountMap = { ...nextPatternCountMap };
  }

  const input = lines[0];
  let total: LetterCount = {};
  for (let i = 1; i < input.length; i++) {
    const pair = input[i - 1] + input[i];
    total = addLetterCounts(
      total,
      patternCountMap[pair] ?? letterCountFromString(pair)
    );
    if (i !== input.length - 1) {
      total[pair[1]]--;
    }
  }

  const maxLetter = _.maxBy(Object.entries(total), (a) => {
    return a[1];
  });

  const minLetter = _.minBy(Object.entries(total), (a) => {
    return a[1];
  });

  return maxLetter[1] - minLetter[1];
}

export { part1, part2 };
