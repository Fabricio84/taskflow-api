// src/server.js
import "dotenv/config";
import app from "./app.js";

app.listen(3000, () => {
  console.log("Server TaskFlow-api running");
});
