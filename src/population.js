const { Player } = require('./player');


const size = { width: 500, height: 500 };
const goal = { xPos: 250, yPos: 200, radius: 5 };
const mutationChance = .01;


class Population {
    constructor(size) {
        this.size = size;
        this.players = [];
        this.gen = 1;
        this.best;
        for (let i = 0; i < size; i++) {
            this.players.push(new Player({ xPos: 250, yPos: 250, velocity: 1, heading: 0 }));
        }

    }

    update() {
        this.players.forEach((e) => {
            e.move();
        });
    }

    draw({ canvas }) {
        this.players.forEach((e) => {
            canvas.drawDot({ xPos: e.xPos, yPos: e.yPos, radius: 5, color: e.isbest ? "Green" : "Black" });
        })
    }

    allDead() {
        return this.players.every((player) => player.dead || player.inGoal);
    }

    calculateFitness() {
        this.players.forEach((player) => {
            player.calculateFitness();
        });

        const sorted = this.players.sort((a, b) => (a.fitness < b.fitness) ? 1 : -1);
        sorted.forEach((e) => {
            const maxDistance = Math.sqrt(Math.pow(size.width, 2) + Math.pow(size.height, 2));
            const distance = Math.sqrt(Math.pow(goal.xPos - e.xPos, 2) + Math.pow(goal.yPos - e.yPos, 2));
        });
    };

    naturalSelection() {
        //Save best player
        let nextGen = [];
        nextGen.push(new Player({ xPos: 250, yPos: 250, velocity: 1, heading: 0 }));
        nextGen[0].brain = this.players[0].brain.clone();
        nextGen[0].isbest = true;


        let fitnessSum = 0;
        this.players.forEach((player) => {
            fitnessSum += player.fitness;
        });

        for (let i = 1; i < this.size; i++) {
            //Select two parents
            let parent1 = selectParent({ players: this.players, fitnessSum: fitnessSum });
            let parent2 = selectParent({ players: this.players, fitnessSum: fitnessSum });
            //breed and mutate
            nextGen.push(breed({ parent1, parent2 }));
        }

        this.players = nextGen;
        this.players.forEach((player) => {
            // console.log({
            //     xPos: player.xPos, 
            //     yPos: player.yPos,
            //     velocity: player.velocity,
            //     heading: player.heading,
            //     dead: player.dead,
            //     inGoal: player.inGoal,
            //     isbest: player.isbest,
            //     step: player.brain.step,
            //     brainSize: player.brain.instructions.length,
            // })
        });

        this.gen++;
    }
}


//Select a parent from an input array
const selectParent = ({ players, fitnessSum }) => {
    const rand = Math.random() * fitnessSum;
    let runningSum = 0;

    for(let i=0; i<players.length; i++){
        runningSum += players[i].fitness;
        if (runningSum > rand) {
            return players[i];
        }
    }
};



//Input two players and output a child
const breed = ({ parent1, parent2 }) => {
    const splitPoint = Math.random() * parent1.brain.size;
    let childInstructions = parent1.brain.instructions.slice(0, splitPoint);
    childInstructions = childInstructions.concat(parent2.brain.instructions.slice(splitPoint, parent2.brain.size));
    mutate(childInstructions);
    let child = new Player({ xPos: 250, yPos: 250, velocity: 1, heading: 0 });
    child.brain.instructions = childInstructions;
    return child;
};

//Apply mutations to a set of instructions
const mutate = (instructions) => {
    for (let i = 0; i < instructions.length; i++) {
        if (Math.random() < mutationChance) {
            instructions[i] = Math.random() * 360;
        }
    }
}



module.exports = {
    Population,
    breed,
    mutate,
};