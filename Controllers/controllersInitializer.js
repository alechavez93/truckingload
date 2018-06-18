let fs = require("fs");
let path = require('path');
let scriptName = path.basename(__filename);

/** Class has the responsibility to initialize all other controllers for the application.
 *  Arguments: @config -> object containing express app instance and baseRoute*/
class InitControllers{
    constructor(app, configs, serviceFacade){
        this.app = app;
        this.baseRoute = configs.baseRoute;
        this.serviceFacade = serviceFacade;
    }

    /** Method initializes all controllers in the 'Controllers' folder
     * Note: All Controllers must follow the example controller provided*/
    initControllers(){
        fs.readdir(__dirname, "utf8", (err, controllerPaths) => {
            if(err) throw err;
            for(let ctrlPath of controllerPaths){

                if(ctrlPath === scriptName) continue;
                let controller = new (require("./" + ctrlPath))(this.baseRoute, this.serviceFacade);
                let routes = controller.getRoutes();

                for(let route of routes){
                    this.initRoute(route);
                }
            }
        });
    };

    /** Method initializes a single route within the controller instance
     * Arguments: @route -> The route object which contains method [GET, POST, etc],
     * endpoint string(api/v1/route-name), and handler which is the function that takes (reg,res) in Express*/
    initRoute(route){
        this.notifyRoute(route);
        switch (route.method){
            case "GET":
                this.app.get(route.endpoint, route.handler);
                break;
            case "PUT":
                this.app.put(route.endpoint, route.handler);
                break;
            case "POST":
                this.app.post(route.endpoint, route.handler);
                break;
            case "DELETE":
                this.app.delete(route.endpoint, route.handler);
                break;
            default:
                throw new Error("Invalid http method "+route.method);
        }
    }

    /** Method logs when an endpoint has been initialized*/
    notifyRoute(route){
        console.log(`Activating endpoint: ${route.endpoint} -> ${route.method}`)
    }
}

module.exports = InitControllers;