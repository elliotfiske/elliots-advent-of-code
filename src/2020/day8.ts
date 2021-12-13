// import _ = require('lodash')

function part1(lines: Array<string>) {
  let acc = 0;

  let seen = new Set<number>();
  let lineNum = 0;

  while (true) {
    const line = lines[lineNum];
    if (line.startsWith("acc")) {
      acc += parseInt(line.split(" ")[1]);
      if (isNaN(acc)) {
        debugger;
      }
      lineNum++;
    } else if (line.startsWith("jmp")) {
      lineNum += parseInt(line.split(" ")[1]);
    } else {
      lineNum++;
    }

    if (seen.has(lineNum)) {
      break;
    }

    seen.add(lineNum);
  }
  return acc;
}

function part2(lines: Array<string>) {}

export { part1, part2 };
