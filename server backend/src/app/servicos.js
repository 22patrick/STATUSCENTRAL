import { Service } from "node-windows";

// Create a new service object
var svc = new Service({
  name: "StatusCentral_Server",
  description: "Serviço One status Hd Central Ip.",
  script: "D:\\CENTRAL_IP\\server backend\\src\\server.js",
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function () {
  svc.start();
});

svc.install();
