const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

////////////////////////////////////////////////

// const textValue = fs.readFileSync("./text/input.txt", "utf-8");
// const addedText = `${textValue}. \nHush hush and start right now at ${Date.now()}`;
// fs.writeFileSync("./text/output.txt", addedText);
// console.log(fs.readFileSync("./text/output.txt", "utf-8"));

// fs.readFile("./text/start.txt", "utf-8", (error, data) => {
//   console.log(data);
// });
// console.log("Im next");

////////////////////////////////////////////////

const data = fs.readFileSync(`${__dirname}/test-data.json`, "utf-8");

const products = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempProducts = fs.readFileSync(
  `${__dirname}/templates/products.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");

const slugs = products.map((product) => {
  return slugify(product.productName, { lower: true });
});
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //   overview
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const productCards = products
      .map((product) => {
        return replaceTemplate(tempCard, product);
      })
      .join("");

    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/, productCards);

    res.end(output);

    // product
  } else if (pathname === "/product") {
    const product = products[query.id];

    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const output = replaceTemplate(tempProducts, product);
    res.end(output);

    //api
  } else if (pathname === "/api") {
    fs.readFile(`${__dirname}/test-data.json`, "utf-8", (err, data) => {
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      res.end(data);
    });

    // 404
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Hola from server</h1>");
  }
});

server.listen(3000, "localhost", () => {
  console.log("listening to 3000");
});
