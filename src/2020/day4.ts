const checkField = (key: string, value: string) => {
  switch (key) {
    case "byr":
      const match = value.match(/^\d{4}$/);
      console.log(match?.groups);

      return true;
  }
  return false;
};

const getRegexMatches = (regex: Regexp, input: string) => {
  const regex: RegExp = /([a-z]{3}):([^ ]+)/gm;
  let m: RegExpExecArray | null;
  const result: string[][] = [];

  while ((m = regex.exec(input.trim())) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
  }
};
function part1(input: Array<string>) {
  let passport: string = "";
  let valid = 0;

  for (const row of input) {
    if (row.length === 0) {
      const regex: RegExp = /([a-z]{3}):([^ ]+)/gm;
      let m: RegExpExecArray | null;

      let isValid = true;
      let seen: Record<string, boolean> = {};

      // console.log(`Testing ${passport}`);
      const matches = passport.matchAll(regex);

      while ((m = regex.exec(passport.trim())) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        seen[m[1]] = true;
      }

      for (const field of ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]) {
        if (!seen[field]) {
          isValid = false;
          // console.log("Missing " + field);
        } else {
          if (m === null) {
            console.log(passport);
          }
          checkField(field, m[2]);
        }
      }

      console.log(`done, ${isValid}`);

      if (isValid) {
        valid++;
      }

      passport = "";
    } else {
      passport += " " + row.trim();
    }
  }
  return valid + 1;
}

function part2(input: Array<string>) {}

export { part1, part2 };
