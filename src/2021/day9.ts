import _ = require("lodash");

function part1(lines: Array<string>) {
  const grid = lines.map((line) => {
    return [...line].map((s) => parseInt(s));
  });

  let res = 0;

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const me = grid[i][j];
      if (
        me < (grid[i - 1]?.[j] ?? 10000000) &&
        me < (grid[i + 1]?.[j] ?? 10000000) &&
        me < (grid[i]?.[j - 1] ?? 10000000) &&
        me < (grid[i]?.[j + 1] ?? 10000000)
      ) {
        res += me + 1;
      }
    }
  }
  return res;
}

function part2(lines: Array<string>) {
  const grid = lines.map((line) => {
    return [...line].map((s) => parseInt(s));
  });

  const flood: number[][] = grid.map((row) =>
    row.map((i) => {
      if (i === 9) {
        return -1;
      } else {
        return 0;
      }
    })
  );

  let basinSizes = new Array<number>();
  let bigBasins = new Array<number[]>();

  let maxBasinSize = 0;

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const me = grid[i][j];
      if (
        me < (grid[i - 1]?.[j] ?? 10000000) &&
        me < (grid[i + 1]?.[j] ?? 10000000) &&
        me < (grid[i]?.[j - 1] ?? 10000000) &&
        me < (grid[i]?.[j + 1] ?? 10000000)
      ) {
        let basinSize = 0;

        const neighbors = [
          [i - 1, j],
          [i + 1, j],
          [i, j - 1],
          [i, j + 1],
        ];
        const allNe = new Array<number[]>();

        while (neighbors.length > 0) {
          const check = neighbors.pop()!;
          const val = flood[check[0]]?.[check[1]];

          if (val === undefined || val !== 0) continue;

          allNe.push(check);
          // if (gridVal < me) continue;

          flood[check[0]][check[1]] = 1;
          basinSize++;

          const x = check[0];
          const y = check[1];

          neighbors.push([x + 1, y], [x - 1, y], [x, y - 1], [x, y + 1]);
        }
        basinSizes.push(basinSize);
        if (maxBasinSize < basinSize) {
          maxBasinSize = basinSize;
        }

        if (basinSize > 91 && allNe) {
          bigBasins = bigBasins.concat(allNe);
        }
      }
    }
  }
  for (let k = 0; k < flood.length; k++) {
    const row = flood[k];
    for (let l = 0; l < row.length; l++) {
      const rowElement = row[l];
      if (bigBasins.findIndex((el) => el[0] === k && el[1] === l) !== -1) {
        process.stdout.write("!");
      } else if (rowElement === -1) {
        process.stdout.write("X");
      } else {
        process.stdout.write(".");
      }
    }
    console.log();
  }
  const what = basinSizes
    .sort((a, b) => {
      if (a < b) return -1;
      else return 1;
    })
    .slice(-3);
  return what.reduce(_.multiply);
}

export { part1, part2 };
