"use strict";

var repeat = require("lodash.repeat");
var fs = require("fs");
var p = require("path");

function read(path, makeEntry, depth) {
  var depth = depth || 0;
  var stat = fs.statSync(path);

  if (stat.isFile()) {
    return makeEntry(path, true, depth);
  } else if (stat.isDirectory()) {
    return fs.readdirSync(path).reduce(function(list, entry) {
      var absPath = p.join(path, entry)
      return list.concat(read(absPath, makeEntry, depth + 1));
    }, [makeEntry(path, false, depth)]);
  }
}

module.exports = {
  filters: {
    ls: function(relativeDir) {
      var baseDir = relativeDir[0] === "." ?
        p.dirname(this.ctx.file.path) :
        process.cwd();

      var absDir = p.join(baseDir, relativeDir);

      var makeEntry = function(path, isFile, depth) {
        return {
          path: path.replace(absDir, relativeDir),
          basename: p.basename(path, p.extname(path)),
          isFile: isFile,
          indent: repeat("  ", depth - 1)
        }
      };

      return read(absDir, makeEntry).slice(1);
    }
  }
};
