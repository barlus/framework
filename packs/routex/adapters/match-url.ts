import { Pattern } from '@barlus/runtime/pattern';

import { StringMap } from '../router-store';

interface PatternInfo {
    regExp: RegExp;
    keys: Pattern<any>['keys'];
}

interface PatternInfoCache {
    [pattern: string]: PatternInfo;
}

const patternInfoCache: PatternInfoCache = {};

const getPatternInfo = (pattern: string): PatternInfo => {
    const patternInfo = patternInfoCache[pattern];
    if (patternInfo) {
        return patternInfo;
    }


    const regExp = Pattern.regexp(pattern,{});
    const keys = regExp.keys;
    const newPatternInfo = { regExp, keys };
    patternInfoCache[pattern] = newPatternInfo;

    return newPatternInfo;
};

/**
 * Matches a URL to a pattern.
 * For example,
 *     matchUrl('/departments/electronics', '/departments/:id'
 *     => { id: 'electronics' }
 */
export const matchUrl = (url: string, pattern: string) => {
    const { regExp, keys } = getPatternInfo(pattern);
    const match = regExp.exec(url);
    if (!match) {
        return undefined;
    }

    // tslint:disable-next-line:no-unused-variable
    const [matchedUrl, ...values] = match;

    return keys.reduce((params: StringMap, key, index) => {
        params[key.name] = values[index];
        return params;
    }, {});
};
