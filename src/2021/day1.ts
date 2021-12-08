function part1(input: Array<string>) {
  const ints = input.map((i) => parseInt(i));

  let result = 0;
  let prev = ints[0];
  let prev2: number | undefined = undefined;
  let prev3: number | undefined = undefined;

  let w: number | undefined = undefined;

  ints.forEach((i) => {
    if (prev2 && prev3) {
      const new_w = prev + prev2 + prev3;
      if (!!w && new_w > w) {
        result++;
        console.log(`new w ${new_w}, w ${w}`);
      }
      w = new_w;
    }
    prev3 = prev2;
    prev2 = prev;
    prev = i;
  });

  return result;
}

function part2(input: Array<string>) {
  const ints = input.map((i) => parseInt(i));

  let result = 0;
  ints.reduce((previousValue, curr) => {
    if (curr > previousValue) {
      result++;
    }
    return curr;
  });
  return result;
}

export { part1, part2 };
