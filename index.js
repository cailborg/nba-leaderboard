const { teams } = require("./teams");
var fs = require("fs");
var json = JSON.parse(fs.readFileSync("./data.json", "utf8"));

// Store scores for each team here
const scores = [];

// Loop over each team and check whether a player in data.json matches and assign to that team
for (var team in teams) {
  let result = teams[team];
  let values = Object.values(result);
  let store = [];

  for (const val of values) {
    let match = json.filter(x => x.playerName === val);

    //Add up the points
    let playerValues = { ...match[0] };
    let sum =
      playerValues.points * 1 +
      playerValues.rebounds * 1.5 +
      playerValues.assists * 1.5 +
      playerValues.steals * 2 +
      playerValues.blocks * 2 -
      playerValues.turnovers * 2;

    function isNumber(val) {
      if (isNaN(val) === true) {
        return 0;
      } else {
        return val;
      }
    }
    let number = isNumber(sum);

    // Determine whether player is back or front court

    function courtFinder(position) {
      if (position === "SG" || position === "PG") {
        return "Back";
      } else {
        return "Front";
      }
    }
    let courtPosition = courtFinder(playerValues.position);

    // create the player array and push it into the team array

    let data = [
      playerValues.playerName,
      playerValues.position,
      courtPosition,
      number
    ];
    // console.log("data", data);

    store.push(data);
  }

  // console.log("store", store);

  //Sort the results by court position and score
  function cmp(x, y) {
    return x > y ? 1 : x < y ? -1 : 0;
  }

  store.sort(function(a, b) {
    return cmp(a[2], b[2]) || cmp(b[3], a[3]);
  });

  // Push results to the store
  scores.push(team, store);
}

// Do something with scores
console.log("scores", scores);
