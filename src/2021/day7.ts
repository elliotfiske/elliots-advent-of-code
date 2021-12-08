import _ = require("lodash");

function part1(lines: Array<string>) {
  const ints = lines[0].split(",").map((s) => parseInt(s));
  return Math.min(
    ..._.range(0, 600).map((a) => {
      return ints
        .map((i) => {
          return (Math.abs(a - i) * (Math.abs(a - i) + 1)) / 2;
        })
        .reduce(_.add);
    })
  );
}

function part2(lines: Array<string>) {}

export { part1, part2 };
