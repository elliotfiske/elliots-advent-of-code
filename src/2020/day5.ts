function part1(input: Array<string>) {
  let result = 0;

  input.forEach((s) => {
    let str = "";
    let cstr = "";
    for (const c of s) {
      if (c === "F") {
        str += "0";
      } else if (c === "B") {
        str += "1";
      } else if (c === "R") {
        cstr += "1";
      } else if (c === "L") {
        cstr += "0";
      }
    }

    const row = parseInt(str, 2);
    const col = parseInt(cstr, 2);

    const id = row * 8 + col;
    if (id > result) {
      result = id;
    }
  });

  return result;
}

function part2(input: Array<string>) {
  let seen: number[] = [];

  input.forEach((s) => {
    let str = "";
    let cstr = "";
    for (const c of s) {
      if (c === "F") {
        str += "0";
      } else if (c === "B") {
        str += "1";
      } else if (c === "R") {
        cstr += "1";
      } else if (c === "L") {
        cstr += "0";
      }
    }

    const row = parseInt(str, 2);
    const col = parseInt(cstr, 2);

    const id = row * 8 + col;
    seen.push(id);
  });

  let result = 0;
  for (let i = 0; i < 1000; i++) {
    if (seen.includes(i - 1) && seen.includes(i + 1) && !seen.includes(i)) {
      console.log("What up " + i);
    }
  }

  return result;
}

export { part1, part2 };
