// import _ = require('lodash')

import { findIndex, snakeCase } from "lodash";
import { type } from "os";
import exp = require("constants");
import assert = require("assert");

type SnailNum = [SnailNum | number, SnailNum | number];

function magnitude(num: SnailNode) {
  let total = 0;
  if (typeof num.left === "number") {
    total += num.left * 3;
  } else {
    total += magnitude(num.left) * 3;
  }

  if (typeof num.right === "number") {
    total += num.right * 2;
  } else {
    total += magnitude(num.right) * 2;
  }

  return total;
}

function addNodes(n1: SnailNode, n2: SnailNode): SnailNode {
  return { left: n1, right: n2, parent: null };
}

function findExplodyNode(node: SnailNode, depth = 0): SnailNode | null {
  if (
    depth === 4 &&
    typeof node.left === "number" &&
    typeof node.right === "number"
  ) {
    return node;
  }

  if (typeof node.left !== "number") {
    return findExplodyNode(node.left, depth + 1);
  }

  if (typeof node.right !== "number") {
    return findExplodyNode(node.right, depth + 1);
  }

  return null;
}

function tryExploding(node: SnailNode): [boolean, SnailNode] {
  let explodynode = findExplodyNode(node);

  if (explodynode === null) {
    return [false, node];
  }

  const postarr = new Array<SnailNode>();
  function postorder(node: SnailNode) {
    if (typeof node.left !== "number") {
      postorder(node.left);
    }
    if (typeof node.right !== "number") {
      postorder(node.right);
    }
    postarr.push(node);
  }

  postorder(node);

  const index = postarr.indexOf(explodynode);
  const leftfriend = postarr[index - 1];
  if (leftfriend !== undefined) {
    postarr[index - 1] = {
      ...leftfriend,
      right: (leftfriend.right as number) + (explodynode.left as number),
    };
  }

  const rightfriend = postarr[index + 1];
  if (rightfriend !== undefined) {
    postarr[index + 1] = {
      ...rightfriend,
      left: (rightfriend.left as number) + (explodynode.right as number),
    };
  }

  if (explodynode.parent.left === explodynode) {
    explodynode.parent.left = 0;
  }
  if (explodynode.parent.right === explodynode) {
    explodynode.parent.right = 0;
  }

  return [true, node];
}

function trySplitting(node: SnailNode): [boolean, SnailNode] {
  return [true, node];
}

interface SnailNode {
  parent: SnailNode | null;
  left: SnailNode | number;
  right: SnailNode | number;
}

function parseSnailNode(num: SnailNum): SnailNode {
  const left = typeof num[0] === "number" ? num[0] : parseSnailNode(num[0]);
  const right = typeof num[1] === "number" ? num[1] : parseSnailNode(num[1]);

  const ret = {
    left,
    right,
    parent: null,
  };

  if (typeof left !== "number") {
    left.parent = ret;
  }

  if (typeof right !== "number") {
    right.parent = ret;
  }

  return ret;
}

function printSnailNode(node: SnailNode) {
  process.stdout.write("[");

  if (typeof node.left === "number") {
    process.stdout.write(node.left.toString());
  } else {
    printSnailNode(node.left);
  }

  process.stdout.write(",");

  if (typeof node.right === "number") {
    process.stdout.write(node.right.toString());
  } else {
    printSnailNode(node.right);
  }

  process.stdout.write("]");
}

function part1(lines: Array<string>) {
  const slines = ["[[[[[9,8],1],2],3],4]"];
  let nums = new Array<SnailNode>();
  for (let i = 0; i < slines.length; i++) {
    const line = slines[i];
    const num = JSON.parse(line);
    nums.push(parseSnailNode(num));
  }

  while (true) {
    const [exploded, newExplodedNum] = tryExploding(nums[0]);
    if (exploded) {
      nums[0] = newExplodedNum;
      continue;
    }

    // const [split, newSplitNum] = trySplitting(nums[0]);
    // if (split) {
    //   nums[0] = newSplitNum;
    //   continue;
    // }

    if (nums.length === 1) {
      break;
    }

    const n1 = nums.shift();
    const n2 = nums.shift();

    nums.unshift(addNodes(n1, n2));
  }

  printSnailNode(nums[0]);
  return magnitude(nums[0]);
}

function part2(lines: Array<string>) {}

export { part1, part2 };
