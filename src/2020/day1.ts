const print = (a: any) => {
  process.stdout.write(JSON.stringify(a) + "\n")
}

function part1 (input: Array<string>) {
  const inputInts = input.map(s => parseInt(s))

  for (const i of inputInts) {
    for (const j of inputInts) {
      if (i + j === 2020) {
        return i * j
      }
    }
  }

  return -1
}

function part2 (input: Array<string>) {
  const inputInts = input.map(s => parseInt(s))

  for (const i of inputInts) {
    for (const j of inputInts) {
        for (const k of inputInts) {
          if (i + j + k === 2020) {
            return i * j * k
          }
        }
    }
  }
}

export {
  part1,
  part2
}
