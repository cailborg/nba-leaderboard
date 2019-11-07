const { teams } = require("./teams");
var fs = require("fs");
var json = JSON.parse(fs.readFileSync("./data.json", "utf8"));

// Store scores for each team here
const scores = [];

// Loop over each team and check whether a player in data.json matches and assign to that team
for (var team in teams) {
  let result = teams[team];
  let values = Object.values(result);
  let front = [];
  let back = [];

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

    function courtFinder(position, playerName) {
      if (playerName === "Jaylen Brown") {
        return "Front";
      } else if (playerName === "Justise Winslow") {
        return "Back";
      } else if (position === "SG" || position === "PG") {
        return "Back";
      } else {
        return "Front";
      }
    }
    let courtPosition = courtFinder(
      playerValues.position,
      playerValues.playerName
    );

    // create the player array and push it into the team array

    let data = [
      playerValues.playerName,
      playerValues.position,
      courtPosition,
      number
    ];

    if (data[2] === "Front") {
      front.push(data);
    } else {
      back.push(data);
    }
  }

  //Sort the results by court position and score

  front.sort((a, b) => b[3] - a[3]);
  back.sort((a, b) => b[3] - a[3]);

  console.log("sorted front " + team, front);
  console.log("sorted back " + team, back);

  // Slice off the top 3 front court and top 2 back court players
  let slicedFront = front.slice(0, 3);
  let slicedBack = back.slice(0, 2);

  // Add up the scores
  let sumFront = slicedFront.reduce(
    (accumulator, currentValue) => accumulator + currentValue[3],
    0
  );
  let sumBack = slicedBack.reduce(
    (accumulator, currentValue) => accumulator + currentValue[3],
    0
  );

  var teamPlayersFront = slicedFront.reduce(
    (accumulator, currentValue) => accumulator.concat(currentValue[0]),
    []
  );

  var teamPlayersBack = slicedBack.reduce(
    (accumulator, currentValue) => accumulator.concat(currentValue[0]),
    []
  );

  let total = sumBack + sumFront;

  // push results to the store
  scores.push([team, total, teamPlayersFront, teamPlayersBack]);
}

// Do something with scores
scores.sort((a, b) => b[1] - a[1]);
console.log("scores", scores);
