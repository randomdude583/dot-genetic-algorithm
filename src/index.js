const canvas = require('./canvas');
const { Player } = require('./player');
const { Population } = require('./population');


const size = { height: 500, width: 500 };
const goal = { xPos: 250, yPos: 200, radius: 5 };

const main = () => {
    canvas.initCanvas(startSim);
};


let pop;


const startSim = () => {


    pop = new Population(100);
    canvas.updateCanvas();
    canvas.updateGen(pop.gen);



    const interval = setInterval(() => {
        //Draw goal
        canvas.drawDot({ xPos: goal.xPos, yPos: goal.yPos, radius: goal.radius, color: "Red" })

        if (pop.allDead()) {
            //Create new generation
            console.log("All dead!");
            pop.calculateFitness();
            pop.naturalSelection();
            console.log("GEN:", pop.gen);
            canvas.updateGen(pop.gen);
        } else {
            //Move and update
            pop.update();
            pop.draw({ canvas });
            canvas.updateCanvas();
        }
    }, 5);



};




main();


module.exports = {
    size: size,
    goal: goal,
};
