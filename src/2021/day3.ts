function part1(input: Array<string>) {
  let gresult = "";
  let eresult = "";

  for (let i = 0; i < 12; i++) {
    let zcount = 0;
    let ocount = 0;

    input.forEach((str) => {
      if (str[i] === "0") {
        zcount++;
      } else {
        ocount++;
      }
    });

    if (zcount > ocount) {
      gresult += "1";
      eresult += "0";
    } else {
      gresult += "0";
      eresult += "1";
    }
  }

  // console.log(`${parseInt(gresult, 2)}, ${parseInt(eresult, 2)}`);

  const g = parseInt(gresult, 2);
  const e = parseInt(eresult, 2);

  return g * e;
}

function part2(input: Array<string>) {
  let oresult = "";
  let cresult = "";

  let ofiltered = input;
  let cfiltered = input;

  for (let i = 0; i < 12; i++) {
    let zcount = 0;
    let ocount = 0;

    ofiltered.forEach((str) => {
      if (str[i] === "0") {
        zcount++;
      } else {
        ocount++;
      }
    });

    if (zcount > ocount) {
      oresult += "1";
    } else {
      oresult += "0";
    }

    ofiltered = ofiltered.filter((s) => s.startsWith(oresult));

    if (ofiltered.length === 1) {
      oresult = ofiltered[0];
      break;
    }
  }

  for (let i = 0; i < 12; i++) {
    let zcount = 0;
    let ocount = 0;

    cfiltered.forEach((str) => {
      if (str[i] === "0") {
        zcount++;
      } else {
        ocount++;
      }
    });

    if (zcount > ocount) {
      cresult += "0";
    } else {
      cresult += "1";
    }

    cfiltered = cfiltered.filter((s) => s.startsWith(cresult));

    if (cfiltered.length === 1) {
      cresult = cfiltered[0];
      console.log("Stopped after" + i);
      break;
    }
  }

  console.log(`${oresult}, ${cresult}`);

  const o = parseInt(oresult, 2);
  const c = parseInt(cresult, 2);

  return o * c;
}

export { part1, part2 };
