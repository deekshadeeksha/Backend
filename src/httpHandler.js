const nodeFs = require("./node-fs");

function allAcronyms(request, response) {
  let acronymData = nodeFs.getData(request);
  response.send(acronymData);
}
function addAcronyms(request, response) {
  let acronymData = nodeFs.addData(request);
  response.send("Successfully Added");
}
function updateAcronyms(request, response) {
  let acronymID = request.params.acronymID;
  let acronymData = nodeFs.updateData(request);
  response.send("Updated Data");
}
function deleteAcronyms(request, response) {
  let acronymData = nodeFs.deleteData(request);
  response.send(acronymData);
}

module.exports = {
  allAcronyms,
  addAcronyms,
  updateAcronyms,
  deleteAcronyms,
};
