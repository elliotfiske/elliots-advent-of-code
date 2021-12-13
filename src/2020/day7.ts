import _ = require("lodash");

interface TreeNode {
  name: string;
  contains: Record<string, { n: number; node: TreeNode }>;
}

function part1(lines: Array<string>) {
  // let result = 0;
  // let map: Record<string, TreeNode> = {};
  // map["shiny gold"] = { name: "shiny gold", containedBy: {} };
  //
  // for (let i = 0; i < lines.length; i++) {
  //   const line = lines[i];
  //   const spl = line.split(" ");
  //   const outer = `${spl[0]} ${spl[1]}`;
  //
  //   if (map[outer] === undefined) {
  //     map[outer] = { name: outer, containedBy: {} };
  //   }
  //
  //   const innerspl = spl.slice(5);
  //   const odds = innerspl.filter((_, ndx) => {
  //     return ndx % 4 === 0;
  //   });
  //   const evens = innerspl.filter((_, ndx) => {
  //     return ndx % 4 === 1;
  //   });
  //
  //   const inners = _.zip(odds, evens).map((zipped) => zipped.join(" "));
  //   for (let j = 0; j < inners.length; j++) {
  //     const inner = inners[j];
  //     if (map[inner] === undefined) {
  //       map[inner] = { name: inner, containedBy: {} };
  //     }
  //     map[inner].containedBy[outer] = map[outer];
  //   }
  // }
  //
  // const seenbaby = new Set<string>();
  //
  // function iterate(root: TreeNode, seen: Set<string>) {
  //   seen.add(root.name);
  //   Object.entries(root.containedBy).forEach(([key, val]) => {
  //     if (!seen.has(key)) {
  //       iterate(val, seen);
  //     }
  //   });
  // }
  //
  // iterate(map["shiny gold"], seenbaby);
  //
  // return seenbaby.size;
}

function part2(lines: Array<string>) {
  let map: Record<string, TreeNode> = {};
  map["shiny gold"] = { name: "shiny gold", contains: {} };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const spl = line.split(" ");
    const outer = `${spl[0]} ${spl[1]}`;

    if (map[outer] === undefined) {
      map[outer] = { name: outer, contains: {} };
    }

    const innerspl = spl.slice(4);
    const nums = innerspl.filter((_, ndx) => {
      return ndx % 4 === 0;
    });
    const odds = innerspl.filter((_, ndx) => {
      return ndx % 4 === 1;
    });
    const evens = innerspl.filter((_, ndx) => {
      return ndx % 4 === 2;
    });

    const inners = _.zip(nums, odds, evens)
      .map((zipped) => {
        return { n: parseInt(zipped[0]), name: zipped[1] + " " + zipped[2] };
      })
      .filter((bag) => bag.name !== "other bags.");

    for (let j = 0; j < inners.length; j++) {
      const inner = inners[j];
      if (map[inner.name] === undefined) {
        map[inner.name] = { name: inner.name, contains: {} };
      }
      map[outer].contains[inner.name] = { node: map[inner.name], n: inner.n };
    }
  }

  function iterate(root: { node: TreeNode; n: number }) {
    let r = 1;
    Object.entries(root.node.contains).forEach(([key, val]) => {
      r += val.n * iterate(val);
    });
    return r;
  }

  return iterate({ node: map["shiny gold"], n: 0 });
}

export { part1, part2 };
