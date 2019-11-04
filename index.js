const { teams } = require("./teams");
var data = require("./data.json");

console.log("hello");

// function sort() {
//   let value = data.filter(
//     x =>
//       (x.playerName === teams.moir.player1) |
//       (x.playerName === teams.moir.player2) |
//       (x.playerName === teams.moir.player3) |
//       (x.playerName === teams.moir.player4) |
//       (x.playerName === teams.moir.player5) |
//       (x.playerName === teams.moir.player6) |
//       (x.playerName === teams.moir.player7) |
//       (x.playerName === teams.moir.player8) |
//       (x.playerName === teams.moir.player9) |
//       (x.playerName === teams.moir.player10)
//   );
//   console.log("value", value);
// }
// sort();

for (var team in teams) {
  let result = teams[team];
  let values = Object.values(result);
  // console.log(team, Object.values(result));

  for (const val of values) {
    console.log("player", val);
    let match = data.filter(x => x.playerName === val);
    console.log("match", match);
  }
}
