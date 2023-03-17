"use strict";
const httpHandler = require("./src/httpHandler");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.static("./Public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/acronym", httpHandler.allAcronyms);
app.post("/acronym", httpHandler.addAcronyms);
app.patch("/acronym/:acronymID", httpHandler.updateAcronyms);
app.delete("/acronym/:acronymID", httpHandler.deleteAcronyms);

app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:%s", PORT);
});
