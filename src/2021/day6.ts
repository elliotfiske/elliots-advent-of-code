// import _ = require('lodash')

function part1(lines: Array<string>) {
  let result = 0;
  const fish = lines[0].split(",").map((s) => parseInt(s));

  let currFish = fish;

  let fishMap: Record<number, number> = {};

  for (let i = 0; i < currFish.length; i++) {
    const f = currFish[i];
    if (fishMap[f] === undefined) {
      fishMap[f] = 0;
    }
    fishMap[f]++;
  }

  for (let i = 0; i < 256; i++) {
    let newFishMap: any = { "6": 0, "8": 0 };
    for (const fishEntry of Object.entries(fishMap)) {
      const [fishAge, fishCount] = fishEntry;
      const numFishAge = parseInt(fishAge);

      if (fishAge === "0") {
        newFishMap["6"] += fishCount;
        newFishMap["8"] += fishCount;
      } else {
        if (newFishMap[numFishAge - 1] === undefined) {
          newFishMap[numFishAge - 1] = 0;
        }
        newFishMap[numFishAge - 1] += fishCount;
      }
    }

    fishMap = newFishMap;
  }
  return Object.entries(fishMap)
    .map((e) => e[1])
    .reduce((prev, curr) => {
      return prev + curr;
    });
}

function part2(lines: Array<string>) {
  let result = 0;
  return result;
}

export { part1, part2 };
