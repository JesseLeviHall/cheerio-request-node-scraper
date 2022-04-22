const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

const completeJSONdata = ["hello there"];

request(
  "https://albuquerque.craigslist.org/search/laf",
  function (error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const allRecords = $("p.row");

      allRecords.each(function (index, element) {
        if (index < 10) {
          const title = $(element).find("a.hdrlnk").text();
          const location = $(element).find("small").text();
          const link =
            "http://albuquerque.craigslist.org" +
            $(element).find("a.hdrlnk").attr("href");

          const tempData = {
            title: title,
            location: location,
            link: link,
          };

          completeJSONdata.push(tempData);
        } else {
          saveData();
          return false;
        }
      });
    }
  }
);

function saveData() {
  fs.writeFile("output.json", JSON.stringify(completeJSONdata), function (err) {
    console.log("successfully saved");
  });
}
