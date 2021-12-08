import _ = require("lodash");

function getIntsFromString(input: string): number[] {
  const parsed = input.matchAll(/\d+/g);
  return [...parsed].map((s) => parseInt(s[0], 10));
}

function part1(input: Array<string>) {
  const grid: number[][] = Array.from(Array(1000), (_) => Array(1000).fill(0));

  let result = 0;

  for (let i = 0; i < input.length; i++) {
    const s = input[i];

    const [bx, by, ex, ey] = getIntsFromString(s);

    if (by === ey) {
      let range: number[];
      if (ex > bx) {
        range = _.range(bx, ex + 1);
      } else {
        range = _.range(ex, bx + 1);
      }

      for (const x of range) {
        grid[x][by] = grid[x][by] + 1;
        if (grid[x][by] === 2) {
          result++;
        }
      }
    } else if (bx === ex) {
      let range: number[];
      if (ey > by) {
        range = _.range(by, ey + 1);
      } else {
        range = _.range(ey, by + 1);
      }

      for (const y of range) {
        grid[bx][y] = grid[bx][y] + 1;
        if (grid[bx][y] === 2) {
          result++;
        }
      }
    }
  }

  return result;
}

function part2(input: Array<string>) {
  const grid: number[][] = Array.from(Array(1000), (_) => Array(1000).fill(0));

  let result = 0;

  for (let i = 0; i < input.length; i++) {
    const s = input[i];

    const [bx, by, ex, ey] = getIntsFromString(s);

    let x = bx;
    let y = by;

    while (true) {
      grid[x][y]++;

      if (grid[x][y] === 2) {
        result++;
      }

      if (x > ex) {
        x--;
      } else if (x < ex) {
        x++;
      }

      if (y > ey) {
        y--;
      } else if (y < ey) {
        y++;
      }

      if (x === ex && y === ey) {
        grid[x][y]++;

        if (grid[x][y] === 2) {
          result++;
        }
        break;
      }
    }
  }
  return result;
}

export { part1, part2 };
