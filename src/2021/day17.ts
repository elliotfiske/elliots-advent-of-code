import _ = require("lodash");

function part2(lines: Array<string>) {
  const tx_start = 244;
  const tx_end = 303;
  const ty_start = -91;
  const ty_end = -54;

  // const tx_start = 20;
  // const tx_end = 30;
  // const ty_start = -10;
  // const ty_end = -5;

  let highestvy = 0;

  let total = 0;
  let pairs: [number, number][] = [];

  for (let nvx = 1; nvx < 2520; nvx++) {
    nextnum: for (let nvy = -2000; nvy < 2000; nvy++) {
      let x = 0;
      let y = 0;
      let vy = nvy;
      let vx = nvx;

      let peak = 0;

      while (x <= tx_end && y >= ty_start) {
        x += vx;
        y += vy;

        vx -= 1;
        if (vx < 0) vx = 0;
        vy -= 1;

        peak = Math.max(peak, y);

        if (x >= tx_start && x <= tx_end && y >= ty_start && y <= ty_end) {
          highestvy = Math.max(highestvy, peak);
          total++;
          pairs.push([nvx, nvy]);
          continue nextnum;
        }
      }
    }
  }

  const str =
    "23,-10  25,-9   27,-5   29,-6   22,-6   21,-7   9,0     27,-7   24,-5 " +
    "25,-7   26,-6   25,-5   6,8     11,-2   20,-5   29,-10  6,3     28,-7 " +
    "8,0     30,-6   29,-8   20,-10  6,7     6,4     6,1     14,-4   21,-6 " +
    "26,-10  7,-1    7,7     8,-1    21,-9   6,2     20,-7   30,-10  14,-3 " +
    "20,-8   13,-2   7,3     28,-8   29,-9   15,-3   22,-5   26,-8   25,-8 " +
    "25,-6   15,-4   9,-2    15,-2   12,-2   28,-9   12,-3   24,-6   23,-7 " +
    "25,-10  7,8     11,-3   26,-7   7,1     23,-9   6,0     22,-10  27,-6 " +
    "8,1     22,-8   13,-4   7,6     28,-6   11,-4   12,-4   26,-9   7,4 " +
    "24,-10  23,-8   30,-8   7,0     9,-1    10,-1   26,-5   22,-9   6,5 " +
    "7,5     23,-6   28,-10  10,-2   11,-1   20,-9   14,-2   29,-7   13,-3 " +
    "23,-5   24,-8   27,-9   30,-7   28,-5   21,-10  7,9     6,6     21,-5 " +
    "27,-10  7,2     30,-9   21,-8   22,-7   24,-9   20,-6   6,9     29,-5 " +
    "8,-2    27,-8   30,-5   24,-7";

  const realpairs = str
    .split(" ")
    .filter((s) => s.trim().length !== 0)
    .map((s) => {
      const [a, b] = s.split(",");
      return [parseInt(a), parseInt(b)];
    })
    .sort((a: number[], b: number[]) => {
      const diff = a[0] - b[0];
      if (diff !== 0) {
        return diff;
      }
      return a[1] - b[1];
    });
  const sortpairs = pairs.sort((a: number[], b: number[]) => {
    const diff = a[0] - b[0];
    if (diff !== 0) {
      return diff;
    }
    return a[1] - b[1];
  });

  // for (let i = 0; i < pairs.length; i++) {
  //   const nums = pairs[i];
  //   if (!str.includes(nums.join(","))) {
  //     console.log(JSON.stringify(nums));
  //   }
  // }
  const missing = _.differenceWith(realpairs, pairs, (a, b) => {
    return a[0] === b[0] && a[1] === b[1];
  });

  console.log(JSON.stringify(missing));
  return total;
}

function part1(lines: Array<string>) {}

export { part1, part2 };
