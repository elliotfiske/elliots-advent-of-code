export function consumeUntil(
  input: string,
  pattern: string | RegExp,
  howMany: number = 1
): string[] {
  const sp = input.split(pattern);

  return sp.slice(0, howMany);
}

interface Words {
  type: "words";
  howMany: number;
}

interface Numbers {
  type: "number";
  howMany: number;
}

type ChunkTypes = Words | Numbers;

export function parseIt(input: string, whatToParse: ChunkTypes[]) {
  let currString = input;
  let result = new Array<string | number>();

  for (let i = 0; i < whatToParse.length; i++) {
    const parseTarget = whatToParse[i];
    switch (parseTarget.type) {
      case "words":
        const words = currString.split(" ");
        result = result.concat(words.slice(0, parseTarget.howMany + 1));

        break;
      case "number":
        break;
    }
  }
}
