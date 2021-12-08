function part1(input: Array<string>) {
  let result = 0;
  for (const i of input) {
    const regex: RegExp = /(\d+)-(\d+) ([a-z]): ([a-z]+)/gm;
    let m: RegExpExecArray | null;

    while ((m = regex.exec(i)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      const low = parseInt(m[1]);
      const hi = parseInt(m[2]);
      const ch = m[3];
      const pw = m[4];

      // console.log(`${low}, ${hi}, ${ch}, ${pw}`);
      let actual = 0;
      for (const c of pw) {
        if (c === ch) {
          actual++;
        }
      }

      console.log(`${actual}, ${low}, ${hi}`);
      if (actual >= low && actual <= hi) {
        result++;
      }
    }
  }

  return result;
}

function part2(input: Array<string>) {
  let result = 0;
  for (const i of input) {
    const regex: RegExp = /(\d+)-(\d+) ([a-z]): ([a-z]+)/gm;
    let m: RegExpExecArray | null;

    while ((m = regex.exec(i)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      const low = parseInt(m[1]);
      const hi = parseInt(m[2]);
      const ch = m[3];
      const pw = m[4];

      // console.log(`${low}, ${hi}, ${ch}, ${pw}`);
      let actual = 0;
      if (pw[low - 1] === ch) {
        actual++;
      }

      if (pw[hi - 1] === ch) {
        actual++;
      }

      console.log(`${actual}, ${low}, ${hi}`);
      if (actual === 1) {
        result++;
      }
    }
  }

  return result;
}

export { part1, part2 };
