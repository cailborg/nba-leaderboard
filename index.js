const { teams } = require("./teams");
// var data = require("./data.json");
var fs = require("fs");

var json = JSON.parse(fs.readFileSync("./data.json", "utf8"));
// console.log("json", json);
// Store scores for each team here
const scores = {};

// Loop over each team and check whether a player in data.json matches and assign to that team
for (var team in teams) {
  let result = teams[team];
  let values = Object.values(result);
  let store = { teamName: team, players: {} };
  var i = 0;
  for (const val of values) {
    i++;
    let match = json.filter(x => x.playerName === val);

    //Add up the points
    let sum = match[0];
    console.log("points", sum);

    //Assign the matching result to the team object
    Object.assign(store.players, { [i]: match });
  }
  // console.log(store.teamName, store.players);

  //Assign the team + players to the scores object
  let test = { [store.teamName]: store.players };
  Object.assign(scores, test);
}

// Do something with scores
// console.log("scores", scores);
