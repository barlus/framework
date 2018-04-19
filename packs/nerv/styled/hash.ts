export function hashed(str:string, seed?:number) {
    let m = 0x5bd1e995;
    let r = 24;
    let h = seed ^ str.length;
    let length = str.length;
    let currentIndex = 0;
    while (length >= 4) {
        let k = uInt32(str, currentIndex);

        k = uMul32(k, m);
        k ^= k >>> r;
        k = uMul32(k, m);

        h = uMul32(h, m);
        h ^= k;

        currentIndex += 4;
        length -= 4;
    }
    switch (length) {
        case 3:
            h ^= uInt16(str, currentIndex);
            h ^= str.charCodeAt(currentIndex + 2) << 16;
            h = uMul32(h, m);
            break;

        case 2:
            h ^= uInt16(str, currentIndex);
            h = uMul32(h, m);
            break;

        case 1:
            h ^= str.charCodeAt(currentIndex);
            h = uMul32(h, m);
            break
    }

    h ^= h >>> 13;
    h = uMul32(h, m);
    h ^= h >>> 15;

    return h >>> 0;
}
function uInt32(str, pos) {
    return (str.charCodeAt(pos++)) +
        (str.charCodeAt(pos++) << 8) +
        (str.charCodeAt(pos++) << 16) +
        (str.charCodeAt(pos) << 24);
}
function uInt16(str, pos) {
    return (str.charCodeAt(pos++)) +
        (str.charCodeAt(pos++) << 8);
}
function uMul32(n, m) {
    n = n | 0;
    m = m | 0;
    let nlo = n & 0xffff;
    let nhi = n >>> 16;
    let res = ((nlo * m) + (((nhi * m) & 0xffff) << 16)) | 0;
    return res;
}