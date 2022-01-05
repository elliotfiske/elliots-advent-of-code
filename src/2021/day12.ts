import _ = require("lodash");

interface MapNode {
  neighbors: MapNode[];
  name: string;
}

const nodeMap: Record<string, MapNode> = {};

function numPaths(
  seenSmallCaves: Record<string, number>,
  root: MapNode,
  path = "",
  depth = 0
) {
  if (depth > 200) {
    console.log(`stopped didn't count path: ${path}`);
    return 0;
  }

  if (root.name === "end") {
    return 1;
  }

  if (root.name.toLowerCase() === root.name) {
    if (seenSmallCaves[root.name] === undefined) {
      seenSmallCaves[root.name] = 1;
    } else if (seenSmallCaves[root.name] === 1) {
      if (Object.values(seenSmallCaves).includes(2)) {
        return 0;
      }
      seenSmallCaves[root.name] = 2;
    }
  }

  let result = 0;

  for (let ndx = 0; ndx < root.neighbors.length; ndx++) {
    const n = root.neighbors[ndx];
    if (
      (seenSmallCaves[n.name] === undefined || seenSmallCaves[n.name] === 1) &&
      n.name !== "start"
    ) {
      result += numPaths(
        _.clone(seenSmallCaves),
        n,
        path + " " + root.name,
        depth + 1
      );
    }
  }

  return result;
}

function part1(lines: Array<string>) {
  for (let i = 0; i < lines.length; i++) {
    const [start, end] = lines[i].split("-");

    if (nodeMap[start] === undefined) {
      nodeMap[start] = { name: start, neighbors: [] };
    }
    if (nodeMap[end] === undefined) {
      nodeMap[end] = { name: end, neighbors: [] };
    }

    nodeMap[start].neighbors.push(nodeMap[end]);
    nodeMap[end].neighbors.push(nodeMap[start]);
  }

  return numPaths({}, nodeMap["start"]);
}

function part2(lines: Array<string>) {}

export { part1 as part2, part2 as part1 };
