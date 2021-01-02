const population = require('./src/population');
const { Player } = require('./src/player');


let playerA = new Player({ xPos: 250, yPos: 250, velocity: 1, heading: 0 });
let playerB = new Player({ xPos: 250, yPos: 250, velocity: 1, heading: 0 });

playerA.brain.instructions = [];
for(let i=0; i<100; i++){
    playerA.brain.instructions.push(0);
}

playerB.brain.instructions = [];
for(let i=0; i<100; i++){
    playerB.brain.instructions.push(1);
}

console.log(JSON.stringify(playerA.brain.instructions));
console.log(JSON.stringify(playerB.brain.instructions));


console.log(JSON.stringify(population.breed({ parent1: playerA, parent2: playerB })));


