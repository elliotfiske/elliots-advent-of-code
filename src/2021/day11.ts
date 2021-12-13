import _ = require("lodash");

function increment(grid: number[][], x, y) {
  if (grid[x]?.[y] === undefined) return;

  if (grid[x][y] === -1) return;

  grid[x][y]++;

  const neighbors = [-1, 0, 1]
    .flatMap((newx) => [-1, 0, 1].map((newy) => [newx, newy]))
    .filter(([newx, newy]) => !(newx === 0 && newy === 0));

  if (grid[x][y] === 10) {
    grid[x][y] = -1;
    for (let j = 0; j < neighbors.length; j++) {
      const [nx, ny] = neighbors[j];
      increment(grid, nx + x, ny + y);
    }
  }
}

function part1(lines: Array<string>) {
  const grid = lines.map((line) => [...line].map((s) => parseInt(s)));
  let result = 0;

  for (let i = 0; i < 100; i++) {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        increment(grid, x, y);
      }
    }

    for (let j = 0; j < grid.length; j++) {
      const row = grid[j];

      for (let k = 0; k < row.length; k++) {
        let n = row[k].toString();
        if (n === "-1") n = "!";
        process.stdout.write(n);
      }

      console.log();
    }
    console.log();

    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        if (grid[j][k] === -1) {
          result++;
          grid[j][k] = 0;
        }
      }
    }
  }

  return result;
}

function part2(lines: Array<string>) {
  const grid = lines.map((line) => [...line].map((s) => parseInt(s)));
  let result = 0;

  outer: for (let i = 0; i < 1000000; i++) {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        increment(grid, x, y);
      }
    }

    for (let j = 0; j < grid.length; j++) {
      const row = grid[j];

      for (let k = 0; k < row.length; k++) {
        let n = row[k].toString();
        if (n === "-1") n = "!";
        process.stdout.write(n);
      }

      console.log();
    }
    console.log();

    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        if (grid[j][k] === -1) {
          result++;
          grid[j][k] = 0;
        }
      }
    }

    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        if (grid[j][k] !== 0) {
          continue outer;
        }
      }
    }

    return i + 1;
  }
  return result;
}

export { part1, part2 };
