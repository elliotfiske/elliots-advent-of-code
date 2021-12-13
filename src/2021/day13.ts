import _ = require("lodash");

function createAndFillTwoDArray({ rows, columns, defaultValue }): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => defaultValue)
  );
}

function part1(lines: Array<string>) {
  const grid = createAndFillTwoDArray({
    rows: 2000,
    columns: 2000,
    defaultValue: 0,
  });

  let foldtime = false;

  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];

    if (line.length === 0) {
      foldtime = true;
      break;
    }

    const [x, y] = line.split(",");
    grid[y][x] = 1;
  }

  console.log(`There are ${grid.flat().reduce(_.add)} ones`);

  let overlaps = 0;

  for (let x = 655; x < 2000; x++) {
    for (let y = 0; y < 2000; y++) {
      if (grid[y]?.[655 * 2 - x] === 1 && grid[y][x] === 1) {
        console.log("Found an overlap!");
        overlaps++;
      }
    }
  }

  grid.slice(0, 8).forEach((l) => {
    console.log(
      l
        .slice(0, 100)
        .map((i) => (i ? "#" : "."))
        .join("")
    );
  });

  return overlaps;
}

function part2(lines: Array<string>) {}

export { part1, part2 };
