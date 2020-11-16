const fs = require("fs");
const stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
const csvBody = stdinBuffer.toString();

function parse(csvBody) {
  const lines = csvBody.split('\r\n');
  // const headers = lines[0].split(',');
  // console.log(headers);
  const data = lines.slice(1).map((line, i) => {
    const cells = line.split(',');
    const item = {
      id: cells[0],
      title: cells[1],
      name: cells[2],
      lastname: cells[3],
      team: cells[4],
      party: cells[5],
      con_1: cells[6],
      con_2: cells[7],
      con_3: cells[8],
      con_4: cells[9],
      con_5: cells[10],
      con_6: cells[11],
      con_7: cells[12],
    };
    return item;
  });

  return data;
}

const data = parse(csvBody);
console.log(JSON.stringify(data, null, 2));
