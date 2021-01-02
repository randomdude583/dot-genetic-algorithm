

class Brain {
    constructor(size) {
        this.instructions = [];
        this.step = 0;
        for (let i = 0; i < size; i++) {
            this.instructions[i] = Math.random() * 360;
        }
    }

    get next() {
        if (this.step >= this.instructions.length) {
            return -1;
        }
        const value = this.instructions[this.step];
        this.step++;
        return value;
    }

    get size() {
        return this.instructions.length;
    }

    clone () {
        let clone = new Brain(this.instructions.length);
        clone.instructions = [];
        this.instructions.forEach((e) => {
            clone.instructions.push(e);
        });

        return clone;
    }
}


module.exports = {
    Brain,
};