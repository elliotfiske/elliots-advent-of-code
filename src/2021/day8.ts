import _ = require("lodash");
import assert = require("assert");

function part1(lines: Array<string>) {
  let result = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    result += line
      .split(" | ")[1]
      .split(" ")
      .filter(
        (s) =>
          s.length === 2 || s.length === 3 || s.length === 7 || s.length === 4
      ).length;
  }
  return result;
}

function part2(lines: Array<string>) {
  let result = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const nums_by_len: Record<number, string[]> = {};
    line
      .split(" ")
      .slice(0, 10)
      .forEach((thing) => {
        if (nums_by_len[thing.length] === undefined)
          nums_by_len[thing.length] = [];
        nums_by_len[thing.length].push(thing);
      });

    const a = _.difference([...nums_by_len[3][0]], [...nums_by_len[2][0]]);

    assert(a.length === 1);

    const b_or_d = _.difference([...nums_by_len[4][0]], [...nums_by_len[2][0]]);

    const all = "abcdefg";

    const sixers = nums_by_len[6];

    const not_c_or_d_or_e = _.intersection(
      [...sixers[0]],
      [...sixers[1]],
      [...sixers[2]]
    );
    const c_or_d_or_e = _.difference([...all], not_c_or_d_or_e);

    const d = _.intersection(c_or_d_or_e, b_or_d);

    assert(d.length === 1);

    const c = _.intersection(c_or_d_or_e, [...nums_by_len[2][0]]);

    assert(c.length === 1);

    const f = _.difference([...nums_by_len[2][0]], c);

    assert(f.length === 1);

    const e = _.difference(c_or_d_or_e, [d, c].flat());

    assert(e.length === 1);

    const a_or_d_or_g = _.intersection(
      [...nums_by_len[5][0]],
      [...nums_by_len[5][1]],
      [...nums_by_len[5][2]]
    );

    const g = _.difference(a_or_d_or_g, [a, d].flat());

    assert(g.length === 1);

    const b = _.difference([...all], [a, c, d, e, f, g].flat());

    assert(b.length === 1);

    const ends = line.split(" | ")[1].split(" ");

    const nums = {
      [[a, b, c, e, f, g].flat().sort().join("") as string]: 0,
      [[c, f].flat().sort().join("") as string]: 1,
      [[a, c, d, e, g].flat().sort().join("") as string]: 2,
      [[a, c, d, f, g].flat().sort().join("") as string]: 3,
      [[b, c, d, f].flat().sort().join("") as string]: 4,
      [[a, b, d, f, g].flat().sort().join("") as string]: 5,
      [[a, b, d, e, f, g].flat().sort().join("") as string]: 6,
      [[a, c, f].flat().sort().join("") as string]: 7,
      [[a, b, c, d, e, f, g].flat().sort().join("") as string]: 8,
      [[a, b, c, d, f, g].flat().sort().join("") as string]: 9,
    };

    const res =
      nums[[...ends[0]].sort().join("")] * 1000 +
      nums[[...ends[1]].sort().join("")] * 100 +
      nums[[...ends[2]].sort().join("")] * 10 +
      nums[[...ends[3]].sort().join("")];
    result += res;
  }

  return result;
}

export { part1, part2 };
