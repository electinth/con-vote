const fs = require("fs");
const stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
const csvBody = stdinBuffer.toString();

const isCompare = process.argv[2]
const compareJsonPath = process.argv[3]

function loadCompareJson() {
  if (isCompare && compareJsonPath) {
    try {
      const compareData = fs.readFileSync(compareJsonPath, { encoding: 'utf8' })
      return JSON.parse(compareData)
    } catch (err) {
      // no-op when error read file
    }
  }
  return null
}

function find(list, key, value) {
  if (!list || !key) return false
  for (const i in list) {
    if (list[i][key] === value) return list[i]
  }
  return null
}

function parse(csvBody) {
  const compare = loadCompareJson()
  const lines = csvBody.split('\r\n');
  const con_list = ['con_1', 'con_2', 'con_3', 'con_4', 'con_5', 'con_6', 'con_7']
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
    // compare to previous item
    // to add con_*_updated_at prop
    const prevItem = find(compare, 'id', item.id)
    const now = new Date().toISOString()
    con_list.forEach(key => {
      const updatedKey = `${key}_updated_at`
      // Set update time when created
      if (item[key] && (!prevItem || !prevItem[key])) {
        item[updatedKey] = now
      // Copy from previous item if value changes
      } else if (item[key] && prevItem && item[key] === prevItem[key] && prevItem[updatedKey]) {
        item[updatedKey] = prevItem[updatedKey]
      // Set update time if value changes
      } else if (item[key] && prevItem && item[key] !== prevItem[key]) {
        item[updatedKey] = now
      }
    })

    return item;
  });

  return data;
}

const data = parse(csvBody);
console.log(JSON.stringify(data, null, 2));
