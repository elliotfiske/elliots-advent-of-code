import _ = require("lodash");

interface Point {
  x: number;
  y: number;
  z: number;
}

function intersect(a: Point[], b: Point[]) {
  const aset = new Set<Point>(a);
  const bset = new Set<Point>(b);

  let result = 0;
  for (let i = 0; i < aset.size; i++) {
    const a = aset[i];
    if (bset.has(a)) {
      result++;
    }
  }
  return result;
}

function part1(lines: Array<string>) {
  const scannerPoints: Point[][] = [];
  let scanner = 0;

  const allPoints = new Set<Point>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length === 0) continue;
    if (line.includes("scanner")) {
      scanner = parseInt(line.slice(12));
    } else {
      if (scannerPoints[scanner] === undefined) {
        scannerPoints[scanner] = [];
      }
      const [x, y, z] = line.split(",");
      const p = {
        x: parseInt(x),
        y: parseInt(y),
        z: parseInt(z),
      };
      scannerPoints[scanner].push(p);
      allPoints.add(p);
    }
  }
  const zeropoints = scannerPoints[0];

  const transformations: ((p: Point) => [number, number, number])[] = [
    (p: Point) => {
      return [p.x, p.y, p.z];
    },
    (p: Point) => {
      return [p.x, p.z, -p.y];
    },
    (p: Point) => {
      return [p.x, -p.y, -p.z];
    },
    (p: Point) => {
      return [p.x, -p.z, p.y];
    },
    (p: Point) => {
      return [-p.x, p.z, p.y];
    },
    (p: Point) => {
      return [-p.x, p.y, -p.z];
    },
    (p: Point) => {
      return [-p.x, -p.z, -p.y];
    },
    (p: Point) => {
      return [-p.x, -p.y, p.z];
    },
    (p: Point) => {
      return [p.y, -p.x, p.z];
    },
    (p: Point) => {
      return [p.y, -p.z, -p.x];
    },
    (p: Point) => {
      return [p.y, p.x, -p.z];
    },
    (p: Point) => {
      return [p.y, p.z, p.x];
    },
    (p: Point) => {
      return [-p.y, -p.z, p.x];
    },
    (p: Point) => {
      return [-p.y, -p.x, -p.z];
    },
    (p: Point) => {
      return [-p.y, p.z, -p.x];
    },
    (p: Point) => {
      return [-p.y, p.x, p.z];
    },
    (p: Point) => {
      return [p.z, p.y, -p.x];
    },
    (p: Point) => {
      return [p.z, -p.x, -p.y];
    },
    (p: Point) => {
      return [p.z, -p.y, p.x];
    },
    (p: Point) => {
      return [p.z, p.x, p.y];
    },
    (p: Point) => {
      return [-p.z, p.x, -p.y];
    },
    (p: Point) => {
      return [-p.z, -p.y, -p.x];
    },
    (p: Point) => {
      return [-p.z, -p.x, p.y];
    },
    (p: Point) => {
      return [-p.z, p.y, p.x];
    },
  ];

  let best = 0;

  const RANGE = 1000;

  for (let i = 0; i < transformations.length; i++) {
    const t = transformations[i];

    for (let x = -RANGE; x < RANGE; x++) {
      console.log("x: " + x);
      for (let y = -RANGE; y < RANGE; y++) {
        zman: for (let z = -RANGE; z < RANGE; z++) {
          const newpoints = new Array<Point>();
          for (let j = 0; j < zeropoints.length; j++) {
            const p = zeropoints[j];

            const [tx, ty, tz] = t(p);
            const tp = { x: tx + x, y: ty + y, z: tz + z };
            if (!allPoints.has(tp)) continue zman;
            newpoints.push(p);
          }

          for (let j = 1; j < scannerPoints.length; j++) {
            const scannerPointList = scannerPoints[j];
            const sect = intersect(newpoints, scannerPointList);
            best = Math.max(sect, best);
            if (best > 11) {
              console.log("AHHH");
            }
          }
        }
      }
    }
  }
}

function part2(lines: Array<string>) {}

export { part1, part2 };
