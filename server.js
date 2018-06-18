/** App Dependencies */
let baseRoute = "/api",
    port = process.env.PORT || 8000,
    bodyParser = require("body-parser"),
    express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server),
    fs = require("fs");

/** Start up server */
server.listen(port, () => {
    console.log(`For Debugging => Listening on: http://localhost:${port}`);
});

/** Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Load required config files and settings */
let truckstopCredentials = JSON.parse(fs.readFileSync('Configs/truckstopCredentials.json', 'utf8'));
let configs = {
    baseRoute: baseRoute,
    baseTruckstopUrl: "https://app.truckstop.com",
    truckStats: {
        mpg: 4.8,
        costPerGal: 2.962
    },
    truckstopCredentials: truckstopCredentials
};

/** Initialize facades */
let adapterFacade = new (require("./Adapters/adaptersFacade"))(configs);
let serviceFacade = new (require("./Services/servicesFacade"))(configs, adapterFacade);

/** Initialize Controllers */
let ctrlInit = new (require("./Controllers/controllersInitializer"))(app, configs, serviceFacade);
ctrlInit.initControllers();

/** Initialize Async with socket.io */
io.on("connection", (socket) => {
    /**If you wanna do something with individual sockets. Feel free!*/
});

/** Serve UI */
app.use(express.static("Webroot"));


process.on('uncaughtException', function (err) {
    console.log(err);
});