import _ = require("lodash");
import { create } from "domain";

function part1(lines: Array<string>) {
  // let currv: [number, number] = [0, 0];
  // let tovisit = new Array<[number, number]>();
  // tovisit.push(currv);
  //
  // let visited = new Set<[number, number]>();
  //
  // const grid = lines.map((line) => [...line].map((s) => parseInt(s)));
  //
  // let dist = lines.map((line) => {
  //   return [...line].map((_) => {
  //     return Infinity;
  //   });
  // });
  //
  // dist[0][0] = 0;
  //
  // while (tovisit.length > 0) {
  //   tovisit.sort(([ax, ay], [bx, by]) => {
  //     return dist[ax][ay] - dist[bx][by];
  //   });
  //
  //   const v = tovisit.shift();
  //
  //   visited.add(v);
  //
  //   const rneighbor = _.zip([0, 0, 1, -1], [-1, 1, 0, 0]);
  //
  //   for (let i = 0; i < rneighbor.length; i++) {
  //     const neib = rneighbor[i];
  //     const nx = neib[0] + v[0];
  //     const ny = neib[1] + v[1];
  //
  //     if (visited.has([nx, ny])) {
  //       continue;
  //     }
  //
  //     const dsofar = dist[v[0]]?.[v[1]];
  //
  //     if (dsofar === undefined) {
  //       continue;
  //     }
  //
  //     if (grid[nx]?.[ny] === undefined) {
  //       continue;
  //     }
  //
  //     const newdist = dsofar + grid[nx][ny];
  //     if (newdist < dist[nx][ny]) {
  //       dist[nx][ny] = newdist;
  //       tovisit.push([nx, ny]);
  //     }
  //   }
  // }
  // dist.forEach((line) => {
  //   console.log(
  //     line
  //       .map((d) => {
  //         if (d === Infinity) {
  //           return "♾".padStart(5, " ");
  //         }
  //         return d.toString().padStart(5, " ");
  //       })
  //       .join("")
  //   );
  // });
  //
  // return dist[lines[0].length - 1][lines.length - 1];
}

function createAndFillTwoDArray({ rows, columns, defaultValue }) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => defaultValue)
  );
}

function part2(lines: Array<string>) {
  let currv: [number, number] = [0, 0];
  let tovisit = new Array<[number, number]>();
  tovisit.push(currv);

  let visited = new Set<[number, number]>();

  const pregrid = lines.map((line) => [...line].map((s) => parseInt(s)));

  const grid: number[][] = createAndFillTwoDArray({
    rows: lines.length * 5,
    columns: lines[0].length * 5,
    defaultValue: 0,
  });

  const rows = lines.length;
  const cols = lines[0].length;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      for (let py = 0; py < lines.length; py++) {
        for (let px = 0; px < lines[0].length; px++) {
          let newrisk = pregrid[px][py] + i + j;
          if (newrisk > 9) {
            newrisk -= 9;
          }
          grid[rows * i + px][cols * j + py] = newrisk;
        }
      }
    }
  }

  let dist = grid.map((line) => {
    return line.map((_) => {
      return Infinity;
    });
  });

  dist[0][0] = 0;

  while (tovisit.length > 0) {
    tovisit.sort(([ax, ay], [bx, by]) => {
      return dist[ax][ay] - dist[bx][by];
    });

    const v = tovisit.shift();

    visited.add(v);

    const rneighbor = _.zip([0, 0, 1, -1], [-1, 1, 0, 0]);

    for (let i = 0; i < rneighbor.length; i++) {
      const neib = rneighbor[i];
      const nx = neib[0] + v[0];
      const ny = neib[1] + v[1];

      if (visited.has([nx, ny])) {
        continue;
      }

      const dsofar = dist[v[0]]?.[v[1]];

      if (dsofar === undefined) {
        continue;
      }

      if (grid[nx]?.[ny] === undefined) {
        continue;
      }

      const newdist = dsofar + grid[nx][ny];
      if (newdist < dist[nx][ny]) {
        dist[nx][ny] = newdist;
        tovisit.push([nx, ny]);
      }
    }
  }

  dist.forEach((line) => {
    console.log(
      line
        .map((d) => {
          if (d === Infinity) {
            return "♾".padStart(5, " ");
          }
          return d.toString().padStart(5, " ");
        })
        .join("")
    );
  });

  return dist[rows * 5 - 1][cols * 5 - 1];
}

export { part1, part2 };

// const matrix = lines.map((line) => [...line].map((s) => parseInt(s)));
//
// const a = new AStarFinder({
//   grid: { matrix: matrix },
//   diagonalAllowed: false,
//   includeStartNode: false,
//   includeEndNode: true,
// });
//
// const path = a.findPath(
//   { x: 0, y: 0 },
//   { x: lines[0].length - 1, y: lines.length - 1 }
// );
// console.log(path);
