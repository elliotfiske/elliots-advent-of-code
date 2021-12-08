import _ = require("lodash");

function part1(input: Array<string>) {
  const bingonums = input[0];

  let row = 0;
  const boards: number[][] = [];
  let board: number[] = [];

  input.slice(1).forEach((line) => {
    if (line.length === 0) return;

    let rownums =
      line.match(/^\d+|\d+\b|\d+(?=\w)/g)?.map(function (v) {
        return +v;
      }) ?? [];

    board = board.concat(rownums);

    if (row === 4) {
      boards.push(board);
      board = [];
      row = 0;
    } else {
      row++;
    }
  });

  // 0   1   2   3   4
  // 5   6   7   8   9
  // 10 11  12  13  14
  // 15 16  17  18  19
  // 20 21  22  23  24

  const winners = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    // [0, 6, 12, 18, 24],
    // [20, 16, 12, 8, 4],
  ];

  let fastestWinTurns = 999999;
  const boardScores: number[] = [];
  let fastestWinIndex = -1;

  let boardNdx = -1;
  brdloop: for (const board of boards) {
    boardNdx++;
    const matchedIndices: number[] = [];

    let numbersCalled = 0;
    for (const n of bingonums.split(",").map((s) => parseInt(s))) {
      const s = board.indexOf(n);

      if (s === -1) {
        numbersCalled++;
        continue;
      }

      matchedIndices.push(s);

      for (const w of winners) {
        if (_.intersection(w, matchedIndices).length === 5) {
          const score =
            _.difference(
              board,
              matchedIndices.map((idx) => board[idx])
            ).reduce((previousValue, currentValue) => {
              return previousValue + currentValue;
            }) * n;

          if (numbersCalled < fastestWinTurns) {
            fastestWinIndex = boardNdx;
            fastestWinTurns = numbersCalled;
            console.log("Woah! NEw record! board index " + boardNdx);

            console.log(
              "Fastest win: " +
                fastestWinIndex +
                " in " +
                fastestWinTurns +
                " with board " +
                board
            );
            console.log("Score " + JSON.stringify(score));
          }

          boardScores.push(score);

          continue brdloop;
        }
      }
      numbersCalled++;
    }
  }

  console.log(boardScores.length + " ??");

  return boardScores[fastestWinIndex] ?? -1;
}

function part2(input: Array<string>) {
  const bingonums = input[0];

  let row = 0;
  const boards: number[][] = [];
  let board: number[] = [];

  input.slice(1).forEach((line) => {
    if (line.length === 0) return;

    let rownums =
      line.match(/^\d+|\d+\b|\d+(?=\w)/g)?.map(function (v) {
        return +v;
      }) ?? [];

    board = board.concat(rownums);

    if (row === 4) {
      boards.push(board);
      board = [];
      row = 0;
    } else {
      row++;
    }
  });

  // 0   1   2   3   4
  // 5   6   7   8   9
  // 10 11  12  13  14
  // 15 16  17  18  19
  // 20 21  22  23  24

  const winners = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    // [0, 6, 12, 18, 24],
    // [20, 16, 12, 8, 4],
  ];

  let slowestWinTurns = 0;
  const boardScores: number[] = [];
  let slowestWinIndex = -1;

  let boardNdx = -1;
  brdloop: for (const board of boards) {
    boardNdx++;
    const matchedIndices: number[] = [];

    let numbersCalled = 0;
    for (const n of bingonums.split(",").map((s) => parseInt(s))) {
      const s = board.indexOf(n);

      // console.log(`Checked if ${n} is in ${board}: ${s}`);

      if (s === -1) {
        numbersCalled++;
        continue;
      }

      matchedIndices.push(s);

      // console.log(`${n} in ${JSON.stringify(boards[3])}`);

      for (const w of winners) {
        if (w.every((v) => matchedIndices.includes(v))) {
          const score =
            board
              .filter((_, ndx) => {
                return !matchedIndices.includes(ndx);
              })
              .reduce((previousValue, currentValue) => {
                return previousValue + currentValue;
              }, 0) * n;

          if (numbersCalled > slowestWinTurns) {
            slowestWinIndex = boardNdx;
            slowestWinTurns = numbersCalled;
            console.log("Woah! NEw record! board index " + boardNdx);

            console.log(
              "Fastest win: " +
                slowestWinIndex +
                " in " +
                slowestWinTurns +
                " with board " +
                board
            );
            console.log("Score " + JSON.stringify(score));
            const unmarked = board.filter((_, ndx) => {
              console.log(`checking if ${ndx} in ${matchedIndices}`);
              return !matchedIndices.includes(ndx);
            });

            console.log(unmarked);
          }

          boardScores.push(score);

          continue brdloop;
        }
      }
      numbersCalled++;
    }
  }

  console.log(boardScores.length + " ??");

  return boardScores[slowestWinIndex] ?? -1;
}

export { part1, part2 };
