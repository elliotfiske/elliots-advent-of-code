import _ = require("lodash");
import { findIndex, zip } from "lodash";

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

interface Distance {
  scanner: number;
  point1ndx: number;
  point2ndx: number;
  distance: number;
}

function squared(i: number) {
  return i * i;
}

function evictLoners(fromClub: Distance[]) {
  const frequencies = fromClub.reduce((acc, curr) => {
    if (acc[curr.point1ndx] === undefined) {
      acc[curr.point1ndx] = 0;
    }

    if (acc[curr.point2ndx] === undefined) {
      acc[curr.point2ndx] = 0;
    }

    acc[curr.point1ndx]++;
    acc[curr.point2ndx]++;
    return acc;
  }, {} as Record<number, number>);

  const evictee = parseInt(
    Object.keys(frequencies).find((k) => frequencies[k] === 1)
  );

  if (isNaN(evictee)) {
    return;
  }

  const evicteeIndex = findIndex(fromClub, (dist) => {
    return dist.point1ndx === evictee || dist.point2ndx === evictee;
  });

  fromClub.splice(evicteeIndex, 1);
}

interface Node {
  scanner: number;
  pointNdx: number;
  neighbors: Node[];
}

// key is "node.scanner,node.pointNdx", value is that node
const nodemap = {} as Record<string, Node>;

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

  const distances: Distance[][] = [];
  for (let i = 0; i < scannerPoints.length; i++) {
    const points = scannerPoints[i];
    const distancesThisScanner = new Array<Distance>();

    for (let j = 0; j < points.length; j++) {
      for (let k = j + 1; k < points.length; k++) {
        const p1 = points[j];
        const p2 = points[k];

        const dist = Math.sqrt(
          squared(p1.x - p2.x) + squared(p1.y - p2.y) + squared(p1.z - p2.z)
        );
        distancesThisScanner.push({
          scanner: i,
          point1ndx: j,
          point2ndx: k,
          distance: dist,
        });
      }
    }

    distances.push(distancesThisScanner);
  }

  const set = new Set<number>();

  for (let i = 0; i < distances.length; i++) {
    const scannerI = distances[i];
    for (let j = i + 1; j < distances.length; j++) {
      const scannerJ = distances[j];

      const commonDistancesFromScannerI = scannerI.filter((d) =>
        scannerJ.some((other_d) => other_d.distance === d.distance)
      );

      const commonDistancesFromScannerJ = scannerJ.filter((d) =>
        scannerI.some((other_d) => other_d.distance === d.distance)
      );

      set.add(commonDistancesFromScannerI.length);

      if (commonDistancesFromScannerI.length > 11) {
        evictLoners(commonDistancesFromScannerI);
        evictLoners(commonDistancesFromScannerJ);

        commonDistancesFromScannerI.sort((a, b) => a.distance - b.distance);
        commonDistancesFromScannerJ.sort((a, b) => a.distance - b.distance);

        for (let k = 0; k < commonDistancesFromScannerI.length; k++) {
          const distI = commonDistancesFromScannerI[k];
          const distJ = commonDistancesFromScannerJ[k];

          const distINodeKey = `${distI.scanner},${distI.point1ndx}`;

          // if (nodemap)
        }

        console.log(commonDistancesFromScannerI);
      }
    }
  }
  return 0;
}

function part2(lines: Array<string>) {}

export { part1, part2 };

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
