import _ = require("lodash");

import assert = require("assert");
import { findIndex, lastIndexOf } from "lodash";

type Token = "[" | number | "]";

function tokenizeSnailnum(input: string) {
  let index = 0;
  const tokens: Token[] = [];
  while (index < input.length) {
    if (input[index] === "[") {
      tokens.push("[");
    } else if (input[index] === "]") {
      tokens.push("]");
    } else if (input[index] === ",") {
    } else {
      const num = parseInt(input.slice(index));
      tokens.push(num);
      if (num > 9) {
        index += Math.floor(Math.log10(num));
      }
    }
    index++;
  }
  return tokens;
}

function addSnailnums(a: Token[], b: Token[]): Token[] {
  return ["[", ...a, ...b, "]"];
}

function tryExploding(tokens: Token[]): boolean {
  let depth = 0;
  let will_explode = false;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === "[") {
      depth++;
      if (depth === 5) {
        will_explode = true;
      }
    } else if (token === "]") {
      depth--;
      if (will_explode) {
        const leftexplode = tokens[i - 2];
        const rightexplode = tokens[i - 1];
        if (typeof leftexplode !== "number") {
          throw new Error("My logic is flawed!!");
        }
        if (typeof rightexplode !== "number") {
          throw new Error("My logic is flawed!!!!! noooo!");
        }

        const left_beneficiary_index = _.findLastIndex(
          tokens.slice(0, i - 2),
          (t) => typeof t === "number"
        );

        const right_beneficiary_index = findIndex(
          tokens.slice(i),
          (t) => typeof t === "number"
        );

        if (left_beneficiary_index !== -1) {
          (tokens[left_beneficiary_index] as number) += leftexplode as number;
        }

        if (right_beneficiary_index !== -1) {
          (tokens[right_beneficiary_index + i] as number) +=
            rightexplode as number;
        }

        tokens.splice(i - 3, 4, 0);

        return true;
      }
    }
  }
  return false;
}

function trySplitting(tokens: Token[]) {
  const splitter = tokens.findIndex((t) => typeof t === "number" && t >= 10);

  if (splitter !== -1) {
    const num = tokens[splitter] as number;
    tokens.splice(
      splitter,
      1,
      "[",
      Math.floor(num / 2),
      Math.ceil(num / 2),
      "]"
    );
    return true;
  } else {
    return false;
  }
}

function magnitude(tokens: Token[]): number {
  outer: while (tokens.length > 1) {
    for (let i = 1; i < tokens.length; i++) {
      const token = tokens[i];
      const prevtoken = tokens[i - 1];

      if (typeof token === "number" && typeof prevtoken === "number") {
        tokens.splice(i - 2, 4, prevtoken * 3 + token * 2);
        continue outer;
      }
    }
  }

  assert(typeof tokens[0] === "number");
  return tokens[0] as number;
}

function choose(arr, k, prefix = []) {
  if (k == 0) return [prefix];
  return arr.flatMap((v, i) => choose(arr.slice(i + 1), k - 1, [...prefix, v]));
}

function part1(lines: Array<string>) {
  const slines = lines;

  let prevnum = tokenizeSnailnum(slines[0]);

  for (let i = 1; i < slines.length; i++) {
    const line = slines[i];
    let tokens = tokenizeSnailnum(line);

    tokens = addSnailnums(prevnum, tokens);

    while (true) {
      if (tryExploding(tokens)) {
        continue;
      }

      if (trySplitting(tokens)) {
        continue;
      }

      prevnum = tokens;
      break;
    }
  }

  console.log(prevnum.join(" "));
  return magnitude(prevnum);
}

function addSnailNumsAndReduce(a: Token[], b: Token[]): number {
  const added = addSnailnums(a, b);

  while (true) {
    if (tryExploding(added)) {
      continue;
    }

    if (trySplitting(added)) {
      continue;
    }
    break;
  }

  return magnitude(added);
}

function part2(lines: Array<string>) {
  let highest = 0;

  const choices = choose(_.range(0, lines.length), 2);

  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    let num1 = tokenizeSnailnum(lines[choice[0]]);
    let num2 = tokenizeSnailnum(lines[choice[1]]);

    let mag1 = addSnailNumsAndReduce(num1, num2);
    let mag2 = addSnailNumsAndReduce(num2, num1);

    highest = Math.max(mag1, mag2, highest);
  }

  return highest;
}

export { part1, part2 };
