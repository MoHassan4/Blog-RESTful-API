const http = require("http");
const app = require("./app");
const { port } = require("./config/keys");

//create server
http.createServer(app);

//server listen
app.listen(port, () => {
  console.log(`Server Running Now On Port Number ${port}`);
});
