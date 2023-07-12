const { Parser } = require("json2csv");
const fs = require("fs");

module.exports = ({ data, title }, app, callback) => {
  const fields = ["userId", "event", "country", "page", "isMobile", "browserInfo", "data"];
  const opts = { fields };

  const parser = new Parser(opts);
  const csv = parser.parse(data);

  const filePath = `${app.getPath("desktop")}/${title}.csv`;

  fs.writeFile(filePath, csv, () => callback(filePath));
};
