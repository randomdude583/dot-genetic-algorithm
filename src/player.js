const { Brain } = require('./brain');
const index = require('./index');

const size = { width: 500, height: 500};
const goal = { xPos: 250, yPos: 200, radius: 5};


class Player {
    constructor({ xPos, yPos, velocity = 1, heading }) {
        this.brain = new Brain(1000);
        this.xPos = xPos;
        this.yPos = yPos;
        this.velocity = velocity;
        this.heading = heading;
        this.dead = false;
        this.inGoal = false;
        this.fitness;
        this.isbest = false;
    }

    move() {
        if (!this.dead && !this.inGoal) {
            this.heading = this.brain.next;
            if (this.heading == -1) {
                this.dead = true;
            } else {
                const xDiff = Math.sin(this.heading * (Math.PI / 180)) * this.velocity;
                const yDiff = Math.cos(this.heading * (Math.PI / 180)) * this.velocity;

                this.xPos += xDiff;
                this.yPos += yDiff;
            }

            //Check if out of bounds
            if (this.xPos < 0 || this.xPos > 500) {
                this.dead = true;
            }
            if (this.yPos < 0 || this.yPos > 500) {
                this.dead = true;
            }

            //Check if in goal
            const distToGoal = Math.sqrt(Math.pow(goal.xPos - this.xPos, 2) + Math.pow(goal.yPos - this.yPos, 2));
            if (distToGoal < goal.radius) {
                this.inGoal = true;
            }
        }
    }

    calculateFitness() {
        let value = 0;
        if (this.dead) {
            this.fitness = 0;
        }
        if (this.inGoal) {
            value += (1000 - this.brain.step);
        }
        const maxDistance = Math.sqrt(Math.pow(size.width, 2) + Math.pow(size.height, 2));
        const distToGoal = Math.sqrt(Math.pow(goal.xPos - this.xPos, 2) + Math.pow(goal.yPos - this.yPos, 2));
        value += (100 *  (1-(distToGoal / maxDistance)));

        this.fitness = value;
    };
}



module.exports = {
    Player,
}