function part1(input: Array<string>) {
  let dx = 0;
  let dy = 0;
  input.forEach((dira) => {
    const [dir, sx] = dira.split(" ");
    const x = parseInt(sx);
    if (dir === "forward") {
      dx += x;
    } else if (dir === "up") {
      dy -= x;
    } else if (dir === "down") {
      dy += x;
    } else {
      throw "??? " + dir;
    }
  });
  return dx * dy;
}

function part2(input: Array<string>) {
  let dx = 0;
  let dy = 0;
  let aim = 0;

  input.forEach((dira) => {
    const [dir, sx] = dira.split(" ");
    const x = parseInt(sx);
    if (dir === "forward") {
      dx += x;
      dy += aim * x;
    } else if (dir === "up") {
      aim -= x;
    } else if (dir === "down") {
      aim += x;
    } else {
      throw "??? " + dir;
    }
  });
  return dx * dy;
}

export { part1, part2 };
