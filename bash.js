var commands = require("./commands.js");

var done = function (output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var imp = data.toString().trim().split(/\s*\|\s*/g); // remove the newline
  var cmd = imp[1] || imp[0].split(" ");
  if (imp.length==2) var stdin = imp[0];

  switch (cmd[0]) {
    case "date":
      commands.date(  cmd, done);
      break;
    case "pwd":
      commands.pwd(  cmd, done);
      break;
    case "ls":
      commands.ls(  cmd, done);
      break;
    case "echo":
      commands.echo(  cmd, done);
      break;
    case "cat":
      commands.cat(  cmd[1], done);
      break;
    case "head":
      commands.head(  cmd[1], done);
      break;
    case "tail":
      commands.tail(  cmd[1], done);
      break;
    case "sort":
      commands.sort(  cmd[1], done);
      break;
    case "lc":
      commands.lc(  cmd[1], done);
      break;
    case "uniq":
      commands.uniq(  cmd[1], done);
      break;
    case "curl":
      commands.curl(  cmd[1], done);
  }

//  process.stdout.write('\nprompt > ');
});
