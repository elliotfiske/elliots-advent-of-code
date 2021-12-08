import _ = require("lodash");

function part2(input: Array<string>) {
  const groups: string[][] = [[]];
  let groupNdx = 0;
  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    if (line.length === 0) {
      groups.push([]);
      groupNdx++;
    } else {
      groups[groupNdx].push(line);
    }
  }

  let total = 0;

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    let yesletters: string[] = _.uniq([...group[0]]);

    for (let j = 0; j < group.length; j++) {
      const line = group[j];
      yesletters = _.uniq(_.intersection([...yesletters], [...line]));
    }

    total += yesletters.length;
  }
  return total;
}

function part1(input: Array<string>) {
  let letters = new Array<string>();
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      letters.push(char);
      letters = _.uniq(letters);
    }

    if (line.length === 0) {
      result += letters.length;
      letters = new Array<string>();
    }
  }

  return result;
}

export { part1, part2 };
