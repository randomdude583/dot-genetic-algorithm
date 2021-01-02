let io;
let clientSocket;


let elements = [];

const initCanvas = (startGameCallback) => {
    var http = require('http'),
        fs = require('fs'),
        // NEVER use a Sync function except at start-up!
        index = fs.readFileSync(__dirname + '/assets/index.html');

    // Send index.html to all requests
    var app = http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(index);
    });

    // Socket.io server listens to our app
    io = require('socket.io')().listen(app);



    // Emit welcome message on connection
    io.on('connection', function (socket) {
        socket.on('start', () => {
            startGameCallback();
        });
    });

    io.on = function (name, fn) {
        console.log(name);
    };

    app.listen(3000);
};




const updateCanvas = () => {
    //send new frame
    io.emit('update', {elements})
    elements = [];
};


const drawDot = ({ xPos, yPos, radius, color }) => {
    elements.push({
        type: 'Circle',
        radius: radius,
        x: xPos,
        y: yPos,
        color: color,
    });
};

const updateGen = (number) => {
    io.emit('updateGen', {number});
}




const drawObstacle = () => {
    //TODO implement
};


const drawGenCount = () => {
    //TODO implement
};



module.exports = {
    initCanvas,
    updateCanvas,
    drawDot,
    updateGen,
}