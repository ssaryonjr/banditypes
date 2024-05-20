# Validating outside Data with Banditypes


Banditypes is a tiny schema validation library for TypeScript and JavaScript, designed to be extremely small, with a core size of around 400 bytes. Its primary focus is to provide a lightweight, efficient tool for validating and converting data structures while minimizing bundle size. For more in depth info on banditypes click [here](https://github.com/thoughtspile/banditypes).

### How to validate schema's

- _No_ detailed errors with messages and paths, just a throw in a predictable location.
- _No_ built-in refinements (empty, integer, etc.).
- Compiled to ES2017: uses ...spreads and arrows. Can be transpiled further down.
- Validation and conversion are mangled, so you have to use the returned object. "Pure validation" is impossible.
- Some syntax might be a bit odd.

> Small size is the primary focus of banditypes. It's the smallest validation library, AFAIK, and I'll do my best to keep the core under 400 bytes (unless some critical bugs need fixing, in which case it might go slightly above that).

This is not a library for everybody, but it gets the job done, and it's small. Here's a usage example:

```ts
import {
  assert,
  object,
  number,
  string,
  array,
  optional,
  fail,
  Infer,
} from "banditypes";

const parseGunslinger = object({
  name: string(),
  kills: number(),
  guns: array(string()),
  born: object({
    state: string().or(optional()),
    year: number().map((n) => (Number.isInteger(n) ? n : fail())),
  }),
});

// Explicit inference
type Gunslinger = Infer<typeof parseGunslinger>;

const raw = JSON.parse(`{
  "name": "Dirty Bobby",
  "kills": 17,
  "guns": ["Colt 45"],
  "born": {
    "state": "Idaho",
    "year": 1872
  }
}`);
try {
  const data = parseGunslinger(raw);
  // fully type-safe access
  console.log(`${data.name} from ${data.born.state} is out to kill ya`);
} catch (err) {
  console.log("invalid JSON");
}
```



