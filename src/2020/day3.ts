function part1(input: Array<string>) {
  let tx = 0;
  let ty = 0;
  let trees = 0;

  let rowlen = input[0].length;

  for (const row of input) {
    // console.log(row);
    if (row[tx % rowlen] === "#") {
      trees++;
    }

    tx += 3;
  }

  return trees;
}

function howmanytrees(input: Array<string>, dx: number, dy: number) {
  let tx = 0;
  let ty = 0;
  let trees = 0;

  let rowlen = input[0].length;

  while (ty < input.length) {
    if (input[ty][tx % rowlen] === "#") {
      trees++;
    }

    tx += dx;
    ty += dy;
  }

  return trees;
}

function part2(input: Array<string>) {
  let result = 1;
  for (const [dx, dy] of [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]) {
    result *= howmanytrees(input, dx, dy);
  }
  return result;
}

export { part1, part2 };
