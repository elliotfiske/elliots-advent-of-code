// import _ = require('lodash')

import assert = require("assert");

function hex2bin(hex) {
  return parseInt(hex, 16).toString(2).padStart(4, "0");
}

enum State {
  NextPacket,
  LiteralPacket,
  OperatorPacket,
}

function parseLiteralPacket(bin: string): [string, number] {
  let newbin = bin;
  let totalnum = "";
  let bitsread = 6;

  while (newbin[0] === "1") {
    totalnum += newbin.slice(1, 5);
    newbin = newbin.slice(5);
    bitsread += 5;
  }

  // one more for the 0-prefixed string
  totalnum += newbin.slice(1, 5);
  newbin = newbin.slice(5);
  bitsread += 5;

  // const bitstodiscard = 4 - (bitsread % 4);
  const bitstodiscard = 0;

  return [newbin.slice(bitstodiscard), parseInt(totalnum, 2)];
}

function parseOperatorPacket(bin: string): [string, number] {
  let newbin = bin;
  let versiontotal = 0;

  const lengthtype = bin[0];

  if (lengthtype === "0") {
    const subpacketlength = parseInt(bin.slice(1, 1 + 15), 2);
    newbin = bin.slice(1 + 15);
    const firstnewbin = newbin.length;
    while (firstnewbin - newbin.length < subpacketlength) {
      const [nextbin, versions] = parsePacket(newbin);
      newbin = nextbin;
      versiontotal += versions;
    }
    // assert(newbin === bin.slice(22));
  } else if (lengthtype === "1") {
    const howmanysubs = parseInt(bin.slice(1, 11 + 1), 2);
    newbin = bin.slice(1 + 11);
    for (let i = 0; i < howmanysubs; i++) {
      const [nextybin, versions] = parsePacket(newbin);
      newbin = nextybin;
      versiontotal += versions;
    }
  }

  return [newbin, versiontotal];
}

function parsePacket(bin: string): [string, number] {
  const version = parseInt(bin.slice(0, 3), 2);
  const id = bin.slice(3, 6);
  let total = version;
  let newbin = "";

  if (id === "100") {
    const [nextbin, _] = parseLiteralPacket(bin.slice(6));
    newbin = nextbin;

    // total += versions;
  } else {
    const [nextbin, versions] = parseOperatorPacket(bin.slice(6));
    newbin = nextbin;

    total += versions;
  }
  return [newbin, total];
}

function part1(lines: Array<string>) {
  const input = lines[0];
  let bin = "";
  for (let i = 0; i < input.length; i++) {
    bin += hex2bin(input[i]);
  }

  let versionTotal = 0;

  while (bin.includes("1")) {
    const [newbin, versions] = parsePacket(bin);
    bin = newbin;
    versionTotal += versions;
  }
  return versionTotal;
}

function part2(lines: Array<string>) {}

export { part1, part2 };
