const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //   fs.readFile("./text/huge.txt", (err, data) => {
  //     if (err) console.error(err);
  //     res.end(data);
  //   });

  //   const readable = fs.createReadStream("./text/hussge.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });

  //   readable.on("end", () => {
  //     res.end();
  //   });

  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("not found");
  //   });

  const readable = fs.createReadStream("./text/huge.txt");
  readable.pipe(res);
});

server.listen(3002, "localhost", () => {
  console.log("server is listening");
});
