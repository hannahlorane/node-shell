var fs = require('fs');
var request = require('request');

module.exports.pwd = function (  file, done) {
  done(process.cwd());
};

module.exports.date = function (  file, done) {
  done((new Date()).toString());
};

module.exports.ls = function (  file, done) {
  fs.readdir('.', function(err, files) {
  if (err) throw err;
  var result;
  files.forEach(function(file) {
    result += file.toString() + "\n";
  })
 process.stdout.write(result);
 });
}
//does stdin matter?
module.exports.echo = function (  arr, done) {
  if (arr.length===1) {process.stdout.write("");} else {
  done(arr.slice(1).join(" "));}
}

module.exports.cat = function (  file, done) {
  file = stdin || file;
  var readBack = function (e, d) {
    if (e) throw e;
    done(d);
  }
  fs.readFile(file, readBack);
}

module.exports.head = function (  file, done) {
  var readBack = function (e, d) {
    if (e) throw e;
    var lines = d.toString().split("\n");
    done(lines.slice(0,10).join("\n"));
  }
  fs.readFile(file, readBack);
}

module.exports.tail = function (  file, done) {
  var readBack = function (e, d) {
    if (e) throw e;
    var lines = d.toString().split("\n");
    done(lines.slice(-10).join("\n"));
  }
  fs.readFile(file, readBack);
}

module.exports.sort = function (  file, done) {
  var readBack = function (e, d) {
    if (e) throw e;
    function lexSort(str1, str2){
      str1 = str1.replace(/\s*/,"").toLowerCase();
      str2 = str2.replace(/\s*/,"").toLowerCase();
      if (str1<str2) return -1;
      else return 1;
    }
    var lines = d.toString().split("\n").sort(lexSort);
    done(lines.join("\n"));
  }
  fs.readFile(file, readBack);
}

module.exports.lc = function (  file, done) {
  var readBack = function (e, d) {
    if (e) throw e;
    var lines = d.toString().split("\n");
    done("Number of Lines: " + lines.length);
  }
  fs.readFile(file, readBack);
}

module.exports.uniq = function (  file, done) {
  var readBack = function (e, d) {
    if (e) throw e;
    var lines = d.toString().split("\n");
    var unique = [];
    for (var i=0; i<lines.length; i++){
      if (lines[i]!==lines[i-1]) unique.push(lines[i]);
    }
    done(unique.join("\n"));
  }
  fs.readFile(file, readBack);
}

module.exports.curl = function (  url, done) {
  var callback = function (error, response, body) {
    if (error) throw error;
    done(body);
  }

  request(url, callback);
}
