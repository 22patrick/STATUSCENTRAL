import { Service } from "node-windows";

var svc = new Service({
  nome: "Api_Central",
  descrição: "Inicia o npm start",
  execPath: "C:\\Program Files\\nodejs\\node.exe",
  
  script: "D:\\CENTRAL_IP\\central_ip\\npm start"
 
});

svc.on("install", function () {
  svc.start();
});

svc.install();

