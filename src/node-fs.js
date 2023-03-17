"use strict";
const { query } = require("express");
const fs = require("fs");
const { Fuse } = require("fuse.js");
const DATA_FILE_NAME = "fulhaus-data.json";

function getData(data) {
  let allData = fs.readFileSync(DATA_FILE_NAME);
  allData = JSON.parse(allData);

  let searchString = data.query.search;
  let page = data.query.page;
  let limit = data.query.limit;
  var found = [];
  allData.forEach((i) => {
    if (
      i._id == searchString ||
      i.acronym == searchString ||
      i.definition == searchString
    ) {
      found.push(i);
    }
  });

  page = page || 1;
  limit = limit || 10;

  let total_pages = Math.ceil(allData.length / limit);
  return {
    page: page,
    limit: limit,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: allData.length,
    total_pages: total_pages,
    data: found,
  };
}
function writeToFile(data) {
  const toStore = JSON.stringify(data);
  fs.writeFile("./fulhaus-data.json", toStore, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
}
function addData(data) {
  const jsonString = JSON.stringify(data.body);
  fs.readFile(DATA_FILE_NAME, function (err, data) {
    var json = JSON.parse(data);
    json.push(JSON.parse(jsonString));
    writeToFile(json);
  });
}
function updateData(data) {
  let allData = [];
  let id = data.params.acronymID;
  let newacronym = data.body.acronym;
  fs.readFile(DATA_FILE_NAME, function (err, data) {
    allData = JSON.parse(data);
    for (let item of allData) {
      if (item._id == id) {
        item.acronym = newacronym;
      }
    }
    writeToFile(allData);
  });
}
function deleteData(data) {
  let allData = [];
  let id = data.params.acronymID;
  fs.readFile(DATA_FILE_NAME, function (err, data) {
    allData = JSON.parse(data);
    let dataWithoutAcronym = allData.filter((item) => item._id !== id);
    console.log(dataWithoutAcronym);
    writeToFile(dataWithoutAcronym);
  });
}

module.exports = {
  getData,
  addData,
  updateData,
  deleteData,
};
