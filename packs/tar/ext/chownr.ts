import {lstatSync,readdirSync,chownSync} from "@barlus/node/fs";
import {resolve} from "@barlus/node/path";

export function chownrSync (p, uid, gid) {
  var children;
  try {
    children = readdirSync(p);
  } catch (er) {
    if (er && er.code === "ENOTDIR") return chownSync(p, uid, gid);
    throw er
  }
  if (!children.length) return chownSync(p, uid, gid);

  children.forEach(function (child) {
    var pathChild = resolve(p, child);
    var stats = lstatSync(pathChild);
    if (!stats.isSymbolicLink())
      chownrSync(pathChild, uid, gid)
  });
  return chownSync(p, uid, gid)
}
