import {compile} from "@barlus/runtime/pattern";


const patternCache = {};
const cacheLimit = 10000;
let cacheCount = 0;

const compileGenerator = pattern => {
  const cacheKey = pattern;
  const cache = patternCache[ cacheKey ] || (patternCache[ cacheKey ] = {});

  if (cache[ pattern ]) {
    return cache[ pattern ];
  }

  const compiledGenerator = compile(pattern);

  if (cacheCount < cacheLimit) {
    cache[ pattern ] = compiledGenerator;
    cacheCount++;
  }

  return compiledGenerator;
};

/**
 * Public API for generating a URL pathname from a pattern and parameters.
 */
export const generatePath = (pattern = "/", params = {}) => {
  if (pattern === "/") {
    return pattern;
  }
  const generator = compileGenerator(pattern);
  return generator(params, { pretty: true });
};

