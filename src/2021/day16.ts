import _ = require("lodash");

function hex2bin(hex) {
  return parseInt(hex, 16).toString(2).padStart(4, "0");
}

function parseLiteralPacket(bin: string): [string, number] {
  let newbin = bin;
  let totalnum = "";

  while (newbin[0] === "1") {
    totalnum += newbin.slice(1, 5);
    newbin = newbin.slice(5);
  }

  // one more for the 0-prefixed string
  totalnum += newbin.slice(1, 5);
  newbin = newbin.slice(5);

  return [newbin, parseInt(totalnum, 2)];
}

function parseOperatorPacket(bin: string, id: string): [string, number] {
  let newbin = bin;
  let versiontotal = 0;

  const lengthtype = bin[0];

  const kids: number[] = [];

  if (lengthtype === "0") {
    const subpacketlength = parseInt(bin.slice(1, 1 + 15), 2);
    newbin = bin.slice(1 + 15);
    const firstnewbin = newbin.length;
    while (firstnewbin - newbin.length < subpacketlength) {
      const [nextbin, kid] = parsePacket(newbin);
      newbin = nextbin;
      kids.push(kid);
    }
  } else if (lengthtype === "1") {
    const howmanysubs = parseInt(bin.slice(1, 11 + 1), 2);
    newbin = bin.slice(1 + 11);
    for (let i = 0; i < howmanysubs; i++) {
      const [nextybin, kid] = parsePacket(newbin);
      newbin = nextybin;
      kids.push(kid);
    }
  }

  let coolertotal = 0;

  const numid = parseInt(id, 2);

  if (numid === 0) {
    coolertotal = [...kids, 0].reduce(_.add);
  } else if (numid === 1) {
    coolertotal = [...kids, 1].reduce(_.multiply);
  } else if (numid === 2) {
    coolertotal = _.min(kids);
  } else if (numid === 3) {
    coolertotal = _.max(kids);
  } else if (numid === 5) {
    coolertotal = kids[0] > kids[1] ? 1 : 0;
  } else if (numid === 6) {
    coolertotal = kids[0] < kids[1] ? 1 : 0;
  } else if (numid === 7) {
    coolertotal = kids[0] === kids[1] ? 1 : 0;
  }

  return [newbin, coolertotal];
}

function parsePacket(bin: string): [string, number] {
  // const version = parseInt(bin.slice(0, 3), 2);
  const id = bin.slice(3, 6);

  let total = 0;
  let cooltotal = 0;
  let newbin = "";

  if (id === "100") {
    const [nextbin, num] = parseLiteralPacket(bin.slice(6));
    newbin = nextbin;
    cooltotal = num;
  } else {
    const [nextbin, num] = parseOperatorPacket(bin.slice(6), id);
    newbin = nextbin;

    cooltotal += num;
  }

  return [newbin, cooltotal];
}

function part2(lines: Array<string>) {
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

function part1(lines: Array<string>) {}

export { part1, part2 };
