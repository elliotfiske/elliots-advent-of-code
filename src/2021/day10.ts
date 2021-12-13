import _ = require("lodash");

function part2(lines: Array<string>) {
  let result = 0;

  let scores = new Array<number>();

  outer: for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const stack = new Array<string>();

    for (let j = 0; j < line.length; j++) {
      const c = [...line][j];
      if (c === "{") {
        stack.push(c);
      } else if (c === "(") {
        stack.push(c);
      } else if (c === "<") {
        stack.push(c);
      } else if (c === "[") {
        stack.push(c);
      } else if (c === "}") {
        if (stack.pop() !== "{") {
          result += 1197;
          continue outer;
        }
      } else if (c === ")") {
        if (stack.pop() !== "(") {
          result += 3;
          continue outer;
        }
      } else if (c === ">") {
        if (stack.pop() !== "<") {
          result += 25137;
          continue outer;
        }
      } else if (c === "]") {
        if (stack.pop() !== "[") {
          result += 57;
          continue outer;
        }
      }
    }

    const mapping = {
      "(": 1,
      "[": 2,
      "{": 3,
      "<": 4,
    };

    let score = 0;
    for (const string of _.reverse(stack)) {
      for (let j = 0; j < string.length; j++) {
        const char = string[j];

        score = score * 5 + mapping[char];
      }
    }
    scores.push(score);
  }

  const n = Math.floor(scores.length / 2);
  return scores.sort((a, b) => a - b)[n];
  // return result;
}

function part1(lines: Array<string>) {}

export { part1, part2 };
