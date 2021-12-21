---
id: gr84q
name: Day 1 time
file_version: 1.0.2
app_version: 0.6.9-2
file_blobs:
  src/2021/day12.ts: 23169395b337e1fac5bb60aefc7ce2a7dd1212ea
---

[https://adventofcode.com/2021/day/12](https://adventofcode.com/2021/day/12)

# Part 1

Day 12 of Advent of Code is another Graph problem.

Given a map of connected caves like:

<br/>

<div align="center"><img src="https://firebasestorage.googleapis.com/v0/b/swimmio-content/o/repositories%2FZ2l0aHViJTNBJTNBZWxsaW90cy1hZHZlbnQtb2YtY29kZSUzQSUzQWVsbGlvdGZpc2tl%2F4a9e72c1-fa20-456d-a752-c69dad693e66.png?alt=media&token=814361fb-e71f-481d-a6bb-5e6d5ad85c5d" style="width:'50%'"/></div>

<br/>

Find the number of paths from Start -> end.

CAPITAL caves can be visited any number of times on your journey.

lowercase caves can only be visited once.

For the minimal example above, the viable paths are:

Start -> a -> B -> end

Start -> a -> B -> b -> c -> end

Start -> A -> b -> B -> end

Start -> A -> b -> c -> end

I didn't do a good job with the example because none of the BIG caves are visited more than once. Oh well.

<br/>

To store the a `nodeMap` of `MapNode`s

Key is the name of the `MapNode`, value is that `MapNode`.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/2021/day12.ts
```typescript
⬜ 1      import _ = require("lodash");
⬜ 2      
🟩 3      interface MapNode {
🟩 4        neighbors: MapNode[];
🟩 5        name: string;
🟩 6      }
🟩 7      
🟩 8      const nodeMap: Record<string, MapNode> = {};
⬜ 9      
⬜ 10     function numPaths(
⬜ 11       seenSmallCaves: Record<string, number>,
```

<br/>

I used a recursive algorithm to calculate the number of paths.

<br/>

Iterate through my `neighbors`, ignoring small caves that have already been visited.  
  
Add up all the viable paths to the end that they have.

Base case is when we find the `end` and can just return 1.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/2021/day12.ts
```typescript
⬜ 33         }
⬜ 34       }
⬜ 35     
🟩 36       let result = 0;
🟩 37       for (let ndx = 0; ndx < root.neighbors.length; ndx++) {
🟩 38         const n = root.neighbors[ndx];
🟩 39         if (
🟩 40           (seenSmallCaves[n.name] === undefined || seenSmallCaves[n.name] === 1) &&
🟩 41           n.name !== "start"
🟩 42         ) {
🟩 43           result += numPaths(
🟩 44             _.clone(seenSmallCaves),
🟩 45             n,
🟩 46             path + " " + root.name,
🟩 47             depth + 1
🟩 48           );
🟩 49         }
🟩 50       }
⬜ 51     
⬜ 52       return result;
⬜ 53     }
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBZWxsaW90cy1hZHZlbnQtb2YtY29kZSUzQSUzQWVsbGlvdGZpc2tl/docs/gr84q).