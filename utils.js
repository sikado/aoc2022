const { readFileSync } = require("fs");

function getData(fileName = "data.txt") {
    return Buffer.from(readFileSync(fileName)).toString().split("\n");
}

module.exports = getData;
